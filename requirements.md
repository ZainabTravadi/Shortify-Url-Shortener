## URL Shortener — Problem Framing & Requirements

---

## 1. Problem Framing

The goal of this system is to design a **simple, reliable URL shortening service** that allows users to convert long URLs into short, shareable links and redirect users efficiently.

This project focuses on:

* **Clean Low-Level Design (LLD)**
* Clear separation of frontend and backend responsibilities
* Explicit system boundaries and contracts
* Extensibility for future features (auth, rate limiting, analytics)

The system is intentionally scoped to avoid premature complexity while still reflecting real-world design decisions.

---

## 2. Functional Requirements

### Core Functionality

1. The system should allow a user to submit a valid `http://` or `https://` URL.
2. The system should generate a unique short URL for the submitted long URL.
3. The system should redirect users from the short URL to the original long URL.
4. The system should return the canonical short URL to be displayed in the frontend.
5. The system should support copying the short URL to the clipboard.
6. The system should allow opening the short URL in a new browser tab.

### Optional / Planned (Not fully implemented yet)

7. The system may support generating a QR code for the short URL.
8. The system may track the number of redirects (click count).

---

## 3. Non-Functional Requirements

### Performance

* Redirects should be fast and optimized for read-heavy traffic.
* URL shortening should complete within sub-second latency under normal conditions.

### Reliability

* Short URLs should consistently redirect to the correct destination.
* The system should handle invalid or non-existent short URLs gracefully.

### Scalability

* The system should be designed with high read-to-write ratio in mind.
* The redirect path should be easily cacheable in the future.

### Security

* The system should validate input URLs beyond basic client-side checks.
* The system should prevent malformed or unsupported URL schemes.

### Maintainability

* The system should follow SOLID principles.
* Business logic should be separated from routing and controllers.
* Hash generation logic should be easily extensible.

---

## 4. Frontend–Backend Responsibility Split

### Frontend Responsibilities

* Capture and validate URL format (`http` / `https`)
* Display loading, success, and error states
* Render the returned canonical short URL
* Handle user interactions (copy, open in new tab)

### Backend Responsibilities

* Generate and persist unique short identifiers
* Ensure uniqueness and collision handling
* Return canonical short URL
* Perform authoritative validation and error handling
* Handle redirect resolution

---

## 5. Scope (In-Scope for v1)

* Anonymous URL shortening (no authentication)
* Single canonical short domain
* No custom aliases
* No expiration or deletion
* No analytics dashboard

This scope is intentionally limited to focus on **LLD clarity and correctness**.

---

## 6. Non-Goals (Out of Scope)

The following are explicitly **out of scope** for this version:

* User authentication or authorization
* Rate limiting and abuse detection
* Custom short domains
* Link expiration or lifecycle management
* Advanced analytics (geo, referrer, device)
* Admin or management dashboard

These features are excluded to avoid overengineering and keep the design focused.

---

## 7. Success Criteria

The system is considered successful if:

* A valid long URL can be shortened and redirected correctly
* Responsibilities between frontend and backend are clearly defined
* The design is explainable using UML diagrams
* The system can be easily extended without major refactoring