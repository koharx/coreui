// Format a date as YYYY-MM-DD or with a custom format (default: 'yyyy-MM-dd')
export function formatDate(date: Date, locale = 'en-US', options?: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat(locale, options).format(date);
}

// Parse a date string (YYYY-MM-DD) to a Date object
export function parseDate(dateStr: string): Date | null {
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? null : d;
}

// Add days to a date
export function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

// Check if dateA is before dateB
export function isBefore(dateA: Date, dateB: Date): boolean {
  return dateA.getTime() < dateB.getTime();
}

// Check if dateA is after dateB
export function isAfter(dateA: Date, dateB: Date): boolean {
  return dateA.getTime() > dateB.getTime();
} 