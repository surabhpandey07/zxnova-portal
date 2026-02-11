import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format currency in INR
 */
export function formatCurrency(amount: number, currency = 'INR'): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}

/**
 * Calculate GST amount
 */
export function calculateGST(amount: number, gstRate = 18): number {
  return (amount * gstRate) / 100
}

/**
 * Format date to readable format
 */
export function formatDate(date: Date | string, format: 'short' | 'long' = 'short'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  if (format === 'short') {
    return dateObj.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }
  
  return dateObj.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

/**
 * Generate unique ID
 */
export function generateId(prefix = ''): string {
  return `${prefix}${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Generate invoice/proposal number
 */
export function generateInvoiceNumber(prefix = 'INV'): string {
  const year = new Date().getFullYear()
  const random = Math.floor(Math.random() * 10000)
  return `${prefix}-${year}-${String(random).padStart(4, '0')}`
}

/**
 * Check if task is overdue
 */
export function isOverdue(dueDate: Date | null): boolean {
  if (!dueDate) return false
  return new Date(dueDate) < new Date()
}

/**
 * Get days remaining
 */
export function getDaysRemaining(dueDate: Date | null): number | null {
  if (!dueDate) return null
  const today = new Date()
  const due = new Date(dueDate)
  const difference = due.getTime() - today.getTime()
  return Math.ceil(difference / (1000 * 60 * 60 * 24))
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, length = 50): string {
  if (text.length <= length) return text
  return text.substr(0, length) + '...'
}

/**
 * Validate email
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate GST number (Indian format)
 */
export function validateGST(gst: string): boolean {
  const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
  return gstRegex.test(gst)
}

/**
 * Sort array of items by date
 */
export function sortByDate<T extends { createdAt?: Date | string }>(
  items: T[],
  order: 'asc' | 'desc' = 'desc'
): T[] {
  return [...items].sort((a, b) => {
    const dateA = new Date(a.createdAt || 0).getTime()
    const dateB = new Date(b.createdAt || 0).getTime()
    return order === 'asc' ? dateA - dateB : dateB - dateA
  })
}

/**
 * Group items by property
 */
export function groupBy<T>(items: T[], key: keyof T): Record<string, T[]> {
  return items.reduce((groups, item) => {
    const groupKey = String(item[key])
    if (!groups[groupKey]) {
      groups[groupKey] = []
    }
    groups[groupKey].push(item)
    return groups
  }, {} as Record<string, T[]>)
}
