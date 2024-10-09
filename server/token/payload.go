package token

import (
	"errors"
	"time"

	"github.com/google/uuid"
)

var (
	ErrExpiredToken = errors.New("token has expired")
	ErrInvalidToken = errors.New("token is invalid")
)

type Payload struct {
	ID        uuid.UUID `json:"id"`
	UserId    string    `json:"user_id"`
	IssuedAt  time.Time `json:"issued_at"`
	ExpiredAt time.Time `json:"expired_at"`
}

type PermissionPayload struct {
	UserId       string    `json:"user_id"`
	PermissionId string    `json:"permission_id"`
	IssuedAt     time.Time `json:"issued_at"`
	ExpiredAt    time.Time `json:"expired_at"`
}

type FamilyInvitationPayload struct {
	UserId    string    `json:"user_id"`
	FamilyId  string    `json:"family_id"`
	CanRead   bool      `json:"can_read"`
	CanCreate bool      `json:"can_create"`
	CanEdit   bool      `json:"can_edit"`
	CanModify bool      `json:"can_modify"`
	IssuedAt  time.Time `json:"issued_at"`
	ExpiredAt time.Time `json:"expired_at"`
}

func NewPayload(user_id string, duration time.Duration) (*Payload, error) {
	tokenID, err := uuid.NewRandom()
	if err != nil {
		return nil, err
	}

	payload := &Payload{
		ID:        tokenID,
		UserId:    user_id,
		IssuedAt:  time.Now(),
		ExpiredAt: time.Now().Add(duration),
	}

	return payload, nil
}

func (payload *Payload) Valid() error {
	if time.Now().After(payload.ExpiredAt) {
		return ErrExpiredToken
	}

	return nil
}

func NewPermissionPayload(user_id string, permission_id string, duration time.Duration) (*PermissionPayload, error) {
	payload := &PermissionPayload{
		UserId:       user_id,
		PermissionId: permission_id,
		IssuedAt:     time.Now(),
		ExpiredAt:    time.Now().Add(duration),
	}

	return payload, nil
}

func (payload *PermissionPayload) Valid() error {
	if time.Now().After(payload.ExpiredAt) {
		return ErrExpiredToken
	}
	return nil
}

func NewFamilyInvitationPayload(user_id string, family_id string, can_read bool, can_create bool, can_edit bool, can_modify bool, duration time.Duration) *FamilyInvitationPayload {
	return &FamilyInvitationPayload{
		UserId:    user_id,
		FamilyId:  family_id,
		CanRead:   can_read,
		CanCreate: can_create,
		CanEdit:   can_edit,
		CanModify: can_modify,
		IssuedAt:  time.Now(),
		ExpiredAt: time.Now().Add(duration),
	}
}

func (payload *FamilyInvitationPayload) Valid() error {
	if time.Now().After(payload.ExpiredAt) {
		return ErrExpiredToken
	}
	return nil
}
