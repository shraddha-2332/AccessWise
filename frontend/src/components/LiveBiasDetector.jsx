import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiZap } from 'react-icons/fi';

export function LiveBiasDetector({ text }) {
  const [biasScore, setBiasScore] = useState(0);
  const [highlightedText, setHighlightedText] = useState(text);

  useEffect(() => {
    // Simple heuristic bias detection for instant feedback
    const biasKeywords = {
      gender: /\b(girls|boys|men|women|ladies|guys|manpower|actress|steward)\b/gi,
      age: /\b(young|energetic|digital natives|old|elderly|millennials)\b/gi,
      race: /\b(diverse|minority|immigrant|foreigner|exotic)\b/gi,
      disability: /\b(able-bodied|normal|disabled|wheelchair|blind|deaf)\b/gi,
      socioeconomic: /\b(wealthy|poor|privileged|underprivileged|luxury)\b/gi,
      ability: /\b(perfect|ideal|brilliant|dummy|stupid)\b/gi
    };

    let foundBiases = 0;
    let highlighted = text;

    Object.values(biasKeywords).forEach(pattern => {
      const matches = text.match(pattern);
      if (matches) foundBiases += matches.length;

      highlighted = highlighted.replace(pattern, (match) => 
        `<mark style="background: #fbbf24; padding: 2px 4px; border-radius: 3px;">${match}</mark>`
      );
    });

    // Calculate score based on text length and bias frequency
    const score = Math.min(100, Math.round((foundBiases / Math.max(text.length / 50, 1)) * 20));
    setBiasScore(score);
    setHighlightedText(highlighted);
  }, [text]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-gray-700 flex items-center gap-2">
          <FiZap size={16} className="text-yellow-500" /> Live Bias Score
        </p>
        <span className={`text-2xl font-black ${
          biasScore > 60 ? 'text-red-500' :
          biasScore > 30 ? 'text-yellow-500' :
          'text-green-500'
        }`}>
          {biasScore}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <motion.div
          animate={{ width: `${biasScore}%` }}
          className={`h-full rounded-full transition-colors ${
            biasScore > 60 ? 'bg-red-500' :
            biasScore > 30 ? 'bg-yellow-500' :
            'bg-green-500'
          }`}
        />
      </div>
    </div>
  );
}
