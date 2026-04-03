import { GoogleGenerativeAI } from '@google/generative-ai';

const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const BIAS_ANALYSIS_PROMPT = `You are an expert bias detection AI. Analyze the following text for hidden biases including:
- Gender bias
- Age/Ageism bias
- Racial/Ethnic bias
- Disability bias
- Socioeconomic bias
- Ability assumptions

Return your analysis in this EXACT JSON format:
{
  "overallBiasScore": <0-100>,
  "riskLevel": "<LOW|MEDIUM|HIGH>",
  "biases": [
    {
      "category": "<gender|age|racial|disability|socioeconomic|ability>",
      "severity": "<low|medium|high>",
      "biasedPhrase": "<exact phrase with bias>",
      "explanation": "<why this is biased>",
      "suggestedReplacement": "<neutral alternative>",
      "startIndex": <position>,
      "endIndex": <position>
    }
  ],
  "summary": "<brief explanation of findings>",
  "educationalTip": "<tip on how to avoid this bias>"
}

TEXT TO ANALYZE:
`;

export const analyzeBias = async (req, res) => {
  try {
    const { text, contentType } = req.body;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ 
        error: 'Text content is required' 
      });
    }

    if (text.length > 5000) {
      return res.status(400).json({ 
        error: 'Text must be less than 5000 characters' 
      });
    }

    // Call Gemini API
    const model = client.getGenerativeModel({ model: 'gemini-pro' });
    
    const response = await model.generateContent(
      BIAS_ANALYSIS_PROMPT + text
    );

    const responseText = response.response.text();
    
    // Parse JSON from response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse AI response');
    }

    const analysisResult = JSON.parse(jsonMatch[0]);

    // Save to history (optional - implement DB later)
    const analysisRecord = {
      id: Date.now().toString(),
      timestamp: new Date(),
      contentType: contentType || 'general',
      textPreview: text.substring(0, 100),
      result: analysisResult
    };

    res.json({
      success: true,
      data: analysisResult,
      record: analysisRecord
    });

  } catch (error) {
    console.error('Bias analysis error:', error);
    res.status(500).json({
      error: 'Failed to analyze content',
      message: error.message
    });
  }
};

export const getAnalysisHistory = async (req, res) => {
  try {
    // TODO: Implement database history retrieval
    res.json({
      history: [],
      message: 'History feature coming soon'
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
        'Include accessibility statement to welcome diverse candidates'
      ]
    };

    res.json(educationalContent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve educational content' });
  }
};
