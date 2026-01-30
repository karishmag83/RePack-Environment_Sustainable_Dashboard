import { useState, useMemo } from 'react';
import { Navbar } from '@/components/Navbar';
import { OrderCard } from '@/components/OrderCard';
import { ReturnFlow } from '@/components/ReturnFlow';
import { TrackingModal } from '@/components/TrackingModal';
import { OrderFilters } from '@/components/OrderFilters';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useOrders } from '@/hooks/useOrders';
import { useNotifications } from '@/hooks/useNotifications';
import { Order, ReturnStatus } from '@/types/order';
import { useAuth } from '@/contexts/AuthContext';
import { Leaf, Package, Recycle, TrendingUp, BarChart3 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

function OrdersContent() {
  const { user } = useAuth();
  const { orders, startReturn, getStats, updateOrderStatus } = useOrders();
  const { addNotification } = useNotifications();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [trackingOrder, setTrackingOrder] = useState<Order | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<ReturnStatus | 'all'>('all');

  const stats = getStats();

  const handleStartReturn = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleTrackReturn = (order: Order) => {
    setTrackingOrder(order);
  };

  const handleReturnComplete = () => {
    if (selectedOrder) {
      const trackingNumber = startReturn(selectedOrder.id);
      addNotification({
        type: 'success',
        title: 'Return Initiated!',
        message: `Your return for ${selectedOrder.productName} has been started. Tracking: ${trackingNumber}`,
        actionUrl: '/orders',
      });
    }
    setSelectedOrder(null);
  };

  // Filter and search orders
  const filteredOrders = useMemo(() => {
    let result = orders;
    
    // Apply status filter
    if (activeFilter !== 'all') {
      result = result.filter(o => o.returnStatus === activeFilter);
    }
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(o => 
        o.productName.toLowerCase().includes(query) ||
        o.orderNumber.toLowerCase().includes(query)
      );
    }
    
    return result;
  }, [orders, activeFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="mt-2 text-muted-foreground">
            Manage your reusable packaging returns and track your eco-impact
          </p>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="flex items-center gap-4 p-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-warning/15">
              <Package className="h-6 w-6 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.pendingReturns}</p>
              <p className="text-sm text-muted-foreground">Pending Returns</p>
            </div>
          </Card>

          <Card className="flex items-center gap-4 p-4 animate-slide-up" style={{ animationDelay: '0.15s' }}>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/15">
              <Recycle className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.completedReturns}</p>
              <p className="text-sm text-muted-foreground">Completed Returns</p>
            </div>
          </Card>

          <Card className="flex items-center gap-4 p-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15">
              <Leaf className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.totalCO2Saved}</p>
              <p className="text-sm text-muted-foreground">lbs CO₂ Saved</p>
            </div>
          </Card>

          <Card className="flex items-center gap-4 p-4 animate-slide-up" style={{ animationDelay: '0.25s' }}>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15">
              <TrendingUp className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.ecoPoints}</p>
              <p className="text-sm text-muted-foreground">Eco Points</p>
            </div>
          </Card>
        </div>

        {/* Dashboard Link Banner */}
        <Card className="mb-6 p-4 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 animate-slide-up" style={{ animationDelay: '0.28s' }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-6 w-6 text-primary" />
              <div>
                <p className="font-medium text-foreground">Want detailed eco-impact analytics?</p>
                <p className="text-sm text-muted-foreground">View charts, achievements and more</p>
              </div>
            </div>
            <Link to="/dashboard">
              <Button variant="outline" size="sm">
                View Dashboard
              </Button>
            </Link>
          </div>
        </Card>

        {/* Orders Section */}
        <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Your Orders</h2>
            <p className="text-sm text-muted-foreground">{orders.length} orders with reusable packaging</p>
          </div>

          {/* Filters */}
          <div className="mb-6">
            <OrderFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
          </div>

          <div className="space-y-4">
            {filteredOrders.map((order, index) => (
              <div key={order.id} style={{ animationDelay: `${0.35 + index * 0.05}s` }} className="animate-slide-up">
                <OrderCard 
                  order={order} 
                  onStartReturn={handleStartReturn} 
                  onTrackReturn={handleTrackReturn}
                />
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredOrders.length === 0 && orders.length > 0 && (
            <Card className="p-12 text-center">
              <Package className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium text-foreground">No matching orders</h3>
              <p className="mt-2 text-muted-foreground">
                Try adjusting your search or filter criteria.
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('all');
                }}
              >
                Clear Filters
              </Button>
            </Card>
          )}

          {orders.length === 0 && (
            <Card className="p-12 text-center">
              <Package className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium text-foreground">No orders yet</h3>
              <p className="mt-2 text-muted-foreground">
                When you receive orders with reusable packaging, they'll appear here.
              </p>
            </Card>
          )}
        </div>
      </main>

      {/* Return Flow Modal */}
      {selectedOrder && (
        <ReturnFlow
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onComplete={handleReturnComplete}
        />
      )}

      {/* Tracking Modal */}
      {trackingOrder && (
        <TrackingModal
          order={trackingOrder}
          onClose={() => setTrackingOrder(null)}
        />
      )}
    </div>
  );
}

export default function Orders() {
  return (
    <ProtectedRoute>
      <OrdersContent />
    </ProtectedRoute>
  );
}
