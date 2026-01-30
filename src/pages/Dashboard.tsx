import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { EcoImpactChart } from '@/components/EcoImpactChart';
import { useAuth } from '@/contexts/AuthContext';
import { useOrders } from '@/hooks/useOrders';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Leaf,
  Package,
  Recycle,
  TrendingUp,
  Trophy,
  Target,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ecoLevels = [
  { name: 'Seedling', minPoints: 0, maxPoints: 100, color: 'text-muted-foreground' },
  { name: 'Sapling', minPoints: 100, maxPoints: 300, color: 'text-success' },
  { name: 'Tree', minPoints: 300, maxPoints: 600, color: 'text-primary' },
  { name: 'Forest', minPoints: 600, maxPoints: 1000, color: 'text-accent' },
  { name: 'Champion', minPoints: 1000, maxPoints: Infinity, color: 'text-warning' },
];

const achievements = [
  { id: 1, name: 'First Return', description: 'Complete your first return', icon: Package, unlocked: true },
  { id: 2, name: 'Eco Warrior', description: 'Save 10 lbs of CO₂', icon: Leaf, unlocked: true },
  { id: 3, name: 'Consistent', description: 'Return 5 packages', icon: Recycle, unlocked: false },
  { id: 4, name: 'Champion', description: 'Reach 500 eco points', icon: Trophy, unlocked: false },
];

function DashboardContent() {
  const { user } = useAuth();
  const { getStats } = useOrders();
  const stats = getStats();

  const currentLevel = ecoLevels.find(
    (level) => stats.ecoPoints >= level.minPoints && stats.ecoPoints < level.maxPoints
  ) || ecoLevels[0];
  
  const nextLevel = ecoLevels[ecoLevels.indexOf(currentLevel) + 1];
  const progressToNext = nextLevel
    ? ((stats.ecoPoints - currentLevel.minPoints) / (currentLevel.maxPoints - currentLevel.minPoints)) * 100
    : 100;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground">Eco Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            Track your environmental impact and sustainability achievements
          </p>
        </div>

        {/* Level Progress Card */}
        <Card className="mb-8 p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 animate-slide-up">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
                <Sparkles className="h-8 w-8" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Level</p>
                <h2 className={`text-2xl font-bold ${currentLevel.color}`}>
                  {currentLevel.name}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {stats.ecoPoints} / {currentLevel.maxPoints === Infinity ? '∞' : currentLevel.maxPoints} points
                </p>
              </div>
            </div>
            {nextLevel && (
              <div className="w-full sm:w-64">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Next: {nextLevel.name}</span>
                  <span className="text-sm font-medium text-primary">{Math.round(progressToNext)}%</span>
                </div>
                <Progress value={progressToNext} className="h-2" />
              </div>
            )}
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="p-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning/15">
                <Package className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.pendingReturns}</p>
                <p className="text-xs text-muted-foreground">Pending Returns</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 animate-slide-up" style={{ animationDelay: '0.15s' }}>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.inProgressReturns}</p>
                <p className="text-xs text-muted-foreground">In Progress</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/15">
                <Recycle className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.completedReturns}</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 animate-slide-up" style={{ animationDelay: '0.25s' }}>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15">
                <Leaf className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.returnRate}%</p>
                <p className="text-xs text-muted-foreground">Return Rate</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">Your Eco Impact</h2>
          </div>
          <EcoImpactChart stats={stats} />
        </div>

        {/* Achievements Section */}
        <div className="animate-slide-up" style={{ animationDelay: '0.35s' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <Trophy className="h-5 w-5 text-warning" />
              Achievements
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <Card
                  key={achievement.id}
                  className={`p-4 text-center transition-all ${
                    achievement.unlocked
                      ? 'border-success/30 bg-success/5'
                      : 'opacity-60'
                  }`}
                >
                  <div
                    className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full ${
                      achievement.unlocked
                        ? 'bg-success/20 text-success'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h4 className="font-medium text-foreground">{achievement.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{achievement.description}</p>
                  {achievement.unlocked && (
                    <span className="inline-block mt-2 text-xs font-medium text-success">✓ Unlocked</span>
                  )}
                </Card>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8 p-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Quick Actions
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link to="/orders">
              <Button variant="outline" className="w-full justify-between">
                <span className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  View Pending Returns
                </span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="outline" className="w-full justify-between">
                <span className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Update Preferences
                </span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Card>
      </main>
    </div>
  );
}

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
