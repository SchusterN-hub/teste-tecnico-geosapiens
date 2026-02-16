import { useState } from "react";
import { Plus, Package } from "lucide-react";
import { Asset } from "@/types/asset";
import { useAssets } from "@/hooks/useAssets";
import { StatsCards } from "@/components/StatsCards";
import { AssetFilters } from "@/components/AssetFilters";
import { AssetTable } from "@/components/AssetTable";
import { AssetFormDialog } from "@/components/AssetFormDialog";
import { DeleteConfirmDialog } from "@/components/DeleteConfirmDialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Index = () => {
  const {
    assets,
    filters,
    setFilters,
    addAsset,
    updateAsset,
    deleteAsset,
    stats,
  } = useAssets();

  const [formOpen, setFormOpen] = useState(false);

  const [editingAsset, setEditingAsset] = useState<Partial<Asset> | null>(null);

  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleEdit = (asset: Asset) => {
    setEditingAsset(asset);
    setFormOpen(true);
  };

  const handleDuplicate = (asset: Asset) => {
    const { id, ...assetData } = asset;

    setEditingAsset({
      ...assetData,
      name: `${assetData.name} - Cópia`,
    });
    setFormOpen(true);
  };

  const handleSave = (data: Omit<Asset, "id">) => {
    if (editingAsset?.id) {
      updateAsset(editingAsset.id, data);
      toast.success("Ativo atualizado com sucesso!");
    } else {
      addAsset(data);
      toast.success("Ativo cadastrado com sucesso!");
    }
  };

  const handleDelete = () => {
    if (deleteId !== null) {
      deleteAsset(deleteId);
      toast.success("Ativo excluído com sucesso!");
      setDeleteId(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-accent p-2 rounded-lg">
              <Package className="h-6 w-6 text-accent-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">
                Asset Manager
              </h1>
              <p className="text-sm text-primary-foreground/70">
                Gerenciamento de Ativos Corporativos
              </p>
            </div>
          </div>
          <Button
            onClick={() => {
              setEditingAsset(null);
              setFormOpen(true);
            }}
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Novo Ativo
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        <StatsCards stats={stats} />
        <AssetFilters filters={filters} onChange={setFilters} />

        <AssetTable
          assets={assets}
          onEdit={handleEdit}
          onDelete={setDeleteId}
          onDuplicate={handleDuplicate}
        />
      </main>

      {/* Dialogs */}
      <AssetFormDialog
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditingAsset(null);
        }}
        onSave={handleSave}
        asset={editingAsset}
      />

      <DeleteConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default Index;
