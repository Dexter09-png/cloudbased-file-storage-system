# Cloud Drive

A stylish and secure cloud-based file storage application—think of it as your own Google Drive clone.

---

##  Features

- **Login**: Secure authentication with **Google OAuth 2.0**
- **File Uploads**: Seamless uploads to **AWS S3** (or Azure Blob / Google Cloud Storage)
- **Versioning**: Every upload is treated as a **new version** of the file
- **File Sharing**: Share files easily via **email invites**
- **Secure Downloads**: Access files through **signed URLs**
- **Sleek UI**: Built using **Material UI** for a clean, responsive experience
- **Backend Security**: JWT-based auth, with strict file access control (owner or shared users only)

---

##  Tech Stack

- **Backend**: Node.js (Express), JWT, Google OAuth, AWS S3 integration
- **Frontend**: React.js with Material UI components
- **Database**: MongoDB (local or cloud)
- **Configuration**: Environment variables via `.env`

---

##  Setup Instructions

## Backend
- cd backend
- cp .env.example .env

## Fill in your credentials (Google, AWS, MongoDB, JWT, etc.)
- npm install
- npm start

## Frontend
- cd frontend
- npm install
- npm start

## Security Highlights
- JWT Authentication keeps user sessions secure
- Only authorized users (owners or those shared with) can access files
- All downloads are via time-limited signed URLs

## About

This project enables users to upload, manage, version, and share files securely. It supports popular cloud storage services (AWS S3, Azure Blob, GCS), OAuth 2.0 authentication, file versioning, and advanced sharing workflows via email and signed URLs.

---

## Author
Sanita Gaikwad – Cloud Internship Project at Codec Technology
