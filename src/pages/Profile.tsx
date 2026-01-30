import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { useUserSettings } from '@/hooks/useUserSettings';
import { useOrders } from '@/hooks/useOrders';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import {
  User,
  MapPin,
  Bell,
  Settings,
  Save,
  Truck,
  Mail,
  Phone,
  Shield,
  Leaf,
  Award,
  History,
  RefreshCw,
} from 'lucide-react';
import { format, parseISO } from 'date-fns';

function ProfileContent() {
  const { user } = useAuth();
  const { settings, updateSettings } = useUserSettings();
  const { orders, getStats, resetOrders } = useOrders();
  const stats = getStats();

  const [formData, setFormData] = useState({
    displayName: settings.displayName || user?.name || '',
    email: settings.email || user?.email || '',
    phone: settings.phone,
    address: settings.address,
    city: settings.city,
    postalCode: settings.postalCode,
  });

  const handleSaveProfile = () => {
    updateSettings(formData);
    toast({
      title: 'Profile Updated',
      description: 'Your profile has been saved successfully.',
    });
  };

  const handleNotificationChange = (key: keyof typeof settings, value: boolean) => {
    updateSettings({ [key]: value });
    toast({
      title: 'Settings Updated',
      description: `${key.replace(/([A-Z])/g, ' $1').trim()} has been ${value ? 'enabled' : 'disabled'}.`,
    });
  };

  const handleResetData = () => {
    resetOrders();
    toast({
      title: 'Data Reset',
      description: 'Your order data has been reset to default.',
    });
  };

  const completedOrders = orders.filter(o => o.returnStatus === 'processed');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 py-8 md:px-6">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground">Account Settings</h1>
          <p className="mt-2 text-muted-foreground">
            Manage your profile, preferences, and notification settings
          </p>
        </div>

        {/* User Summary */}
        <Card className="mb-8 p-6 animate-slide-up">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-foreground">{user?.name || 'User'}</h2>
              <p className="text-muted-foreground">{user?.email}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  <Award className="h-3 w-3" />
                  {stats.ecoPoints} Eco Points
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">
                  <Leaf className="h-3 w-3" />
                  {stats.totalCO2Saved} lbs CO₂ Saved
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="profile" className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="address" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Address</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              <span className="hidden sm:inline">History</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Personal Information
              </h3>
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input
                      id="displayName"
                      value={formData.displayName}
                      onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="pl-9"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="pl-9"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
                <div className="pt-4">
                  <Button onClick={handleSaveProfile}>
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Address Tab */}
          <TabsContent value="address">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Pickup Address
              </h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="address">Street Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="123 Main Street, Apt 4B"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="New York"
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      placeholder="10001"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-border mt-6">
                  <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                    <Truck className="h-4 w-4 text-accent" />
                    Preferred Return Method
                  </h4>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <button
                      onClick={() => updateSettings({ preferredReturnMethod: 'dropoff' })}
                      className={`flex items-center gap-3 rounded-lg border-2 p-4 transition-all ${
                        settings.preferredReturnMethod === 'dropoff'
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <MapPin className="h-5 w-5 text-primary" />
                      <div className="text-left">
                        <p className="font-medium text-foreground">Drop-off</p>
                        <p className="text-xs text-muted-foreground">Bring to a nearby location</p>
                      </div>
                    </button>
                    <button
                      onClick={() => updateSettings({ preferredReturnMethod: 'pickup' })}
                      className={`flex items-center gap-3 rounded-lg border-2 p-4 transition-all ${
                        settings.preferredReturnMethod === 'pickup'
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <Truck className="h-5 w-5 text-accent" />
                      <div className="text-left">
                        <p className="font-medium text-foreground">Pickup</p>
                        <p className="text-xs text-muted-foreground">We'll pick it up</p>
                      </div>
                    </button>
                  </div>
                </div>

                <div className="pt-4">
                  <Button onClick={handleSaveProfile}>
                    <Save className="h-4 w-4" />
                    Save Address
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Notification Preferences
              </h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive updates via email</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => handleNotificationChange('emailNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <Bell className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Push Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive push notifications in browser</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => handleNotificationChange('pushNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <Truck className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Return Reminders</p>
                      <p className="text-sm text-muted-foreground">Get reminded before return deadlines</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.returnReminders}
                    onCheckedChange={(checked) => handleNotificationChange('returnReminders', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <Leaf className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Eco Tips</p>
                      <p className="text-sm text-muted-foreground">Receive sustainability tips and news</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.ecoTips}
                    onCheckedChange={(checked) => handleNotificationChange('ecoTips', checked)}
                  />
                </div>
              </div>
            </Card>

            {/* Data Management */}
            <Card className="mt-6 p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                Data Management
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium text-foreground">Reset Demo Data</p>
                    <p className="text-sm text-muted-foreground">Reset all orders to initial state</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleResetData}>
                    <RefreshCw className="h-4 w-4" />
                    Reset
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <History className="h-5 w-5 text-primary" />
                Return History
              </h3>
              {completedOrders.length === 0 ? (
                <div className="text-center py-8">
                  <History className="h-12 w-12 text-muted-foreground mx-auto" />
                  <p className="mt-3 text-muted-foreground">No completed returns yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {completedOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                    >
                      <img
                        src={order.productImage}
                        alt={order.productName}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{order.productName}</p>
                        <p className="text-sm text-muted-foreground">
                          Order #{order.orderNumber}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-success">+50 points</p>
                        <p className="text-xs text-muted-foreground">
                          {format(parseISO(order.orderDate), 'MMM d, yyyy')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default function Profile() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}
