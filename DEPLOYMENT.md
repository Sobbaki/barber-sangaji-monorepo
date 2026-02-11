# Deployment Guide for Barber Sangaji

## Recommended Approach: Consolidate to Monorepo

While the project currently exists as two separate repositories, we **highly recommend** consolidating them into a single "Monorepo". This simplifies management, ensures all code is in sync, and makes deployment easier.

### Why Monorepo?
1.  **Single Source of Truth**: One repository for Backend, Admin, and Main Website.
2.  **Simplified Deployment**: Connect one repo to Vercel, and deploy 3 projects from it.
3.  **Easier Local Dev**: One `package.json` to install and run everything.

### Steps to Convert to Monorepo

1.  **Remove Old Git History**:
    ```bash
    # Run in terminal at project root
    cd admin
    rmdir /s /q .git
    cd ../barbersangaji
    rmdir /s /q .git
    cd ..
    ```
2.  **Initialize New Root Repository**:
    ```bash
    # Run in terminal at project root
    git init
    # Create .gitignore (see below)
    git add .
    git commit -m "Initial commit: Monorepo structure"
    ```
3.  **Push to GitHub**:
    *   Create a NEW empty repository on GitHub (e.g., `barber-sangaji-monorepo`).
    *   Link it:
        ```bash
        git remote add origin <YOUR_NEW_REPO_URL>
        git push -u origin main
        ```

### Deployment (Monorepo Strategy)

1.  Import your **New Monorepo** to Vercel **3 times**:
    *   **Project 1 (Backend)**: Root Directory = `admin/Backend`
    *   **Project 2 (Admin)**: Root Directory = `admin/Frontend`
    *   **Project 3 (Main)**: Root Directory = `barbersangaji`
2.  Set Environment Variables for each project as described below.

---

## Alternative: Keep separate Repositories

This project is organized into **two separate Git repositories** that need to be deployed individually.

## Repository Structure

1.  **Admin Repository** (`admin` folder):
    *   Contains **Backend API** (`Backend` folder).
    *   Contains **Admin Dashboard** (`Frontend` folder).
2.  **Main Website Repository** (`barbersangaji` folder):
    *   Contains the **Landing Page**.

---

## Deployment Steps

You will create **3 separate projects** on Vercel.

### 1. Deploy Backend (from `admin` repo)

1.  Push the **`admin`** folder code to GitHub (Repo A).
2.  Go to Vercel Dashboard -> **Add New Project**.
3.  Import **Repo A** (`admin`).
4.  **Important**: In "Root Directory", click "Edit" and select `Backend`.
5.  **Environment Variables**: Add the following (copy from `admin/Backend/.env.example`):
    *   `SUPABASE_URL`: Your Supabase URL.
    *   `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase Service Role Key.
    *   `UPLOADTHING_TOKEN`: Your UploadThing Token.
    *   `JWT_SECRET`: A strong random string.
    *   `SEED_ADMIN_PASSWORD`: (Optional) Password for initial admin account.
6.  Click **Deploy**.
7.  **Copy the assigned Domain** (e.g., `https://barber-sangaji-backend.vercel.app`).

### 2. Deploy Admin Dashboard (from `admin` repo)

1.  Go to Vercel Dashboard -> **Add New Project**.
2.  Import **Repo A** (`admin`) *again*.
3.  **Important**: In "Root Directory", click "Edit" and select `Frontend`.
4.  **Framework Preset**: Select "Vite".
5.  **Environment Variables**:
    *   `VITE_BACKEND_URL`: The URL from Step 1 (e.g., `https://barber-sangaji-backend.vercel.app`).
6.  Click **Deploy**.
7.  **Copy the assigned Domain** (e.g., `https://barber-sangaji-admin.vercel.app`).

### 3. Deploy Main Website (from `barbersangaji` repo)

1.  Push the **`barbersangaji`** folder code to GitHub (Repo B).
2.  Go to Vercel Dashboard -> **Add New Project**.
3.  Import **Repo B** (`barbersangaji`).
4.  **Root Directory**: Leave as default (`.`) or `./` (since the code is at the root of this repo).
5.  **Framework Preset**: Select "Vite".
6.  **Environment Variables**:
    *   `VITE_API_URL`: The Backend URL from Step 1 (e.g., `https://barber-sangaji-backend.vercel.app`).
    *   `VITE_ADMIN_URL`: The Admin Dashboard URL from Step 2 (e.g., `https://barber-sangaji-admin.vercel.app`).
7.  Click **Deploy**.

---

## Post-Deployment Configuration

### Update Backend CORS

Once all three are deployed, you can restrict the Backend to only allow requests from your frontend domains.

1.  Open `admin/Backend/api/index.js` in your local editor.
2.  Locate the CORS configuration:
    ```javascript
    app.use(cors({
      origin: '*', // Currently allows everyone
      // ...
    }));
    ```
3.  Change `origin: '*'` to an array of your deployed domains:
    ```javascript
    origin: ['https://barber-sangaji-admin.vercel.app', 'https://your-main-website.vercel.app'],
    ```
4.  Commit and push changes to the **Admin Repository**. Vercel will redeploy the Backend automatically.

## Local Development

Since you have two separate repositories in one workspace, you can still run them together locally.

1.  **Backend**:
    ```bash
    cd admin/Backend
    npm install
    npm run dev
    ```
2.  **Admin Dashboard**:
    ```bash
    cd admin/Frontend
    npm install
    npm run dev
    ```
3.  **Main Website**:
    ```bash
    cd barbersangaji
    npm install
    npm run dev
    ```