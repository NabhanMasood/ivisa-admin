import type { VisaProduct, ProcessingFee } from '~/composables/useVisaProductsApi'

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

// ============================================================================
// CSV Import Helper Functions
// ============================================================================

/**
 * Standard Format CSV Row
 */
export interface StandardFormatRow {
  nationality: string
  destination: string
  productName: string
  duration: string | number
  validity: string | number
  entryType: string
  customEntryName?: string
  govtFee: string | number
  serviceFee: string | number
  totalAmount: string | number
  isFreeVisa?: string | boolean
  processingFees?: string
}

/**
 * Compact Format CSV Row
 */
export interface CompactFormatRow {
  nationality: string
  destination: string
  products: string
}

/**
 * Parsed Product Data (from either format)
 */
export interface ParsedProductData {
  nationality: string
  destination: string
  productName: string
  duration: number
  validity: number
  entryType: 'single' | 'multiple' | 'custom'
  customEntryName?: string
  govtFee: number
  serviceFee: number
  totalAmount: number
  isFreeVisa: boolean
  processingFees?: ProcessingFee[]
}

/**
 * Validation Error
 */
export interface ValidationError {
  row: number
  error: string
}

/**
 * Parse processing fees from string format
 * Format: "feeType:timeValue:timeUnit:amount|feeType:timeValue:timeUnit:amount|..."
 * @param processingFeesStr - Processing fees string
 * @returns Array of ProcessingFee objects or undefined if empty/invalid
 */
export function parseProcessingFees(processingFeesStr?: string): ProcessingFee[] | undefined {
  if (!processingFeesStr || processingFeesStr.trim() === '') {
    return undefined
  }

  const fees: ProcessingFee[] = []
  const feeStrings = processingFeesStr.split('|').map(s => s.trim()).filter(s => s)

  for (const feeStr of feeStrings) {
    const parts = feeStr.split(':').map(s => s.trim())

    if (parts.length !== 4) {
      throw new Error(`Invalid processing fee format: ${feeStr}. Expected format: feeType:timeValue:timeUnit:amount`)
    }

    const [feeType, timeValueStr, timeUnit, amountStr] = parts

    if (!feeType) {
      throw new Error(`Processing fee type is required: ${feeStr}`)
    }

    const timeValue = parseInt(timeValueStr, 10)
    if (isNaN(timeValue) || timeValue < 0) {
      throw new Error(`Invalid time value: ${timeValueStr}. Must be a non-negative integer`)
    }

    if (timeUnit !== 'hours' && timeUnit !== 'days') {
      throw new Error(`Invalid time unit: ${timeUnit}. Must be 'hours' or 'days'`)
    }

    const amount = parseFloat(amountStr)
    if (isNaN(amount) || amount < 0) {
      throw new Error(`Invalid amount: ${amountStr}. Must be a non-negative number`)
    }

    fees.push({
      feeType,
      timeValue,
      timeUnit: timeUnit as 'hours' | 'days',
      amount,
    })
  }

  return fees.length > 0 ? fees : undefined
}

/**
 * Parse boolean value from string
 * @param value - String or boolean value
 * @returns Boolean value
 */
function parseBoolean(value?: string | boolean): boolean {
  if (typeof value === 'boolean') {
    return value
  }
  if (typeof value === 'string') {
    const lower = value.toLowerCase().trim()
    return lower === 'true' || lower === '1' || lower === 'yes'
  }
  return false
}

/**
 * Parse a product from compact format string
 * Format: "productName:duration:validity:entryType:customEntryName:govtFee:serviceFee:totalAmount:isFreeVisa:processingFees"
 * @param productStr - Product string from compact format
 * @param nationality - Nationality name
 * @param destination - Destination country
 * @returns Parsed product data
 */
export function parseCompactProduct(
  productStr: string,
  nationality: string,
  destination: string
): ParsedProductData {
  const parts = productStr.split(':').map(s => s.trim())

  if (parts.length < 9) {
    throw new Error(`Invalid product format. Expected at least 9 parts separated by ':', got ${parts.length}`)
  }

  const [
    productName,
    durationStr,
    validityStr,
    entryType,
    customEntryName,
    govtFeeStr,
    serviceFeeStr,
    totalAmountStr,
    isFreeVisaStr,
    ...processingFeesParts
  ] = parts

  // Validate required fields
  if (!productName) {
    throw new Error('Product name is required')
  }

  // Parse numeric values
  const duration = parseInt(durationStr, 10)
  if (isNaN(duration) || duration < 1) {
    throw new Error(`Invalid duration: ${durationStr}. Must be a positive integer`)
  }

  const validity = parseInt(validityStr, 10)
  if (isNaN(validity) || validity < 1) {
    throw new Error(`Invalid validity: ${validityStr}. Must be a positive integer`)
  }

  // Validate entry type
  if (!['single', 'multiple', 'custom'].includes(entryType)) {
    throw new Error(`Invalid entryType: ${entryType}. Must be 'single', 'multiple', or 'custom'`)
  }

  if (entryType === 'custom' && !customEntryName) {
    throw new Error('customEntryName is required when entryType is "custom"')
  }

  // Parse fee values
  const govtFee = parseFloat(govtFeeStr)
  if (isNaN(govtFee) || govtFee < 0) {
    throw new Error(`Invalid govtFee: ${govtFeeStr}. Must be a non-negative number`)
  }

  const serviceFee = parseFloat(serviceFeeStr)
  if (isNaN(serviceFee) || serviceFee < 0) {
    throw new Error(`Invalid serviceFee: ${serviceFeeStr}. Must be a non-negative number`)
  }

  const totalAmount = parseFloat(totalAmountStr)
  if (isNaN(totalAmount) || totalAmount < 0) {
    throw new Error(`Invalid totalAmount: ${totalAmountStr}. Must be a non-negative number`)
  }

  const isFreeVisa = parseBoolean(isFreeVisaStr)

  // Parse processing fees if provided
  let processingFees: ProcessingFee[] | undefined
  if (processingFeesParts.length > 0 && processingFeesParts[0]) {
    processingFees = parseProcessingFees(processingFeesParts.join(':'))
  }

  return {
    nationality,
    destination,
    productName,
    duration,
    validity,
    entryType: entryType as 'single' | 'multiple' | 'custom',
    customEntryName: customEntryName || undefined,
    govtFee,
    serviceFee,
    totalAmount,
    isFreeVisa,
    processingFees,
  }
}

/**
 * Parse a standard format CSV row
 * @param row - Standard format row object
 * @returns Parsed product data
 */
export function parseStandardRow(row: StandardFormatRow): ParsedProductData {
  // Validate required fields
  if (!row.nationality || row.nationality.trim() === '') {
    throw new Error('Nationality is required')
  }

  if (!row.destination || row.destination.trim() === '') {
    throw new Error('Destination is required')
  }

  if (!row.productName || row.productName.trim() === '') {
    throw new Error('Product name is required')
  }

  // Parse numeric values
  const duration = typeof row.duration === 'number' ? row.duration : parseInt(String(row.duration), 10)
  if (isNaN(duration) || duration < 1) {
    throw new Error(`Invalid duration: ${row.duration}. Must be a positive integer`)
  }

  const validity = typeof row.validity === 'number' ? row.validity : parseInt(String(row.validity), 10)
  if (isNaN(validity) || validity < 1) {
    throw new Error(`Invalid validity: ${row.validity}. Must be a positive integer`)
  }

  // Validate entry type
  const entryType = String(row.entryType).toLowerCase().trim()
  if (!['single', 'multiple', 'custom'].includes(entryType)) {
    throw new Error(`Invalid entryType: ${row.entryType}. Must be 'single', 'multiple', or 'custom'`)
  }

  if (entryType === 'custom') {
    if (!row.customEntryName || String(row.customEntryName).trim() === '') {
      throw new Error('customEntryName is required when entryType is "custom"')
    }
  }

  // Parse fee values
  const govtFee = typeof row.govtFee === 'number' ? row.govtFee : parseFloat(String(row.govtFee))
  if (isNaN(govtFee) || govtFee < 0) {
    throw new Error(`Invalid govtFee: ${row.govtFee}. Must be a non-negative number`)
  }

  const serviceFee = typeof row.serviceFee === 'number' ? row.serviceFee : parseFloat(String(row.serviceFee))
  if (isNaN(serviceFee) || serviceFee < 0) {
    throw new Error(`Invalid serviceFee: ${row.serviceFee}. Must be a non-negative number`)
  }

  const totalAmount = typeof row.totalAmount === 'number' ? row.totalAmount : parseFloat(String(row.totalAmount))
  if (isNaN(totalAmount) || totalAmount < 0) {
    throw new Error(`Invalid totalAmount: ${row.totalAmount}. Must be a non-negative number`)
  }

  const isFreeVisa = parseBoolean(row.isFreeVisa)

  // Parse processing fees if provided
  let processingFees: ProcessingFee[] | undefined
  if (row.processingFees && String(row.processingFees).trim() !== '') {
    processingFees = parseProcessingFees(String(row.processingFees))
  }

  return {
    nationality: String(row.nationality).trim(),
    destination: String(row.destination).trim(),
    productName: String(row.productName).trim(),
    duration,
    validity,
    entryType: entryType as 'single' | 'multiple' | 'custom',
    customEntryName: row.customEntryName ? String(row.customEntryName).trim() : undefined,
    govtFee,
    serviceFee,
    totalAmount,
    isFreeVisa,
    processingFees,
  }
}

/**
 * Parse a compact format CSV row
 * @param row - Compact format row object
 * @returns Array of parsed product data
 */
export function parseCompactRow(row: CompactFormatRow): ParsedProductData[] {
  // Validate required fields
  if (!row.nationality || row.nationality.trim() === '') {
    throw new Error('Nationality is required')
  }

  if (!row.destination || row.destination.trim() === '') {
    throw new Error('Destination is required')
  }

  if (!row.products || row.products.trim() === '') {
    throw new Error('Products are required in compact format')
  }

  // Split products by semicolon
  const productStrings = row.products.split(';').map(s => s.trim()).filter(s => s)

  if (productStrings.length === 0) {
    throw new Error('At least one product is required in compact format')
  }

  // Parse each product
  return productStrings.map(productStr =>
    parseCompactProduct(productStr, row.nationality.trim(), row.destination.trim())
  )
}

/**
 * Detect CSV format (standard or compact)
 * @param headers - CSV header row
 * @returns 'standard' | 'compact' | null
 */
export function detectCSVFormat(headers: string[]): 'standard' | 'compact' | null {
  const normalizedHeaders = headers.map(h => h.toLowerCase().trim())

  // Check for compact format (has 'products' column)
  if (normalizedHeaders.includes('products')) {
    return 'compact'
  }

  // Check for standard format (has 'productname' column)
  if (normalizedHeaders.includes('productname')) {
    return 'standard'
  }

  return null
}

/**
 * Parse CSV file and return parsed data
 * @param csvText - CSV file content as string
 * @param availableCountries - Array of available country names for validation
 * @returns Object with parsed data and errors
 */
export function parseCSVFile(
  csvText: string,
  availableCountries?: string[]
): {
  data: ParsedProductData[]
  errors: ValidationError[]
  format: 'standard' | 'compact' | null
} {
  const errors: ValidationError[] = []
  const data: ParsedProductData[] = []

  try {
    // Split into lines
    const lines = csvText.split('\n').map(line => line.trim()).filter(line => line)

    if (lines.length < 2) {
      throw new Error('CSV file must have at least a header row and one data row')
    }

    // Parse header
    const headerLine = lines[0]
    const headers = parseCSVLine(headerLine).map(h => h.trim())

    // Detect format
    const format = detectCSVFormat(headers)
    if (!format) {
      throw new Error('Invalid CSV format. Must have either "productName" column (standard) or "products" column (compact)')
    }

    // Process data rows
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i]
      if (!line.trim()) continue

      try {
        const values = parseCSVLine(line)
        const row: Record<string, string> = {}

        // Map values to headers
        headers.forEach((header, index) => {
          row[header] = values[index] || ''
        })

        if (format === 'standard') {
          // Parse standard format
          const parsed = parseStandardRow(row as unknown as StandardFormatRow)

          // Validate nationality exists
          if (availableCountries && availableCountries.length > 0) {
            const nationalityExists = availableCountries.some(
              country => country.toLowerCase() === parsed.nationality.toLowerCase()
            )
            if (!nationalityExists) {
              errors.push({
                row: i + 1,
                error: `Nationality '${parsed.nationality}' does not exist in countries table`
              })
              return
            }
          }

          data.push(parsed)
        } else {
          // Parse compact format
          const parsedProducts = parseCompactRow(row as unknown as CompactFormatRow)

          // Validate nationality exists for each product
          for (const parsed of parsedProducts) {
            if (availableCountries && availableCountries.length > 0) {
              const nationalityExists = availableCountries.some(
                country => country.toLowerCase() === parsed.nationality.toLowerCase()
              )
              if (!nationalityExists) {
                errors.push({
                  row: i + 1,
                  error: `Nationality '${parsed.nationality}' does not exist in countries table`
                })
                continue
              }
            }
            data.push(parsed)
          }
        }
      } catch (error) {
        errors.push({
          row: i + 1,
          error: error instanceof Error ? error.message : String(error)
        })
      }
    }
  } catch (error) {
    errors.push({
      row: 0,
      error: error instanceof Error ? error.message : String(error)
    })
  }

  return { data, errors, format }
}

/**
 * Parse a CSV line handling quoted values
 * @param line - CSV line string
 * @returns Array of values
 */
function parseCSVLine(line: string): string[] {
  const values: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    const nextChar = line[i + 1]

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped quote
        current += '"'
        i++ // Skip next quote
      } else {
        // Toggle quote state
        inQuotes = !inQuotes
      }
    } else if (char === ',' && !inQuotes) {
      // End of field
      values.push(current)
      current = ''
    } else {
      current += char
    }
  }

  // Add last field
  values.push(current)

  return values
}

/**
 * Validate parsed product data
 * @param data - Parsed product data
 * @param availableCountries - Array of available country names
 * @returns Validation error message or null if valid
 */
export function validateParsedProduct(
  data: ParsedProductData,
  availableCountries?: string[]
): string | null {
  // Validate nationality exists
  if (availableCountries && availableCountries.length > 0) {
    const nationalityExists = availableCountries.some(
      country => country.toLowerCase() === data.nationality.toLowerCase()
    )
    if (!nationalityExists) {
      return `Nationality '${data.nationality}' does not exist in countries table`
    }
  }

  // Additional validations are already done during parsing
  return null
}

