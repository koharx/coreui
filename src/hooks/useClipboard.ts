import { useState } from 'react';

function useClipboard(timeout = 2000): [ (text: string) => Promise<void>, boolean ] {
  const [copied, setCopied] = useState(false);

  const copy = async (text: string) => {
    if (navigator && navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), timeout);
    }
  };

  return [copy, copied];
}

export default useClipboard; 