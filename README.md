# Cloud Drive

A stylish, secure cloud-based file storage app (Google Drive clone).

## Features

- **Login:** Google OAuth 2.0
- **Upload:** Files to AWS S3
- **Versioning:** Each upload is a new version
- **Sharing:** Share files by email
- **Download/View:** Signed URL for file access
- **Stylish UI:** Material UI

## Getting Started

### Backend
1. `cd backend`
2. Create `.env` from `.env.example` and fill in credentials.
3. `npm install`
4. `npm start`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm start`

## Security
- JWT authentication
- Files only accessible by owner or shared users
- Signed URLs for downloads

---

**Deploy to repo:**  
- Copy all files as given above into your monorepo.
- Fill in `.env` with your credentials.
- Run backend (MongoDB required) and frontend locally.
- Everything is ready to upload and use!
