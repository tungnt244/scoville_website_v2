package model

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"time"
)

type User struct {
	gorm.Model
	Email    string `gorm:"type:varchar(100);unique_index" json:"email" validate:"required"`
	Password string `json:"password" validate:"required"`
	Role     string `json:"role"`
}

type News struct {
	// gorm.Model
	ID          uint   `gorm:"primary_key" json:"id"`
	Title       string `gorm:"size:255" json:"title" validate:"required"`
	Content     string `json:"content"`
	Picture     string `json:"picture"`
	Description string `grom:"size:255" json:"description"`
}

type Form_recruitment struct {
	ID         uint      `gorm:"primary_key" json:"id"`
	Email      string    `gorm:"type:varchar(100)" json:"email"`
	SelfPR     string    `json:"self_pr"`
	LinkGithub string    `json:"link_github"`
	Position   string    `gorm:"default:'General Staff'" json:"position"`
	Status     string    `gorm:"string:20;default:'Not Processed'" json:"status"`
	CreatedAt  time.Time `gorm:"column:created_at;type:datetime;default:CURRENT_TIMESTAMP"`
}
type Form_contact struct {
	ID                   uint      `gorm:"primary_key" json:"id"`
	CompanyName          string    `gorm:"type:varchar(100)" json:"company_name"`
	StaffName            string    `json:"staff_name"`
	EmailAddress         string    `json:"email_address"`
	PhoneNumber          string    `json:"phone_number"`
	DescriptionOfContact string    `json:"description_of_contact"`
	Status               string    `gorm:"string:20;default:'Not Processed'" json:"status"`
	CreatedAt            time.Time `gorm:"column:created_at;type:datetime;default:CURRENT_TIMESTAMP"`
}
