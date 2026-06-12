import type { Metadata } from 'next';
import ResetPasswordForm from './ResetPasswordForm';

export const metadata: Metadata = {
  title: 'Reset Password | OrbitChain',
  description: 'Create a new password for your OrbitChain account.',
};

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}