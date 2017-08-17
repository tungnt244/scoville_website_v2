package db

import (
	"github.com/tungnt244/scoville_website/api/main/model"
)

/*
This function will connect to database and
*/
// func CreateUser(c echo.Context) error {
// 	user := model.User{Name: "thien", Email: "test@gmail.com", Password: "1234"}
// 	if Manager.db.NewRecord(user) == true {
// 		Manager.db.Create(&user)
// 		result := "Successful"
// 		return c.String(http.StatusOK, result)

// 	}
// 	return c.String(http.StatusOK, "aaa")

// }

func (m *DBManager) GetAllUsers() (users []model.User, err error) {
	err = m.database.Find(&users).Error
	return

}

func (m *DBManager) GetUserById(id string) (user model.User, err error) {
	err = m.database.Find(&user, id).Error
	return

}

func (m *DBManager) GetUserByEmailAndPass(e string, p string) (user model.User, err error) {
	err = m.database.Where(&model.User{Email: e, Password: p}).Find(&user).Error
	return
}

func (m *DBManager) GetUserByEmail(e string) (user model.User, err error) {
	err = m.database.Where(&model.User{Email: e}).Find(&user).Error
	return
}

// func (m *DBManager) CheckExistedEmail(e string) *gorm.DB {
// 	return m.database.Where(&model.User{Email: e})
// }

func (m *DBManager) SaveUser(e string, p string) (err error) {
	err = m.database.Create(&model.User{Email: e, Password: p}).Error
	return

}

func (m *DBManager) UpdateUserInfo(id string, p string) (user model.User, err error) {
	err = m.database.Find(&user, id).Update(&model.User{Password: p}).Error
	return
}

func (m *DBManager) DeleteUser(user model.User) (err error) {
	err = m.database.Delete(&user).Error
	return
}

// func (m *DBManager) GetAllProducts() (product model.Product, err error) {
// 	err = m.database.First(&product).Error
// 	return
// }

// func (m *DBManager) Create(product model.Product) (string, err error) {
// 	err = m.database.Create(&product).Error
// 	return
// }

// func UpdateUser(c echo.Context) error {
// 	db := GetConnection()
// 	defer db.Close()
// 	var user []model.User
// 	id := c.Param("id")
// 	name := FormValue("userName")
// 	email := FormValue("userEmail")
// 	password := FormValue("userPassword")
// 	db.Find(&user, id) // db.Save(&product)
// 	db.Model(&user).Update(map[string]interface{}{"name": name, "email": email, "password": password})
// 	return c.JSON(http.StatusOK, id)

// }
