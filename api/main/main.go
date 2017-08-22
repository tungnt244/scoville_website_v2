package main

import (
	// "github.com/dgrijalva/jwt-go"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"github.com/joho/godotenv"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"github.com/tungnt244/scoville_website_v2/api/main/config"
	"github.com/tungnt244/scoville_website_v2/api/main/db"
	"github.com/tungnt244/scoville_website_v2/api/main/handler"
	"gopkg.in/go-playground/validator.v9"
	"log"
	"net/http"
	"os"
)

func accessible(c echo.Context) error {
	return c.String(http.StatusOK, "Accessible")
}

// func restricted(c echo.Context) error {
// 	// user := c.Get("user").(*jwt.Token)
// 	// claims := user.Claims.(jwt.MapClaims)
// 	// email := claims["email"].(string)
// 	return c.String(http.StatusOK, "Welcome "+"!")
// }

func main() {
	//Load environtment
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	tokenSecretString := os.Getenv("SECRET_TOKEN_STRING")

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

	//jwt
	//RESTFUL api for user
	// e.GET("/users", handler.GetAllUsers, middleware.JWT([]byte(tokenSecretString)))
	users := e.Group("/users")
	users.Use(middleware.JWT([]byte(tokenSecretString)))
	users.GET("", handler.GetAllUsers)
	users.GET("/:id", handler.GetUser)
	users.POST("", handler.CreateUser)
	users.PUT("/:id", handler.UpdateUser)
	users.DELETE("/:id", handler.DeleteUser)

	//Check valid or invalid user
	e.POST("/login", handler.Login)

	//RESTFUL api for news
	e.GET("/news", handler.GetAllNews)
	e.GET("/news/brief", handler.GetAllNews)
	e.GET("/news/:id", handler.GetNews)
	//Apply JWT middleware
	news := e.Group("/news")
	news.Use(middleware.JWT([]byte(tokenSecretString)))
	news.POST("", handler.CreateNews)
	news.PUT("/:id", handler.UpdateNews)
	news.DELETE("/:id", handler.DeleteNews)

	//RESTFUL api for formRecruitment
	//Apply JWT middleware
	formRecruitment := e.Group("/forms/recruitment")
	formRecruitment.Use(middleware.JWT([]byte(tokenSecretString)))
	formRecruitment.GET("/:id", handler.GetFormRecruitment)
	formRecruitment.GET("", handler.GetAllFormRecruitment)
	formRecruitment.GET("/general", handler.GetGeneralForm)
	formRecruitment.GET("/engineer", handler.GetEngineerForm)
	formRecruitment.PUT("/:id", handler.UpdateFormRecruitment)
	formRecruitment.DELETE("/:id", handler.DeleteFormRecruitment)

	// limit request
	e.POST("/forms/recruitment", handler.CreateFormRecruitment)

	//RESTFUL api for formContact
	//Apply JWT middleware
	formContact := e.Group("/forms/contact")
	formContact.Use(middleware.JWT([]byte(tokenSecretString)))
	formContact.GET("/:id", handler.GetFormContact)
	formContact.GET("", handler.GetAllFormContact)
	formContact.PUT("/:id", handler.UpdateFormContact)
	formContact.DELETE("/:id", handler.DeleteFormContact)

	e.POST("/forms/contact", handler.CreateFormContact)

	e.POST("/checkToken", func(c echo.Context) error {
		return c.JSON(http.StatusOK, true)
	}, middleware.JWT([]byte(tokenSecretString)))
	// //Connect to localhost with port:4444
	e.Logger.Fatal(e.Start(":4444"))
}
