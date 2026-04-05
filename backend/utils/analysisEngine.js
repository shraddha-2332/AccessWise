const PLAYBOOKS = {
  scholarship: {
    title: 'Scholarship and financial aid portal review',
    guidance:
      'Lower stress, reduce documentation confusion, and make deadlines, support paths, and device expectations explicit for first-time applicants.',
  },
  healthcare: {
    title: 'Healthcare booking and patient intake review',
    guidance:
      'Healthcare service text should be calm, medically understandable, and accessible to people who need help, translation, or more time.',
  },
  jobs: {
    title: 'Job application portal review',
    guidance:
      'Application instructions should focus on essential requirements, reasonable flexibility, and support for low-bandwidth or first-time applicants.',
  },
  civic: {
    title: 'Civic and public service portal review',
    guidance:
      'Government-facing flows should be multilingual-ready, low-friction, and realistic for people without premium devices, digital payments, or prior system knowledge.',
  },
  education: {
    title: 'Education service and learner portal review',
    guidance:
      'Learner-facing platforms should reduce shame, explain steps clearly, and support students who need orientation or repeated guidance.',
  },
};

const ISSUE_RULES = [
  {
    id: 'time-pressure',
    category: 'Deadline pressure',
    severity: 'high',
    patterns: [/\b(one session|one sitting|before midnight|immediately|without delay|automatically rejected|instant rejection)\b/gi],
    title: 'The service copy creates high-pressure completion conditions',
    whyItMatters:
      'Strict time pressure can lock out users with unstable internet, shared devices, caregiving duties, or accessibility needs.',
    stakeholderImpact:
      'People who cannot complete the process quickly may abandon the service or lose access to an essential opportunity.',
    saferAlternative:
      'Allow save-and-resume flows, state deadlines clearly, and mention what support exists if the process cannot be completed in one attempt.',
  },
  {
    id: 'access-needs',
    category: 'Accessibility support',
    severity: 'high',
    patterns: [/\b(without assistance|normal users|must be healthy|elderly people are expected|no exceptions|do not contact support)\b/gi],
    title: 'The flow assumes every user can navigate the service without support',
    whyItMatters:
      'Essential digital services should anticipate disability, low confidence, caregiver needs, and translation or support requirements.',
    stakeholderImpact:
      'People who need accommodations or clarification may feel unwelcome before they even begin the process.',
    saferAlternative:
      'Mention help channels, accommodations, assistive options, and alternative completion paths in the service instructions.',
  },
  {
    id: 'readability-barrier',
    category: 'Plain language',
    severity: 'medium',
    patterns: [/\b(full policy notice|medical terms|already know the process|perfectly|polished background|stable high-speed connection)\b/gi],
    title: 'The service relies on prior knowledge or advanced reading confidence',
    whyItMatters:
      'Dense or insider language increases cognitive load and makes essential services harder to complete for new or stressed users.',
    stakeholderImpact:
      'Users may misunderstand a step, submit the wrong information, or give up because the process feels written for insiders.',
    saferAlternative:
      'Use shorter instructions, explain specialized terms, and break the process into plain-language steps with examples.',
  },
  {
    id: 'documentation-burden',
    category: 'Documentation burden',
    severity: 'medium',
    patterns: [/\b(all documents|every certificate|attach all documents perfectly|digital payment access|personal laptops)\b/gi],
    title: 'The service appears to require privileged tools or perfect document readiness',
    whyItMatters:
      'People using community devices, shared scanners, or incomplete records may be shut out even when they are eligible.',
    stakeholderImpact:
      'Users can be screened out by logistics rather than true eligibility, especially in low-resource or rural contexts.',
    saferAlternative:
      'Clarify which documents are essential, allow staged uploads when possible, and suggest fallback channels for missing materials.',
  },
  {
    id: 'language-exclusion',
    category: 'Language inclusion',
    severity: 'high',
    patterns: [/\b(perfect English|clean accent|in English|English only)\b/gi],
    title: 'The service expects one language standard or accent norm',
    whyItMatters:
      'Language-heavy essential services can exclude multilingual users or people who understand the process better in another language.',
    stakeholderImpact:
      'Applicants may interpret the service as designed for insiders with stronger language privilege, not for everyone eligible.',
    saferAlternative:
      'Offer multilingual guidance, use simple language, and separate true communication requirements from avoidable language gatekeeping.',
  },
  {
    id: 'shame-framing',
    category: 'Dignity and tone',
    severity: 'medium',
    patterns: [/\b(slow learners|beginners may struggle|should already know|avoid asking for repeated clarification)\b/gi],
    title: 'The service copy frames support-seeking users as a problem',
    whyItMatters:
      'People are less likely to seek help when the interface suggests that confusion or repeated questions are a personal failure.',
    stakeholderImpact:
      'Students, patients, and citizens can disengage from essential systems that make them feel judged or behind.',
    saferAlternative:
      'Use supportive language that normalizes questions, orientation, and step-by-step guidance.',
  },
  {
    id: 'malicious-intent',
    category: 'Malicious or adversarial intent',
    severity: 'high',
    patterns: [/\b(hacker|hack|exploit|bypass|phishing|malware|ransomware|steal data|steal money|fraud|scam|attack the system|break into|ddos)\b/gi],
    title: 'The content signals malicious, deceptive, or adversarial intent',
    whyItMatters:
      'Public-facing service content should never normalize cyber abuse, fraud, deception, or instructions that undermine safety and trust.',
    stakeholderImpact:
      'Users, staff, and systems could be exposed to security risk, reputational damage, or direct harm if malicious wording is allowed into a live flow.',
    saferAlternative:
      'Replace the text with a legitimate, user-safe instruction that supports secure access, clear identity verification, and lawful service use.',
  },
  {
    id: 'hostile-language',
    category: 'Unsafe or hostile language',
    severity: 'high',
    patterns: [/\b(i hate you|kill|destroy|attack you|threaten|abuse users|harass|terrorize|hurt people|violent)\b/gi],
    title: 'The content contains hostile or threatening language',
    whyItMatters:
      'Hostile language breaks trust immediately and is unacceptable in systems that people rely on for essential information or services.',
    stakeholderImpact:
      'People may feel unsafe, targeted, or manipulated, which can create serious product, policy, and brand risk.',
    saferAlternative:
      'Use neutral, respectful wording focused on lawful actions, user safety, and clear next-step guidance.',
  },
];

const severityWeight = { low: 12, medium: 22, high: 34 };

function splitSentences(text) {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function rewriteDraft(text, findings) {
  let rewritten = text;
  const uniqueFindings = [];

  findings.forEach((finding) => {
    if (!uniqueFindings.some((entry) => entry.trigger.toLowerCase() === finding.trigger.toLowerCase())) {
      uniqueFindings.push(finding);
    }
  });

  uniqueFindings
    .sort((a, b) => b.trigger.length - a.trigger.length)
    .forEach((finding) => {
      rewritten = rewritten.replace(
        new RegExp(escapeRegExp(finding.trigger), 'i'),
        finding.recommendedText
      );
    });

  return rewritten;
}

function buildStakeholderImpacts(findings) {
  const hasCriticalTrustRisk = findings.some((item) =>
    ['Accessibility support', 'Language inclusion', 'Malicious or adversarial intent', 'Unsafe or hostile language'].includes(item.category)
  );

  return [
    {
      stakeholder: 'Service users',
      level: findings.some((item) => item.severity === 'high') ? 'high' : findings.length ? 'medium' : 'low',
      summary:
        findings.length === 0
          ? 'The service copy is unlikely to block the intended audience based on the current rule set.'
          : 'Some people may be locked out, confused, discouraged, or directly exposed to unsafe content before they complete the core task.',
    },
    {
      stakeholder: 'Trust and compliance',
      level: hasCriticalTrustRisk ? 'high' : findings.length ? 'medium' : 'low',
      summary:
        findings.length === 0
          ? 'No major trust or accessibility signals were detected.'
          : 'The launch creates avoidable inclusion, safety, and reputation risk if shipped without remediation.',
    },
    {
      stakeholder: 'Operations and support',
      level: findings.length >= 4 ? 'high' : findings.length >= 2 ? 'medium' : 'low',
      summary:
        findings.length === 0
          ? 'Minimal remediation effort should be required.'
          : 'Shipping as-is could create extra drop-off, support requests, manual follow-up, incident response, and preventable escalation.',
    },
  ];
}

function buildPersonaSimulations(findings, contentType) {
  const hasCategory = (category) => findings.some((item) => item.category === category);
  const hasHighSeverity = findings.some((item) => item.severity === 'high');
  const hasUnsafeIntent = hasCategory('Malicious or adversarial intent') || hasCategory('Unsafe or hostile language');

  const personas = [
    {
      persona: 'First-time applicant',
      friction: hasUnsafeIntent
        ? 'The wording feels unsafe or illegitimate, so this user may abandon the service immediately.'
        : hasCategory('Plain language') || hasCategory('Documentation burden')
          ? 'The flow feels written for insiders and may be hard to finish without repeated clarification.'
          : 'The flow is understandable enough for a new user with basic orientation.',
      riskLevel: hasUnsafeIntent ? 'high' : hasCategory('Plain language') || hasCategory('Documentation burden') ? 'medium' : 'low',
      recommendation: 'Use safe, legitimate service language and break the process into simpler steps with visible support cues.',
    },
    {
      persona: 'Low-bandwidth or shared-device user',
      friction: hasUnsafeIntent
        ? 'Unsafe wording makes the service feel untrustworthy before this user can even evaluate whether the flow is real.'
        : hasCategory('Deadline pressure') || hasCategory('Documentation burden')
          ? 'Rigid timing, large document expectations, or one-session completion rules can block this user completely.'
          : 'The current copy does not strongly signal technical exclusion for this user.',
      riskLevel: hasUnsafeIntent || hasCategory('Deadline pressure') || hasCategory('Documentation burden') ? 'high' : 'low',
      recommendation: 'Add trust-building cues, reduce upload pressure, and provide fallback channels when digital completion fails.',
    },
    {
      persona: contentType === 'healthcare' ? 'Patient needing support' : 'Translation-dependent user',
      friction:
        hasUnsafeIntent
          ? 'This person may perceive the content as deceptive, threatening, or unsafe and stop immediately.'
          : hasCategory('Language inclusion') || hasCategory('Accessibility support')
            ? 'This person may not trust the flow or may stop early because support and language clarity are not visible.'
            : 'This user appears to have a workable path if support remains visible in the final interface.',
      riskLevel:
        hasUnsafeIntent || hasCategory('Language inclusion') || hasCategory('Accessibility support')
          ? 'high'
          : hasHighSeverity
            ? 'medium'
            : 'low',
      recommendation:
        contentType === 'healthcare'
          ? 'Show support options early, reduce jargon, and make assisted completion feel normal.'
          : 'Offer multilingual cues, simpler wording, and visible help paths instead of assuming strong English confidence.',
    },
  ];

  return personas;
}

export function analyzeText({ text, contentType = 'scholarship' }) {
  const normalizedText = text.trim();
  const sentences = splitSentences(normalizedText);
  const findings = [];

  ISSUE_RULES.forEach((rule) => {
    rule.patterns.forEach((pattern) => {
      const matches = normalizedText.matchAll(pattern);
      for (const match of matches) {
        const trigger = match[0];
        const sentence = sentences.find((entry) => entry.toLowerCase().includes(trigger.toLowerCase())) || normalizedText;
        findings.push({
          id: `${rule.id}-${match.index ?? 0}`,
          category: rule.category,
          severity: rule.severity,
          title: rule.title,
          trigger,
          evidence: sentence,
          whyItMatters: rule.whyItMatters,
          stakeholderImpact: rule.stakeholderImpact,
          recommendedText: rule.saferAlternative,
        });
      }
    });
  });

  const totalRisk = Math.min(100, findings.reduce((sum, item) => sum + severityWeight[item.severity], 0));
  const hasUnsafeIntent = findings.some((item) =>
    ['Malicious or adversarial intent', 'Unsafe or hostile language'].includes(item.category)
  );
  const releaseDecision =
    hasUnsafeIntent || findings.some((item) => item.severity === 'high') || totalRisk >= 65
      ? 'Block before launch'
      : totalRisk >= 28
        ? 'Needs inclusive redesign'
        : 'Ready with improvements';

  const playbook = PLAYBOOKS[contentType] || PLAYBOOKS.scholarship;
  const issueMix = [...new Set(findings.map((item) => item.category))];

  return {
    overallRiskScore: totalRisk,
    releaseDecision,
    executiveSummary:
      findings.length === 0
        ? `The service copy is broadly aligned with the ${playbook.title.toLowerCase()} playbook and does not show major inclusion barriers.`
        : hasUnsafeIntent
          ? `This text raises immediate safety and trust concerns. AccessWise detected malicious, hostile, or adversarial language that should be blocked before launch.`
          : `This service flow raises ${findings.length} inclusion issue${findings.length > 1 ? 's' : ''} across ${issueMix.length} risk area${issueMix.length > 1 ? 's' : ''}. The strongest barriers are ${issueMix.slice(0, 2).join(' and ')}.`,
    findings,
    stakeholderImpacts: buildStakeholderImpacts(findings),
    personaSimulations: buildPersonaSimulations(findings, contentType),
    actionPlan: hasUnsafeIntent
      ? [
          'Block this content from release immediately and replace it with legitimate, user-safe service language.',
          'Review the source of the wording for malicious intent, deception, or policy violations before continuing the workflow.',
          'Add moderation or approval checks so unsafe text cannot enter future public-facing service flows.',
        ]
      : findings.length
        ? [
            'Rewrite the highest-friction instructions in plain language with shorter steps and calmer tone.',
            'Add explicit support paths, accommodations, and fallback channels for users who cannot complete the default digital flow.',
            'Review the launch with a human lens focused on first-time users, accessibility needs, and low-resource access.',
          ]
        : [
            'Keep the audit checklist in place for future service updates.',
            'Validate with a domain reviewer if the service handles especially sensitive, regulated, or high-stakes decisions.',
          ],
    rewrittenDraft: rewriteDraft(normalizedText, findings),
    reviewChecklist: [
      'Could a first-time user finish the service without prior insider knowledge?',
      'Are support channels, accommodations, and alternative paths clearly visible?',
      'Does the language avoid shame, pressure, unnecessary complexity, and hostile tone?',
      'Does the text avoid malicious, deceptive, threatening, or adversarial intent?',
      'Would someone with low bandwidth, shared devices, or translation needs still have a fair path to completion?',
    ],
    playbook,
    meta: {
      reviewedAt: new Date().toISOString(),
      analyzer: 'accesswise-inclusive-service-engine',
      contentType,
      hasUnsafeIntent,
    },
  };
}
