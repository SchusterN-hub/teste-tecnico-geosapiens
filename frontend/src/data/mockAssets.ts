import { Asset } from '@/types/asset';

export const initialAssets: Asset[] = [
  { id: '1', name: 'Dell Latitude 5520', serialNumber: 'DL-2024-001', category: 'Computador', status: 'Ativo', acquisitionDate: '2024-03-15', description: 'Notebook para equipe de desenvolvimento' },
  { id: '2', name: 'Dell UltraSharp U2723QE', serialNumber: 'DU-2024-002', category: 'Monitor', status: 'Ativo', acquisitionDate: '2024-03-15', description: 'Monitor 4K 27"' },
  { id: '3', name: 'Logitech MX Master 3S', serialNumber: 'LG-2024-003', category: 'Periférico', status: 'Ativo', acquisitionDate: '2024-04-01' },
  { id: '4', name: 'Cisco Catalyst 9200', serialNumber: 'CC-2023-004', category: 'Rede', status: 'Em Manutenção', acquisitionDate: '2023-08-20', description: 'Switch de rede principal' },
  { id: '5', name: 'HP ProLiant DL380', serialNumber: 'HP-2023-005', category: 'Servidor', status: 'Ativo', acquisitionDate: '2023-06-10', description: 'Servidor de aplicações' },
  { id: '6', name: 'Lenovo ThinkPad X1 Carbon', serialNumber: 'LN-2024-006', category: 'Computador', status: 'Ativo', acquisitionDate: '2024-01-20' },
  { id: '7', name: 'Samsung Odyssey G7', serialNumber: 'SM-2023-007', category: 'Monitor', status: 'Inativo', acquisitionDate: '2023-02-14', description: 'Monitor curvo 32" - defeito na tela' },
  { id: '8', name: 'Teclado Mecânico HyperX', serialNumber: 'HX-2024-008', category: 'Periférico', status: 'Descartado', acquisitionDate: '2022-11-05' },
  { id: '9', name: 'Dell PowerEdge R740', serialNumber: 'DP-2022-009', category: 'Servidor', status: 'Em Manutenção', acquisitionDate: '2022-04-18', description: 'Servidor de banco de dados' },
  { id: '10', name: 'Ubiquiti UniFi AP', serialNumber: 'UB-2024-010', category: 'Rede', status: 'Ativo', acquisitionDate: '2024-05-02', description: 'Access point Wi-Fi 6' },
];
