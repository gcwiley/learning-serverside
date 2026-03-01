# Authentication Methods

When building a full-stack application with Express.js, PostgreSQL, and Angular, there are several distinct ways to handle authentication. Each method has a different approach to managing state, security, and integration across the stack.

Based on your project files (specifically `src/middleware/auth.js`), you are already experimenting with **Firebase Auth**, but here is a comprehensive breakdown of the typical methods used for this type of stack:

## 1. Identity as a Service (IDaaS) / Managed Authentication

This involves offloading the complexities of authentication (passwords, resets, MFA) to a 3rd party like **Firebase Auth** (which you are using), **Auth0**, **Supabase**, or **Clerk**.

* **Angular (Frontend):** Uses the provider's SDK (e.g., `@angular/fire` or `@auth0/auth0-angular`) to handle UI flows (login, signup). Upon success, the SDK provides a JWT (JSON Web Token). Angular uses an `HttpInterceptor` to attach this token to the `Authorization: Bearer <token>` header of every outgoing request to your server.

* **Express (Server):** Uses the provider's Admin SDK (e.g., `firebase-admin`) to verify the incoming JWT. If valid, it attaches the `user_id` to the request object and allows the route to proceed.

* **PostgreSQL (Database):** You don't store passwords here. Instead, you store application-specific user data (like roles, profile info, or relationships) mapped to the unique `uid` provided by the IDaaS.

## 2. Token-Based Authentication (DIY JWT)

If you don't want to use a 3rd party service, this is the most common approach for Single Page Applications (SPAs) like Angular. It is stateless.

* **Express (Server):** When a user logs in, Express hashes the password using a library like `bcrypt` and checks it against the hash in Postgres. If valid, Express signs a JWT payload using a library like `jsonwebtoken` and a secret key, then sends it back to the client. Subsequent requests are protected by a middleware that verifies the token's signature.

* **Angular (Frontend):** Stores the JWT securely. (Ideally in an `HttpOnly` cookie for maximum security against XSS, but often developers use `localStorage`). Angular attaches the token to API requests using an `HttpInterceptor` and protects frontend routes using `CanActivate` Route Guards.

* **PostgreSQL (Database):** Stores the user's email, hashed password, and optionally a `refresh_token` so the user doesn't have to keep logging in when their short-lived JWT expires.

## 3. Session-Based Authentication (Stateful Cookies)

This is the traditional "web server" approach but requires specific configuration to work smoothly with an Angular SPA.

* **Express (Server):** Uses `express-session` to generate a unique Session ID upon login. This ID is sent to the client as an `HttpOnly` cookie. The actual session data (like `isLoggedIn` and `userId`) stays on the server.

* **PostgreSQL (Database):** Acts as the session store. You would use a library like `connect-pg-simple` to save session data in a Postgres `sessions` table. This prevents memory leaks and survives server restarts.

* **Angular (Frontend):** Does not need to manually handle tokens. You simply configure your Angular HTTP requests to include `withCredentials: true`, which tells the browser to automatically include the session cookie with every request to the backend.

## 4. OAuth 2.0 / Social Login (Passport.js)

Allowing users to log in via Google, GitHub, Apple, etc., using the OAuth 2.0 protocol.

* **Express (Server):** Typically implemented using **Passport.js** and its various strategies (e.g., `passport-google-oauth20`). The backend redirects the user to the provider, handles the callback, and exchanges an authorization code for user profile information.

* **PostgreSQL (Database):** Stores the user's provider ID (e.g., `google_id`) and email. If the user doesn't exist, a new row is created during the callback.

* **Angular (Frontend):** Provides a "Login with Google" button that redirects via an `href` to your Express backend's auth route. After authenticating, the Express server redirects back to the Angular app, passing along a JWT or a Session cookie.

### 5. Passwordless Authentication (Magic Links / OTP)

Instead of passwords, users receive a unique, temporary link or One-Time Password (OTP) via email or SMS.

* **Express (Server):** Generates a secure random token (e.g., using Node's `crypto` module), hashes it, and saves it to Postgres with an expiration time (e.g., 15 minutes). Express then uses a service like SendGrid, AWS SES, or Twilio to send the link/code.

* **Angular (Frontend):** Either prompts the user for the OTP code or handles the "magic link" by parsing the token from the URL (`ActivatedRoute`) and immediately sending it to the backend to complete the login.
* **PostgreSQL (Database):** Uses a dedicated table (e.g., `verification_tokens`) to temporarily store the pending tokens alongside the user's ID until they are used.

***

**Summary for your stack:**
Since you are already set up with **Firebase Auth** in your `middleware/auth.js`, you are currently using the **IDaaS / Managed Authentication** method. This is highly recommended for Angular/Express stacks because it offloads the immense security burden of password hashing, reset workflows, and email verification to Firebase, while letting you keep your business logic and structured data safely in your PostgreSQL database.
