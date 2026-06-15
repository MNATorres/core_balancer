import express from 'express';
import cors from 'cors';
import pdfRouter from './routes/pdf.routes';
import { loggingMiddleware } from './middlewares/logging.middleware';
import { errorMiddleware } from './middlewares/error.middleware';

const app = express();

// Middleware
app.use(loggingMiddleware);
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/v1/pdf', pdfRouter);

// Healthcheck Route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'world-cup-pdf-generator',
    timestamp: new Date().toISOString()
  });
});

// Root route redirects or returns a quick message
app.get('/', (req, res) => {
  res.status(200).send('World Cup PDF Generator Microservice. Access /api/v1/pdf/world-cup to generate a PDF.');
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Cannot ${req.method} ${req.url}`
  });
});

// Global Error Handler
app.use(errorMiddleware);

export default app;
