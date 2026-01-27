# Global Marketplace Documentation

## Overview

The Global Marketplace system enables international commerce for the Artisans platform, providing comprehensive support for multi-region operations, cross-border transactions, and international compliance.

**Version:** 1.0.0  
**Last Updated:** December 12, 2025

---

## Table of Contents

1. [Global Marketplace Service](#global-marketplace-service)
2. [Multi-Currency Payment System](#multi-currency-payment-system)
3. [International Shipping Calculator](#international-shipping-calculator)
4. [Compliance & Tax System](#compliance-tax-system)
5. [Regional Adaptation Component](#regional-adaptation-component)
6. [Integration Guide](#integration-guide)
7. [API Reference](#api-reference)

---

## Global Marketplace Service

**File:** `lib/global-marketplace-service.ts`

### Features

- **Multi-region support** across 4 major markets (India, US, UK, EU)
- **Cross-border transaction management**
- **Regional compliance** (GDPR, CCPA, DPDPA)
- **International vendor management**
- **Global inventory tracking**

### Supported Regions

| Region         | Code | Currency | Languages              | Status |
| -------------- | ---- | -------- | ---------------------- | ------ |
| India          | IN   | INR      | en, hi, bn, te, mr, ta | Active |
| United States  | US   | USD      | en, es                 | Active |
| United Kingdom | UK   | GBP      | en                     | Active |
| European Union | EU   | EUR      | en, de, fr, es, it     | Active |

### Key Components

#### MarketplaceRegion Interface

```typescript
interface MarketplaceRegion {
  id: string;
  code: string;
  name: string;
  currency: string;
  languages: string[];
  timezone: string;
  settings: {
    operationalHours: { start: string; end: string; timezone: string };
    supportedPaymentMethods: string[];
    minOrderValue: number;
    maxOrderValue: number;
    taxIncluded: boolean;
  };
  shipping: {
    domesticCarriers: string[];
    internationalCarriers: string[];
    averageDeliveryDays: number;
    freeShippingThreshold?: number;
  };
  regulations: {
    requiresImportLicense: boolean;
    restrictedCategories: string[];
    customsDeclarationRequired: boolean;
    requiresProductCertification: boolean;
    dataPrivacyCompliance: string[];
  };
}
```

#### GlobalProduct Interface

```typescript
interface GlobalProduct {
  id: string;
  baseProductId: string;
  availableInRegions: string[];
  regionalPricing: Record<
    string,
    {
      price: number;
      currency: string;
      includingTax: boolean;
    }
  >;
  regionalContent: Record<
    string,
    {
      title: string;
      description: string;
      keywords: string[];
    }
  >;
  compliance: Record<
    string,
    {
      approved: boolean;
      certifications: string[];
      restrictions?: string[];
    }
  >;
  regionalInventory: Record<
    string,
    {
      quantity: number;
      warehouse: string;
      reorderPoint: number;
    }
  >;
}
```

### Usage Examples

#### Get Active Regions

```typescript
import { globalMarketplaceService } from '@/lib/global-marketplace-service';

const regions = await globalMarketplaceService.getActiveRegions();
console.log(`Available in ${regions.length} regions`);
```

#### Check Product Availability

```typescript
const isAvailable = await globalMarketplaceService.isProductAvailableInRegion('product-123', 'UK');
```

#### Create Cross-Border Order

```typescript
const order = await globalMarketplaceService.createCrossBorderOrder({
  orderId: 'order-456',
  productId: 'product-123',
  origin: { country: 'IN', warehouse: 'warehouse-mumbai' },
  destination: {
    country: 'US',
    region: 'NY',
    address: {
      /* address details */
    },
  },
  productValue: 150,
  currency: 'USD',
});
```

#### Get Marketplace Statistics

```typescript
const stats = await globalMarketplaceService.getMarketplaceStats();
/*
{
  totalRegions: 4,
  activeRegions: 4,
  totalProducts: 150,
  totalOrders: 523,
  ordersByRegion: { US: 245, UK: 123, EU: 98, IN: 57 },
  revenueByRegion: { US: 45000, UK: 28000, EU: 32000, IN: 15000 },
  averageOrderValue: 229.45
}
*/
```

---

## Multi-Currency Payment System

**File:** `lib/multi-currency-payment-system.ts`

### Features

- **9 supported currencies** (USD, EUR, GBP, INR, JPY, AUD, CAD, SGD, AED)
- **4 payment gateways** (Stripe, Razorpay, PayPal, Wise)
- **Real-time exchange rates**
- **Multi-currency wallets**
- **Automatic currency conversion**
- **Fee calculation** (gateway fees + conversion fees)

### Supported Currencies

| Code | Symbol | Name              | Decimals |
| ---- | ------ | ----------------- | -------- |
| USD  | $      | US Dollar         | 2        |
| EUR  | €      | Euro              | 2        |
| GBP  | £      | British Pound     | 2        |
| INR  | ₹      | Indian Rupee      | 2        |
| JPY  | ¥      | Japanese Yen      | 0        |
| AUD  | A$     | Australian Dollar | 2        |
| CAD  | C$     | Canadian Dollar   | 2        |
| SGD  | S$     | Singapore Dollar  | 2        |
| AED  | د.إ    | UAE Dirham        | 2        |

### Payment Gateways

| Gateway  | Type          | Countries                      | Currencies                             | Fee Structure |
| -------- | ------------- | ------------------------------ | -------------------------------------- | ------------- |
| Stripe   | Card          | US, UK, EU, IN, AU, CA, SG, AE | USD, EUR, GBP, INR, AUD, CAD, SGD, AED | 2.9% + $0.30  |
| Razorpay | Card          | IN                             | INR                                    | 2.0%          |
| PayPal   | Wallet        | US, UK, EU, IN, AU, CA         | USD, EUR, GBP, INR, AUD, CAD           | 3.49% + $0.49 |
| Wise     | Bank Transfer | Global                         | All supported                          | 0.5%          |

### Usage Examples

#### Get Exchange Rate

```typescript
import { multiCurrencyPaymentSystem } from '@/lib/multi-currency-payment-system';

const rate = await multiCurrencyPaymentSystem.getExchangeRate('USD', 'INR');
// Returns: 83.12
```

#### Convert Currency

```typescript
const conversion = await multiCurrencyPaymentSystem.convertCurrency(100, 'USD', 'EUR');
/*
{
  original: 100,
  converted: 92.00,
  rate: 0.92,
  from: 'USD',
  to: 'EUR'
}
*/
```

#### Process Payment

```typescript
const payment = await multiCurrencyPaymentSystem.processPayment({
  orderId: 'order-789',
  amount: 150,
  currency: 'USD',
  gatewayId: 'stripe',
  customerId: 'customer-456',
  customerCountry: 'US',
  convertToCurrency: 'EUR', // Optional
});
```

#### Get Available Gateways

```typescript
const gateways = await multiCurrencyPaymentSystem.getAvailableGateways('INR', 'IN');
// Returns: [Stripe, Razorpay]
```

#### Multi-Currency Wallet

```typescript
// Get wallet
const wallet = await multiCurrencyPaymentSystem.getWallet('user-123');

// Add funds
await multiCurrencyPaymentSystem.addFundsToWallet('user-123', 1000, 'USD');

// Convert balance
await multiCurrencyPaymentSystem.convertWalletBalance('user-123', 500, 'USD', 'EUR');
```

---

## International Shipping Calculator

**File:** `lib/international-shipping-calculator.ts`

### Features

- **7 shipping zones** (Domestic to Rest of World)
- **4 carrier options** (DHL Express, FedEx, Aramex, India Post)
- **Smart pricing** (weight-based, volumetric, zone surcharges)
- **Customs handling**
- **Real-time tracking**
- **Delivery estimates**

### Shipping Zones

| Zone     | Name                         | Countries                          | Base Delivery Days |
| -------- | ---------------------------- | ---------------------------------- | ------------------ |
| Domestic | India                        | IN                                 | 3                  |
| Zone 1   | South Asia                   | BD, LK, NP, BT, MV, PK             | 5                  |
| Zone 2   | Southeast Asia & Middle East | SG, MY, TH, ID, VN, AE, SA, QA     | 7                  |
| Zone 3   | East Asia & Australia        | JP, KR, CN, HK, TW, AU, NZ         | 8                  |
| Zone 4   | Europe                       | UK, DE, FR, IT, ES, NL, BE, CH, AT | 9                  |
| Zone 5   | North America                | US, CA, MX                         | 10                 |
| Zone 6   | Rest of World                | BR, AR, CL, ZA, RU                 | 12                 |

### Carrier Comparison

| Carrier             | Type     | Max Weight | Base Rate | Per Kg Rate | Features                                |
| ------------------- | -------- | ---------- | --------- | ----------- | --------------------------------------- |
| DHL Express         | Express  | 70kg       | $25       | $12         | Tracking, Insurance, Signature, Customs |
| FedEx International | Express  | 68kg       | $22       | $11         | Tracking, Insurance, Signature, Customs |
| Aramex              | Standard | 50kg       | $15       | $8          | Tracking, Insurance, Customs            |
| India Post          | Economy  | 30kg       | $8        | $5          | Tracking                                |

### Usage Examples

#### Calculate Shipping Quotes

```typescript
import { internationalShippingCalculator } from '@/lib/international-shipping-calculator';

const quotes = await internationalShippingCalculator.calculateShippingQuote({
  origin: {
    country: 'IN',
    city: 'Mumbai',
    postalCode: '400001',
    addressLine1: 'Warehouse Address',
  },
  destination: {
    country: 'US',
    state: 'NY',
    city: 'New York',
    postalCode: '10001',
    addressLine1: 'Customer Address',
  },
  package: {
    length: 30, // cm
    width: 20, // cm
    height: 15, // cm
    weight: 2.5, // kg
  },
  insuranceValue: 150,
});

// Returns array of quotes sorted by price
/*
[
  {
    id: 'quote-...',
    carrier: { id: 'india-post', name: 'India Post International', type: 'economy' },
    costs: {
      baseCost: 8,
      weightCost: 12.5,
      zoneSurcharge: 10.25,
      fuelSurcharge: 3.08,
      insuranceCost: 1.5,
      customsHandling: 10,
      total: 45.33,
      currency: 'USD'
    },
    delivery: {
      estimatedDays: 15,
      estimatedDate: 2025-12-27T...
    },
    details: {
      actualWeight: 2.5,
      volumetricWeight: 1.8,
      chargeableWeight: 2.5,
      zone: 'North America'
    }
  },
  // ... more quotes
]
*/
```

#### Create Shipment

```typescript
const shipment = await internationalShippingCalculator.createShipment({
  orderId: 'order-789',
  origin: {
    /* origin address */
  },
  destination: {
    /* destination address */
  },
  package: {
    length: 30,
    width: 20,
    height: 15,
    weight: 2.5,
  },
  contents: [
    {
      description: 'Handcrafted pottery vase',
      value: 150,
      currency: 'USD',
      quantity: 1,
    },
  ],
  carrierId: 'dhl-express',
});

// Returns shipment with tracking number
console.log(shipment.carrier.trackingNumber); // TRK1734...ABC
```

#### Track Shipment

```typescript
const shipment = await internationalShippingCalculator.trackShipment('TRK1734...ABC');

console.log(shipment.status); // 'in_transit'
console.log(shipment.statusHistory);
/*
[
  { status: 'created', timestamp: ..., notes: 'Shipment created' },
  { status: 'picked_up', timestamp: ..., location: 'Mumbai' },
  { status: 'in_transit', timestamp: ..., location: 'Dubai Hub' }
]
*/
```

#### Create Customs Declaration

```typescript
const declaration = await internationalShippingCalculator.createCustomsDeclaration({
  shipmentId: 'ship-123',
  shipper: {
    name: 'Artisan Exports Ltd',
    address: {
      /* address */
    },
    taxId: 'GSTIN123...',
  },
  recipient: {
    name: 'Customer Name',
    address: {
      /* address */
    },
  },
  items: [
    {
      description: 'Handcrafted pottery',
      hsCode: '6913.10',
      quantity: 1,
      unitValue: 150,
      totalValue: 150,
      currency: 'USD',
      countryOfOrigin: 'IN',
    },
  ],
  purpose: 'sale',
  signerName: 'Export Manager',
});
```

---

## Compliance & Tax System

**File:** `lib/compliance-tax-system.ts`

### Features

- **8 tax regions** with specific regulations
- **Automatic tax calculation** (VAT, GST, Sales Tax, Import Duty)
- **Document generation** (Invoices, Certificates of Origin, Export Declarations)
- **Export compliance** (embargo checks, license requirements)
- **Tax reporting** (period reports, multi-region aggregation)
- **Tax ID validation**

### Tax Regions

| Region    | Tax Type  | Rate    | Tax Included | Threshold | E-Invoicing |
| --------- | --------- | ------- | ------------ | --------- | ----------- |
| India     | GST       | 18%     | Yes          | ₹0        | Yes         |
| US        | Sales Tax | ~8%     | No           | $0        | No          |
| UK        | VAT       | 20%     | Yes          | £0        | No          |
| EU        | VAT       | ~21%    | Yes          | €150      | No          |
| Australia | GST       | 10%     | Yes          | A$1000    | No          |
| Canada    | GST + PST | 5% + 8% | No           | C$0       | No          |
| Singapore | GST       | 9%      | Yes          | S$400     | No          |
| UAE       | VAT       | 5%      | Yes          | AED 0     | No          |

### Usage Examples

#### Calculate Tax

```typescript
import { complianceTaxSystem } from '@/lib/compliance-tax-system';

const taxCalc = await complianceTaxSystem.calculateTax({
  amount: 1000,
  currency: 'USD',
  regionCode: 'US',
  isB2B: false,
});

/*
{
  subtotal: 1000,
  currency: 'USD',
  breakdown: {
    vat: 0,
    gst: 0,
    salesTax: 80,
    importDuty: 0,
    luxuryTax: 0,
    otherTaxes: 0
  },
  totalTax: 80,
  total: 1080,
  region: 'United States',
  appliedRates: { salesTax: 8 }
}
*/
```

#### Validate Tax ID

```typescript
const isValid = await complianceTaxSystem.validateTaxId(
  '29ABCDE1234F1Z5', // GSTIN
  'IN'
);
// Returns: true/false
```

#### Generate Invoice

```typescript
const invoice = await complianceTaxSystem.generateInvoice({
  orderId: 'order-123',
  issuer: {
    name: 'Artisans Platform',
    address: '123 Business Street, Mumbai, India',
    taxId: '27AAAAA0000A1Z5',
    country: 'IN',
  },
  recipient: {
    name: 'Customer Name',
    address: 'Customer Address',
    taxId: '29BBBBB1111B1Z6',
    country: 'IN',
  },
  items: [
    {
      description: 'Handcrafted Banarasi Silk Saree',
      quantity: 1,
      unitPrice: 5000,
      totalPrice: 5000,
      taxRate: 0.18,
      tax: 900,
    },
  ],
  regionCode: 'IN',
});

console.log(invoice.documentNumber); // INV-1734...
console.log(invoice.totals); // { subtotal: 5000, tax: 900, total: 5900, currency: 'USD' }
```

#### Generate Certificate of Origin

```typescript
const certificate = await complianceTaxSystem.generateCertificateOfOrigin({
  exporterId: 'exp-123',
  exporterName: 'Artisan Exports Ltd',
  exporterAddress: 'Mumbai, India',
  importerName: 'Import Company LLC',
  importerAddress: 'New York, USA',
  importerCountry: 'US',
  items: [
    {
      description: 'Handcrafted pottery vase',
      hsCode: '6913.10',
      quantity: 5,
      value: 750,
    },
  ],
  originCountry: 'IN',
});

console.log(certificate.documentNumber); // COO-1734...
console.log(certificate.type); // 'certificate_of_origin'
console.log(certificate.validUntil); // 90 days from issue
```

#### Check Export Compliance

```typescript
const compliance = await complianceTaxSystem.checkExportCompliance('product-123', 'US');

/*
{
  allowed: true,
  requiresLicense: false,
  requirements: ['Certificate of Origin', 'Cultural Heritage Certificate'],
  restrictions: []
}
*/
```

#### Create Tax Report

```typescript
const report = await complianceTaxSystem.createTaxReport({
  startDate: new Date('2025-01-01'),
  endDate: new Date('2025-12-31'),
  transactions: [
    { regionCode: 'US', amount: 1000, tax: 80, currency: 'USD' },
    { regionCode: 'UK', amount: 800, tax: 160, currency: 'GBP' },
    // ... more transactions
  ],
});

/*
{
  id: 'report-...',
  period: { start: ..., end: ... },
  summary: {
    totalSales: 125000,
    taxableAmount: 125000,
    taxCollected: 18750,
    taxRemitted: 0,
    taxPending: 18750,
    currency: 'USD'
  },
  byRegion: {
    US: { sales: 45000, taxCollected: 3600, transactionCount: 150 },
    UK: { sales: 38000, taxCollected: 7600, transactionCount: 95 },
    // ...
  },
  byTaxType: {
    VAT: 12800,
    GST: 2950,
    'Sales Tax': 3000
  },
  status: 'draft'
}
*/
```

---

## Regional Adaptation Component

**File:** `lib/regional-adaptation-component.tsx`

### Features

- **Language selector** (15+ languages including Indian languages)
- **Currency selector** (9 currencies)
- **Region selector** (9 regions)
- **Auto-detection** (browser language, timezone)
- **LocalStorage persistence**
- **Utility hooks** (formatting, translation)

### Supported Languages

English, Hindi (हिन्दी), Bengali (বাংলা), Telugu (తెలుగు), Marathi (मराठी), Tamil (தமிழ்), Gujarati (ગુજરાતી), Kannada (ಕನ್ನಡ), Malayalam (മലയാളം), Punjabi (ਪੰਜਾਬੀ), Spanish, French, German, Japanese, Arabic

### Usage Examples

#### Basic Setup

```typescript
// In app layout
import { RegionalProvider } from '@/lib/regional-adaptation-component';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <RegionalProvider>
          {children}
        </RegionalProvider>
      </body>
    </html>
  );
}
```

#### Language Selector

```typescript
import { LanguageSelector } from '@/lib/regional-adaptation-component';

export function Header() {
  return (
    <div>
      <LanguageSelector variant="dropdown" />
      {/* or */}
      <LanguageSelector variant="inline" />
    </div>
  );
}
```

#### Complete Regional Settings

```typescript
import { RegionalSettings } from '@/lib/regional-adaptation-component';

export function SettingsPage() {
  return (
    <div>
      <h1>Settings</h1>
      <RegionalSettings />
    </div>
  );
}
```

#### Using Regional Context

```typescript
import { useRegional } from '@/lib/regional-adaptation-component';

export function ProductPrice({ amount }: { amount: number }) {
  const { settings } = useRegional();

  return (
    <div>
      Price: {settings.currency} {amount}
    </div>
  );
}
```

#### Format Currency

```typescript
import { useFormatCurrency } from '@/lib/regional-adaptation-component';

export function Price({ amount }: { amount: number }) {
  const formatCurrency = useFormatCurrency();

  return <div>{formatCurrency(amount)}</div>;
  // Output: $150.00 (if USD selected)
  // Output: ₹12,468.00 (if INR selected)
}
```

#### Format Date

```typescript
import { useFormatDate } from '@/lib/regional-adaptation-component';

export function OrderDate({ date }: { date: Date }) {
  const formatDate = useFormatDate();

  return <div>{formatDate(date)}</div>;
  // Output varies by selected region's locale
}
```

#### Format Number

```typescript
import { useFormatNumber } from '@/lib/regional-adaptation-component';

export function ProductViews({ count }: { count: number }) {
  const formatNumber = useFormatNumber();

  return <div>{formatNumber(count)} views</div>;
  // US: 1,234,567 views
  // India: 12,34,567 views
}
```

---

## Integration Guide

### Complete E-commerce Flow

```typescript
// 1. Customer browses products (regional pricing)
const { settings } = useRegional();
const price = await globalMarketplaceService.getRegionalPrice(productId, settings.region);

// 2. Add to cart and calculate totals
const taxCalc = await complianceTaxSystem.calculateTax({
  amount: cartTotal,
  currency: settings.currency,
  regionCode: settings.region,
});

// 3. Get shipping quotes
const shippingQuotes = await internationalShippingCalculator.calculateShippingQuote({
  origin: warehouseAddress,
  destination: customerAddress,
  package: packageDimensions,
});

// 4. Process payment
const payment = await multiCurrencyPaymentSystem.processPayment({
  orderId,
  amount: taxCalc.total + shippingQuotes[0].costs.total,
  currency: settings.currency,
  gatewayId: selectedGateway,
  customerId,
  customerCountry: settings.region,
});

// 5. Create shipment
const shipment = await internationalShippingCalculator.createShipment({
  orderId,
  origin: warehouseAddress,
  destination: customerAddress,
  package: packageDimensions,
  contents: orderItems,
  carrierId: selectedCarrier,
});

// 6. Generate compliance documents
const invoice = await complianceTaxSystem.generateInvoice({
  orderId,
  issuer: companyDetails,
  recipient: customerDetails,
  items: orderItems,
  regionCode: settings.region,
});

const certificate = await complianceTaxSystem.generateCertificateOfOrigin({
  /* certificate details */
});

// 7. Create customs declaration
const declaration = await internationalShippingCalculator.createCustomsDeclaration({
  shipmentId: shipment.id,
  /* declaration details */
});

// 8. Track shipment
const trackingInfo = await internationalShippingCalculator.trackShipment(
  shipment.carrier.trackingNumber
);
```

---

## API Reference

### Global Marketplace Service

```typescript
class GlobalMarketplaceService {
  async getRegion(regionCode: string): Promise<MarketplaceRegion | null>
  async getActiveRegions(): Promise<MarketplaceRegion[]>
  async isProductAvailableInRegion(productId: string, regionCode: string): Promise<boolean>
  async getRegionalPrice(productId: string, regionCode: string): Promise<{...} | null>
  async calculateCrossBorderCharges(params: {...}): Promise<CrossBorderOrder['charges']>
  async createCrossBorderOrder(params: {...}): Promise<CrossBorderOrder>
  async updateOrderStatus(orderId: string, status: string, notes?: string): Promise<void>
  async getComplianceRequirements(regionCode: string, productCategory: string): Promise<{...}>
  async getMarketplaceStats(): Promise<{...}>
}
```

### Multi-Currency Payment System

```typescript
class MultiCurrencyPaymentSystem {
  async getExchangeRate(from: string, to: string): Promise<number>
  async convertCurrency(amount: number, from: string, to: string): Promise<{...}>
  async getAvailableGateways(currency: string, country: string): Promise<PaymentGateway[]>
  async calculateFees(params: {...}): Promise<{...}>
  async processPayment(params: {...}): Promise<MultiCurrencyPayment>
  async getPaymentStatus(paymentId: string): Promise<string>
  async refundPayment(paymentId: string, reason: string): Promise<void>
  async getWallet(userId: string): Promise<CurrencyWallet>
  async addFundsToWallet(userId: string, amount: number, currency: string): Promise<void>
  async convertWalletBalance(userId: string, amount: number, from: string, to: string): Promise<void>
  getSupportedCurrencies(): Currency[]
  formatAmount(amount: number, currencyCode: string): string
  async getPaymentStats(): Promise<{...}>
}
```

### International Shipping Calculator

```typescript
class InternationalShippingCalculator {
  async calculateShippingQuote(params: {...}): Promise<ShippingQuote[]>
  async createShipment(params: {...}): Promise<Shipment>
  async trackShipment(trackingNumber: string): Promise<Shipment | null>
  async updateShipmentStatus(shipmentId: string, status: string, location?: string, notes?: string): Promise<void>
  async createCustomsDeclaration(params: {...}): Promise<CustomsDeclaration>
  async getAvailableCarriers(origin: string, destination: string): Promise<ShippingCarrier[]>
  async getShippingStats(): Promise<{...}>
}
```

### Compliance & Tax System

```typescript
class ComplianceTaxSystem {
  async calculateTax(params: {...}): Promise<TaxCalculation>
  async validateTaxId(taxId: string, regionCode: string): Promise<boolean>
  async generateInvoice(params: {...}): Promise<ComplianceDocument>
  async generateCertificateOfOrigin(params: {...}): Promise<ComplianceDocument>
  async checkExportCompliance(productId: string, destinationCountry: string): Promise<{...}>
  async createTaxReport(params: {...}): Promise<TaxReport>
  getTaxRegions(): TaxRegion[]
  getDocuments(filters?: {...}): ComplianceDocument[]
  async getComplianceStats(): Promise<{...}>
}
```

### Regional Adaptation

```typescript
// Context Hook
function useRegional(): {
  settings: RegionalSettings;
  updateSettings: (settings: Partial<RegionalSettings>) => void;
  languages: Language[];
  currencies: Currency[];
  regions: Region[];
}

// Utility Hooks
function useFormatCurrency(): (amount: number) => string
function useFormatDate(): (date: Date) => string
function useFormatNumber(): (num: number, options?: Intl.NumberFormatOptions) => string
function useTranslation(): { t: (key: string) => string; language: string }

// Components
<RegionalProvider>
<LanguageSelector variant="dropdown" | "inline" />
<CurrencySelector />
<RegionSelector />
<RegionalSettings />
```

---

## Best Practices

### 1. **Always Check Regional Availability**

```typescript
const isAvailable = await globalMarketplaceService.isProductAvailableInRegion(
  productId,
  regionCode
);

if (!isAvailable) {
  // Show "Not available in your region" message
}
```

### 2. **Calculate All Costs Upfront**

```typescript
const costs = {
  product: await getRegionalPrice(),
  tax: await calculateTax(),
  shipping: await calculateShipping(),
};

const total = costs.product + costs.tax + costs.shipping;
```

### 3. **Validate Compliance Before Checkout**

```typescript
const compliance = await complianceTaxSystem.checkExportCompliance(productId, destinationCountry);

if (!compliance.allowed) {
  // Block purchase
}

if (compliance.requiresLicense) {
  // Show additional requirements
}
```

### 4. **Handle Currency Conversion Transparently**

```typescript
const conversion = await multiCurrencyPaymentSystem.convertCurrency(
  amount,
  displayCurrency,
  paymentCurrency
);

// Show both amounts to user
console.log(`${displayCurrency} ${amount} = ${paymentCurrency} ${conversion.converted}`);
```

### 5. **Generate All Required Documents**

```typescript
// Invoice (always required)
await complianceTaxSystem.generateInvoice({...});

// Certificate of Origin (for international)
if (isInternational) {
  await complianceTaxSystem.generateCertificateOfOrigin({...});
}

// Customs Declaration (for international)
if (isInternational) {
  await internationalShippingCalculator.createCustomsDeclaration({...});
}
```

---

## Performance Considerations

1. **Cache Exchange Rates**: Rates are cached and updated periodically
2. **Parallel Processing**: Calculate tax and shipping quotes in parallel
3. **Regional Data**: Pre-load regional configurations on app start
4. **Lazy Loading**: Load compliance data only when needed
5. **Optimistic Updates**: Update UI immediately, sync with backend asynchronously

---

## Security & Compliance

1. **Data Privacy**: GDPR, CCPA, DPDPA compliant
2. **Encryption**: All financial data encrypted at rest and in transit
3. **PCI Compliance**: Payment gateway integration follows PCI DSS
4. **Audit Trail**: All transactions logged for compliance
5. **Tax ID Validation**: Real-time validation of tax IDs

---

## Error Handling

```typescript
try {
  const payment = await multiCurrencyPaymentSystem.processPayment({...});
} catch (error) {
  if (error.message.includes('Invalid payment gateway')) {
    // Show gateway selection UI
  } else if (error.message.includes('Insufficient balance')) {
    // Prompt to add funds
  } else {
    // Generic error handling
  }
}
```

---

## Support & Resources

- **Documentation**: This file
- **API Reference**: See above sections
- **Examples**: `/examples` directory (to be created)
- **Support**: Contact development team

---

**End of Documentation**
