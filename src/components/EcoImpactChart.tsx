import { Card } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Leaf, TrendingUp, Recycle, TreePine } from 'lucide-react';

interface EcoImpactChartProps {
  stats: {
    completedReturns: number;
    totalCO2Saved: number;
    ecoPoints: number;
    returnRate: number;
  };
}

const monthlyData = [
  { month: 'Jul', returns: 2, co2: 5 },
  { month: 'Aug', returns: 3, co2: 7.5 },
  { month: 'Sep', returns: 1, co2: 2.5 },
  { month: 'Oct', returns: 4, co2: 10 },
  { month: 'Nov', returns: 3, co2: 7.5 },
  { month: 'Dec', returns: 5, co2: 12.5 },
];

const categoryData = [
  { name: 'Boxes', value: 45 },
  { name: 'Containers', value: 30 },
  { name: 'Pouches', value: 25 },
];

const COLORS = ['hsl(145, 32%, 28%)', 'hsl(25, 70%, 55%)', 'hsl(35, 35%, 60%)'];

export function EcoImpactChart({ stats }: EcoImpactChartProps) {
  const impactEquivalents = [
    { icon: TreePine, label: 'Trees planted equivalent', value: Math.round(stats.totalCO2Saved / 20) || 1 },
    { icon: Recycle, label: 'Packages reused', value: stats.completedReturns },
    { icon: Leaf, label: 'Plastic bags saved', value: stats.completedReturns * 15 },
  ];

  return (
    <div className="space-y-6">
      {/* Impact Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        {impactEquivalents.map((item, index) => {
          const Icon = item.icon;
          return (
            <Card key={index} className="p-4 text-center bg-gradient-to-br from-primary/5 to-primary/10">
              <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <p className="text-2xl font-bold text-foreground">{item.value}</p>
              <p className="text-xs text-muted-foreground">{item.label}</p>
            </Card>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* CO2 Saved Over Time */}
        <Card className="p-4">
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h4 className="font-semibold text-foreground">CO₂ Saved Over Time</h4>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(145, 32%, 28%)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="hsl(145, 32%, 28%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: 'hsl(150, 10%, 45%)' }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: 'hsl(150, 10%, 45%)' }}
                  unit=" lbs"
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(45, 40%, 99%)', 
                    border: '1px solid hsl(40, 20%, 88%)',
                    borderRadius: '8px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="co2"
                  stroke="hsl(145, 32%, 28%)"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorCo2)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Monthly Returns */}
        <Card className="p-4">
          <div className="mb-4 flex items-center gap-2">
            <Recycle className="h-5 w-5 text-accent" />
            <h4 className="font-semibold text-foreground">Monthly Returns</h4>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 12, fill: 'hsl(150, 10%, 45%)' }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 12, fill: 'hsl(150, 10%, 45%)' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(45, 40%, 99%)', 
                    border: '1px solid hsl(40, 20%, 88%)',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="returns" fill="hsl(25, 70%, 55%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Package Types */}
      <Card className="p-4">
        <div className="mb-4 flex items-center gap-2">
          <Leaf className="h-5 w-5 text-success" />
          <h4 className="font-semibold text-foreground">Package Types Returned</h4>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="h-40 w-40">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={60}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(45, 40%, 99%)', 
                    border: '1px solid hsl(40, 20%, 88%)',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-4 sm:flex-col sm:gap-2">
            {categoryData.map((item, index) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                <span className="text-sm text-muted-foreground">{item.name}</span>
                <span className="text-sm font-medium text-foreground">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
