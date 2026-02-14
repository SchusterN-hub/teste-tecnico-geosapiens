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
  id: number;
  name: string;
  serialNumber: string;
  category: AssetCategory;
  status: AssetStatus;
  acquisitionDate: string;
  description?: string;
}
