import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ReturnStatus } from '@/types/order';
import { Search, Filter, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OrderFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFilter: ReturnStatus | 'all';
  onFilterChange: (filter: ReturnStatus | 'all') => void;
}

const filters: { value: ReturnStatus | 'all'; label: string; color?: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending', color: 'bg-warning/10 text-warning' },
  { value: 'requested', label: 'Requested', color: 'bg-primary/10 text-primary' },
  { value: 'in-transit', label: 'In Transit', color: 'bg-primary/10 text-primary' },
  { value: 'received', label: 'Received', color: 'bg-success/10 text-success' },
  { value: 'processed', label: 'Completed', color: 'bg-success/10 text-success' },
  { value: 'overdue', label: 'Overdue', color: 'bg-destructive/10 text-destructive' },
];

export function OrderFilters({ searchQuery, onSearchChange, activeFilter, onFilterChange }: OrderFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search orders..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 pr-9"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap gap-2">
        <div className="flex items-center gap-2 mr-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Filter:</span>
        </div>
        {filters.map((filter) => (
          <Button
            key={filter.value}
            variant={activeFilter === filter.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => onFilterChange(filter.value)}
            className={cn(
              'rounded-full text-xs',
              activeFilter === filter.value && 'shadow-md'
            )}
          >
            {filter.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
