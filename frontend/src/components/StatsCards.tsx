import { Monitor, CheckCircle, Wrench, XCircle } from 'lucide-react';

interface StatsCardsProps {
  stats: { total: number; active: number; maintenance: number; inactive: number };
}

const cards = [
  { key: 'total' as const, label: 'Total de Ativos', icon: Monitor, color: 'text-primary' },
  { key: 'active' as const, label: 'Ativos', icon: CheckCircle, color: 'text-success' },
  { key: 'maintenance' as const, label: 'Em Manutenção', icon: Wrench, color: 'text-warning' },
  { key: 'inactive' as const, label: 'Inativos', icon: XCircle, color: 'text-destructive' },
];

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ key, label, icon: Icon, color }) => (
        <div key={key} className="bg-card rounded-lg border p-5 flex items-center gap-4">
          <div className={`${color} p-2.5 rounded-lg bg-muted`}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-2xl font-bold">{stats[key]}</p>
            <p className="text-sm text-muted-foreground">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
