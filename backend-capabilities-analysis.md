## **Derived Backend Needs**

---

## 1. Establish the Analysis Framework

Frontend analysis is not documentation—it is a analytical lens.

From this perspective, we ask:

> "If the frontend requires capability X, what must the backend guarantee to ensure X functions reliably?"

---

## 2. Column 1: Backend Needs (Derived)

Based on frontend capabilities, the backend must provide:

* Accept URL input
* Return shortened URL
* Guarantee uniqueness
* Persist mappings
* Handle duplicate requests
* Fail gracefully
* Respond with low latency

Note: This identifies functional needs only, without prescribing implementation details.

---

## 3. Column 2: Implicit Assumptions to Explicit Contracts

Frontend systems operate on implicit assumptions. System design requires making these assumptions explicit.

| Frontend Assumption | Backend Contract |
|---|---|
| Shortening request produces a result | Backend responds with success or structured error |
| Duplicate URLs are safe | Backend handles duplicate requests |
| Results remain consistent | Mappings are stable and persistent |
| Short URLs work indefinitely | Data is persisted durably |
| Errors are actionable | Errors follow a consistent format |

---

## 4. Column 3: Backend Requirements

Convert contracts into logical requirements:

* Expose HTTP API endpoints
* Validate URLs server-side
* Generate unique short codes
* Store short-to-long URL mappings
* Support idempotent operations
* Return consistent response formats
* Handle errors predictably

---

## 5. Column 4: Backend Requirements (Final)

### API
- Accept URL shortening requests
- Return shortened URL

### Validation
- Validate URL format
- Reject invalid or unsafe URLs

### Uniqueness
- Generate unique short codes
- Prevent collisions

### Persistence
- Store short-to-long URL mappings
- Ensure data durability

### Idempotency
- Return consistent results for identical requests
- Prevent duplicate entries

### Error Handling
- Return structured error responses
- Use appropriate HTTP status codes

### Performance
- Minimize latency for creation and retrieval

---

## 6. Idempotency Requirement

Frontend scenarios that trigger duplicate requests:

* User double-clicks the submit button
* Network timeouts trigger automatic retries
* Browser resends requests

Backend requirement:

**Identical requests must produce identical results without creating duplicate entries.**

