from pydantic import BaseModel, EmailStr, Field, field_validator


class ContactCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    phone: str | None = Field(default=None, max_length=40)
    company: str | None = Field(default=None, max_length=120)
    service: str | None = Field(default=None, max_length=80)
    message: str = Field(min_length=10, max_length=3000)
    # Honeypot field: real users never fill this. Bots often do.
    website: str | None = Field(default=None)

    @field_validator("name", "message")
    @classmethod
    def not_blank(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("Field cannot be blank")
        return v.strip()


class ContactResponse(BaseModel):
    success: bool
    message: str
