## **Derived Backend Needs**

Your table headers are PERFECT. We’ll fill them **properly**, not vaguely.

---

## 1️⃣ Start with a mindset shift (important)

Frontend analysis is **not documentation**.
Frontend analysis is a **lens**.

From that lens, we ask:

> “If the frontend promises X, what must the backend guarantee so X never breaks?”

That’s it.

---

## 2️⃣ Column 1: **Derived Backend Needs**

From your FE capabilities, backend MUST provide:

### 🔑 Backend Needs (derived, not imagined)

* Ability to **accept a URL**
* Ability to **return a short URL**
* Ability to **guarantee uniqueness**
* Ability to **persist mapping**
* Ability to **handle duplicate requests**
* Ability to **fail gracefully**
* Ability to **respond fast**

👉 Notice:
No DB names. No Redis. No scaling buzzwords.

Just **needs**.

---

## 3️⃣ Column 2: **Implicit assumptions → Explicit contracts**

Frontend ALWAYS assumes things silently.
System design = **making assumptions explicit**.

### Example:

| Implicit FE Assumption                  | Explicit Backend Contract                  |
| --------------------------------------- | ------------------------------------------ |
| “If I click shorten, I’ll get a result” | Backend must respond with success OR error |
| “Same URL won’t break the system”       | Backend must handle duplicates             |
| “Result won’t change randomly”          | Mapping must be stable                     |
| “Short URL will work later”             | Backend must persist data                  |
| “Errors are readable”                   | Backend returns structured errors          |

🔥 This column is **gold**. Interviewers LOVE this.

---

## 4️⃣ Column 3: **Derive backend requirements from FE analysis**

Now we convert contracts → requirements.

### Backend Requirements (derived logically)

* Expose an HTTP API
* Validate URL server-side
* Generate short code
* Ensure uniqueness
* Store `{ short → long }`
* Handle idempotency
* Return consistent response format
* Handle failures predictably

⚠️ Still no “how”. Only “what”.

---

## 5️⃣ Column 4: **Backend requirements section (FINAL FORM)**

This is what you actually write in your doc 👇

```md
## Backend Requirements

### API
- Accept URL shortening requests
- Return a shortened URL

### Validation
- Validate URL format
- Reject invalid or unsafe URLs

### Uniqueness
- Generate unique short codes
- Avoid collisions

### Persistence
- Store short → long URL mapping
- Ensure durability

### Idempotency
- Same input may return same output
- Avoid duplicate records

### Error Handling
- Return structured error responses
- Use proper HTTP status codes

### Performance
- Low latency for creation and redirect
```

This is **clean, interview-grade**.

---

## 6️⃣ MOST IMPORTANT CONCEPT TODAY (don’t skip)

### 🔥 Idempotency (beginner version)

Frontend reality:

* User double-clicks
* Network retries
* Browser resends request

Backend MUST assume:

> “Same request can come multiple times”

So backend requirement becomes:

* **Do not create multiple entries for same logical request**