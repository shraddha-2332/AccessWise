import express from 'express';
import { 
  analyzeBias, 
  getAnalysisHistory,
  getEducationalContent 
} from '../controllers/biasController.js';

const router = express.Router();

// Analyze text for bias
router.post('/analyze', analyzeBias);

// Get analysis history
router.get('/history', getAnalysisHistory);

// Get educational content
router.get('/education', getEducationalContent);

export default router;
