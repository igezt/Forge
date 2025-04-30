package main

import (
	spacesController "forge/controllers"
	db "forge/database"
	"log"
	"net/http"
)

func main() {
	db.InitDB()
	defer db.DB.Close()

	http.HandleFunc("GET /spaces/{userId}", spacesController.GetSpacesController)
	http.HandleFunc("POST /spaces/{userId}", spacesController.CreateSpacesController)
	http.HandleFunc("DELETE /spaces/{spaceId}", spacesController.DeleteSpacesController)
	http.HandleFunc("PUT /spaces", spacesController.UpdateSpacesController)
	log.Println("Server running on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
