
---

## 📦 Features

- User authentication (register, login, reset password)
- OTP verification
- JWT creation
- Product upload for auctions
- Input validation via Joi
- Global error handling
- 404 fallback route
- Health check endpoint

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- npm

### Installation

```bash
git clone <your-repo-url>
cd your-project
npm install
node index.js

```
🛡 Auth Routes
| Method | Endpoint              | Description                       |
| ------ | --------------------- | --------------------------------- |
| POST   | `/register`           | Register user (buyer/seller)      |
| POST   | `/create-jwt`         | Create JWT for authenticated user |
| POST   | `/login`              | User login                        |
| POST   | `/verify-otp`         | Verify OTP for user               |
| POST   | `/forget-email-check` | Check if email exists for reset   |
| POST   | `/reset-password`     | Reset user password               |

📦 Auction Routes
| Method | Endpoint          | Description                | Middleware                                     |
| ------ | ----------------- | -------------------------- | ---------------------------------------------- |
| POST   | `/upload-product` | Upload new auction product | `verifyJWT`, `verifySeller`, `verifyForbidden` |


### Input Validation
Validation is handled via Joi and enforced through a middleware (registerValidator).

Auth Schemas
registerSchemas

jwtSchemas

otpValidation

forgetEmailValidation

resetPasswordValidation

Product Schema
postProductSchema

### Other routes
| Method | Endpoint  | Description        |
| ------ | --------- | ------------------ |
| GET    | `/health` | Health check       |
| ANY    | `*`       | 404 fallback route |



