import type { VisaProduct } from '~/composables/useVisaProductsApi'

/**
 * Get the display text for entry type
 * @param product - Visa product object
 * @returns Display text for entry type
 */
export function getEntryTypeDisplay(product: VisaProduct): string {
  if (product.entryType === 'custom' && product.customEntryName) {
    return product.customEntryName
  }
  if (product.entryType === 'single') {
    return 'Single Entry'
  }
  if (product.entryType === 'multiple') {
    return 'Multiple Entry'
  }
  return product.entryType || 'Unknown'
}

/**
 * Get the visa type value for API (format: {validity}-{entryTypeValue})
 * @param product - Visa product object
 * @returns Visa type string (e.g., "90-single", "90-multiple", "90-Double Entry")
 */
export function getVisaTypeValue(product: VisaProduct): string {
  const entryTypeValue = product.entryType === 'custom' && product.customEntryName
    ? product.customEntryName
    : product.entryType
  return `${product.validity}-${entryTypeValue}`
}

/**
 * Format visa type for display (format: "{validity} - {entryTypeDisplay}")
 * @param product - Visa product object
 * @returns Formatted visa type string (e.g., "90 - Single Entry", "90 - Double Entry")
 */
export function formatVisaTypeForDisplay(product: VisaProduct): string {
  const entryTypeDisplay = getEntryTypeDisplay(product)
  return `${product.validity} - ${entryTypeDisplay}`
}

