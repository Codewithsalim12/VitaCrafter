import Link from 'next/link';
import { FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <FileText className="h-6 w-6 text-primary" />
      <span className="text-xl font-bold font-headline text-foreground">
        VitaCrafter
      </span>
    </Link>
  );
}
