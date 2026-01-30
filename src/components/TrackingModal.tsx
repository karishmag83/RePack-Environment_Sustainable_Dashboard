import { Order } from '@/types/order';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  CheckCircle,
  Clock,
  Package,
  Truck,
  X,
  MapPin,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format, parseISO } from 'date-fns';

interface TrackingModalProps {
  order: Order;
  onClose: () => void;
}

const trackingSteps = [
  { status: 'requested', label: 'Return Requested', icon: Clock, description: 'Your return has been initiated' },
  { status: 'in-transit', label: 'In Transit', icon: Truck, description: 'Package is on its way to our facility' },
  { status: 'received', label: 'Received', icon: Package, description: 'We received your package' },
  { status: 'processed', label: 'Processed', icon: CheckCircle, description: 'Return completed successfully' },
];

const statusOrder = ['pending', 'requested', 'in-transit', 'received', 'processed'];

export function TrackingModal({ order, onClose }: TrackingModalProps) {
  const currentStatusIndex = statusOrder.indexOf(order.returnStatus);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm p-4">
      <Card className="w-full max-w-lg bg-card shadow-2xl animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div>
            <h2 className="text-xl font-bold text-foreground">Track Return</h2>
            <p className="text-sm text-muted-foreground">Order #{order.orderNumber}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Product Info */}
        <div className="flex items-center gap-4 border-b border-border px-6 py-4">
          <img
            src={order.productImage}
            alt={order.productName}
            className="h-16 w-16 rounded-lg object-cover"
          />
          <div>
            <h3 className="font-medium text-foreground">{order.productName}</h3>
            <p className="text-sm text-muted-foreground">
              Ordered: {format(parseISO(order.orderDate), 'MMM d, yyyy')}
            </p>
          </div>
        </div>

        {/* Tracking Timeline */}
        <div className="px-6 py-6">
          <div className="space-y-0">
            {trackingSteps.map((step, index) => {
              const stepIndex = statusOrder.indexOf(step.status);
              const isComplete = currentStatusIndex >= stepIndex;
              const isCurrent = order.returnStatus === step.status;
              const Icon = step.icon;

              return (
                <div key={step.status} className="flex gap-4">
                  {/* Timeline */}
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-full transition-all',
                        isComplete
                          ? 'bg-success text-success-foreground'
                          : 'bg-muted text-muted-foreground',
                        isCurrent && 'ring-4 ring-success/20'
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    {index < trackingSteps.length - 1 && (
                      <div
                        className={cn(
                          'h-12 w-0.5 transition-all',
                          currentStatusIndex > stepIndex ? 'bg-success' : 'bg-muted'
                        )}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pb-8">
                    <h4
                      className={cn(
                        'font-medium',
                        isComplete ? 'text-foreground' : 'text-muted-foreground'
                      )}
                    >
                      {step.label}
                    </h4>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                    {isCurrent && (
                      <span className="mt-1 inline-block rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-success">
                        Current Status
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tracking Number */}
        {order.trackingNumber && (
          <div className="border-t border-border px-6 py-4">
            <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Tracking Number</p>
                <p className="font-mono font-medium text-foreground">{order.trackingNumber}</p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-border px-6 py-4">
          <Button variant="outline" className="w-full" onClick={onClose}>
            Close
          </Button>
        </div>
      </Card>
    </div>
  );
}
