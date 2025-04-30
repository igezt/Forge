package services

import (
	db "forge/database"
	models "forge/models"
	"log"
	"time"

	"github.com/google/uuid"
)

func GetSpacesByUserId(userId string) ([]models.Space, error) {
	var spaces []models.Space
	err := db.DB.Select(&spaces, `
		SELECT id, name, description, created_at, updated_at, created_by, 
		       number_of_pages, access_level, last_activity_at
		FROM spaces WHERE created_by = $1
	`, userId)
	return spaces, err
}

func CreateSpaceForUserId(userId string, accessLevel models.SpaceAccessLevel, spaceName string, description string) (*models.Space, error) {
	now := time.Now().UTC()
	space := models.Space{
		ID:             uuid.NewString(),
		Name:           spaceName,
		Description:    &description,
		CreatedAt:      now.Format(time.RFC3339),
		UpdatedAt:      now.Format(time.RFC3339),
		CreatedBy:      userId,
		NumberOfPages:  0,
		AccessLevel:    accessLevel,
		LastActivityAt: nil,
	}
	query := `
		INSERT INTO spaces (id, name, description, created_at, updated_at, created_by, number_of_pages, access_level, last_activity_at)
		VALUES (:id, :name, :description, :created_at, :updated_at, :created_by, :number_of_pages, :access_level, :last_activity_at);
	`

	// Use sqlx to insert the space into the database
	_, err := db.DB.NamedExec(query, space)
	if err != nil {
		log.Printf("Error inserting space: %v", err)
		return nil, err
	}

	return &space, nil
}

func DeleteSpaceById(spaceId string) error {
	query := `
		DELETE FROM spaces
		WHERE id = $1;
	`

	_, err := db.DB.Exec(query, spaceId)
	if err != nil {
		log.Printf("Error deleting space with ID %s: %v", spaceId, err)
		return err
	}

	return nil
}

func UpdateSpaceById(spaceId string, accessLevel models.SpaceAccessLevel, spaceName string, description string) error {
	query := `
		UPDATE spaces
		SET name = :name,
			description = :description,
			access_level = :access_level,
			updated_at = :updated_at
		WHERE id = :id;
	`

	params := map[string]interface{}{
		"id":           spaceId,
		"name":         spaceName,
		"description":  description,
		"access_level": accessLevel,
		"updated_at":   time.Now().UTC().Format(time.RFC3339),
	}

	_, err := db.DB.NamedExec(query, params)
	if err != nil {
		log.Printf("Error updating space with ID %s: %v", spaceId, err)
		return err
	}

	return err
}
