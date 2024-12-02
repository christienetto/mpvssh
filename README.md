# mpvssh 🎥🎶

**mpvssh** is a self-hosted mpv control app that gives you full control over your media player via SSH. With a sleek interface powered by **Expo Go** and a backend written in **Go**, you can easily play, pause, skip, rewind, and adjust the volume of your media. Additionally, you can execute custom terminal commands and explore available movies — just click to play!

---

## Features 🌟

- **Control Media Playback** 🎬
  - Play, pause, skip, and rewind your media files.
  - Adjust the volume with simple touch controls.
  
- **Custom Terminal Commands** 💻
  - Execute custom terminal commands directly from the app interface.

- **Movie List Fetching** 🎥
  - Fetch and view a list of available movies.
  - Click to open and play any movie instantly!

- **SSH Connectivity** 🔐
  - Connect to your server via **SSH** for seamless media control.

---

## Requirements ⚡

- **Same Network**: Your phone and the server must be on the same Wi-Fi network.
- **Static IP**: The server requires a static IP address (this is currently not set as a `.env` variable).
  
---

## Getting Started 🚀

1. Clone this repository to your local machine.
2. Set up the Go backend by go run main.go and frontend by npx expo start --tunnel.
  
4. Open Expo Go on your phone and scan the QR code to access the app.
5. Enjoy seamless media control with just a few taps!

---

## Technology Stack 🛠️

- **Frontend**: Built using **Expo Go** and React Native.
- **Backend**: Powered by **Go** for efficient server-side operations.
- **Communication**: Uses **SSH** for secure communication between the app and the server.
- **Tunneling**: **Ngrok** for exposing the local server to your phone.
  
---

## Future Improvements 🚧

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
