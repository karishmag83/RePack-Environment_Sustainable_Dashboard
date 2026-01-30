import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  MessageCircle,
  Mail,
  Phone,
  ChevronRight,
  Leaf,
  Package,
  Clock,
  HelpCircle,
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const faqs = [
  {
    id: '1',
    question: 'How do I return my reusable packaging?',
    answer:
      'Simply go to your Orders page, find the order with reusable packaging, and click "Start Return." You can choose to drop off at a nearby location or schedule a free pickup from your address.',
  },
  {
    id: '2',
    question: 'What happens if I miss the return deadline?',
    answer:
      "Don't worry! While we encourage timely returns to maximize sustainability, there are no penalties for late returns. Your order will be marked as 'overdue' but you can still complete the return process.",
  },
  {
    id: '3',
    question: 'Do I need to clean the packaging before returning?',
    answer:
      "A quick rinse is appreciated but not required. Our facilities thoroughly clean and sanitize all returned packaging before reuse. Just make sure there's no food residue.",
  },
  {
    id: '4',
    question: 'What are the environmental benefits?',
    answer:
      'Each returned package saves approximately 2.5 lbs of CO₂ emissions compared to single-use packaging. Collectively, our RePack community has prevented over 500,000 lbs of waste from entering landfills!',
  },
  {
    id: '5',
    question: 'Can I track my return status?',
    answer:
      'Yes! Once you initiate a return, you can track its progress through four stages: Requested → In Transit → Received → Processed. Updates are shown on your Orders page in real-time.',
  },
  {
    id: '6',
    question: 'Do I earn rewards for returning packages?',
    answer:
      'Absolutely! You earn 50 eco-points for each successfully processed return. Points can be redeemed for discounts, free shipping, or donated to environmental causes.',
  },
];

const contactOptions = [
  {
    icon: MessageCircle,
    title: 'Live Chat',
    description: 'Chat with our support team',
    action: 'Start Chat',
    available: true,
  },
  {
    icon: Mail,
    title: 'Email Support',
    description: 'help@repack.eco',
    action: 'Send Email',
    available: true,
  },
  {
    icon: Phone,
    title: 'Phone Support',
    description: '1-800-REPACK',
    action: 'Call Now',
    available: false,
    note: 'Mon-Fri 9am-5pm EST',
  },
];

export function HelpPanel() {
  const navigate = useNavigate();

  const handleContactAction = (option: typeof contactOptions[0]) => {
    if (option.title === 'Email Support') {
      window.location.href = 'mailto:help@repack.eco';
    } else if (option.title === 'Phone Support') {
      window.location.href = 'tel:1-800-REPACK';
    } else {
      toast({
        title: `${option.title}`,
        description: 'Live chat is connecting... This is a demo feature.',
      });
    }
  };

  const handleQuickAction = (action: string) => {
    if (action === 'return') {
      navigate('/orders');
      toast({
        title: 'Navigating to Orders',
        description: 'Select an order to start a return.',
      });
    } else if (action === 'track') {
      navigate('/orders');
      toast({
        title: 'Navigating to Orders',
        description: 'Click "Track Return" on any active return.',
      });
    } else if (action === 'impact') {
      toast({
        title: 'Your Eco Impact 🌱',
        description: 'You\'ve saved 2.5 lbs CO₂ and earned 50 eco-points!',
      });
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Header */}
      <div className="text-center animate-fade-in">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
          <HelpCircle className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">How can we help?</h1>
        <p className="mt-2 text-muted-foreground">
          Find answers to common questions or get in touch with our team
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-3 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <Card 
          className="flex items-center gap-4 p-4 transition-all hover:shadow-md hover:border-primary/30 cursor-pointer"
          onClick={() => handleQuickAction('return')}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <Package className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-medium text-foreground">Start a Return</h3>
            <p className="text-sm text-muted-foreground">Quick & easy process</p>
          </div>
        </Card>

        <Card 
          className="flex items-center gap-4 p-4 transition-all hover:shadow-md hover:border-primary/30 cursor-pointer"
          onClick={() => handleQuickAction('track')}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
            <Clock className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h3 className="font-medium text-foreground">Track Return</h3>
            <p className="text-sm text-muted-foreground">See real-time status</p>
          </div>
        </Card>

        <Card 
          className="flex items-center gap-4 p-4 transition-all hover:shadow-md hover:border-primary/30 cursor-pointer"
          onClick={() => handleQuickAction('impact')}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10">
            <Leaf className="h-6 w-6 text-success" />
          </div>
          <div>
            <h3 className="font-medium text-foreground">Eco Impact</h3>
            <p className="text-sm text-muted-foreground">See your contribution</p>
          </div>
        </Card>
      </div>

      {/* FAQs */}
      <Card className="p-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <h2 className="mb-4 text-xl font-semibold text-foreground">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id} className="border-border">
              <AccordionTrigger className="text-left font-medium text-foreground hover:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>

      {/* Contact Options */}
      <Card className="p-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <h2 className="mb-4 text-xl font-semibold text-foreground">Still need help?</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {contactOptions.map((option) => {
            const Icon = option.icon;
            return (
              <div
                key={option.title}
                className="rounded-xl border border-border p-4 transition-all hover:border-primary/30 hover:shadow-md"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-medium text-foreground">{option.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{option.description}</p>
                {option.note && (
                  <p className="mt-1 text-xs text-muted-foreground">{option.note}</p>
                )}
                <Button
                  variant="soft"
                  size="sm"
                  className="mt-3 w-full"
                  onClick={() => handleContactAction(option)}
                >
                  {option.action}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Sustainability Footer */}
      <div className="rounded-2xl bg-primary/5 p-6 text-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
        <Leaf className="mx-auto h-8 w-8 text-primary" />
        <h3 className="mt-3 text-lg font-semibold text-foreground">
          Together, we're making a difference
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Our community has returned over 1 million packages, preventing 2.5 million lbs of waste
          from landfills. Thank you for being part of the solution! 🌱
        </p>
      </div>
    </div>
  );
}
