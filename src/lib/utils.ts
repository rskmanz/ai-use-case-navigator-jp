import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimeToImplement(time: string): string {
  return time.replace(/(\d+)-(\d+)\s*(hours?|days?|minutes?)/, '$1-$2 $3');
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty.toLowerCase()) {
    case 'beginner':
      return 'success';
    case 'intermediate':
      return 'warning';
    case 'advanced':
      return 'danger';
    default:
      return 'default';
  }
}

export function getCategoryColor(category: string): string {
  const categoryColors: Record<string, string> = {
    'business-automation': 'primary',
    'content-creation': 'secondary',
    'data-analysis': 'warning',
    'customer-service': 'success',
    'development': 'danger',
    'research': 'default',
    'design': 'primary',
    'finance': 'warning',
    'hr': 'secondary',
    'sales': 'success'
  };
  
  return categoryColors[category] || 'default';
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function formatCost(cost: string): string {
  const costMap: Record<string, string> = {
    'free': 'Free',
    'low': '$0-50/month',
    'medium': '$50-200/month',
    'high': '$200+/month',
    'custom': 'Custom pricing'
  };
  
  return costMap[cost.toLowerCase()] || cost;
}

export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}