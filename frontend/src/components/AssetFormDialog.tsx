import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Asset, CATEGORIES, STATUSES } from '@/types/asset';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const assetSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  serialNumber: z.string().min(3, 'Número de série obrigatório'),
  category: z.enum(['Computador', 'Monitor', 'Periférico', 'Rede', 'Servidor']),
  status: z.enum(['Ativo', 'Em Manutenção', 'Inativo', 'Descartado']),
  acquisitionDate: z.string().min(1, 'Data de aquisição obrigatória'),
  description: z.string().optional(),
});

type FormData = z.infer<typeof assetSchema>;

interface AssetFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: Omit<Asset, 'id'>) => void;
  asset?: Asset | null;
}

export function AssetFormDialog({ open, onClose, onSave, asset }: AssetFormDialogProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(assetSchema),
    defaultValues: { name: '', serialNumber: '', category: 'Computador', status: 'Ativo', acquisitionDate: '', description: '' },
  });

  useEffect(() => {
    if (open) {
      if (asset) {
        form.reset({
          name: asset.name,
          serialNumber: asset.serialNumber,
          category: asset.category,
          status: asset.status,
          acquisitionDate: asset.acquisitionDate,
          description: asset.description || '',
        });
      } else {
        form.reset({ name: '', serialNumber: '', category: 'Computador', status: 'Ativo', acquisitionDate: '', description: '' });
      }
    }
  }, [open, asset, form]);

  const handleSubmit = (data: FormData) => {
    onSave(data as Omit<Asset, 'id'>);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{asset ? 'Editar Ativo' : 'Novo Ativo'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl><Input placeholder="Ex: Dell Latitude 5520" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="serialNumber" render={({ field }) => (
                <FormItem>
                  <FormLabel>Nº Série</FormLabel>
                  <FormControl><Input placeholder="Ex: DL-2024-001" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="acquisitionDate" render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Aquisição</FormLabel>
                  <FormControl><Input type="date" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="category" render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>
                      {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="status" render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>
                      {STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição (opcional)</FormLabel>
                <FormControl><Textarea placeholder="Observações sobre o ativo..." rows={3} {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
              <Button type="submit">{asset ? 'Salvar' : 'Cadastrar'}</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
