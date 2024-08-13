package val

import (
	"fmt"
	"net/mail"
	"regexp"
)

var (
	isValidUsername = regexp.MustCompile(`^[a-zA-Z\s]+$`).MatchString
)

func ValidateString(value string, min int, max int) error {
	n := len(value)
	if n < min || n > max {
		return fmt.Errorf("string should have length between %d and %d", min, max)
	}
	return nil
}

func ValidateUserName(value string) error {
	if err := ValidateString(value, 3, 50); err != nil {
		return err
	}

	if ok := isValidUsername(value); !ok {
		return fmt.Errorf("user name should contain only letters, capital letters and spaces")
	}

	return nil
}

func ValidatePassword(value string) error {
	return ValidateString(value, 6, 100)
}

func ValidateEmail(value string) error {
	if err := ValidateString(value, 3, 200); err != nil {
		return err
	}

	if _, err := mail.ParseAddress(value); err != nil {
		return err
	}

	return nil
}