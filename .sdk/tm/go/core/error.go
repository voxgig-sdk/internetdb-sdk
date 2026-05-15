package core

type InternetdbError struct {
	IsInternetdbError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewInternetdbError(code string, msg string, ctx *Context) *InternetdbError {
	return &InternetdbError{
		IsInternetdbError: true,
		Sdk:              "Internetdb",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *InternetdbError) Error() string {
	return e.Msg
}
