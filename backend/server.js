import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import biasAnalysisRoutes from './routes/biasAnalysis.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Routes
app.use('/api/bias', biasAnalysisRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'Language audit API is running',
    aiEnhancementEnabled: Boolean(process.env.GEMINI_API_KEY),
    allowedOrigin: process.env.FRONTEND_URL || 'http://localhost:5173',
  });
});

app.listen(PORT, () => {
  console.log(`🚀 BiasAudit Backend running on http://localhost:${PORT}`);
});
