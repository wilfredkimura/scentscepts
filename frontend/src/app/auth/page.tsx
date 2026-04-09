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
      {/* Glassmorphic Card */}
      <div className="relative group">
        {/* Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-primary/10 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
        
        <div className="relative bg-card/60 backdrop-blur-xl border border-border/50 p-10 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-10">
            <Link href="/" className="inline-block mb-6">
               <span className="text-foreground font-light text-2xl tracking-[0.3em] uppercase">Scentcepts</span>
            </Link>
            <h1 className="text-3xl font-light tracking-tight text-foreground">
              {isLogin ? 'Welcome Back' : 'Join the Society'}
            </h1>
            <p className="text-muted-foreground text-sm mt-3 font-light tracking-wide uppercase">
              {isLogin ? 'Enter your credentials' : 'Experience pure sophistication'}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-destructive/10 border border-destructive/20 text-destructive text-xs px-4 py-3 mb-8 animate-in fade-in zoom-in duration-300">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground ml-1">First Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                    <input
                      name="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      className="w-full bg-background/50 border border-border/50 py-3 pl-10 pr-4 text-sm font-light focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/30"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground ml-1">Last Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                    <input
                      name="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      className="w-full bg-background/50 border border-border/50 py-3 pl-10 pr-4 text-sm font-light focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/30"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@luxury.com"
                  className="w-full bg-background/50 border border-border/50 py-3 pl-10 pr-4 text-sm font-light focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/30"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                <input
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••••••"
                  className="w-full bg-background/50 border border-border/50 py-3 pl-10 pr-4 text-sm font-light focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/30"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground py-4 text-xs font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed group/btn shadow-xl shadow-primary/10"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin text-primary-foreground" />
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Join Society'}
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Toggle */}
          <div className="mt-12 text-center">
            <p className="text-xs text-muted-foreground font-light tracking-widest uppercase">
              {isLogin ? "New to the society?" : "Already a member?"}
            </p>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="mt-4 text-primary text-[10px] font-bold uppercase tracking-[0.4em] hover:text-primary/70 transition-colors"
            >
              {isLogin ? 'Create An Account' : 'Back to Login'}
            </button>
          </div>
        </div>
      </div>

      {/* Philosophy Hint */}
      <div className="mt-12 text-center px-10">
        <Sparkles className="w-5 h-5 text-primary/30 mx-auto mb-4" />
        <p className="text-[10px] text-muted-foreground leading-relaxed tracking-wider uppercase font-light">
          Authorized retailer of niche house fragrances.<br />
          Experience authenticity in every drop.
        </p>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-6 font-serif overflow-hidden relative">
      {/* Abstract Backgrounds */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]"></div>
      </div>

      <Suspense fallback={<div className="text-primary italic animate-pulse tracking-[0.5em] uppercase text-xs">Scentcepts...</div>}>
        <AuthContent />
      </Suspense>
    </main>
  );
}
