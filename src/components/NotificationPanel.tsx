import { useNotifications, Notification } from '@/hooks/useNotifications';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Bell,
  Check,
  CheckCheck,
  Info,
  AlertTriangle,
  Trash2,
  X,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';

interface NotificationPanelProps {
  onClose: () => void;
}

const iconMap = {
  info: Info,
  success: Check,
  warning: AlertTriangle,
  action: Bell,
};

const colorMap = {
  info: 'bg-primary/10 text-primary',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  action: 'bg-accent/10 text-accent',
};

export function NotificationPanel({ onClose }: NotificationPanelProps) {
  const navigate = useNavigate();
  const { notifications, markAsRead, markAllAsRead, deleteNotification, clearAll } = useNotifications();

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
      onClose();
    }
  };

  return (
    <Card className="absolute right-0 top-full mt-2 w-80 sm:w-96 max-h-[70vh] overflow-hidden shadow-2xl animate-scale-in z-50">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">Notifications</h3>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={markAllAsRead}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            <CheckCheck className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-[50vh] overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Bell className="h-10 w-10 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">No notifications yet</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {notifications.map((notification) => {
              const Icon = iconMap[notification.type];
              return (
                <div
                  key={notification.id}
                  className={cn(
                    'flex gap-3 p-4 cursor-pointer transition-colors hover:bg-muted/50',
                    !notification.read && 'bg-primary/5'
                  )}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-full', colorMap[notification.type])}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={cn('text-sm font-medium', notification.read ? 'text-muted-foreground' : 'text-foreground')}>
                        {notification.title}
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(notification.id);
                        }}
                        className="shrink-0 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                      {notification.message}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {formatDistanceToNow(parseISO(notification.timestamp), { addSuffix: true })}
                    </p>
                  </div>
                  {notification.actionUrl && (
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground self-center" />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div className="border-t border-border p-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAll}
            className="w-full text-xs text-muted-foreground"
          >
            <Trash2 className="h-3 w-3 mr-1" />
            Clear all notifications
          </Button>
        </div>
      )}
    </Card>
  );
}
