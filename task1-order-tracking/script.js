// Order Tracking Screen — demo data layer.
// In a real app `scenarios[x]` would be replaced by an API response for the
// current order; the switcher at the top exists only so every required
// state can be reviewed without wiring a backend.

const STEP_LABELS = ["Processing", "Shipped", "Out for delivery", "Delivered"];

const checkIcon = `<svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const dotIcon = `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" fill="currentColor"/></svg>`;
const boxIcon = `<svg viewBox="0 0 24 24" fill="none"><path d="M21 8l-9-5-9 5 9 5 9-5z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M3 8v8l9 5 9-5V8M12 13v8" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`;
const alertIcon = `<svg viewBox="0 0 24 24" fill="none"><path d="M12 9v4m0 4h.01M10.3 3.9L1.8 18a1 1 0 0 0 .86 1.5h18.7a1 1 0 0 0 .86-1.5L13.7 3.9a1 1 0 0 0-1.72 0z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const scenarios = [
  {
    id: "on-track",
    label: "On track",
    order: { id: "#VS-48213", product: "Wireless Noise-Cancelling Headphones", qty: 1, placed: "Sep 18, 10:02 AM" },
    currentStep: 2, // Out for delivery
    timestamps: ["Sep 18, 10:14 AM", "Sep 19, 2:47 PM", "Sep 20, 7:05 AM", null],
    hero: {
      tone: "info",
      eyebrow: "Out for delivery",
      headline: "Your package is on the way",
      sub: "The courier has your order and is on today's route.",
      etaLabel: "Arriving by",
      etaValue: "Today, by 8:00 PM",
    },
    notes: {},
    actions: [
      { label: "Track on map", style: "primary" },
      { label: "View order details", style: "secondary" },
      { label: "Contact support", style: "ghost" },
    ],
  },
  {
    id: "delayed",
    label: "Delayed",
    order: { id: "#VS-48097", product: "Ceramic Pour-Over Coffee Set", qty: 1, placed: "Sep 15, 4:31 PM" },
    currentStep: 2,
    timestamps: ["Sep 15, 4:50 PM", "Sep 16, 9:12 AM", "Sep 17, 6:40 AM", null],
    hero: {
      tone: "warning",
      eyebrow: "Delayed",
      headline: "Delivery is taking longer than expected",
      sub: "Your package missed its estimated delivery window. It's still moving — we're watching it closely.",
      etaLabel: "New estimate",
      etaValue: "Sep 22, by 9:00 PM",
    },
    notes: { 2: "Originally expected Sep 20. The carrier reported a routing delay." },
    actions: [
      { label: "Notify me of updates", style: "primary" },
      { label: "Contact support", style: "secondary" },
      { label: "Request a refund review", style: "ghost" },
    ],
  },
  {
    id: "delivered",
    label: "Delivered",
    order: { id: "#VS-47810", product: "Cast-Iron Skillet, 10″", qty: 1, placed: "Sep 12, 11:20 AM" },
    currentStep: 3,
    timestamps: ["Sep 12, 11:40 AM", "Sep 13, 8:15 AM", "Sep 14, 7:02 AM", "Sep 14, 3:26 PM"],
    hero: {
      tone: "success",
      eyebrow: "Delivered",
      headline: "Delivered — enjoy!",
      sub: "Left at the front door, as requested. A photo was taken on delivery.",
      etaLabel: "Delivered",
      etaValue: "Sep 14, 3:26 PM",
    },
    notes: {},
    actions: [
      { label: "Rate this order", style: "primary" },
      { label: "View delivery photo", style: "secondary" },
      { label: "Buy again", style: "ghost" },
    ],
  },
  {
    id: "not-received",
    label: "Delivered, not received",
    order: { id: "#VS-47655", product: "Desk Lamp, Walnut Base", qty: 1, placed: "Sep 10, 1:05 PM" },
    currentStep: 3,
    timestamps: ["Sep 10, 1:20 PM", "Sep 11, 9:30 AM", "Sep 12, 6:55 AM", "Sep 12, 1:48 PM"],
    hero: {
      tone: "danger",
      eyebrow: "Delivered",
      headline: "Marked delivered — didn't get it?",
      sub: "The carrier shows this as delivered on Sep 12. If it isn't with you, let us know and we'll investigate right away.",
      etaLabel: "Delivered",
      etaValue: "Sep 12, 1:48 PM",
    },
    notes: { 3: "Carrier confirmation: left with a neighbor at 1:48 PM. No photo provided." },
    actions: [
      { label: "Report missing package", style: "primary" },
      { label: "Check with household or neighbors", style: "secondary" },
      { label: "Contact support", style: "ghost" },
    ],
  },
  {
    id: "no-tracking",
    label: "Tracking not available",
    order: { id: "#VS-48390", product: "Set of 4 Linen Napkins", qty: 2, placed: "Sep 22, 6:48 AM" },
    currentStep: 0,
    timestamps: ["Sep 22, 6:52 AM", null, null, null],
    hero: {
      tone: "neutral",
      eyebrow: "Processing",
      headline: "We're preparing your order",
      sub: "Tracking details will appear here as soon as your package ships — usually within 1 business day.",
      etaLabel: "Estimated delivery",
      etaValue: "Sep 25 – Sep 27",
    },
    notes: { 0: "No carrier scan yet. This is expected before an order ships." },
    actions: [
      { label: "View order details", style: "primary" },
      { label: "Change delivery address", style: "secondary" },
      { label: "Contact support", style: "ghost" },
    ],
  },
];

let activeId = scenarios[0].id;

function renderSwitcher() {
  const el = document.getElementById("scenarioSwitcher");
  el.innerHTML = "";
  scenarios.forEach((s) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = s.label;
    btn.setAttribute("aria-pressed", String(s.id === activeId));
    btn.addEventListener("click", () => {
      activeId = s.id;
      render();
    });
    el.appendChild(btn);
  });
}

function renderHero(scenario) {
  const hero = document.getElementById("hero");
  const h = scenario.hero;
  hero.dataset.tone = h.tone;
  hero.innerHTML = `
    <div class="hero__eyebrow">${h.eyebrow}</div>
    <div class="hero__headline">${h.headline}</div>
    <div class="hero__sub">${h.sub}</div>
    <div class="hero__eta">
      <span class="hero__eta-label">${h.etaLabel}</span>
      <span class="hero__eta-value">${h.etaValue}</span>
    </div>
  `;
}

function stepState(scenario, index) {
  if (index < scenario.currentStep) return "done";
  if (index === scenario.currentStep) return scenario.currentStep === 3 ? "done" : "current";
  return "upcoming";
}

function renderTimeline(scenario) {
  const list = document.getElementById("timeline");
  list.innerHTML = "";
  STEP_LABELS.forEach((label, i) => {
    const state = stepState(scenario, i);
    const li = document.createElement("li");
    li.className = "timeline-step";
    li.dataset.state = state;
    const time = scenario.timestamps[i];
    const note = scenario.notes[i];
    li.innerHTML = `
      <div class="timeline-step__rail">
        <div class="timeline-step__dot">${state === "done" ? checkIcon : dotIcon}</div>
        <div class="timeline-step__line"></div>
      </div>
      <div class="timeline-step__body">
        <div class="timeline-step__title">${label}</div>
        ${time ? `<div class="timeline-step__time">${time}</div>` : state === "upcoming" ? `<div class="timeline-step__time">Pending</div>` : ""}
        ${note ? `<div class="timeline-step__note">${note}</div>` : ""}
      </div>
    `;
    list.appendChild(li);
  });
}

function renderOrderCard(scenario) {
  const card = document.getElementById("orderCard");
  const o = scenario.order;
  card.innerHTML = `
    <div class="order-card__row">
      <div class="order-card__thumb">${boxIcon}</div>
      <div class="order-card__info">
        <div class="order-card__product">${o.product}</div>
        <div class="order-card__meta">Qty ${o.qty} &middot; Order ${o.id}</div>
      </div>
    </div>
    <hr class="order-card__divider" />
    <div class="order-card__grid">
      <div>
        <div class="order-card__field-label">Order placed</div>
        <div class="order-card__field-value">${o.placed}</div>
      </div>
      <div>
        <div class="order-card__field-label">${scenario.hero.etaLabel}</div>
        <div class="order-card__field-value">${scenario.hero.etaValue}</div>
      </div>
    </div>
  `;
}

function renderActions(scenario) {
  const wrap = document.getElementById("actions");
  wrap.innerHTML = "";
  scenario.actions.forEach((a) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `btn btn-${a.style}`;
    if (a.style === "primary" && scenario.hero.tone === "danger") {
      btn.innerHTML = `${alertIcon}<span>${a.label}</span>`;
    } else {
      btn.textContent = a.label;
    }
    btn.addEventListener("click", () => {
      alert(`"${a.label}" — demo action, no backend wired up.`);
    });
    wrap.appendChild(btn);
  });
}

function render() {
  const scenario = scenarios.find((s) => s.id === activeId);
  renderSwitcher();
  renderHero(scenario);
  renderTimeline(scenario);
  renderOrderCard(scenario);
  renderActions(scenario);
}

render();
