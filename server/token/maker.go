package token

import "time"

type Maker interface {
	CreateToken(user_id string, duration time.Duration) (string, *Payload, error)
	VerifyToken(token string) (*Payload, error)
	CreatePermissionToken(user_id string, permission_id string, duration time.Duration) (string, *PermissionPayload, error)
	VerifyPermissionToken(token string) (*PermissionPayload, error)
	CreateFamilyInvitationToken(user_id string, family_id string, can_read bool, can_create bool, can_edit bool, can_modify bool, duration time.Duration) (string, *FamilyInvitationPayload, error)
	VerifyFamilyInvitationToken(token string) (*FamilyInvitationPayload, error)
}
