import { useState, useCallback, useMemo } from 'react';
import { Asset, AssetCategory, AssetStatus } from '@/types/asset';
import { initialAssets } from '@/data/mockAssets';

interface Filters {
  search: string;
  category: AssetCategory | 'Todas';
  status: AssetStatus | 'Todos';
}

export function useAssets() {
  const [assets, setAssets] = useState<Asset[]>(initialAssets);
  const [filters, setFilters] = useState<Filters>({ search: '', category: 'Todas', status: 'Todos' });

  const filteredAssets = useMemo(() => {
    return assets.filter((a) => {
      const matchSearch = !filters.search || 
        a.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        a.serialNumber.toLowerCase().includes(filters.search.toLowerCase());
      const matchCategory = filters.category === 'Todas' || a.category === filters.category;
      const matchStatus = filters.status === 'Todos' || a.status === filters.status;
      return matchSearch && matchCategory && matchStatus;
    });
  }, [assets, filters]);

  const addAsset = useCallback((data: Omit<Asset, 'id'>) => {
    const newAsset: Asset = { ...data, id: crypto.randomUUID() };
    setAssets((prev) => [newAsset, ...prev]);
  }, []);

  const updateAsset = useCallback((id: string, data: Omit<Asset, 'id'>) => {
    setAssets((prev) => prev.map((a) => (a.id === id ? { ...data, id } : a)));
  }, []);

  const deleteAsset = useCallback((id: string) => {
    setAssets((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const stats = useMemo(() => ({
    total: assets.length,
    active: assets.filter((a) => a.status === 'Ativo').length,
    maintenance: assets.filter((a) => a.status === 'Em Manutenção').length,
    inactive: assets.filter((a) => a.status === 'Inativo' || a.status === 'Descartado').length,
  }), [assets]);

  return { assets: filteredAssets, filters, setFilters, addAsset, updateAsset, deleteAsset, stats };
}
