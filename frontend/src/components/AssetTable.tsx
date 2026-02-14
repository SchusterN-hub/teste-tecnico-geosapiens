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
import { Pencil, Trash2 } from "lucide-react";

interface AssetTableProps {
  assets: Asset[];
  onEdit: (asset: Asset) => void;
  onDelete: (id: number) => void;
}

const statusVariant: Record<string, string> = {
  Disponível:
    "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
  "Em uso": "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100",
  "Em manutenção":
    "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100",
  Descartado: "bg-red-100 text-red-700 border-red-200 hover:bg-red-100",
};

export function AssetTable({ assets, onEdit, onDelete }: AssetTableProps) {
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
            <TableHead className="font-semibold">Nome</TableHead>
            <TableHead className="font-semibold">Nº Série</TableHead>
            <TableHead className="font-semibold">Categoria</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold">Data Aquisição</TableHead>
            <TableHead className="font-semibold text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assets.map((asset) => (
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
                    onClick={() => onEdit(asset)}
                    className="h-8 w-8"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(asset.id)}
                    className="h-8 w-8 text-destructive hover:text-destructive"
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
