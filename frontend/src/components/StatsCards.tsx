import { Monitor, CheckCircle, Wrench, Package, Box } from "lucide-react";

interface StatsCardsProps {
  stats: {
    total: number;
    active: number;
    maintenance: number;
    inactive: number;
    disposed: number;
  };
}

const cards = [
  {
    key: "total" as const,
    label: "Total de Ativos",
    icon: Box,
    color: "text-primary",
    bg: "bg-primary/10",
  },

  {
    key: "inactive" as const,
    label: "Disponíveis",
    icon: CheckCircle,
    color: "text-emerald-600",
    bg: "bg-emerald-100",
  },

  {
    key: "maintenance" as const,
    label: "Em Manutenção",
    icon: Wrench,
    color: "text-amber-600",
    bg: "bg-amber-100",
  },

  {
    key: "active" as const,
    label: "Em Uso",
    icon: Monitor,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
];

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ key, label, icon: Icon, color, bg }) => (
        <div
          key={key}
          className="bg-card rounded-lg border p-5 flex items-center gap-4 hover:shadow-sm transition-shadow"
        >
          <div className={`${color} ${bg} p-3 rounded-lg`}>
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
