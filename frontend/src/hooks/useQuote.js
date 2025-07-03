import { useState } from 'react';
import { API_CONFIG, SUCCESS_MESSAGES, ERROR_MESSAGES } from '../constants';

export const useQuote = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitQuote = async (formData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.QUOTES}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        alert(SUCCESS_MESSAGES.QUOTE_SUBMITTED);
        return true;
      } else {
        const errorData = await response.json();
        setError(errorData.detail || ERROR_MESSAGES.SERVER_ERROR);
        return false;
      }
    } catch (error) {
      console.error('Error:', error);
      setError(ERROR_MESSAGES.NETWORK_ERROR);
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