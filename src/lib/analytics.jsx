import { base44 } from "@/api/base44Client";

export const EVENTS = {
  ONLINE_ORDER_CLICK: "online_order_click",
  PHONE_TAP: "phone_number_tap",
  MENU_VIEW: "menu_view",
  DIRECTIONS_CLICK: "directions_click",
  CONTACT_FORM_SUBMIT: "contact_form_submit",
};

export function trackEvent(eventName, properties = {}) {
  try {
    base44.analytics.track({ eventName, properties });
  } catch (e) {
    // Analytics is non-critical
  }
  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, properties);
    }
  } catch (e) {
    // GA4 not loaded yet
  }
}