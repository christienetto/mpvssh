#!/bin/bash

# Specify the directory where your movie folders are located
MOVIE_DIR="$HOME/med/movies"

# Change to the movie directory
cd "$MOVIE_DIR" || exit

# Loop through all directories and rename them
for folder in */; do
    # Extract a simplified name (you can adjust this regex as needed)
    new_name=$(echo "$folder" | sed -E 's/^(.*torrent|series|release|1920x1080|1080p|[^\w\s\-])//g' | sed 's/[[:space:]]+/ /g' | sed 's/^[[:space:]]+//g' | sed 's/[[:space:]]+$//g')
    
    # Only rename if the new name is different
    if [ "$folder" != "$new_name" ]; then
        mv "$folder" "$new_name"
        echo "Renamed '$folder' to '$new_name'"
    fi
done
