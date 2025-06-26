// Tipos TypeScript para entidades do sistema
export type Cliente = {
  id: string;
  nome: string;
  email: string;
  // ...outros campos
};

export type Motorista = {
  id: string;
  nome: string;
  cnh: string;
  // ...outros campos
};

export type Frete = {
  id: string;
  origem: string;
  destino: string;
  valor: number;
  // ...outros campos
};
