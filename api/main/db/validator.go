package db

import (
	"gopkg.in/go-playground/validator.v9"
)

type CustomValidator struct {
	ValidatorCustom *validator.Validate
}

// var Validator *CustomValidator

func (cv *CustomValidator) Validate(i interface{}) error {
	return cv.ValidatorCustom.Struct(i)
}
