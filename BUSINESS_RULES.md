# Business Rules

This document describes the business behavior supported by the client management application.

## Client Identity

- A client must have a name.
- A client must have a tax identifier (`taxId`).
- A client's tax identifier must be unique across the client base.
- A client's age is optional.
- When provided, a client's age must be a whole number of at least 18.

## Contact Information

- Email and phone are optional contact details.
- When provided, email must use a valid email format.

## Search

- Client search by name is case-insensitive and matches partial names.
- Client listings are presented in ascending identifier order.

## Lifecycle

- A client can be created, updated, consulted, searched, and removed.
- Updates are partial: only supplied fields are changed.
- Operations that target a client that does not exist must be rejected.

## Data Integrity

- Duplicate tax identifiers must be rejected.
- Client creation and updates must respect the validation rules for the supplied fields.
- Creation and update timestamps are managed by the persistence layer.
