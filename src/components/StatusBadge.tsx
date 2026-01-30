import { cn } from '@/lib/utils';
import { ReturnStatus } from '@/types/order';
import { Clock, Truck, CheckCircle, Package, AlertTriangle, Circle } from 'lucide-react';

interface StatusBadgeProps {
  status: ReturnStatus;
  size?: 'sm' | 'md';
}

const statusConfig: Record<ReturnStatus, { label: string; icon: typeof Clock; className: string }> = {
  pending: {
    label: 'Return Pending',
    icon: Circle,
    className: 'bg-warning/15 text-warning border-warning/30',
  },
  requested: {
    label: 'Requested',
    icon: Clock,
    className: 'bg-primary/15 text-primary border-primary/30',
  },
  'in-transit': {
    label: 'In Transit',
    icon: Truck,
    className: 'bg-accent/15 text-accent border-accent/30',
  },
  received: {
    label: 'Received',
    icon: Package,
    className: 'bg-success/15 text-success border-success/30',
  },
  processed: {
    label: 'Processed',
    icon: CheckCircle,
    className: 'bg-success/15 text-success border-success/30',
  },
  overdue: {
    label: 'Overdue',
    icon: AlertTriangle,
    className: 'bg-destructive/15 text-destructive border-destructive/30',
  },
};

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-medium',
        config.className,
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'
      )}
    >
      <Icon className={size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'} />
      {config.label}
    </span>
  );
}
