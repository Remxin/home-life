package utils

import (
	"math/rand"
	"strings"
)

const ALPHABET = "abcdefghijklmnopqrstuwyz"

func RandomString(n int) string {
	var sb strings.Builder
	k := len(ALPHABET)

	for i := 0; i < n; i++ {
		c := ALPHABET[rand.Intn(k)]
		sb.WriteByte(c)
	}

	return sb.String()
}