# Truptar Logistics

## Current State
Full logistics web app with login, registration, homepage, 10 services, freight shipping form, order creation, payment page, order tracking, user dashboard, admin panel, and footer. Color scheme is dark forest green + cyan + gold (Version 9 palette). Countries template (WORLD_COUNTRIES) is already implemented in RegisterPage and ShippingFormPage. Admin panel exists at /admin with PIN 7777 and order management. Login navigates only to /dashboard.

## Requested Changes (Diff)

### Add
- Nothing new structurally; admin panel to also show all service request form submissions

### Modify
- **Color scheme**: Full site rebrand to sky blue + orange palette. Sky blue (~oklch(0.68 0.16 215)) as primary color, orange (~oklch(0.72 0.19 42)) as accent color. Background: deep navy-blue (oklch(0.14 0.04 225)). All text colorful and visible — no black text anywhere.
- **Post-login navigation**: After login, user can access both homepage (/) and dashboard (/dashboard). Navbar when logged in should show both Home and Dashboard links so users can switch between them freely. From homepage, each service card links to its dedicated service/form page.
- **Admin panel order status**: Enhance admin order status controls to allow manual status progression: In Transit → Out for Delivery → Delivered. Status changes must be reflected in real time on the customer dashboard. Admin should also have a "Service Requests" tab that shows all submitted service request forms.
- **index.css**: Update all CSS color variables to sky blue + orange system. Update all inline oklch color references throughout LoginPage, RegisterPage, Navbar, HomePage, DashboardPage, AdminPanel, and all other pages to use the new sky blue + orange palette. No black text anywhere.

### Remove
- Old forest-green / cyan / gold color system (replaced by sky blue + orange)

## Implementation Plan
1. Update `index.css` color tokens: background = deep navy-blue, primary = sky blue, accent = orange, muted/border variations, all matching the new palette
2. Update `LoginPage.tsx` — replace all inline oklch color strings with new sky blue/orange palette values
3. Update `RegisterPage.tsx` — same inline color replacements
4. Update `Navbar.tsx` — add Dashboard link for logged-in users, ensure Home link accessible, update colors
5. Update `HomePage.tsx` — update all inline colors to sky blue/orange, ensure service cards link to their pages
6. Update `DashboardPage.tsx` — update inline colors, ensure shipment status shown reflects admin changes (reads from localStorage order state)
7. Update `AdminPanel.tsx` — update inline colors, enhance order status change to support In Transit → Out for Delivery → Delivered progression with real-time update (localStorage/state sync), add Service Requests tab showing all submitted service forms
8. Update all service pages, ShippingFormPage, PaymentPage, OrderSummaryPage, OrderTrackingPage, Footer, AboutPage, SupportPage, FeaturesPage inline colors
