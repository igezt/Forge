package models

// SpaceAccessLevel represents access level of a space
type SpaceAccessLevel string

const (
	PrivateAccess SpaceAccessLevel = "private"
	TeamAccess    SpaceAccessLevel = "team"
	PublicAccess  SpaceAccessLevel = "public"
)

type Space struct {
	ID             string  `db:"id" json:"id"`
	Name           string  `db:"name" json:"name"`
	Description    *string `db:"description" json:"description,omitempty"`
	CreatedAt      string  `db:"created_at" json:"createdAt"`
	UpdatedAt      string  `db:"updated_at" json:"updatedAt"`
	CreatedBy      string  `db:"created_by" json:"createdBy"`
	NumberOfPages  int     `db:"number_of_pages" json:"numberOfPages"`
	AccessLevel    SpaceAccessLevel  `db:"access_level" json:"accessLevel"`
	LastActivityAt *string `db:"last_activity_at" json:"lastActivityAt,omitempty"`
}
