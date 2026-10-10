# 👑 Kamaal Admin Web Panel (Standalone Vercel Project)

A production-ready, dark glassmorphism Admin Web Panel with crimson accents for centrally managing the **Kamaal App** Android client and backend API.

---

## 🚀 Features

- **Owner Authentication & Session Protection**: Connects to the backend via secure API proxy gateway (`/api/admin/login`, `/api/admin/logout`) with 24-hour token TTL and revocation.
- **Live 2-Second Telemetry Radar**: Real-time polling of active users (15-min window), registered users, VIP members, pending payment proofs, videos patched, and database status.
- **User Record Governance**: Search users by `@username`, phone, or hardware Device ID. Filter by status (Active, Banned, VIP). Perform 1-click device lock release, ban/unban, custom Gemini prompt configuration, and credit balance edits.
- **Payment Proof Reviews (JazzCash / EasyPaisa)**: Review manual payment screenshots and transaction IDs with duplicate-approval idempotency protection.
- **Voucher Key Generator & Active Vault**: Generate bulk VIP license keys (prefix, count, credits, plan) and inspect unused/redeemed keys from the database.
- **Owner Broadcast & 1-on-1 Inbox Messaging**: Push Golden Crown banners to all mobile devices or deliver private messages directly to a user's inbox.
- **App Killswitch & Remote Governance**: Freeze the app for maintenance with custom notice or enforce minimum APK version and download URL.
- **Global Gemini AI Engine Configuration**: Switch model tier and set global system prompt instructions for all mobile AI requests.

---

## 📁 Project Structure

```text
standalone-admin/
├── api/
│   └── index.js             # Vercel Serverless API Proxy Gateway with endpoint whitelist
├── public/
│   ├── index.html           # Root entry redirecting to /admin
│   └── admin.html           # Full Liquid Glass crimson admin control dashboard
├── .env.example             # Environment variable template
├── .gitignore               # Git ignore rules for node_modules and logs
├── package.json             # Node.js dependencies (Express, CORS)
├── vercel.json              # Vercel deployment routes and serverless configuration
└── README.md                # Deployment and operation guide
```

---

## 🛠️ Deployment to Vercel

### Step 1: Push / Import to GitHub
1. Create a new GitHub repository named `kamaal-admin-panel`.
2. Copy the contents of the `standalone-admin` directory into your new repository root.
3. Commit and push the code:
   ```bash
   git add .
   git commit -m "feat: initial Kamaal Admin Panel deployment"
   git push origin main
   ```

### Step 2: Import into Vercel
1. Go to [vercel.com](https://vercel.com) and click **"Add New" > "Project"**.
2. Select your `kamaal-admin-panel` repository.
3. Framework Preset: **Other**.
4. Root Directory: `./` (leave default).

### Step 3: Configure Environment Variables
In the Vercel Project Setup (or under **Settings > Environment Variables**), set:

| Variable Name | Value | Purpose |
|---|---|---|
| `BACKEND_API_URL` | `https://kammal.vercel.app` | Target backend URL where Kamaal App APIs run |
| `NODE_ENV` | `production` | Production environment flag |

### Step 4: Deploy
Click **"Deploy"**. Vercel will build the serverless functions and host the static dashboard within seconds.

---

## 🔐 Verifying Admin Panel After Deployment

1. Open your assigned Vercel URL (e.g. `https://kamaal-admin-panel.vercel.app/admin`).
2. Enter your master credentials in the **Owner Authentication** modal.
3. Upon unlock:
   - Verify that the **Live Radar** displays live counters and the green **ONLINE** badge.
   - Click **Payment Proofs** to verify submitted JazzCash and EasyPaisa transactions.
   - Click **Voucher Generator** to inspect active license keys.
   - Click **App Killswitch** to review current maintenance status and Gemini AI model settings.
