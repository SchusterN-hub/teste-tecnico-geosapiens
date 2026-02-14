export type AssetStatus =
  | "Disponível"
  | "Em uso"
  | "Em manutenção"
  | "Descartado";

export const STATUSES: AssetStatus[] = [
  "Disponível",
  "Em uso",
  "Em manutenção",
  "Descartado",
];

export type AssetCategory =
  | "Computador"
  | "Monitor"
  | "Periférico"
  | "Rede"
  | "Servidor";

export const CATEGORIES: AssetCategory[] = [
  "Computador",
  "Monitor",
  "Periférico",
  "Rede",
  "Servidor",
];

export interface Asset {
  id: string | number; // Aceita string (UUID do Front) ou number (ID do Java)
  name: string;
  serialNumber: string;
  category: string;
  status: AssetStatus;
  acquisitionDate: string;
  description?: string;
}
