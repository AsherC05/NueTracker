# NueTracker

A nutrition scanner app that captures a meal image and sends it to a backend AI service for analysis.

## Local setup

1. Install the client dependencies:
   cd client && npm install
2. Install the server dependencies:
   cd server && npm install
3. Add a Gemini API key:
   cp server/.env.example server/.env
   # then replace the placeholder with your real Google Gemini API key
4. Start the backend:
   cd server && npm run dev
5. Start the frontend:
   cd client && npm run dev

The frontend uses Vite's proxy to forward /api requests to the backend server running on port 3001.

## Server folder

All API and AI integration work lives in the server folder:
- server/index.js — Express API and Gemini integration
- server/.env.example — environment configuration for the Gemini key

## API endpoint

POST /api/analyse

Body:
{
  "image": "base64 string or data URL",
  "mediaType": "image/jpeg"
}

It returns a normalized nutrition payload with the fields used by the app:
- food_name
- serving_estimate
- calories
- protein_g
- carbs_g
- fat_g
- confidence
- notes
# NueTracker
