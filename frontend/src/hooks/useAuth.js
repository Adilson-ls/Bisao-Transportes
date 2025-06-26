// Exemplo de hook customizado para autenticação
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export function useAuth() {
  return useContext(AuthContext);
}
