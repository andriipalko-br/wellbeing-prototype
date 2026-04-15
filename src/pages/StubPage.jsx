import { Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function StubPage({ title }) {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-4xl">{title}</h1>
      <Card className="rounded-2xl border-brand-100 bg-brand-soft shadow-card">
        <CardContent className="flex flex-col items-center justify-center gap-3 p-16 text-center">
          <Sparkles className="h-12 w-12 text-brand-500/70" strokeWidth={1.5} />
          <p className="text-lg font-bold">Скоро буде</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            Цей розділ з'явиться у наступних версіях застосунку.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
