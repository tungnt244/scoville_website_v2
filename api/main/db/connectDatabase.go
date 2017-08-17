package db

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	_ "github.com/tungnt244/scoville_website/api/main/config"
)

type DBManager struct {
	database *gorm.DB
}

var Manager *DBManager

func SetupConnection(db *gorm.DB) {
	Manager = &DBManager{database: db}
	return
}
