export type ReturnStatus = 'pending' | 'requested' | 'in-transit' | 'received' | 'processed' | 'overdue';

export interface Order {
  id: string;
  orderNumber: string;
  productName: string;
  productImage: string;
  orderDate: string;
  isReusable: boolean;
  returnStatus: ReturnStatus;
  returnDeadline?: string;
  trackingNumber?: string;
  returnMethod?: 'dropoff' | 'pickup';
  returnInitiatedAt?: string;
  returnCompletedAt?: string;
}

export interface ReturnMethod {
  type: 'dropoff' | 'pickup';
  location?: string;
  scheduledDate?: string;
}

export interface ReturnHistoryItem {
  orderId: string;
  orderNumber: string;
  productName: string;
  returnedAt: string;
  method: 'dropoff' | 'pickup';
  co2Saved: number;
  pointsEarned: number;
}
