import { useLocalStorage } from './useLocalStorage';
import { useCallback } from 'react';

export interface UserSettings {
  displayName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  preferredReturnMethod: 'dropoff' | 'pickup';
  emailNotifications: boolean;
  pushNotifications: boolean;
  returnReminders: boolean;
  ecoTips: boolean;
  theme: 'light' | 'dark' | 'system';
}

const SETTINGS_KEY = 'repack_user_settings';

const defaultSettings: UserSettings = {
  displayName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
  preferredReturnMethod: 'dropoff',
  emailNotifications: true,
  pushNotifications: true,
  returnReminders: true,
  ecoTips: true,
  theme: 'light',
};

export function useUserSettings() {
  const [settings, setSettings] = useLocalStorage<UserSettings>(SETTINGS_KEY, defaultSettings);

  const updateSettings = useCallback((updates: Partial<UserSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  }, [setSettings]);

  const resetSettings = useCallback(() => {
    setSettings(defaultSettings);
  }, [setSettings]);

  return {
    settings,
    updateSettings,
    resetSettings,
  };
}
