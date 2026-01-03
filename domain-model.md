# Domain Modeling — URL Shortener

## Object-Oriented Entities and Relationships

> Domain modeling defines the core concepts and their interactions within a system.
> It focuses on business logic, not implementation details.

---

## Core Principle

> **A well-designed system can be explained without code. If you cannot, the design needs clarification.**

---

## Core Domain Objects

For a URL shortener, the essential entities are:

* **Url** — the original long-form address
* **ShortUrl** — the shortened mapping
* **Click** — redirect event tracking
* **User** — link creator and owner

---

## Entity 1: Url

**Purpose:** Stores the original long URL provided by the user.

**Attributes:**
* `id` — unique identifier
* `longUrl` — the original URL string
* `createdAt` — timestamp of creation

**Rationale:** Enables normalization when multiple short URLs map to the same long URL.

---

## Entity 2: ShortUrl

**Purpose:** The core mapping between a short code and its target URL.

**Attributes:**
* `id` — unique identifier
* `code` — the shortened code
* `createdAt` — timestamp of creation
* `isActive` — activation status

**Relationship:** ShortUrl → Url (many-to-one)

One Url can have multiple ShortUrls; each ShortUrl maps to exactly one Url.

---

## Entity 3: Click

**Purpose:** Records each redirect event for analytics.

**Attributes:**
* `id` — unique identifier
* `timestamp` — when the redirect occurred
* `ipAddress` — client IP address
* `userAgent` — client browser/device information

**Relationship:** Click → ShortUrl (many-to-one)

One ShortUrl can have multiple Clicks; each Click belongs to one ShortUrl.

---

## Entity 4: User

**Purpose:** Represents the creator and owner of shortened URLs.

**Attributes:**
* `id` — unique identifier
* `email` — contact address
* `createdAt` — account creation timestamp

**Relationship:** User → ShortUrl (one-to-many)

A User can create many ShortUrls; each ShortUrl optionally belongs to one User.

---

## Entity Relationship Overview

```
User
 └── creates ──→ ShortUrl
                   ├── code
                   ├── createdAt
                   └── isActive
                       │
                       └── maps to ──→ Url
                                        └── longUrl

ShortUrl
 └── has many ──→ Click
                   ├── timestamp
                   ├── ipAddress
                   └── userAgent
```

---

## Implementation Notes

This domain model intentionally excludes:
* Database schema design
* Storage implementation details
* Technology-specific constraints

Domain modeling and data persistence are separate concerns.

---

## API Mapping

* `POST /shorten` — creates Url and ShortUrl entities
* `GET /{code}` — resolves ShortUrl to Url
* Redirect request — records Click entity
