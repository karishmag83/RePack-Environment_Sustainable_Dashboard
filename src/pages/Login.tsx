import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Recycle, ArrowRight, Leaf, Package, Sparkles } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user, login, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && user) {
      navigate('/orders');
    }
  }, [user, authLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      toast({
        title: 'Invalid email',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    login(email);
    setIsLoading(false);
    
    toast({
      title: 'Welcome back! 🌿',
      description: "You're now signed in to RePack Portal.",
    });
    navigate('/orders');
  };

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4 animate-fade-in">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-glow">
            <Recycle className="h-8 w-8 text-primary-foreground animate-spin" style={{ animationDuration: '2s' }} />
          </div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Left Panel - Hero */}
      <div className="relative flex flex-1 flex-col justify-center bg-primary px-8 py-12 lg:px-16">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute left-10 top-10 h-32 w-32 rounded-full bg-primary-foreground animate-float" />
          <div className="absolute right-20 top-1/3 h-24 w-24 rounded-full bg-primary-foreground animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-20 left-1/4 h-40 w-40 rounded-full bg-primary-foreground animate-float" style={{ animationDelay: '4s' }} />
        </div>

        <div className="relative z-10 max-w-lg">
          {/* Logo */}
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-foreground/20 backdrop-blur-sm">
              <Recycle className="h-7 w-7 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-primary-foreground">RePack</span>
          </div>

          <h1 className="text-4xl font-bold leading-tight text-primary-foreground lg:text-5xl">
            Return with purpose.
            <br />
            <span className="text-primary-foreground/80">Reuse with impact.</span>
          </h1>

          <p className="mt-6 text-lg text-primary-foreground/80">
            Join thousands of conscious consumers making sustainable choices. Every returned package
            makes a difference.
          </p>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold text-primary-foreground">1M+</div>
              <div className="text-sm text-primary-foreground/70">Packages returned</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-foreground">2.5M</div>
              <div className="text-sm text-primary-foreground/70">lbs CO₂ saved</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-foreground">50K+</div>
              <div className="text-sm text-primary-foreground/70">Active users</div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-8 left-8 flex items-center gap-2 text-primary-foreground/60">
          <Leaf className="h-5 w-5" />
          <span className="text-sm">Making sustainability simple</span>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex flex-1 items-center justify-center bg-background px-8 py-12">
        <div className="w-full max-w-md animate-fade-in">
          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-2xl font-bold text-foreground">Welcome back</h2>
            <p className="mt-2 text-muted-foreground">
              Sign in to manage your reusable packaging returns
            </p>
          </div>

          <Card className="p-6 shadow-elegant">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                  Email address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                  required
                />
              </div>

              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    Signing in...
                  </span>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Demo Mode</span>
                </div>
              </div>

              <p className="mt-4 text-center text-sm text-muted-foreground">
                Enter any email to explore the portal. No signup required.
              </p>
            </div>
          </Card>

          {/* Features */}
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Package className="h-4 w-4 text-primary" />
              </div>
              <span>Track all your reusable packaging returns</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
                <Sparkles className="h-4 w-4 text-accent" />
              </div>
              <span>Earn eco-points for every successful return</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/10">
                <Leaf className="h-4 w-4 text-success" />
              </div>
              <span>See your positive environmental impact</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
