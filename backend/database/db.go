package db

import (
	"log"

	_ "github.com/jackc/pgx/v5/stdlib"
	"github.com/jmoiron/sqlx"
)

var DB *sqlx.DB

func InitDB() {
	var err error
	dsn := "postgres://postgres:5172@localhost:5432/postgres?sslmode=disable"
	DB, err = sqlx.Open("pgx", dsn)
	if err != nil {
		log.Fatal("Failed to open DB:", err)
	}
	if err = DB.Ping(); err != nil {
		log.Fatal("Failed to ping DB:", err)
	}
}