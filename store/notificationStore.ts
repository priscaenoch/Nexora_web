import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { NotificationStore, AppNotification } from '@/types';

// Mock API functions - replace with actual API calls
const mockApi = {
  async fetchNotifications(): Promise<AppNotification[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      {
        id: '1',
        type: 'donation',
        title: 'Donation Received',
        message: 'Your campaign "Clean Water Fund" received a donation of $50',
        read: false,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        link: '/dashboard/donations',
        metadata: { amount: 50, campaignId: '1' }
      },
      {
        id: '2',
        type: 'campaign_update',
        title: 'Campaign Update',
        message: 'Education Initiative reached 75% of its funding goal',
        read: false,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        link: '/dashboard/projects/1',
        metadata: { campaignId: '2', progress: 75 }
      },
      {
        id: '3',
        type: 'admin_message',
        title: 'Admin Message',
        message: 'New features have been added to the platform',
        read: true,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        link: '/dashboard'
      },
      {
        id: '4',
        type: 'system',
        title: 'System Maintenance',
        message: 'Scheduled maintenance will occur tomorrow at 2 AM UTC',
        read: true,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];
  },

  async markAsRead(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 200));
    // In real implementation, this would make an API call
    console.log(`Marked notification ${id} as read`);
  },

  async markAllAsRead(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    // In real implementation, this would make an API call
    console.log('Marked all notifications as read');
  }
};

export const useNotificationStore = create<NotificationStore>()(
  devtools(
    (set, get) => ({
      // Initial State
      notifications: [],
      unreadCount: 0,
      isLoading: false,

      // Actions
      fetchNotifications: async () => {
        set({ isLoading: true });
        try {
          const notifications = await mockApi.fetchNotifications();
          const unreadCount = notifications.filter(n => !n.read).length;
          set({ notifications, unreadCount, isLoading: false });
        } catch (error) {
          console.error('Failed to fetch notifications:', error);
          set({ isLoading: false });
        }
      },

      markAsRead: async (id: string) => {
        try {
          await mockApi.markAsRead(id);
          const { notifications } = get();
          const updatedNotifications = notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
          );
          const unreadCount = updatedNotifications.filter(n => !n.read).length;
          set({ notifications: updatedNotifications, unreadCount });
        } catch (error) {
          console.error('Failed to mark notification as read:', error);
        }
      },

      markAllAsRead: async () => {
        try {
          await mockApi.markAllAsRead();
          const { notifications } = get();
          const updatedNotifications = notifications.map(n => ({ ...n, read: true }));
          set({ notifications: updatedNotifications, unreadCount: 0 });
        } catch (error) {
          console.error('Failed to mark all notifications as read:', error);
        }
      },

      addNotification: (notification) => {
        const newNotification: AppNotification = {
          ...notification,
          id: Date.now().toString(),
          createdAt: new Date().toISOString()
        };
        
        const { notifications, unreadCount } = get();
        const updatedNotifications = [newNotification, ...notifications];
        const newUnreadCount = notification.read ? unreadCount : unreadCount + 1;
        
        set({ 
          notifications: updatedNotifications, 
          unreadCount: newUnreadCount 
        });
      },

      setNotifications: (notifications: AppNotification[]) => {
        const unreadCount = notifications.filter(n => !n.read).length;
        set({ notifications, unreadCount });
      },

      setLoading: (loading: boolean) => set({ isLoading: loading })
    }),
    {
      name: 'NotificationStore'
    }
  )
);
