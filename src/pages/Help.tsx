import { Navbar } from '@/components/Navbar';
import { HelpPanel } from '@/components/HelpPanel';
import { ProtectedRoute } from '@/components/ProtectedRoute';

function HelpContent() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <HelpPanel />
      </main>
    </div>
  );
}

export default function Help() {
  return (
    <ProtectedRoute>
      <HelpContent />
    </ProtectedRoute>
  );
}
