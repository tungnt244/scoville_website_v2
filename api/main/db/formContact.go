package db

import (
	"github.com/tungnt244/scoville_website/api/main/model"
)

func (m *DBManager) GetFormContactById(id string) (form model.Form_contact, err error) {
	err = m.database.Find(&form, id).Error
	return
}

func (m *DBManager) GetAllFormsContact() (form []model.Form_contact, err error) {
	err = m.database.Find(&form).Error
	return
}

func (m *DBManager) UpdateFormContactStatus(id string, status string) (form model.Form_contact, err error) {
	err = m.database.Find(&form, id).Update(&model.Form_contact{Status: status}).Error
	return
}

func (m *DBManager) SaveFormContact(form *model.Form_contact) (err error) {
	err = m.database.Create(&model.Form_contact{CompanyName: form.CompanyName, StaffName: form.StaffName, EmailAddress: form.EmailAddress,
		PhoneNumber: form.PhoneNumber, DescriptionOfContact: form.DescriptionOfContact, Status: form.Status}).Error
	return
}

func (m *DBManager) DeleteFormContact(form model.Form_contact) (err error) {
	err = m.database.Delete(&form).Error
	return

}
