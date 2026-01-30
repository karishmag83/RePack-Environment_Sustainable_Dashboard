import { useLocalStorage } from './useLocalStorage';
import { Order, ReturnStatus } from '@/types/order';
import { mockOrders } from '@/data/mockOrders';
import { useCallback } from 'react';

const ORDERS_KEY = 'repack_orders';

export interface OrderStats {
  pendingReturns: number;
  completedReturns: number;
  inProgressReturns: number;
  overdueReturns: number;
  totalCO2Saved: number;
  ecoPoints: number;
  returnRate: number;
}

export function useOrders() {
  const [orders, setOrders] = useLocalStorage<Order[]>(ORDERS_KEY, mockOrders);

  const updateOrderStatus = useCallback((orderId: string, status: ReturnStatus, trackingNumber?: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, returnStatus: status, ...(trackingNumber && { trackingNumber }) }
        : order
    ));
  }, [setOrders]);

  const startReturn = useCallback((orderId: string) => {
    const trackingNumber = `TRK-${Date.now().toString().slice(-9)}`;
    updateOrderStatus(orderId, 'requested', trackingNumber);
    return trackingNumber;
  }, [updateOrderStatus]);

  const getOrderById = useCallback((orderId: string) => {
    return orders.find(o => o.id === orderId);
  }, [orders]);

  const getStats = useCallback((): OrderStats => {
    const pending = orders.filter(o => o.returnStatus === 'pending').length;
    const overdue = orders.filter(o => o.returnStatus === 'overdue').length;
    const completed = orders.filter(o => o.returnStatus === 'processed').length;
    const inProgress = orders.filter(o => ['requested', 'in-transit', 'received'].includes(o.returnStatus)).length;
    const total = orders.length;

    return {
      pendingReturns: pending,
      overdueReturns: overdue,
      completedReturns: completed,
      inProgressReturns: inProgress,
      totalCO2Saved: parseFloat((completed * 2.5).toFixed(1)),
      ecoPoints: completed * 50,
      returnRate: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  }, [orders]);

  const filterOrders = useCallback((status?: ReturnStatus | 'all') => {
    if (!status || status === 'all') return orders;
    return orders.filter(o => o.returnStatus === status);
  }, [orders]);

  const resetOrders = useCallback(() => {
    setOrders(mockOrders);
  }, [setOrders]);

  return {
    orders,
    updateOrderStatus,
    startReturn,
    getOrderById,
    getStats,
    filterOrders,
    resetOrders,
  };
}
