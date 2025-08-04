import { useRef, useEffect } from 'react';

export function useEnterToNextInput(formId = 'form') {
  const formRef = useRef(null);

  useEffect(() => {
    const form = document.getElementById(formId);
    if (!form) return;

    const inputs = Array.from(form.querySelectorAll('input, select, textarea'))
      .filter((el) => el.type !== 'hidden' && !el.disabled);

    const handleKeyDown = (e, index) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const next = inputs[index + 1];
        if (next) {
          next.focus();
        } else {
          const submitButton = form.querySelector('button[type="submit"]');
          if (submitButton) submitButton.focus();
        }
      }
    };

    inputs.forEach((input, i) => {
      input.addEventListener('keydown', (e) => handleKeyDown(e, i));
    });

    return () => {
      inputs.forEach((input, i) => {
        input.removeEventListener('keydown', (e) => handleKeyDown(e, i));
      });
    };
  }, [formId]);

  return formRef;
}
