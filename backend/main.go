package main

import (
	"fmt"
	"github.com/gorilla/websocket"
	"log"
	"net/http"
)

// Define an upgrader of connection status
// HTTP -> WebSocket
var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	// Checking conn origin, for instance, no check
	CheckOrigin: func(r *http.Request) bool { return true },
}

// Define a reader which will listen for
// new messages being sent to our WebSocket endpoint
func reader(conn *websocket.Conn) {
	for {
		// Read in a message
		messageType, p, err := conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}
		// Print out that message for clarity
		fmt.Println(string(p))
		if err := conn.WriteMessage(messageType, p); err != nil {
			log.Println(err)
			return
		}
	}
}

// serveWs defines our WebSocket endpoint
func serveWs(w http.ResponseWriter, r *http.Request) {
	fmt.Println(r.Host)
	// Upgrade this connection to a WebSocket connection
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
	}
	// Listen indefinitely for new messages coming
	// through on our WebSocket connection
	reader(ws)
}

// setupRoutes defines access to any routes of our server
func setupRoutes() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Simple Server")
	})
	// mape our `/ws` endpoint to the `serveWs` function
	http.HandleFunc("/ws", serveWs)
}

func main() {
	fmt.Println("Chat App v0.01")
	setupRoutes()
	http.ListenAndServe(":8080", nil)
}
