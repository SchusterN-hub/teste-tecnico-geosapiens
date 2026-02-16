import { useState, useMemo } from "react";
import { Asset } from "@/types/asset";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Pencil,
  Trash2,
  Copy,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

interface AssetTableProps {
  assets: Asset[];
  onEdit: (asset: Asset) => void;
  onDelete: (id: number) => void;
  onDuplicate: (asset: Asset) => void;
}

const statusVariant: Record<string, string> = {
  Disponível:
    "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
  "Em uso": "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100",
  "Em manutenção":
    "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100",
  Descartado: "bg-red-100 text-red-700 border-red-200 hover:bg-red-100",
};

type SortKey = keyof Asset;
type SortDirection = "asc" | "desc";

interface SortConfig {
  key: SortKey | null;
  direction: SortDirection;
}

export function AssetTable({
  assets,
  onEdit,
  onDelete,
  onDuplicate,
}: AssetTableProps) {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "asc",
  });

  const handleSort = (key: SortKey) => {
    setSortConfig((current) => {
      if (current.key === key) {
        return {
          key,
          direction: current.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key, direction: "asc" };
    });
  };

  const sortedAssets = useMemo(() => {
    if (!sortConfig.key) return assets;

    return [...assets].sort((a, b) => {
      const aValue = a[sortConfig.key!];
      const bValue = b[sortConfig.key!];

      if (aValue === bValue) return 0;
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      const comparison = aValue < bValue ? -1 : 1;

      return sortConfig.direction === "asc" ? comparison : -comparison;
    });
  }, [assets, sortConfig]);

  const SortIcon = ({ columnKey }: { columnKey: SortKey }) => {
    if (sortConfig.key !== columnKey) {
      return <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground/50" />;
    }
    return sortConfig.direction === "asc" ? (
      <ArrowUp className="ml-2 h-4 w-4 text-primary" />
    ) : (
      <ArrowDown className="ml-2 h-4 w-4 text-primary" />
    );
  };

  const TableHeaderButton = ({
    label,
    columnKey,
  }: {
    label: string;
    columnKey: SortKey;
  }) => (
    <Button
      variant="ghost"
      onClick={() => handleSort(columnKey)}
      className="-ml-4 h-8 data-[state=open]:bg-accent hover:bg-muted/100 hover:text-slate-600 font-semibold"
    >
      {label}
      <SortIcon columnKey={columnKey} />
    </Button>
  );

  if (assets.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Nenhum ativo encontrado.
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>
              <TableHeaderButton label="Nome" columnKey="name" />
            </TableHead>
            <TableHead>
              <TableHeaderButton label="Nº Série" columnKey="serialNumber" />
            </TableHead>
            <TableHead>
              <TableHeaderButton label="Categoria" columnKey="category" />
            </TableHead>
            <TableHead>
              <TableHeaderButton label="Status" columnKey="status" />
            </TableHead>
            <TableHead>
              <TableHeaderButton
                label="Data Aquisição"
                columnKey="acquisitionDate"
              />
            </TableHead>
            <TableHead className="font-semibold text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedAssets.map((asset) => (
            <TableRow
              key={asset.id}
              className="hover:bg-muted/30 transition-colors"
            >
              <TableCell className="font-medium">{asset.name}</TableCell>
              <TableCell className="font-mono text-sm text-muted-foreground">
                {asset.serialNumber}
              </TableCell>
              <TableCell>{asset.category}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    statusVariant[asset.status as string] ||
                    "bg-gray-100 text-gray-700"
                  }
                >
                  {asset.status}
                </Badge>
              </TableCell>
              <TableCell>
                {new Date(asset.acquisitionDate).toLocaleDateString("pt-BR", {
                  timeZone: "UTC",
                })}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDuplicate(asset)}
                    title="Duplicar"
                    className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(asset)}
                    title="Editar"
                    className="h-8 w-8 text-gray-800 hover:text-gray-900 hover:bg-gray-100"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(asset.id)}
                    title="Excluir"
                    className="h-8 w-8 text-destructive/90 hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
