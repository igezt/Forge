package requests

import "forge/models"

type CreateSpaceRequest struct {
	SpaceName   string                  `json:"spaceName"`
	AccessLevel models.SpaceAccessLevel `json:"accessLevel"`
	Description string                  `json:"description"`
}

type UpdateSpaceRequest struct {
	SpaceId     string                  `json:"spaceId"`
	SpaceName   string                  `json:"spaceName"`
	AccessLevel models.SpaceAccessLevel `json:"accessLevel"`
	Description string                  `json:"description"`
}
