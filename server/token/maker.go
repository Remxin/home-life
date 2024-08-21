package token

import "time"

type Maker interface {
	CreateToken(user_id string, duration time.Duration) (string, *Payload, error)
	VerifyToken(token string) (*Payload, error)
	CreatePermissionToken(user_id string, permission_id string, duration time.Duration) (string, *PermissionPayload, error)
	VerifyPermissionToken(token string) (*PermissionPayload, error)
}
