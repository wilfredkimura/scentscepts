'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { ArrowRight, Mail, Lock, User, Sparkles, Loader2 } from 'lucide-react';

function AuthContent() {
  const { login, register } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isRegistered = searchParams.get('registered') === 'true';

  const [isLogin, setIsLogin] = useState(!isRegistered);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Basic Sanitization / Validation
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (!isLogin && (!formData.firstName || !formData.lastName)) {
      setError('Please provide both first and last names.');
      return;
    }

    setIsLoading(true);

    try {
      if (isLogin) {
        const res = await login({ email: formData.email, password: formData.password });
        if (res.role === 'ROLE_ADMIN' || res.role === 'ADMIN') {
          router.push('/admin');
        } else {
          router.push('/dashboard');
        }
      } else {
        await register(formData);
        setIsLogin(true);
        setError('');
        // Show success or just switch to login
        router.push('/auth?registered=true');
      }
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Authentication failed. Please try again.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="relative group">
        <div className="relative bg-card border border-border/30 p-12 shadow-2xl shadow-black/50">
          {/* Header */}
          <div className="text-center mb-12">
            <Link href="/" className="inline-block mb-8">
               <span className="text-foreground font-light text-3xl font-serif tracking-[0.4em] uppercase">Scentcepts</span>
            </Link>
            <h1 className="text-headline-md font-serif font-light text-foreground mb-4">
              {isLogin ? 'Welcome Back' : 'Join the Society'}
            </h1>
            <p className="text-label-caps text-primary">
              {isLogin ? 'Authentication Required' : 'Experience Pure Sophistication'}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-destructive/5 border border-destructive/20 text-destructive text-[10px] uppercase tracking-widest px-6 py-4 mb-10 animate-in fade-in zoom-in duration-300">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-label-caps text-foreground/40">First Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/30" />
                    <input
                      name="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      className="w-full bg-background border border-border/30 py-4 pl-12 pr-6 text-sm font-light focus:outline-none focus:border-primary transition-colors placeholder:text-foreground/10"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-label-caps text-foreground/40">Last Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/30" />
                    <input
                      name="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      className="w-full bg-background border border-border/30 py-4 pl-12 pr-6 text-sm font-light focus:outline-none focus:border-primary transition-colors placeholder:text-foreground/10"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <label className="text-label-caps text-foreground/40">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/30" />
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@luxury.com"
                  className="w-full bg-background border border-border/30 py-4 pl-12 pr-6 text-sm font-light focus:outline-none focus:border-primary transition-colors placeholder:text-foreground/10"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-label-caps text-foreground/40">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/30" />
                <input
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••••••"
                  className="w-full bg-background border border-border/30 py-4 pl-12 pr-6 text-sm font-light focus:outline-none focus:border-primary transition-colors placeholder:text-foreground/10"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground py-5 text-label-caps flex items-center justify-center gap-4 hover:bg-primary/90 transition-all disabled:opacity-50 group/btn shadow-xl shadow-primary/10"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {isLogin ? 'Enter Archive' : 'Join Society'}
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Toggle */}
          <div className="mt-16 text-center border-t border-border/30 pt-10">
            <p className="text-label-caps text-foreground/40 mb-6">
              {isLogin ? "New to the society?" : "Already a member?"}
            </p>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-label-caps text-primary hover:text-primary/70 transition-colors"
            >
              {isLogin ? 'Create An Account' : 'Back to Login'}
            </button>
          </div>
        </div>
      </div>

      {/* Philosophy Hint */}
      <div className="mt-16 text-center">
        <Sparkles className="w-6 h-6 text-primary/20 mx-auto mb-6" />
        <p className="text-label-caps text-foreground/20 leading-loose">
          Authorized retailer of niche house fragrances.<br />
          Experience authenticity in every drop.
        </p>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-6 font-sans overflow-hidden relative">
      <div className="glow-shape-1 opacity-20"></div>
      <div className="glow-shape-2 opacity-10"></div>

      <Suspense fallback={<div className="text-primary italic animate-pulse tracking-[0.5em] uppercase text-xs">Scentcepts...</div>}>
        <AuthContent />
      </Suspense>
    </main>
  );
}
