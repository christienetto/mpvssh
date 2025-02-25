package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"strings"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

type SSHRequest struct {
	Command string `json:"command"`
}

func main() {
	// Load the .env file (specify the correct path)
	err := godotenv.Load("../.env") // Since .env is one directory higher
	if err != nil {
		fmt.Println("Warning: Could not load .env file")
	}

	// Get MoviesDir from environment
	moviesDir := os.Getenv("MoviesDir")
	if moviesDir == "" {
		fmt.Println("Error: MoviesDir environment variable is not set")
		return
	}

	r := gin.Default()
	r.Use(cors.Default()) // Enable CORS for frontend communication

	// Route to execute MPV commands via SSH
	r.POST("/ssh", func(c *gin.Context) {
		var req SSHRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
			return
		}

		output, err := executeCommand(req.Command)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"output": output})
	})

	// Route to list folders (movies/series)
	r.GET("/movies", func(c *gin.Context) {
		folders, err := listFolders(moviesDir)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"folders": folders})
	})

	// Route to list videos in a folder
	r.GET("/movies/:folder", func(c *gin.Context) {
		folder := c.Param("folder")
		fullPath := filepath.Join(moviesDir, folder)

		videos, err := listVideos(fullPath)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"videos": videos})
	})

	// Start the server
	r.Run(":8080") // Runs on port 8080
}

// Executes a shell command
func executeCommand(command string) (string, error) {
	cmd := exec.Command("bash", "-c", command)
	output, err := cmd.CombinedOutput()
	if err != nil {
		return "", fmt.Errorf("command failed: %v, output: %s", err, string(output))
	}
	return string(output), nil
}

// Lists folders in the given directory
func listFolders(dir string) ([]string, error) {
	entries, err := ioutil.ReadDir(dir)
	if err != nil {
		return nil, err
	}

	folders := []string{}
	for _, entry := range entries {
		if entry.IsDir() {
			folders = append(folders, entry.Name())
		}
	}
	return folders, nil
}

// Lists video files in the given folder
func listVideos(folder string) ([]string, error) {
	entries, err := ioutil.ReadDir(folder)
	if err != nil {
		return nil, err
	}

	videos := []string{}
	for _, entry := range entries {
		if !entry.IsDir() && isVideoFile(entry.Name()) {
			videos = append(videos, entry.Name())
		}
	}
	return videos, nil
}

// Checks if a file is a video
func isVideoFile(fileName string) bool {
	extensions := []string{".mp4", ".mkv", ".avi", ".mov"}
	for _, ext := range extensions {
		if strings.HasSuffix(fileName, ext) {
			return true
		}
	}
	return false
}
