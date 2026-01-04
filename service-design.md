# Service Design — URL Shortener

---

## Objective

The objective of Day 6 is to introduce a **service layer** that cleanly separates business logic from HTTP handling. This ensures that the system remains modular, testable, and extensible as features such as persistence, analytics, and scalability are added later.

This step transitions the system from a controller-centric design to a **layered architecture** aligned with industry best practices.

---

## Architectural Principle

**Controllers should not contain business logic.**

Instead, responsibilities are divided as follows:

```
Controller → Service → Domain → Storage (future)
```

* **Controllers** handle HTTP concerns only
* **Services** encapsulate business rules and workflows
* **Domain models** represent core entities
* **Storage layer** (not implemented yet) persists data

---

## Rationale for Introducing Services

Without a service layer:

* Controllers become tightly coupled to business logic
* Feature additions require repeated refactoring
* Testing becomes difficult
* Domain concepts become scattered

Introducing services at this stage prevents architectural erosion as the system grows.

---

## Service Overview

Two services are defined based on responsibility boundaries derived from earlier domain modeling and API contract design:

1. **UrlService**
2. **RedirectService**

Each service has a single, well-defined purpose.

---

## UrlService

### Purpose

`UrlService` is responsible for **creation and management of shortened URLs**.

### Responsibilities

* Accept long URL input
* Perform business-level URL validation
* Generate a short code
* Create `Url` and `ShortUrl` domain entities
* Enforce idempotency rules (future)
* Return a `ShortUrl` representation to the caller

### Explicit Non-Responsibilities

`UrlService` does **not**:

* Handle HTTP requests or responses
* Perform redirects
* Log click events
* Access request headers or session data
* Perform persistence directly

---

## RedirectService

### Purpose

`RedirectService` is responsible for **resolving short codes to long URLs**.

### Responsibilities

* Accept a short code
* Locate the corresponding `ShortUrl`
* Validate existence and active status
* Return the resolved long URL
* Trigger click tracking (future enhancement)

### Explicit Non-Responsibilities

`RedirectService` does **not**:

* Generate short URLs
* Create new domain entities
* Handle HTTP response logic
* Manage storage concerns directly

---

## Code Structure Changes

To reflect the service layer, the following structure is introduced:

```
src/
├── services/
│   ├── url.service.js
│   └── redirect.service.js
```

These files currently act as **scaffolding** and define ownership boundaries. Business logic will be implemented incrementally in later stages.

---

## Service Stubs (Initial)

### UrlService

```js
class UrlService {
  createShortUrl(longUrl) {
    // Business logic will be implemented in later stages
  }
}

module.exports = new UrlService();
```

### RedirectService

```js
class RedirectService {
  resolve(code) {
    // Redirect resolution logic will be implemented later
  }
}

module.exports = new RedirectService();
```

---

## Impact on Controllers

Controllers remain unchanged at this stage but will eventually delegate all business logic to services.

Conceptually:

```js
const shortUrl = urlService.createShortUrl(longUrl);
res.status(201).json(shortUrl);
```

This ensures controllers remain thin and stable even as system complexity increases.

---

## Design Guarantees Achieved

By introducing services at this stage, the system guarantees:

* Clear separation of concerns
* Stable API contracts
* Minimal refactoring when adding new features
* Improved testability
* Domain-driven evolution of the codebase

---

## Deferred Decisions

The following concerns are intentionally deferred to later stages:

* Persistence layer (database, ORM)
* Caching
* Analytics
* Rate limiting
* Authentication and authorization

This keeps the focus on correctness and clarity before optimization.

---