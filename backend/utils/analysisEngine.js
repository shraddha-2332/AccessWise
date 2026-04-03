const CATEGORY_RULES = {
  gender: [
    {
      pattern: /\b(guys|salesman|salesmen|chairman|manpower|female-friendly|male-only|girls|boys)\b/gi,
      explanation:
        'This wording can exclude people by implying a preferred gender or reinforcing stereotypes.',
      replacement: 'Use role-based or people-first language that does not imply a gender preference.',
      severity: 'high',
      weight: 18,
    },
    {
      pattern: /\b(aggressive|dominant|nurturing|supportive woman|assertive man)\b/gi,
      explanation:
        'Trait-coded language can signal stereotyped expectations about gender expression or fit.',
      replacement: 'Describe the specific skill or behavior needed without gender-coded framing.',
      severity: 'medium',
      weight: 12,
    },
  ],
  age: [
    {
      pattern: /\b(young|youngster|recent graduate|digital native|energetic youth|old-school|elderly)\b/gi,
      explanation:
        'Age-coded language can discourage qualified candidates or readers based on life stage rather than capability.',
      replacement: 'Focus on relevant skills, adaptability, and role expectations instead of age signals.',
      severity: 'high',
      weight: 16,
    },
    {
      pattern: /\b(seasoned veteran|junior person only|overqualified|high stamina)\b/gi,
      explanation:
        'These phrases can indirectly filter for a preferred age group instead of job-relevant qualifications.',
      replacement: 'Describe the level of responsibility and outcomes required for the role.',
      severity: 'medium',
      weight: 10,
    },
  ],
  racial: [
    {
      pattern: /\b(native english speaker|culturally fit|ethnic look|foreigner|immigrant|minority candidate)\b/gi,
      explanation:
        'This language can create barriers tied to ethnicity, nationality, or assimilation expectations.',
      replacement: 'Specify the communication or collaboration requirement without referring to identity groups.',
      severity: 'high',
      weight: 18,
    },
    {
      pattern: /\b(exotic|articulate for|urban candidate|clean accent)\b/gi,
      explanation:
        'The phrase can other people or imply racialized norms as the standard for acceptance.',
      replacement: 'Use neutral, respectful language centered on the actual requirement.',
      severity: 'high',
      weight: 14,
    },
  ],
  disability: [
    {
      pattern: /\b(able-bodied|must not have disabilities|normal person|fit and healthy)\b/gi,
      explanation:
        'This wording excludes people with disabilities rather than defining the essential function of the work.',
      replacement: 'Describe essential duties and note that reasonable accommodations are available.',
      severity: 'high',
      weight: 18,
    },
    {
      pattern: /\b(blind to|deaf to|crazy|insane|lame|wheelchair-bound)\b/gi,
      explanation:
        'These expressions rely on stigmatizing or ableist language that can alienate disabled people.',
      replacement: 'Use precise and respectful wording without disability-based metaphors.',
      severity: 'medium',
      weight: 10,
    },
  ],
  socioeconomic: [
    {
      pattern: /\b(polished background|elite pedigree|top-tier upbringing|wealthy background|well-bred)\b/gi,
      explanation:
        'This language can privilege class signals and social access rather than merit or readiness.',
      replacement: 'Define the experience, judgment, or skills needed without referring to class markers.',
      severity: 'high',
      weight: 16,
    },
    {
      pattern: /\b(luxury clientele only|must own a car|unpaid trial|work long hours without complaint)\b/gi,
      explanation:
        'The wording can disadvantage people with fewer financial resources or caregiving constraints.',
      replacement: 'State the true logistical needs and avoid assumptions about income, transport, or unpaid availability.',
      severity: 'medium',
      weight: 12,
    },
  ],
  ability: [
    {
      pattern: /\b(rockstar|genius|brilliant only|top 1%|superhuman|crush it)\b/gi,
      explanation:
        'This language can create exclusionary performance norms and discourage qualified applicants with different working styles.',
      replacement: 'Describe the outcomes, skills, and support structures needed for success.',
      severity: 'medium',
      weight: 10,
    },
    {
      pattern: /\b(fast-paced|thick skin|required|perfect communication|flawless english)\b/gi,
      explanation:
        'The phrase can imply narrow assumptions about cognitive style, communication style, or support needs.',
      replacement: 'Use measurable expectations and separate essential requirements from preferences.',
      severity: 'medium',
      weight: 8,
    },
  ],
};

const CATEGORY_LABELS = {
  gender: 'Gender inclusion',
  age: 'Age inclusion',
  racial: 'Race and ethnicity',
  disability: 'Disability inclusion',
  socioeconomic: 'Socioeconomic access',
  ability: 'Performance assumptions',
};

const CONTENT_TYPE_GUIDANCE = {
  GENERAL: 'Use plain, inclusive language that avoids stereotypes and broad assumptions.',
  'JOB POSTING':
    'Keep requirements essential, name accommodations, and avoid coded fit language that could create hiring risk.',
  ARTICLE: 'Attribute claims to evidence and avoid generalizing whole communities or age groups.',
  'SOCIAL MEDIA': 'Prefer people-first wording and avoid humor or shorthand that normalizes exclusion.',
  MARKETING: 'Ensure audience targeting language does not imply who is worthy, successful, or welcome.',
  EDUCATION: 'Use asset-based language and avoid framing learners by deficit or stereotype.',
};

const severityRank = { low: 1, medium: 2, high: 3 };

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function sentenceSplit(text) {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function buildRewrite(text, biases) {
  let rewritten = text;

  [...biases]
    .sort((a, b) => b.biasedPhrase.length - a.biasedPhrase.length)
    .forEach((bias) => {
      const phrasePattern = new RegExp(escapeRegExp(bias.biasedPhrase), 'i');
      rewritten = rewritten.replace(phrasePattern, bias.suggestedReplacement);
    });

  return rewritten;
}

export function analyzeText({
  text,
  contentType = 'GENERAL',
  includeAiInsights = false,
  aiInsights = null,
}) {
  const normalizedText = text.trim();
  const sentences = sentenceSplit(normalizedText);
  const biases = [];
  const categoryHits = {};
  let scoreAccumulator = 0;

  Object.entries(CATEGORY_RULES).forEach(([category, rules]) => {
    rules.forEach((rule) => {
      const matches = normalizedText.matchAll(rule.pattern);
      for (const match of matches) {
        const phrase = match[0];
        const startIndex = match.index ?? normalizedText.indexOf(phrase);
        const endIndex = startIndex + phrase.length;
        const sentence =
          sentences.find((entry) => entry.toLowerCase().includes(phrase.toLowerCase())) || '';

        const severity = rule.severity;
        biases.push({
          category,
          categoryLabel: CATEGORY_LABELS[category],
          severity,
          biasedPhrase: phrase,
          explanation: rule.explanation,
          suggestedReplacement:
            aiInsights?.replacements?.[phrase.toLowerCase()] || rule.replacement,
          startIndex,
          endIndex,
          evidence: sentence || normalizedText,
        });
        categoryHits[category] = (categoryHits[category] || 0) + 1;
        scoreAccumulator += rule.weight;
      }
    });
  });

  const overallBiasScore = Math.min(
    100,
    biases.length === 0 ? 4 : Math.max(8, Math.round(scoreAccumulator / Math.max(normalizedText.length / 240, 1)))
  );

  const riskLevel =
    overallBiasScore >= 60 || biases.some((bias) => bias.severity === 'high')
      ? 'HIGH'
      : overallBiasScore >= 30
        ? 'MEDIUM'
        : 'LOW';

  const prioritizedActions = biases
    .slice()
    .sort((a, b) => severityRank[b.severity] - severityRank[a.severity])
    .slice(0, 3)
    .map((bias) => `Replace "${bias.biasedPhrase}" with wording focused on the requirement, not the identity signal.`);

  const fairnessChecklist = [
    'Only include essential requirements and remove coded fit language.',
    'Name accommodations, flexibility, or support where relevant.',
    'Check whether the wording assumes a preferred background, age, gender, or class status.',
    'Review examples and metaphors for stigmatizing or ableist phrasing.',
  ];

  const summary =
    biases.length === 0
      ? 'The text reads as broadly inclusive with no major bias flags from the rule-based audit.'
      : `The audit found ${biases.length} issue${biases.length > 1 ? 's' : ''} across ${Object.keys(categoryHits).length} bias dimension${Object.keys(categoryHits).length > 1 ? 's' : ''}. Highest attention areas are ${Object.keys(categoryHits)
          .map((key) => CATEGORY_LABELS[key])
          .slice(0, 2)
          .join(' and ')}.`;

  const auditFocus =
    CONTENT_TYPE_GUIDANCE[contentType] || CONTENT_TYPE_GUIDANCE.GENERAL;

  const rewrittenText = buildRewrite(normalizedText, biases);

  return {
    overallBiasScore,
    riskLevel,
    biases,
    summary,
    educationalTip: auditFocus,
    rewrittenText,
    prioritizedActions,
    fairnessChecklist,
    categoryBreakdown: Object.entries(CATEGORY_LABELS).map(([key, label]) => ({
      category: key,
      label,
      count: categoryHits[key] || 0,
    })),
    meta: {
      contentType,
      analyzer: includeAiInsights ? 'hybrid-rule-plus-ai' : 'rule-based',
      reviewedAt: new Date().toISOString(),
    },
  };
}
