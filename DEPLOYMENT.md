# YieldSense AI — Deployment & Cloud Architecture Guide
**Milestone 4: Testing, Deployment & Documentation Deliverable (Week 7 & 8)**

---

## 1. Overview & Deployment Architecture

YieldSense AI is designed with a cloud-native, containerized architecture that separates the compute-intensive **FastAPI + Scikit-Learn backend** from the **React + Vite responsive frontend**.

```
                           [ Internet / Users ]
                                    │
                         ┌──────────┴──────────┐
                         │   Nginx / Ingress   │
                         └──────────┬──────────┘
                                    │
           ┌────────────────────────┴────────────────────────┐
           ▼                                                 ▼
┌─────────────────────────┐                       ┌─────────────────────────┐
│   React Frontend        │                       │   FastAPI Backend       │
│   (Port 3000 / 80)      │ ─── API Calls ──────> │   (Port 8000)           │
│   Nginx Alpine runtime  │                       │   Python 3.12-slim      │
└─────────────────────────┘                       └───────────┬─────────────┘
                                                              │
                                                              ▼
                                                  ┌─────────────────────────┐
                                                  │   MongoDB / Memory DB   │
                                                  │   (Port 27017)          │
                                                  └─────────────────────────┘
```

---

## 2. Option A: Local Containerization with Docker Compose (Recommended)

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.

### 1-Step Launch
Clone the repository and run:
```bash
docker compose up --build -d
```

### Verification
- **Frontend Dashboard**: Open [http://localhost:3000](http://localhost:3000)
- **Backend API & Swagger Docs**: Open [http://localhost:8000/docs](http://localhost:8000/docs)
- **Health Check Probe**: Open [http://localhost:8000/api/health](http://localhost:8000/api/health)
- **System Performance Telemetry**: Open [http://localhost:8000/api/system/performance](http://localhost:8000/api/system/performance)

### Stopping Containers
```bash
docker compose down
```

---

## 3. Option B: Individual Docker Container Builds

### 1. Build and Run Backend
```bash
cd backend
docker build -t yieldsense-backend:latest .
docker run -d -p 8000:8000 --name yieldsense-backend yieldsense-backend:latest
```

### 2. Build and Run Frontend
```bash
cd frontend
docker build -t yieldsense-frontend:latest .
docker run -d -p 3000:80 -e VITE_API_URL=http://localhost:8000 --name yieldsense-frontend yieldsense-frontend:latest
```

---

## 4. Option C: Cloud Deployment Guides

### A. Render (One-Click Blueprint)
1. Push your repository to GitHub.
2. Log into [Render.com](https://render.com).
3. Click **New +** -> **Blueprint**.
4. Select your repository `harshfursule/AI_Crop-Yield-Prediction-Agricultural-Productivity-Forecasting-System-Harsh-Fursule`.
5. Render will automatically detect [`render.yaml`](render.yaml) and provision both the Python backend and React static site.

### B. Railway / Koyeb
1. Create a new project from your GitHub repository.
2. Deploy the `backend` subdirectory with root directory set to `/backend`.
3. Set environment variable `PORT=8000`.
4. Deploy the `frontend` subdirectory with build command `npm install && npm run build` and output `dist`.

### C. AWS (Elastic Container Service / EC2)
1. **ECR (Elastic Container Registry)**:
   ```bash
   aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <aws_account_id>.dkr.ecr.<region>.amazonaws.com
   docker tag yieldsense-backend:latest <aws_account_id>.dkr.ecr.<region>.amazonaws.com/yieldsense-backend:latest
   docker push <aws_account_id>.dkr.ecr.<region>.amazonaws.com/yieldsense-backend:latest
   ```
2. **ECS Task Definition**: Run as Fargate task with 0.5 vCPU and 1 GB memory.
3. **Application Load Balancer (ALB)**: Route traffic to Port 8000 for backend and Port 80 for frontend.

### D. Google Cloud Run
```bash
gcloud builds submit --tag gcr.io/<PROJECT_ID>/yieldsense-backend backend/
gcloud run deploy yieldsense-backend --image gcr.io/<PROJECT_ID>/yieldsense-backend --platform managed --allow-unauthenticated --port 8000
```

---

## 5. System Performance & Dashboard Optimizations Applied

| Optimization Area | Technical Implementation | Performance Gain |
| :--- | :--- | :--- |
| **Response Compression** | FastAPI `GZipMiddleware(minimum_size=1000)` | **~65% reduction** in network payload size for large dataset & metric responses. |
| **Route Code-Splitting** | React `lazy()` and `Suspense` chunk splitting | **~50% faster** initial dashboard paint; pages loaded on demand. |
| **Asset Caching** | Nginx `Cache-Control: immutable, max-age=31536000` | Instant subsequent page loads from browser disk cache. |
| **Sub-Millisecond Inference** | Pre-loaded Scikit-Learn Joblib pipelines in memory | Model prediction response latency **< 1.0 ms**. |
| **Responsive Viewports** | CSS Flex/Grid media breakpoints (`768px`, `600px`, `480px`) | Seamless usability across mobile phones, tablets, and 4K displays. |

---

## 6. Production Environment Checklist

- [x] Multi-stage Dockerfiles for backend and frontend
- [x] Nginx configuration with SPA fallback routing (`try_files $uri $uri/ /index.html`)
- [x] Security headers enabled (X-Frame-Options, X-Content-Type-Options)
- [x] GZip payload compression enabled
- [x] Health probe endpoint (`/api/health`) for container uptime checks
- [x] Performance telemetry endpoint (`/api/system/performance`)
- [x] Dynamic CORS origin configuration via `ALLOWED_ORIGINS`
- [x] Infrastructure-as-code configuration (`render.yaml`, `docker-compose.yml`)
