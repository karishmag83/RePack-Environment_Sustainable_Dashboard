import { Order } from '@/types/order';
import { StatusBadge } from './StatusBadge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Recycle, ArrowRight, Calendar } from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface OrderCardProps {
  order: Order;
  onStartReturn: (order: Order) => void;
  onTrackReturn: (order: Order) => void;
}

export function OrderCard({ order, onStartReturn, onTrackReturn }: OrderCardProps) {
  const canStartReturn = order.returnStatus === 'pending' || order.returnStatus === 'overdue';
  const canTrack = order.returnStatus === 'requested' || order.returnStatus === 'in-transit' || order.returnStatus === 'received';

  return (
    <Card className="overflow-hidden border-border/50 bg-card shadow-elegant transition-all duration-300 hover:shadow-lg hover:border-primary/20 animate-fade-in">
      <div className="flex flex-col sm:flex-row">
        {/* Product Image */}
        <div className="relative h-48 sm:h-auto sm:w-32 md:w-40 flex-shrink-0">
          <img
            src={order.productImage}
            alt={order.productName}
            className="h-full w-full object-cover"
          />
          {order.isReusable && (
            <div className="absolute top-2 left-2 rounded-full bg-primary p-1.5 shadow-md">
              <Recycle className="h-4 w-4 text-primary-foreground" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between p-4 md:p-5">
          <div>
            <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Order #{order.orderNumber}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-foreground">
                  {order.productName}
                </h3>
              </div>
              <StatusBadge status={order.returnStatus} />
            </div>

            <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>Ordered: {format(parseISO(order.orderDate), 'MMM d, yyyy')}</span>
              </div>
              {order.returnDeadline && (
                <div className="flex items-center gap-1.5">
                  <Recycle className="h-4 w-4" />
                  <span>
                    Return by: {format(parseISO(order.returnDeadline), 'MMM d, yyyy')}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-4 flex items-center justify-between">
            {order.trackingNumber && (
              <p className="text-xs text-muted-foreground">
                Tracking: {order.trackingNumber}
              </p>
            )}
            {canStartReturn && (
              <Button
                variant="hero"
                size="sm"
                onClick={() => onStartReturn(order)}
                className="ml-auto"
              >
                Start Return
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
            {canTrack && (
              <Button 
                variant="soft" 
                size="sm" 
                className="ml-auto"
                onClick={() => onTrackReturn(order)}
              >
                Track Return
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
            {order.returnStatus === 'processed' && (
              <span className="ml-auto text-sm font-medium text-success">
                ✓ Complete
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
