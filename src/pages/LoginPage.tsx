import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/context/AuthContext';

export default function LoginPage() {
  const { loginWithLinkedIn } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-semibold text-center mb-6 text-orange-600">Login to MusicStore</h1>
        <Button className="w-full" onClick={loginWithLinkedIn} variant="primary" size="lg">
          Continue with LinkedIn
        </Button>
      </div>
    </div>
  );
}
