# Order Tracking Screen

A mobile order tracking screen for an e-commerce app. Built with plain HTML/CSS/JS (no build step, no backend) so it runs anywhere a static file can be served.

**Live demo:** https://claude.ai/artifact/U3eYqj9dczihQxR3b1fE7y

## What it covers

- A visual delivery timeline (Processing → Shipped → Out for delivery → Delivered) with timestamps.
- Current status, estimated delivery date/time, and an order summary.
- Actions such as tracking on a map, viewing order details, and contacting support.
- The three required edge cases, reachable from the "Demo scenario" switcher at the top of the page:
  - **Delayed** — the estimate has passed; the banner explains the delay and offers a next step.
  - **Delivered, not received** — flags the mismatch between the carrier's status and the customer's experience, with a "Report missing package" action.
  - **Tracking not available yet** — the order is confirmed but unshipped; the screen explains why and shows an estimated window instead of an empty/broken state.
- Responsive layout for ~360–430px mobile widths, and both light and dark color themes.

The scenario switcher exists only for this demo/review — in a real app the screen would render one scenario at a time, driven by the current order's data from the backend.

## Run it locally

No install or build required — it's static HTML/CSS/JS.

```bash
cd task1-order-tracking
python -m http.server 8080
# open http://localhost:8080
```

Or just open `index.html` directly in a browser (some browsers restrict local `fetch`/relative-file loading, so the server route is more reliable).

## Files

- `index.html` — markup/structure
- `style.css` — design tokens (light/dark) and layout
- `script.js` — mock order data for each scenario and the rendering logic
