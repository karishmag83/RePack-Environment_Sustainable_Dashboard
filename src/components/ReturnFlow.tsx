import { useState } from 'react';
import { Order, ReturnMethod } from '@/types/order';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  MapPin,
  Truck,
  QrCode,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Package,
  Printer,
  Copy,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface ReturnFlowProps {
  order: Order;
  onClose: () => void;
  onComplete: () => void;
}

const steps = [
  { id: 1, name: 'Choose Method', icon: Package },
  { id: 2, name: 'Instructions', icon: MapPin },
  { id: 3, name: 'Get Label', icon: QrCode },
  { id: 4, name: 'Confirmation', icon: CheckCircle },
];

const dropOffLocations = [
  { id: '1', name: 'Green Station Downtown', address: '123 Main St, Suite 100', distance: '0.5 mi' },
  { id: '2', name: 'EcoPoint Market', address: '456 Oak Avenue', distance: '1.2 mi' },
  { id: '3', name: 'Sustainable Hub', address: '789 Elm Street', distance: '2.0 mi' },
];

export function ReturnFlow({ order, onClose, onComplete }: ReturnFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [returnMethod, setReturnMethod] = useState<ReturnMethod | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    toast({
      title: 'Return Initiated! 🌱',
      description: 'Your return has been scheduled. Thank you for helping the planet!',
    });
    onComplete();
  };

  const copyTrackingCode = () => {
    navigator.clipboard.writeText('RPK-' + order.id.toUpperCase() + '-2024');
    toast({
      title: 'Copied!',
      description: 'Tracking code copied to clipboard.',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card shadow-2xl animate-scale-in">
        {/* Header */}
        <div className="sticky top-0 z-10 border-b border-border bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-foreground">Return Package</h2>
              <p className="text-sm text-muted-foreground">Order #{order.orderNumber}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </div>

          {/* Progress Steps */}
          <div className="mt-4 flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = step.id === currentStep;
              const isComplete = step.id < currentStep;
              return (
                <div key={step.id} className="flex items-center">
                  <div
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-full transition-all',
                      isActive && 'bg-primary text-primary-foreground shadow-md',
                      isComplete && 'bg-success text-success-foreground',
                      !isActive && !isComplete && 'bg-muted text-muted-foreground'
                    )}
                  >
                    {isComplete ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        'mx-2 h-0.5 w-8 md:w-16 transition-all',
                        isComplete ? 'bg-success' : 'bg-muted'
                      )}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step 1: Choose Method */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-lg font-semibold text-foreground">
                How would you like to return your package?
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <button
                  onClick={() => setReturnMethod({ type: 'dropoff' })}
                  className={cn(
                    'flex flex-col items-center gap-3 rounded-xl border-2 p-6 text-center transition-all hover:border-primary/50 hover:shadow-md',
                    returnMethod?.type === 'dropoff'
                      ? 'border-primary bg-primary/5 shadow-md'
                      : 'border-border'
                  )}
                >
                  <div className="rounded-full bg-primary/10 p-4">
                    <MapPin className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Drop-off</h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Bring your package to a nearby location
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => setReturnMethod({ type: 'pickup' })}
                  className={cn(
                    'flex flex-col items-center gap-3 rounded-xl border-2 p-6 text-center transition-all hover:border-primary/50 hover:shadow-md',
                    returnMethod?.type === 'pickup'
                      ? 'border-primary bg-primary/5 shadow-md'
                      : 'border-border'
                  )}
                >
                  <div className="rounded-full bg-accent/10 p-4">
                    <Truck className="h-8 w-8 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Schedule Pickup</h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      We'll pick it up from your address
                    </p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Instructions */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-lg font-semibold text-foreground">
                {returnMethod?.type === 'dropoff'
                  ? 'Select a Drop-off Location'
                  : 'Pickup Instructions'}
              </h3>

              {returnMethod?.type === 'dropoff' ? (
                <div className="space-y-3">
                  {dropOffLocations.map((location) => (
                    <button
                      key={location.id}
                      onClick={() => setSelectedLocation(location.id)}
                      className={cn(
                        'w-full flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all hover:border-primary/50',
                        selectedLocation === location.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border'
                      )}
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{location.name}</h4>
                        <p className="text-sm text-muted-foreground">{location.address}</p>
                      </div>
                      <span className="text-sm font-medium text-primary">{location.distance}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border-2 border-border p-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                        1
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">Prepare your package</h4>
                        <p className="text-sm text-muted-foreground">
                          Empty the reusable container and give it a quick rinse
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                        2
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">Attach the return label</h4>
                        <p className="text-sm text-muted-foreground">
                          Print or display the QR code on the package
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                        3
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">Leave it at your door</h4>
                        <p className="text-sm text-muted-foreground">
                          Our courier will pick it up within 24-48 hours
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Get Label */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-lg font-semibold text-foreground">Your Return Label</h3>

              {/* QR Code Mock */}
              <div className="flex flex-col items-center gap-4">
                <div className="rounded-2xl border-2 border-dashed border-primary/30 bg-card p-8">
                  <div className="relative">
                    <QrCode className="h-40 w-40 text-foreground" strokeWidth={1} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-12 w-12 rounded-lg bg-primary" />
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <p className="font-mono text-lg font-bold text-foreground">
                    RPK-{order.id.toUpperCase()}-2024
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Scan this code at any drop-off point
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={copyTrackingCode}>
                    <Copy className="h-4 w-4" />
                    Copy Code
                  </Button>
                  <Button variant="secondary">
                    <Printer className="h-4 w-4" />
                    Print Label
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 4 && (
            <div className="space-y-6 text-center animate-fade-in">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success/20">
                <CheckCircle className="h-12 w-12 text-success" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-foreground">You're All Set!</h3>
                <p className="mt-2 text-muted-foreground">
                  Thank you for choosing to return your reusable packaging. Together, we're making a
                  difference! 🌍
                </p>
              </div>

              <div className="rounded-xl bg-primary/5 p-4">
                <p className="text-sm font-medium text-primary">
                  💚 This return saves approximately 2.5 lbs of CO₂ emissions
                </p>
              </div>

              <div className="rounded-xl border border-border p-4 text-left">
                <h4 className="font-medium text-foreground">Next Steps</h4>
                <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Return initiated successfully
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    Drop off your package within 7 days
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    Earn 50 eco-points once processed
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 border-t border-border bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={currentStep === 1 ? onClose : handleBack}
            >
              <ArrowLeft className="h-4 w-4" />
              {currentStep === 1 ? 'Cancel' : 'Back'}
            </Button>

            {currentStep < 4 ? (
              <Button
                variant="hero"
                onClick={handleNext}
                disabled={
                  (currentStep === 1 && !returnMethod) ||
                  (currentStep === 2 && returnMethod?.type === 'dropoff' && !selectedLocation)
                }
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button variant="hero" onClick={handleComplete}>
                Done
                <CheckCircle className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
