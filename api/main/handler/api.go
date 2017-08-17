package handler

import (
	"github.com/bluele/slack"
	"github.com/joho/godotenv"
	"github.com/labstack/echo"
	"github.com/tungnt244/scoville_website/api/main/db"
	"github.com/tungnt244/scoville_website/api/main/helper"
	"github.com/tungnt244/scoville_website/api/main/model"
	"golang.org/x/crypto/bcrypt"
	"gopkg.in/gomail.v2"
	"log"
	"net/http"
	"os"
	"time"
)

const (
	token       = "xoxp-134104585698-215180420103-220014213207-962f0f16d5e49cb173fc8b25a338e363"
	channelName = "api_call_slack"
)

/*
	Function to controllr User api
	_Get all users
	_Get user with id
	_Check valid and invalid user
	_Create new user with enrypted password
	_Update user information
	_Delete user with the given id
*/
func GetAllUsers(c echo.Context) error {
	var users []model.User
	var err error
	users, err = db.Manager.GetAllUsers()
	if err != nil {
		return c.JSON(http.StatusNotFound, err.Error())
	}
	return c.JSON(http.StatusOK, users)
}

func GetUser(c echo.Context) error {
	userId := c.Param("id")
	user, err := db.Manager.GetUserById(userId)
	if err != nil {
		return c.JSON(http.StatusNotFound, err.Error())
	}
	return c.JSON(http.StatusOK, user)

}

func CreateUser(c echo.Context) error {
	u := new(model.User)
	if err := c.Bind(u); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}
	if err := c.Validate(u); err != nil {
		return c.JSON(http.StatusBadRequest, "Missing data")

	}
	//Encrypted password before saving in database
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	if helper.ValidateEmail(u.Email) == false {
		return c.JSON(http.StatusBadRequest, "Not a valid Email")
	}

	// existedEmail = db.Manager.CheckExistedEmail(u.Email)

	// if existedEmail.Email == u.Email {
	// 	return c.JSON(http.StatusOK, "Email already existed")
	// }
	err = db.Manager.SaveUser(u.Email, string(hashedPassword))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, "Successful Created")

}

func UpdateUser(c echo.Context) error {
	userId := c.Param("id")
	u := new(model.User)
	if err := c.Bind(u); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, "Password cannot be encrypted")
	}

	_, err = db.Manager.UpdateUserInfo(userId, string(hashedPassword))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, "Successful Updated")

}

func Login(c echo.Context) error {
	u := new(model.User)

	if err := c.Bind(u); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}
	if err := c.Validate(u); err != nil {
		return c.JSON(http.StatusBadRequest, "Missing data")

	}
	userCheckPassword, err := db.Manager.GetUserByEmail(u.Email)
	if err != nil {
		return c.String(http.StatusNotFound, "The user didn't exist")
	}

	err = bcrypt.CompareHashAndPassword([]byte(userCheckPassword.Password), []byte(u.Password))
	if err != nil {
		return c.String(http.StatusNotFound, "The Password is not correct")
	}

	user, err := db.Manager.GetUserByEmailAndPass(u.Email, userCheckPassword.Password)
	if err != nil {
		return c.String(http.StatusBadRequest, "Email or Password is not correct")
	}
	return c.JSON(http.StatusOK, user.Email)
}

func DeleteUser(c echo.Context) error {
	userId := c.Param("id")

	user, err := db.Manager.GetUserById(userId)
	if err != nil {
		return c.JSON(http.StatusNotFound, err.Error())
	}

	err = db.Manager.DeleteUser(user)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, "Successful deleted")

}

/*
	Function to controllr News api
	_Get a news with the given id
	_Get all news in database
	_Create a news
	_Update information of news
	_Delete news with the given id
*/
func CreateNews(c echo.Context) error {
	news := new(model.News)
	if err := c.Bind(news); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}
	err := db.Manager.SaveNews(news)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, "Successful Created")

}

func GetNews(c echo.Context) error {
	newsId := c.Param("id")
	news, err := db.Manager.GetNewsById(newsId)
	if err != nil {
		return c.JSON(http.StatusNotFound, "Not existed")

	}
	return c.JSON(http.StatusOK, news)

}

func GetAllNews(c echo.Context) error {
	checkUrl := c.Path()
	var news []model.News
	var err error
	if checkUrl == "/news" {
		news, err = db.Manager.GetAllNews()
	} else {
		news, err = db.Manager.GetAllBriefInfo()
	}
	if err != nil {
		return c.JSON(http.StatusNotFound, "Not existed")
	}
	return c.JSON(http.StatusOK, news)

}

func UpdateNews(c echo.Context) error {
	newsId := c.Param("id")
	news := new(model.News)
	if err := c.Bind(news); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	_, err := db.Manager.UpdateNewsInfo(newsId, news)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, "Successful updated")
}

func DeleteNews(c echo.Context) error {
	newsId := c.Param("id")

	news, err := db.Manager.GetNewsById(newsId)
	if err != nil {
		return c.JSON(http.StatusNotFound, err.Error())

	}

	err = db.Manager.DeleteNews(news)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, "Successful deleted")

}

/*
	Function to controllr formRecruitment api
	_Get all formRecruitment
	_Get all general formRecruitment
	_Get all engineer formRecruitment
	_Create a formRecruitment
	_Update status of formRecruitment
	_Delete formRecruitment with the given id
*/

func GetFormRecruitment(c echo.Context) error {
	formRecruitmentId := c.Param("id")
	formRecruitment, err := db.Manager.GetFormRecruitmentById(formRecruitmentId)
	if err != nil {
		return c.JSON(http.StatusNotFound, "Not existed")

	}
	return c.JSON(http.StatusOK, formRecruitment)

}
func GetAllFormRecruitment(c echo.Context) error {
	var formRecruitments []model.Form_recruitment
	var err error
	formRecruitments, err = db.Manager.GetAllFormsRecruitment()
	if err != nil {
		return c.JSON(http.StatusNotFound, err.Error())
	}
	return c.JSON(http.StatusOK, formRecruitments)
}

func GetGeneralForm(c echo.Context) error {
	var formRecruitments []model.Form_recruitment
	var err error
	formRecruitments, err = db.Manager.GetGeneralForm()
	if err != nil {
		return c.JSON(http.StatusNotFound, err.Error())
	}
	return c.JSON(http.StatusOK, formRecruitments)
}

func GetEngineerForm(c echo.Context) error {
	var formRecruitments []model.Form_recruitment
	var err error
	formRecruitments, err = db.Manager.GetEngineerForm()
	if err != nil {
		return c.JSON(http.StatusNotFound, err.Error())
	}
	return c.JSON(http.StatusOK, formRecruitments)
}

func UpdateFormRecruitment(c echo.Context) error {
	formRecruitmentId := c.Param("id")
	formRecruitment := new(model.Form_recruitment)
	if err := c.Bind(formRecruitment); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	_, err := db.Manager.UpdateFormRecruitmentStatus(formRecruitmentId, formRecruitment.Status)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, "Successful updated")
}

func CreateFormRecruitment(c echo.Context) error {
	//Load values in environment files
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	email := os.Getenv("EMAIL")
	pass := os.Getenv("PASS")

	formRecruitment := new(model.Form_recruitment)
	if err := c.Bind(formRecruitment); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}
	if formRecruitment.LinkGithub != "" {
		formRecruitment.Position = "Engineer"
	}
	err = db.Manager.SaveFormRecruitment(formRecruitment)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	// Connect to Slack
	api := slack.New(token)

	err = api.ChatPostMessage(channelName, "*YOU RECEIVED THE NEW FORM RECRUITMENT!*", &slack.ChatPostMessageOpt{
		Username:  "Helper Bot",
		IconEmoji: ":new:",
		Attachments: []*slack.Attachment{
			{
				Color:      "#36a64f",
				Title:      "FORM CONTENT (see full)",
				TitleLink:  "https://sc0ville.com/",
				Text:       "*Email:* " + formRecruitment.Email + "\n*SelfPR:* " + formRecruitment.SelfPR + "...",
				Footer:     "Time Now:",
				FooterIcon: ":new:",
				TimeStamp:  time.Now().Unix(),
			},
		},
	})
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	// Send the Email
	m := gomail.NewMessage()
	m.SetHeader("From", "thien@sc0ville.com")
	m.SetHeader("To", "thien@sc0ville.com")
	m.SetHeader("Subject", "RECRUITMENT FORM")
	m.SetBody("text/html", "Hello! <br><br><b>APPLICATION FORM CONTENT</b><br><br><b>Email: </b>"+formRecruitment.Email+"<br><br><b>SelfPR: </b>"+formRecruitment.SelfPR+"<br><br><b>LinkGithub: </b>"+formRecruitment.LinkGithub+"<br><br>Please go and check it on Website https://sc0ville.com/")
	d := gomail.NewPlainDialer("smtp.gmail.com", 465, email, pass)

	// Send the email to Bob, Cora and Dan.
	if err := d.DialAndSend(m); err != nil {
		panic(err)
	}

	return c.JSON(http.StatusOK, "Successful Created")
}

func DeleteFormRecruitment(c echo.Context) error {
	formRecruitmentId := c.Param("id")

	formRecruitment, err := db.Manager.GetFormRecruitmentById(formRecruitmentId)
	if err != nil {
		return c.JSON(http.StatusNotFound, err.Error())

	}

	err = db.Manager.DeleteFormRecruitment(formRecruitment)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, "Successful deleted")

}

/*
	Function to controllr formContact api
	_Get all formContact
	_Get all general formContact
	_Get all engineer formContact
	_Create a formContact
	_Update status of formContact
	_Delete formContact with the given id
*/
func GetFormContact(c echo.Context) error {
	formContactId := c.Param("id")
	formContact, err := db.Manager.GetFormContactById(formContactId)
	if err != nil {
		return c.JSON(http.StatusNotFound, "Not existed")

	}
	return c.JSON(http.StatusOK, formContact)

}
func GetAllFormContact(c echo.Context) error {
	var formContacts []model.Form_contact
	var err error
	formContacts, err = db.Manager.GetAllFormsContact()
	if err != nil {
		return c.JSON(http.StatusNotFound, err.Error())
	}
	return c.JSON(http.StatusOK, formContacts)
}
func CreateFormContact(c echo.Context) error {
	//Load values in environment files
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	email := os.Getenv("EMAIL")
	pass := os.Getenv("PASS")

	formContact := new(model.Form_contact)
	if err := c.Bind(formContact); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	err = db.Manager.SaveFormContact(formContact)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	// Connect to Slack
	api := slack.New(token)

	err = api.ChatPostMessage(channelName, "*YOU RECEIVED THE NEW FORM CONTACT!*", &slack.ChatPostMessageOpt{
		Username:  "Helper Bot",
		IconEmoji: ":star2:",
		Attachments: []*slack.Attachment{
			{
				Color:     "#36a64f",
				Title:     "FORM CONTENT (see full)",
				TitleLink: "https://sc0ville.com/",
				Text: "*Company:* " + formContact.CompanyName + "\n*Staff:* " +
					formContact.StaffName + "\n*Email:* " + formContact.EmailAddress + "\n*Phone:* " +
					formContact.PhoneNumber + "\n*Description:* " + formContact.DescriptionOfContact + "...",
				Footer:     "Time Now:",
				FooterIcon: ":new:",
				TimeStamp:  time.Now().Unix(),
			},
		},
	})
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	// Send the Email
	m := gomail.NewMessage()
	m.SetHeader("From", "thien@sc0ville.com")
	m.SetHeader("To", "thien@sc0ville.com")
	m.SetHeader("Subject", "RECRUITMENT FORM")
	m.SetBody("text/html", "Hello! <br><br><b>CONTACT FORM CONTENT</b><br><br><b>Company: </b>"+formContact.CompanyName+"<br><br><b>Staff: </b>"+formContact.StaffName+
		"<br><br><b>Email: </b>"+formContact.EmailAddress+"<br><br><b>Phone: </b>"+formContact.PhoneNumber+"<br><br><b>Description: </b>"+formContact.DescriptionOfContact+
		"<br><br>Please go and check it on Website https://sc0ville.com/")
	d := gomail.NewPlainDialer("smtp.gmail.com", 465, email, pass)

	// Send the email to Bob, Cora and Dan.
	if err := d.DialAndSend(m); err != nil {
		panic(err)
	}

	return c.JSON(http.StatusOK, "Successful Created")
}
func UpdateFormContact(c echo.Context) error {
	formContactId := c.Param("id")
	formContact := new(model.Form_contact)
	if err := c.Bind(formContact); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	_, err := db.Manager.UpdateFormContactStatus(formContactId, formContact.Status)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, "Successful updated")
}

func DeleteFormContact(c echo.Context) error {
	formContactId := c.Param("id")

	formContact, err := db.Manager.GetFormContactById(formContactId)
	if err != nil {
		return c.JSON(http.StatusNotFound, err.Error())

	}

	err = db.Manager.DeleteFormContact(formContact)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, "Successful deleted")

}
