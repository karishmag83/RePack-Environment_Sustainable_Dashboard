import { useLocalStorage } from './useLocalStorage';
import { useCallback } from 'react';

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'action';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

const NOTIFICATIONS_KEY = 'repack_notifications';

const defaultNotifications: Notification[] = [
  {
    id: '1',
    type: 'warning',
    title: 'Return Deadline Approaching',
    message: 'Your Zero Waste Starter Kit return is overdue. Please return it to avoid any fees.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read: false,
    actionUrl: '/orders',
  },
  {
    id: '2',
    type: 'success',
    title: 'Return Processed!',
    message: 'Your Eco-Friendly Home Bundle has been successfully processed. You earned 50 eco-points!',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    read: false,
  },
  {
    id: '3',
    type: 'info',
    title: 'New Drop-off Location',
    message: 'A new RePack drop-off point opened near you at 321 Green Lane.',
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    read: true,
  },
];

export function useNotifications() {
  const [notifications, setNotifications] = useLocalStorage<Notification[]>(
    NOTIFICATIONS_KEY,
    defaultNotifications
  );

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  }, [setNotifications]);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, [setNotifications]);

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      read: false,
    };
    setNotifications(prev => [newNotification, ...prev]);
  }, [setNotifications]);

  const deleteNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, [setNotifications]);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, [setNotifications]);

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    addNotification,
    deleteNotification,
    clearAll,
  };
}
