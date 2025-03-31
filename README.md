# mpvssh 

**mpvssh** is a self-hosted media control app that gives you full control over your media player via SSH. With a sleek interface powered by **Expo Go** and a backend written in **Go**, you can easily play, pause, skip, rewind, and adjust the volume of your media. Additionally, you can execute custom terminal commands and explore available movies — just click to play!

---

## Features 🌟

- **Control Media Playback** 🎬
  - Play, pause, skip, and rewind your media files.
  - Adjust the volume with simple touch controls.
- **Custom Terminal Commands** 💻

  - Execute custom terminal commands directly from the app interface.

- **Movie List Fetching** 

  - Fetch and view a list of available movies.
  - Click to open and play any movie instantly!

- **SSH Connectivity** 
  - Connect to your server via **SSH** for seamless media control.

---

## Requirements ⚡

- **Same Network**: Your phone and the server must be on the same Wi-Fi network.
- **Static IP**: The server requires a static IP address (this is currently not set as a `.env` variable).

# Make sure:

- sudo systemctl stop firewalld
- sudo systemctl enable sshd
- sudo systemctl start sshd
- sudo systemctl status sshd
- npm install ngrok
- p -S socat

---

## Getting Started 

1. Clone this repository to your local machine.
2. Set up the Go backend.
3. Open Expo Go on your phone and scan the QR code to access the app. 
- expo start --tunnel

4. Enjoy seamless media control with just a few taps!

---

## Testing
1. Make sure you are on the same internet on both devices
2. curl localhost:8080/movies, make sure they are in folders
2. port forward 22
2. Open the app and fetch movies



## Technology Stack 

- **Frontend**: Built using **Expo Go** and React Native.
- **Backend**: Powered by **Go** for efficient server-side operations.
- **Communication**: Uses **SSH** for secure communication between the app and the server.
- **Tunneling**: **Ngrok** for exposing the local server to your phone.

---

## Future Improvements 

- Make the IP address configurable through a `.env` file.
- Enhance error handling and security features.
- Add more media control features and improve the UI/UX.

---

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments 💡

- Thanks to **Expo Go** for providing an easy way to develop and preview mobile apps.
- Kudos to **Go** for being an awesome backend language for handling SSH and terminal commands.

---

Enjoy controlling your media effortlessly with **mpvssh**! 🚀
