// Vercel serverless function entry point
import express from 'express';
import { registerRoutes } from '../server/routes.js';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register routes
await registerRoutes(app);

export default app;