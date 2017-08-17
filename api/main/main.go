package main

import (
	_ "github.com/dgrijalva/jwt-go"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"

	// "fmt"
	"github.com/tungnt244/scoville_website/api/main/config"
	"github.com/tungnt244/scoville_website/api/main/db"
	"github.com/tungnt244/scoville_website/api/main/handler"
	"gopkg.in/go-playground/validator.v9"
)

func main() {
	//Create echo instance
	e := echo.New()
	e.Validator = &db.CustomValidator{ValidatorCustom: validator.New()}

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	//CORS
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{echo.GET, echo.HEAD, echo.PUT, echo.PATCH, echo.POST, echo.DELETE},
	}))

	//Get connection to the database
	dsn := "host=" + config.HOST + " user=" + config.USER + " dbname=" + config.DBNAME + " sslmode=" + config.SSLMODE + " password=" + config.PASSWORD
	gormDB, err := gorm.Open(config.DBMS, dsn)
	if err != nil {
		panic(err) // Just for example purpose. You should use proper error handling instead of panic
	}
	defer gormDB.Close()

	db.SetupConnection(gormDB)

	//RESTFUL api for user
	e.GET("/users/:id", handler.GetUser)
	e.GET("/users", handler.GetAllUsers)
	e.POST("/users", handler.CreateUser)
	e.PUT("/users/:id", handler.UpdateUser)
	e.DELETE("/users/:id", handler.DeleteUser)

	//Check valid or invalid user
	e.POST("/login", handler.Login)

	//RESTFUL api for news
	e.GET("/news", handler.GetAllNews)
	e.GET("/news/brief", handler.GetAllNews)
	e.GET("/news/:id", handler.GetNews)
	e.POST("/news", handler.CreateNews)
	e.PUT("/news/:id", handler.UpdateNews)
	e.DELETE("/news/:id", handler.DeleteNews)

	//RESTFUL api for formRecruitment
	e.GET("/forms/recruitment/:id", handler.GetFormRecruitment)
	e.GET("/forms/recruitment", handler.GetAllFormRecruitment)
	e.GET("/forms/recruitment/general", handler.GetGeneralForm)
	e.GET("/forms/recruitment/engineer", handler.GetEngineerForm)
	e.PUT("/forms/recruitment/:id", handler.UpdateFormRecruitment)
	e.POST("/forms/recruitment", handler.CreateFormRecruitment)
	e.DELETE("/forms/recruitment/:id", handler.DeleteFormRecruitment)

	//RESTFUL api for formContact
	e.GET("/forms/contact/:id", handler.GetFormContact)
	e.GET("/forms/contact", handler.GetAllFormContact)
	e.PUT("/forms/contact/:id", handler.UpdateFormContact)
	e.POST("/forms/contact", handler.CreateFormContact)
	e.DELETE("/forms/contact/:id", handler.DeleteFormContact)

	// //Connect to localhost with port:4444
	e.Logger.Fatal(e.Start(":4444"))
}
