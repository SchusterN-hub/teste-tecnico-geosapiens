export type AssetCategory = 'Computador' | 'Monitor' | 'Periférico' | 'Rede' | 'Servidor';
export type AssetStatus = 'Ativo' | 'Em Manutenção' | 'Inativo' | 'Descartado';

export interface Asset {
  id: string;
  name: string;
  serialNumber: string;
  category: AssetCategory;
  status: AssetStatus;
  acquisitionDate: string;
  description?: string;
}

export const CATEGORIES: AssetCategory[] = ['Computador', 'Monitor', 'Periférico', 'Rede', 'Servidor'];
export const STATUSES: AssetStatus[] = ['Ativo', 'Em Manutenção', 'Inativo', 'Descartado'];
