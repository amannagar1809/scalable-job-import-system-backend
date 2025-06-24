# Scalable Job Importer System

A scalable job import system that pulls data from external APIs, processes them using Redis queues, and stores them in MongoDB with import history tracking.

## Features

- Fetch jobs from multiple API sources
- Queue-based processing using Redis and BullMQ
- MongoDB storage with import history tracking
- Real-time updates via Socket.IO
- Admin dashboard to view import history and job listings

## Technologies

- Backend: Node.js, Express
- Database: MongoDB
- Queue: Redis, BullMQ
- Frontend: Next.js (in client directory)
- Real-time: Socket.IO

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and configure
4. Start services: `docker-compose -f docker/compose/dev.yml up`

## API Endpoints

- `GET /api/jobs` - List all jobs
- `GET /api/imports` - Get import history
- `POST /api/imports/trigger` - Trigger manual import