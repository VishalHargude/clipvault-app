'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '../../../components/layout/Container';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Alert } from '../../../components/ui/Alert';
import { Lock, ShieldAlert } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed.');
        return;
      }

      // Store session token in localStorage/sessionStorage
      localStorage.setItem('admin_token', data.token);
      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Network error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="py-20 flex-1 flex items-center justify-center">
      <Container className="max-w-md">
        <Card className="p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-custom bg-brand-primary/10 text-brand-primary flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-extrabold text-content-main">Administrator Portal</h1>
            <p className="text-xs text-content-muted">
              Restricted management area. Public users do not require accounts or login.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Admin Access Key"
              type="password"
              placeholder="Enter secure master key"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <Alert variant="danger">{error}</Alert>}

            <Button type="submit" isLoading={loading} className="w-full">
              Authenticate
            </Button>
          </form>

          <div className="pt-4 border-t border-surface-border text-[11px] text-content-muted text-center flex items-center justify-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            Rate-limited endpoint with HMAC SHA-256 tokens.
          </div>
        </Card>
      </Container>
    </main>
  );
}
