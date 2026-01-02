## **API Contract Design (Contract-First)**

> Rule: **Backend implementation is allowed to change.
> API contract is NOT.**

---

## 0️⃣ What “contract-first” really means (in one line)

Frontend and backend **shake hands first**, *then* code independently.

That handshake = **API contract**.

---

## 1️⃣ Create the file (important)

```
api-contract.md
```

This is your **single source of truth**.

---

## 2️⃣ API #1 — `POST /shorten`

### Purpose

Create a shortened URL from a long URL.

---

### ✅ Request Contract

```http
POST /shorten
Content-Type: application/json
```

```json
{
  "longUrl": "https://example.com/some/very/long/path"
}
```

#### Rules

* `longUrl` is **required**
* Must be a valid absolute URL
* Frontend may validate format
* Backend must validate truth

---

### ✅ Success Response (201 Created)

```json
{
  "shortUrl": "https://short.ly/k81wfd",
  "code": "k81wfd",
  "longUrl": "https://example.com/some/very/long/path"
}
```

#### Guarantees

* `shortUrl` is unique
* Mapping is persisted
* Same `longUrl` may return same `code` (idempotent)

---

### ❌ Error Responses

#### 400 – Invalid URL

```json
{
  "error": "INVALID_URL",
  "message": "Provided URL is not valid"
}
```

#### 429 – Rate limit

```json
{
  "error": "RATE_LIMITED",
  "message": "Too many requests"
}
```

#### 500 – Server error

```json
{
  "error": "INTERNAL_ERROR",
  "message": "Something went wrong"
}
```

---

## 3️⃣ API #2 — Redirect (`GET /{code}`)

This is the **core of the system**.

---

### ✅ Request Contract

```http
GET /{code}
```

Example:

```
GET /k81wfd
```

---

### ✅ Success Response (302 Redirect)

```http
HTTP/1.1 302 Found
Location: https://example.com/some/very/long/path
```

#### Guarantees

* Redirect is fast
* Mapping is stable
* No body required

---

### ❌ Error Responses

#### 404 – Code not found

```json
{
  "error": "NOT_FOUND",
  "message": "Short URL does not exist"
}
```

---

## 4️⃣ Why this design is CORRECT (interview logic)

### 🔥 Separation of concerns

* `POST /shorten` → **creation**
* `GET /{code}` → **resolution**

### 🔥 REST-aligned

* POST creates
* GET retrieves (via redirect)

### 🔥 Scalable by design

* Stateless APIs
* Cache-friendly redirects

(We’ll talk scaling later — not today.)

---

## 5️⃣ Frontend ↔ Backend responsibility clarity

### Frontend guarantees:

* Correct JSON shape
* Prevent duplicate clicks
* Display response/errors

### Backend guarantees:

* Correct HTTP status
* Stable mapping
* Security
* Persistence

No overlap. No confusion.

---

## 6️⃣ ONE subtle but powerful design choice (notice this)

We return **both**:

```json
{
  "shortUrl": "...",
  "code": "..."
}
```

Why?

* Frontend can display full URL
* Backend can use `code` internally
* Analytics becomes easier later

That’s **forward thinking**, jennie 😌