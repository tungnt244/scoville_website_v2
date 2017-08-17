package db

import (
	"github.com/tungnt244/scoville_website/api/main/model"
)

func (m *DBManager) GetFormRecruitmentById(id string) (form model.Form_recruitment, err error) {
	err = m.database.Find(&form, id).Error
	return
}
func (m *DBManager) GetAllFormsRecruitment() (form []model.Form_recruitment, err error) {
	err = m.database.Find(&form).Error
	return
}

func (m *DBManager) GetGeneralForm() (form []model.Form_recruitment, err error) {
	err = m.database.Where(&model.Form_recruitment{Position: "General Staff"}).Find(&form).Error
	return
}

func (m *DBManager) GetEngineerForm() (form []model.Form_recruitment, err error) {
	err = m.database.Where(&model.Form_recruitment{Position: "Engineer"}).Find(&form).Error
	return
}

func (m *DBManager) UpdateFormRecruitmentStatus(id string, status string) (form model.Form_recruitment, err error) {
	err = m.database.Find(&form, id).Update(&model.Form_recruitment{Status: status}).Error
	return
}

func (m *DBManager) SaveFormRecruitment(form *model.Form_recruitment) (err error) {
	err = m.database.Create(&model.Form_recruitment{Email: form.Email, SelfPR: form.SelfPR, LinkGithub: form.LinkGithub,
		Position: form.Position, Status: form.Status}).Error
	return
}

func (m *DBManager) DeleteFormRecruitment(form model.Form_recruitment) (err error) {
	err = m.database.Delete(&form).Error
	return

}
