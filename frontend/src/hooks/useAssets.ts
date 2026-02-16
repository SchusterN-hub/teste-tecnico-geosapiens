import { useState, useCallback, useMemo, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Asset, AssetCategory, AssetStatus } from "@/types/asset";

const api = axios.create({
  baseURL: "http://localhost:8080/assets",
});

const statusToBackend: Record<string, string> = {
  Disponível: "AVAILABLE",
  "Em uso": "IN_USE",
  "Em manutenção": "MAINTENANCE",
  Descartado: "DISPOSED",
};

const statusToFrontend: Record<string, string> = {
  AVAILABLE: "Disponível",
  IN_USE: "Em uso",
  MAINTENANCE: "Em manutenção",
  DISPOSED: "Descartado",
};

interface Filters {
  search: string;
  category: AssetCategory | "Todas";
  status: AssetStatus | "Todos";
}

export function useAssets() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [filters, setFilters] = useState<Filters>({
    search: "",
    category: "Todas",
    status: "Todos",
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchAssets = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get("");

      const formattedAssets = response.data.map((item) => ({
        ...item,
        status: statusToFrontend[item.status] || item.status,
      }));

      setAssets(formattedAssets);
    } catch (error) {
      console.error("Erro ao buscar ativos:", error);
      toast.error("Não foi possível carregar a lista de ativos.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  const filteredAssets = useMemo(() => {
    return assets.filter((a) => {
      const matchSearch =
        !filters.search ||
        a.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        a.serialNumber.toLowerCase().includes(filters.search.toLowerCase());
      const matchCategory =
        filters.category === "Todas" || a.category === filters.category;
      const matchStatus =
        filters.status === "Todos" || a.status === filters.status;
      return matchSearch && matchCategory && matchStatus;
    });
  }, [assets, filters]);

  const addAsset = useCallback(
    async (data: Omit<Asset, "id">) => {
      const payload = {
        ...data,
        status: statusToBackend[data.status as string] || "AVAILABLE",
      };

      const promise = api.post("", payload);

      toast.promise(promise, {
        loading: "Salvando ativo...",
        success: () => {
          fetchAssets();
          return "Ativo cadastrado com sucesso!";
        },
        error: (err) => {
          return err.response?.data || "Erro ao salvar ativo.";
        },
      });

      return await promise;
    },
    [fetchAssets],
  );

  const updateAsset = useCallback(
    async (id: number, data: Omit<Asset, "id">) => {
      const payload = {
        ...data,
        status: statusToBackend[data.status as string] || "AVAILABLE",
      };

      const promise = api.put(`/${id}`, payload);

      toast.promise(promise, {
        loading: "Atualizando ativo...",
        success: () => {
          fetchAssets();
          return "Ativo atualizado com sucesso!";
        },
        error: (err) => {
          return err.response?.data || "Erro ao atualizar ativo.";
        },
      });

      return await promise;
    },
    [fetchAssets],
  );

  const deleteAsset = useCallback(async (id: number) => {
    const promise = api.delete(`/${id}`);

    toast.promise(promise, {
      loading: "Excluindo...",
      success: () => {
        setAssets((prev) => prev.filter((a) => a.id !== id));
        return "Ativo excluído com sucesso!";
      },
      error: (err) => {
        return err.response?.data || "Erro ao excluir ativo.";
      },
    });

    return await promise;
  }, []);

  const stats = useMemo(
    () => ({
      total: assets.length,
      active: assets.filter((a) => a.status === "Em uso").length,
      maintenance: assets.filter((a) => a.status === "Em manutenção").length,
      inactive: assets.filter((a) => a.status === "Disponível").length,
      disposed: assets.filter((a) => a.status === "Descartado").length,
    }),
    [assets],
  );

  return {
    assets: filteredAssets,
    filters,
    setFilters,
    addAsset,
    updateAsset,
    deleteAsset,

    stats: useMemo(
      () => ({
        total: assets.length,
        active: assets.filter((a) => a.status === "Em uso").length,
        maintenance: assets.filter((a) => a.status === "Em manutenção").length,
        inactive: assets.filter((a) => a.status === "Disponível").length,
        disposed: assets.filter((a) => a.status === "Descartado").length,
      }),
      [assets],
    ),
    isLoading,
  };
}
