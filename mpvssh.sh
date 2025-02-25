#!/bin/bash

# Go to the ssh-media-controller directory and start Expo
echo "Starting Expo Client"
cd /home/maniu/src/mpvssh/ssh-media-controller || { echo "Failed to navigate to /home/chris/src/mpvssh/ssh-media-controller"; exit 1; }
npx expo start --tunnel &

# Wait for a moment to ensure Expo starts properly
sleep 5

# Go to the go-ssh-backend directory and run the Go backend
echo "Starting Backend"
cd /home/maniu/src/mpvssh/go-ssh-backend || { echo "Failed to navigate to /home/chris/src/mpvssh/go-ssh-backend"; exit 1; }
go run main.go

