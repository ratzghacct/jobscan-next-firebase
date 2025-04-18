import { useCallback } from 'react';

export function useToast() {
  const toast = useCallback(({ title, description }: { title: string; description: string }) => {
    alert(`${title}\n\n${description}`);
  }, []);

  return { toast };
}
