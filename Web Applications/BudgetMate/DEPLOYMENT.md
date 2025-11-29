# Deploying BudgetMate Backend to Google Cloud Platform (GCP)

This guide will walk you through deploying your .NET backend to Google Cloud Run using Firestore as the database.

## Prerequisites

1.  **Google Cloud Account**: [Sign up here](https://cloud.google.com/).
2.  **Google Cloud CLI (gcloud)**: [Install here](https://cloud.google.com/sdk/docs/install).
3.  **Docker Desktop**: Installed and running.

---

## Step 1: Google Cloud Setup

1.  **Create a Project**:
    *   Go to the [GCP Console](https://console.cloud.google.com/).
    *   Create a new project (e.g., `budgetmate-app`).
    *   Note your **Project ID**.

2.  **Enable APIs**:
    *   Enable **Cloud Run API**.
    *   Enable **Container Registry API** (or Artifact Registry).
    *   Enable **Cloud Firestore API**.

3.  **Create Firestore Database**:
    *   Go to **Firestore** in the console.
    *   Click **Create Database**.
    *   Select **Native Mode**.
    *   Choose a location (e.g., `us-central1`).
    *   **Important**: Start in **Production mode** (or Test mode if just testing, but Production is safer).

4.  **Authenticate Locally**:
    Open your terminal (PowerShell) and run:
    ```powershell
    gcloud auth login
    gcloud config set project YOUR_PROJECT_ID
    gcloud auth configure-docker
    ```

---

## Step 2: Build and Push Docker Image

1.  **Navigate to Backend Directory**:
    ```powershell
    cd "Web Applications\BudgetMate\Backend"
    ```

2.  **Build the Image**:
    Replace `YOUR_PROJECT_ID` with your actual project ID.
    ```powershell
    docker build -t gcr.io/YOUR_PROJECT_ID/budgetmate-backend .
    ```

3.  **Push to Container Registry**:
    ```powershell
    docker push gcr.io/YOUR_PROJECT_ID/budgetmate-backend
    ```

---

## Step 3: Deploy to Cloud Run

1.  **Deploy Command**:
    Run the following command. Replace `YOUR_PROJECT_ID` and `YOUR_JWT_KEY`.
    
    *Note: For the JWT Key, generate a long random string.*

    ```powershell
    gcloud run deploy budgetmate-backend `
      --image gcr.io/YOUR_PROJECT_ID/budgetmate-backend `
      --platform managed `
      --region us-central1 `
      --allow-unauthenticated `
      --set-env-vars "Firestore__ProjectId=YOUR_PROJECT_ID,Jwt__Key=YOUR_LONG_SECRET_KEY_HERE,Jwt__Issuer=BudgetMateBackend,Jwt__Audience=BudgetMateFrontend"
    ```

2.  **Get the URL**:
    *   Once deployed, the command will output a **Service URL** (e.g., `https://budgetmate-backend-xyz.a.run.app`).
    *   **Copy this URL**.

---

## Step 4: Connect Frontend

1.  **Update Frontend Config**:
    *   Open `Frontend/budgetmate-frontend/.env.production`.
    *   Paste your Cloud Run URL:
        ```
        VITE_API_BASE_URL=https://budgetmate-backend-xyz.a.run.app
        ```

2.  **Deploy Frontend**:
    *   Navigate to the frontend directory.
    *   Run:
        ```powershell
        npm run deploy
        ```

---

## Troubleshooting

*   **500 Errors**: Check Cloud Run logs in the GCP Console.
*   **CORS Errors**: Ensure your frontend URL (GitHub Pages) is listed in the `Program.cs` CORS policy. If your GitHub Pages URL changes, update `Program.cs` and redeploy the backend.
*   **Database Permission Errors**: Ensure the **Default Compute Service Account** (used by Cloud Run) has the **Cloud Datastore User** role in IAM.
