import { GoogleGenerativeAI } from '@google/generative-ai';
import { analyzeText } from '../utils/analysisEngine.js';
import { readHistory, saveRecord } from '../utils/historyStore.js';

const client = process.env.GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

const BIAS_ANALYSIS_PROMPT = `You are assisting a responsible-language audit product.
Review the text and return strict JSON with:
{
  "replacements": {
    "<biased phrase lowercased>": "<better alternative>"
  }
}
Only suggest replacements for phrases that clearly need improvement.`;

async function getAiEnhancements(text) {
  if (!client) {
    return null;
  }

  try {
    const model = client.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const response = await model.generateContent(`${BIAS_ANALYSIS_PROMPT}\n\n${text}`);
    const responseText = response.response.text();
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);

    return jsonMatch ? JSON.parse(jsonMatch[0]) : null;
  } catch (error) {
    console.warn('Gemini enhancement skipped:', error.message);
    return null;
  }
}

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

    const aiInsights = await getAiEnhancements(text);
    const analysisResult = analyzeText({
      text,
      contentType,
      includeAiInsights: Boolean(aiInsights),
      aiInsights,
    });

    const analysisRecord = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      contentType: contentType || 'general',
      audience: audience || 'General audience',
      intent: intent || 'Bias and inclusion review',
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
    res.json({
      history,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve history' });
  }
};

export const getEducationalContent = async (req, res) => {
  try {
    const educationalContent = {
      guides: [
        {
          id: 1,
          title: 'Understanding Gender Bias in Hiring',
          content: 'Gender bias in job postings often uses gendered language or assumptions about roles. Words like "aggressive," "decisive," and "bachelors boys" favor one gender...',
          category: 'gender'
        },
        {
          id: 2,
          title: 'Age Discrimination in Job Descriptions',
          content: 'Age bias appears through requirements like "young energy," "digital native," or requiring specific years of experience targeting younger candidates...',
          category: 'age'
        },
        {
          id: 3,
          title: 'Ability Assumptions',
          content: 'Many job postings assume physical abilities or neurotypicality. Using "able to travel frequently" excludes people with mobility issues. "Fast-paced" excludes neurodiverse individuals...',
          category: 'ability'
        }
      ],
      tips: [
        'Use inclusive language that welcomes diverse candidates',
        'Focus on essential job requirements, not nice-to-haves',
        'Avoid gendered pronouns and refer to "team members" not "guys"',
        'Use plain language to reduce socioeconomic bias',
        'Include accessibility statement to welcome diverse candidates',
      ],
    };

    res.json(educationalContent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve educational content' });
  }
};
