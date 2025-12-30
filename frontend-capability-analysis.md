# Frontend Capability Analysis – URL Shortener

## Responsibilities
The frontend is responsible for:
- Collecting user input (original URL)
- Basic format validation (http/https)
- Triggering shorten request
- Showing loading, success, and error states
- Displaying the shortened URL
- Providing utility actions (copy, open, QR)

## Non-Responsibilities
The frontend does NOT:
- Generate short codes
- Decide uniqueness
- Enforce rate limits
- Store data permanently
- Validate malicious URLs
- Decide expiration or analytics

## Guarantees
- User always receives feedback
- No duplicate submissions during loading
- Errors are communicated clearly
- UI remains responsive

## Failure Handling
- Network failure → show retry
- Backend error → show message
- Invalid input → block submission
