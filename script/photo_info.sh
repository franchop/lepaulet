#!/bin/bash

# Vérifier si exiftool est installé
if ! command -v exiftool &> /dev/null
then
    echo "exiftool n'est pas installé. Installez-le avec 'sudo apt install libimage-exiftool-perl' ou équivalent."
    exit 1
fi

# Dossier contenant les images
DIR="../app/public/photos/"

# Vérifier si un argument est passé pour le dossier de sortie
if [ -n "$1" ]; then
    OUTPUT_DIR="$1"
else
    OUTPUT_DIR="../app/public/assets/"
fi

# Créer un tableau temporaire pour stocker les noms de fichiers
files=()

# Boucler sur chaque image principale et stocker les noms dans le tableau
for img in "$DIR"/*.JPG; do
    if [[ "$img" == *"-mini.JPG" ]]; then
        continue
    fi
    files+=("$img")
done

# Trier les fichiers par numéro décroissant en s'assurant que img31.JPG vient après img3.JPG
IFS=$'\n' sorted_files=($(printf "%s\n" "${files[@]}" | sed 's/[^0-9]*//g' | sort -nr | awk '{print "'$DIR'/img"$1".JPG"}'))
unset IFS


# Initialiser le tableau JSON
echo "[" > "$OUTPUT_DIR/photo.json"
FIRST=true

# Boucler sur les fichiers triés
for img in "${sorted_files[@]}"; do
    thumb="${img%.JPG}-mini.JPG"
    echo "Traitement : ${img%.JPG}.JPG";
    # Extraire les métadonnées
    focal_length=$(exiftool -s3 -FocalLength "$img")
    iso=$(exiftool -s3 -ISO "$img")
    exposure_time=$(exiftool -s3 -ExposureTime "$img")
    aperture=$(exiftool -s3 -FNumber "$img")
    
    # Ajouter une virgule entre les objets JSON
    if [ "$FIRST" = true ]; then
        FIRST=false
    else
        echo "," >> "$OUTPUT_DIR/photo.json"
    fi
    
    # Écrire l'objet JSON dans le fichier
    echo "  {" >> "$OUTPUT_DIR/photo.json"
    echo "    \"name\": \"$(basename "$img")\"," >> "$OUTPUT_DIR/photo.json"
    echo "    \"name_thumbnail\": \"$(basename "$thumb")\"," >> "$OUTPUT_DIR/photo.json"
    echo "    \"focale\": \"$focal_length\"," >> "$OUTPUT_DIR/photo.json"
    echo "    \"iso\": \"$iso\"," >> "$OUTPUT_DIR/photo.json"
    echo "    \"exposition_time\": \"$exposure_time\"," >> "$OUTPUT_DIR/photo.json"
    echo "    \"aperture\": \"$aperture\"" >> "$OUTPUT_DIR/photo.json"
    echo "  }" >> "$OUTPUT_DIR/photo.json"

done

# Fermer le tableau JSON
echo "
]" >> "$OUTPUT_DIR/photo.json"

echo "Fichier photo.json généré avec succès dans $OUTPUT_DIR."