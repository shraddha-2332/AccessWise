import { useEffect } from 'react';

export function useKeyboardShortcuts(onAnalyze, onClear) {
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ctrl+Enter or Cmd+Enter to analyze
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        onAnalyze?.();
      }
      // Escape to clear
      if (e.key === 'Escape') {
        onClear?.();
      }
      // Ctrl+Shift+K for theme toggle (standard in many apps)
      if (e.ctrlKey && e.shiftKey && e.key === 'K') {
        e.preventDefault();
        const themeButton = document.querySelector('[title="Toggle theme"]');
        themeButton?.click();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onAnalyze, onClear]);
}

export const SHORTCUTS = [
  { key: 'Ctrl+Enter', description: 'Analyze text' },
  { key: 'Escape', description: 'Clear text' },
  { key: 'Ctrl+Shift+K', description: 'Toggle theme' }
];
