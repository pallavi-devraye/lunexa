import { type ClassValue, clsx } from 'clsx';

/** Merge and conditionally apply class names. */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
