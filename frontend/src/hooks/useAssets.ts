import { useState, useCallback, useMemo, useEffect } from "react";
import { Asset, AssetCategory, AssetStatus } from "@/types/asset";

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
      const response = await fetch("http://localhost:8080/assets");
      if (!response.ok) throw new Error("Erro no servidor ao buscar os ativos");

      const data = await response.json();

      const formattedAssets = data.map((item) => ({
        ...item,
        status: statusToFrontend[item.status] || item.status,
      }));

      setAssets(formattedAssets);
    } catch (error) {
      console.error("Erro no fetch:", error);
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
      try {
        const payload = {
          ...data,

          status: statusToBackend[data.status as string] || "AVAILABLE",
        };

        const response = await fetch("http://localhost:8080/assets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const txt = await response.text();
          throw new Error(txt);
        }

        await fetchAssets();
      } catch (error) {
        console.error(error);
        alert("Erro ao salvar. Verifique se o Nº de Série já existe.");
      }
    },
    [fetchAssets],
  );

  const updateAsset = useCallback(
    async (id: number, data: Omit<Asset, "id">) => {
      try {
        const payload = {
          ...data,
          status: statusToBackend[data.status as string] || "AVAILABLE",
        };

        const response = await fetch(`http://localhost:8080/assets/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error("Erro ao atualizar");
        await fetchAssets();
      } catch (error) {
        console.error(error);
        alert("Erro ao atualizar ativo.");
      }
    },
    [fetchAssets],
  );

  const deleteAsset = useCallback(async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este ativo?")) return;
    try {
      const response = await fetch(`http://localhost:8080/assets/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Falha ao deletar");

      setAssets((prev) => prev.filter((a) => a.id !== id));
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir.");
    }
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
    stats,
    isLoading,
  };
}
