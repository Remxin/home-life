package token

import (
	"fmt"
	"time"

	"github.com/aead/chacha20poly1305"
	"github.com/o1egl/paseto"
)

type PasetoMaker struct {
	paseto      *paseto.V2
	symetricKey []byte
}

func NewPasetoMaker(symmetricKey string) (Maker, error) {
	if len(symmetricKey) != chacha20poly1305.KeySize {
		return nil, fmt.Errorf("invalid symmetric key size: must be exactly 32 characters")
	}

	maker := &PasetoMaker{
		paseto:      paseto.NewV2(),
		symetricKey: []byte(symmetricKey),
	}

	return maker, nil
}

func (maker *PasetoMaker) CreateToken(user_id string, duration time.Duration) (string, *Payload, error) {
	payload, err := NewPayload(user_id, duration)
	if err != nil {
		return "", nil, err
	}

	token, err := paseto.NewV2().Encrypt(maker.symetricKey, payload, nil)
	if err != nil {
		return "", nil, err
	}

	return token, payload, nil
}

func (maker *PasetoMaker) VerifyToken(token string) (*Payload, error) {
	payload := &Payload{}
	err := paseto.NewV2().Decrypt(token, maker.symetricKey, payload, nil)
	if err != nil {
		return nil, err
	}

	err = payload.Valid()
	if err != nil {
		return nil, err
	}

	return payload, nil
}

func (maker *PasetoMaker) CreatePermissionToken(user_id string, permission_id string, duration time.Duration) (string, *PermissionPayload, error) {
	payload, err := NewPermissionPayload(user_id, permission_id, duration)
	if err != nil {
		return "", nil, err
	}
	token, err := paseto.NewV2().Encrypt(maker.symetricKey, payload, nil)
	if err != nil {
		return "", nil, err
	}

	return token, payload, nil
}

func (maker *PasetoMaker) VerifyPermissionToken(token string) (*PermissionPayload, error) {
	payload := &PermissionPayload{}
	err := paseto.NewV2().Decrypt(token, maker.symetricKey, payload, nil)
	if err != nil {
		return nil, err
	}
	err = payload.Valid()
	if err != nil {
		return nil, err
	}
	return payload, nil
}
