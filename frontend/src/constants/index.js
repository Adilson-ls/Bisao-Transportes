// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001',
  ENDPOINTS: {
    QUOTES: '/api/quote',
    QUOTE_BY_ID: '/api/quote/',
    ALL_QUOTES: '/api/quotes',
    CONTACT: '/api/contact',
    HEALTH: '/api/health',
    STATS: '/api/stats'
  }
};

// Company Information
export const COMPANY_INFO = {
  NAME: 'Bisão Transportes',
  PHONE: '+351 930 460 509',
  EMAIL: 'info@bisaotransportes.pt',
  ADDRESS: 'Portugal',
  HOURS: {
    WEEKDAYS: 'Segunda a Sexta: 8h às 18h',
    SATURDAY: 'Sábado: 8h às 14h'
  }
};

// Service Types
export const SERVICE_TYPES = [
  {
    id: 'mudanca-residencial',
    name: 'Mudança Residencial',
    icon: '🏠',
    description: 'Mudanças completas para casas e apartamentos com toda segurança e cuidado.'
  },
  {
    id: 'mudanca-comercial',
    name: 'Mudança Comercial',
    icon: '🏢',
    description: 'Relocação de escritórios e empresas com mínimo impacto nas suas atividades.'
  },
  {
    id: 'frete-rapido',
    name: 'Frete Rápido',
    icon: '🚚',
    description: 'Transporte rápido e seguro de mercadorias e bens diversos.'
  },
  {
    id: 'transporte-internacional',
    name: 'Transporte Internacional',
    icon: '🌍',
    description: 'Mudanças e transportes para toda a Europa com documentação completa.'
  },
  {
    id: 'recolha-lojas',
    name: 'Recolhas em Lojas',
    icon: '🏪',
    description: 'Coleta de compras em lojas e entrega direta no seu endereço.'
  },
  {
    id: 'transporte-bens',
    name: 'Transporte de Bens',
    icon: '📦',
    description: 'Transporte seguro de móveis, eletrodomésticos e objetos especiais.'
  }
];

// Theme Colors
export const THEME_COLORS = {
  PRIMARY: {
    50: '#fef7ed',
    100: '#fdedd3',
    200: '#fad9a6',
    300: '#f6be6e',
    400: '#f19a34',
    500: '#ed7f13',
    600: '#de6509',
    700: '#b84e09',
    800: '#933f0e',
    900: '#78350f',
    950: '#41190a'
  },
  AMBER: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    950: '#451a03'
  }
};

// Form Validation Messages
export const VALIDATION_MESSAGES = {
  REQUIRED: 'Este campo é obrigatório',
  EMAIL: 'Por favor, insira um email válido',
  PHONE: 'Por favor, insira um número de telefone válido',
  MIN_LENGTH: 'Este campo deve ter pelo menos {min} caracteres',
  MAX_LENGTH: 'Este campo deve ter no máximo {max} caracteres'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  QUOTE_SUBMITTED: 'Orçamento solicitado com sucesso! Entraremos em contato em breve.',
  CONTACT_SUBMITTED: 'Mensagem enviada com sucesso! Entraremos em contato em breve.'
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Erro de conexão. Verifique sua internet e tente novamente.',
  SERVER_ERROR: 'Erro interno do servidor. Tente novamente mais tarde.',
  VALIDATION_ERROR: 'Por favor, corrija os erros no formulário.',
  UNKNOWN_ERROR: 'Erro desconhecido. Tente novamente.'
};