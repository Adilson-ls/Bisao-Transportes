import { useState } from 'react';

export const useQuote = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitQuote = async (formData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/quote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        alert('Orçamento solicitado com sucesso! Entraremos em contato em breve.');
        return true;
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Erro ao enviar solicitação. Tente novamente.');
        return false;
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Erro ao enviar solicitação. Verifique sua conexão e tente novamente.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    submitQuote,
    isLoading,
    error
  };
};