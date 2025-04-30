package controllers

import (
	"encoding/json"
	"fmt"
	"forge/requests"
	services "forge/services"
	"net/http"
)

func GetSpacesController(w http.ResponseWriter, r *http.Request) {
	userId := r.PathValue("userId")
	spaces, err := services.GetSpacesByUserId(userId)
	if err != nil {
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(spaces)
}

func CreateSpacesController(w http.ResponseWriter, r *http.Request) {
	userId := r.PathValue("userId")

	var req requests.CreateSpaceRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if req.SpaceName == "" || req.AccessLevel == "" {
		http.Error(w, "Missing required fields", http.StatusBadRequest)
		return
	}

	space, err := services.CreateSpaceForUserId(userId, req.AccessLevel, req.SpaceName, req.Description)
	if err != nil {
		http.Error(w, "Failed to create space", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(*space)
}

func DeleteSpacesController(w http.ResponseWriter, r *http.Request) {
	spaceId := r.PathValue("spaceId")

	if spaceId == "" {
		http.Error(w, "Missing required fields", http.StatusBadRequest)
		return
	}

	services.DeleteSpaceById(spaceId)
	w.WriteHeader(http.StatusNoContent) // 204 No Content
}

func UpdateSpacesController(w http.ResponseWriter, r *http.Request) {
	var req requests.UpdateSpaceRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	fmt.Println(req.SpaceId)
	fmt.Println(req.AccessLevel)
	fmt.Println(req.SpaceName)
	fmt.Println(req.Description)

	err := services.UpdateSpaceById(req.SpaceId, req.AccessLevel, req.SpaceName, req.Description)
	if err != nil {
		http.Error(w, "Failed to update space", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
