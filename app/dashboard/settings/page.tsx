'use client';

import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/ui';
import { 
  User, 
  Mail, 
  Wallet, 
  Lock, 
  Bell, 
  Eye, 
  EyeOff,
  Shield,
  Trash2,
  Save,
  Camera
} from 'lucide-react';
import { withAuth } from '@/lib/auth/ProtectedRoute';

function SettingsPage() {
  const { user, setUser } = useAuthStore();
  const toast = useToast();
  
  // Form states
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Profile form
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    avatar: user?.avatar || ''
  });
  
  // Password form
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Wallet form
  const [walletForm, setWalletForm] = useState({
    address: '',
    label: ''
  });
  
  // Notification preferences
  const [notificationPrefs, setNotificationPrefs] = useState({
    emailNotifications: true,
    pushNotifications: true,
    donationAlerts: true,
    campaignUpdates: true,
    adminMessages: true
  });
  
  // Privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    anonymousDonations: false,
    publicProfile: true,
    showDonationHistory: true
  });

  const handleProfileUpdate = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUser({
        ...user!,
        name: profileForm.name,
        email: profileForm.email,
        avatar: profileForm.avatar
      });
      
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (passwordForm.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      toast.success('Password changed successfully!');
    } catch (error) {
      toast.error('Failed to change password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleWalletAdd = async () => {
    if (!walletForm.address) {
      toast.error('Please enter a wallet address');
      return;
    }
    
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setWalletForm({ address: '', label: '' });
      toast.success('Wallet address added successfully!');
    } catch (error) {
      toast.error('Failed to add wallet address');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotificationPrefsSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Notification preferences saved!');
    } catch (error) {
      toast.error('Failed to save preferences');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrivacySettingsSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Privacy settings saved!');
    } catch (error) {
      toast.error('Failed to save privacy settings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccountDeletion = async () => {
    if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }
    
    if (!confirm('This will permanently delete all your data. Are you absolutely sure?')) {
      return;
    }
    
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Account deletion request submitted. You will receive confirmation via email.');
    } catch (error) {
      toast.error('Failed to submit deletion request');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
      </div>

      <div className="space-y-6">
        {/* Profile Settings */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
          </div>
          
          <div className="space-y-4">
            {/* Avatar */}
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                {profileForm.avatar ? (
                  <img 
                    src={profileForm.avatar} 
                    alt="Avatar" 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold text-gray-500">
                    {profileForm.name?.[0]?.toUpperCase() || 'U'}
                  </span>
                )}
              </div>
              <Button variant="outline" size="sm">
                <Camera className="w-4 h-4 mr-2" />
                Change Avatar
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <Input
                  value={profileForm.name}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter your email"
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button 
                onClick={handleProfileUpdate}
                isLoading={isLoading}
                className="flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Profile
              </Button>
            </div>
          </div>
        </Card>

        {/* Wallet Management */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-center gap-3 mb-6">
            <Wallet className="w-5 h-5 text-green-600" />
            <h2 className="text-xl font-semibold text-gray-900">Wallet Management</h2>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Wallet Address
                </label>
                <Input
                  value={walletForm.address}
                  onChange={(e) => setWalletForm(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Enter Stellar wallet address"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Label (Optional)
                </label>
                <Input
                  value={walletForm.label}
                  onChange={(e) => setWalletForm(prev => ({ ...prev, label: e.target.value }))}
                  placeholder="e.g., Main Wallet"
                />
              </div>
            </div>
            
            <Button 
              onClick={handleWalletAdd}
              isLoading={isLoading}
              variant="outline"
            >
              Add Wallet Address
            </Button>
            
            {/* Existing wallets would be listed here */}
            <div className="text-sm text-gray-500">
              No wallet addresses added yet.
            </div>
          </div>
        </Card>

        {/* Password Change */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-5 h-5 text-red-600" />
            <h2 className="text-xl font-semibold text-gray-900">Change Password</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <div className="relative">
                <Input
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <Input
                    type={showNewPassword ? 'text' : 'password'}
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button 
                onClick={handlePasswordChange}
                isLoading={isLoading}
                variant="outline"
              >
                Change Password
              </Button>
            </div>
          </div>
        </Card>

        {/* Notification Preferences */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-900">Notification Preferences</h2>
          </div>
          
          <div className="space-y-4">
            {Object.entries(notificationPrefs).map(([key, value]) => (
              <label key={key} className="flex items-center justify-between cursor-pointer">
                <span className="text-sm font-medium text-gray-700">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </span>
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => setNotificationPrefs(prev => ({ ...prev, [key]: e.target.checked }))}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </label>
            ))}
            
            <div className="flex justify-end">
              <Button 
                onClick={handleNotificationPrefsSave}
                isLoading={isLoading}
                variant="outline"
              >
                Save Preferences
              </Button>
            </div>
          </div>
        </Card>

        {/* Privacy Settings */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-semibold text-gray-900">Privacy Settings</h2>
          </div>
          
          <div className="space-y-4">
            {Object.entries(privacySettings).map(([key, value]) => (
              <label key={key} className="flex items-center justify-between cursor-pointer">
                <span className="text-sm font-medium text-gray-700">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </span>
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => setPrivacySettings(prev => ({ ...prev, [key]: e.target.checked }))}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </label>
            ))}
            
            <div className="flex justify-end">
              <Button 
                onClick={handlePrivacySettingsSave}
                isLoading={isLoading}
                variant="outline"
              >
                Save Privacy Settings
              </Button>
            </div>
          </div>
        </Card>

        {/* Account Deletion */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-center gap-3 mb-6">
            <Trash2 className="w-5 h-5 text-red-600" />
            <h2 className="text-xl font-semibold text-gray-900">Delete Account</h2>
          </div>
          
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            
            <Button 
              onClick={handleAccountDeletion}
              isLoading={isLoading}
              variant="outline"
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              Delete Account
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default withAuth(SettingsPage);
