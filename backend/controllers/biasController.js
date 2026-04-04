import { analyzeText } from '../utils/analysisEngine.js';
import { readHistory, saveRecord } from '../utils/historyStore.js';

export const analyzeBias = async (req, res) => {
  try {
    const { text, contentType, audience, intent } = req.body;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({
        error: 'Text content is required',
      });
    }

    if (text.length > 5000) {
      return res.status(400).json({
        error: 'Text must be less than 5000 characters',
      });
    }

    const analysisResult = analyzeText({ text, contentType });

    const analysisRecord = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      contentType: contentType || 'scholarship',
      audience: audience || 'Public-facing users',
      intent: intent || 'Inclusive service audit before launch',
      textPreview: text.substring(0, 100),
      originalText: text,
      result: analysisResult,
    };

    await saveRecord(analysisRecord);

    res.json({
      success: true,
      data: analysisResult,
      record: analysisRecord,
    });
  } catch (error) {
    console.error('Bias analysis error:', error);
    res.status(500).json({
      error: 'Failed to analyze content',
      message: error.message,
    });
  }
};

export const getAnalysisHistory = async (req, res) => {
  try {
    const history = await readHistory();
    res.json({ history });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve history' });
  }
};

export const getAnalysisStats = async (req, res) => {
  try {
    const history = await readHistory();
    const reviews = history.length;
    const blocked = history.filter((entry) => entry.result?.releaseDecision === 'Block before launch').length;
    const needsReview = history.filter((entry) => entry.result?.releaseDecision === 'Needs inclusive redesign').length;
    const ready = history.filter((entry) => entry.result?.releaseDecision === 'Ready with improvements').length;

    const categoryCounts = {};
    history.forEach((entry) => {
      (entry.result?.findings || []).forEach((finding) => {
        categoryCounts[finding.category] = (categoryCounts[finding.category] || 0) + 1;
      });
    });

    const topCategories = Object.entries(categoryCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([category, count]) => ({ category, count }));

    const averageRiskScore =
      reviews === 0
        ? 0
        : Math.round(
            history.reduce((sum, entry) => sum + (entry.result?.overallRiskScore || 0), 0) / reviews
          );

    res.json({
      reviews,
      blocked,
      needsReview,
      ready,
      averageRiskScore,
      topCategories,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve analysis stats' });
  }
};

export const getEducationalContent = async (req, res) => {
  try {
    res.json({
      guides: [
        {
          id: 1,
          title: 'Design for task completion, not ideal users',
          content:
            'Strong service copy makes next steps obvious for first-time users instead of assuming confidence, speed, or prior experience.',
          category: 'service-design',
        },
        {
          id: 2,
          title: 'Accessibility and support should be visible',
          content:
            'If a service allows accommodations, translation, support staff, or alternate completion channels, the interface should say that clearly.',
          category: 'accessibility',
        },
        {
          id: 3,
          title: 'Inclusion should be operational',
          content:
            'A credible audit should tell teams what to change, who may be blocked, and whether the service is safe to launch.',
          category: 'operations',
        },
      ],
      tips: [
        'Break dense instructions into smaller task-focused steps.',
        'State accommodation, translation, and support options early in the flow.',
        'Reduce document and device assumptions unless they are truly essential.',
        'Avoid shame-heavy or insider-only language for first-time users.',
        'Use a launch decision so teams know whether to ship, redesign, or block the service.',
      ],
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve educational content' });
  }
};
