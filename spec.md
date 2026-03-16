# Truptar Logistics

## Current State
Full logistics web app with homepage, shipping form, order summary, payment page, dashboard, admin panel, and service pages. Brand colors: deep blue, neon purple, light gold. Version 7 deployed.

## Requested Changes (Diff)

### Add
- Price/shipping cost calculator section on the homepage (after the services grid) with fields: origin country, destination country, weight (kg), shipment type (Standard/Express/Priority), calculates estimated cost with a visible result.
- Full standard countries list (195+ countries) to all country select dropdowns (ShippingFormPage sender/receiver country, RegisterPage country).

### Modify
- Remove all `text-black` or any black-colored text across all components — replace with visible colored alternatives (white, gold, teal, or purple as appropriate for context).
- Fix ShippingFormPage order creation: the `handleSubmit` currently calls `createOrder` which requires authentication (actor). If actor is null or mutation fails, it should still save the order to localStorage with the generated order number and navigate to `/order-summary`. Make it resilient: try backend call, but regardless of result, always save to localStorage and navigate. This ensures users can create orders without being logged in.
- OrderSummaryPage: ensure the "Proceed to Payment" button navigates to `/payment`.
- PaymentPage: ensure it reads the pending order from localStorage and displays all 4 payment methods (Bank Transfer, Crypto Wallet, Card Payment, Mobile Money) with payment details and the YES/NO confirmation flow.

### Remove
- Nothing removed.

## Implementation Plan
1. Create a `COUNTRIES` constant with full 195+ country list for use in all country selects.
2. Update ShippingFormPage: use full countries list, fix handleSubmit to always navigate after saving to localStorage (wrap backend call in try/catch separately, don't block navigation on failure).
3. Update RegisterPage: use same full countries list.
4. Add PriceCalculator component/section to HomePage after the services grid.
5. Audit all pages for black text and replace with visible colored text.
6. Verify OrderSummaryPage navigates to /payment correctly.
7. Verify PaymentPage loads order from localStorage and shows all payment options.
