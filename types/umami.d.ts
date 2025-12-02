// Type declarations for Umami Analytics
// https://umami.is/docs/tracker-functions

/**
 * All Umami event names used in CodeAgentSwarm Landing
 *
 * HOME PAGE EVENTS:
 * - download_app_home_silicon: Apple Silicon download button (CTASection)
 * - download_app_home_intel: Intel download button (CTASection)
 * - discord_join_home: Discord buttons in Header and CTASection
 * - hero_download_click: "Get Started" CTA in hero (HeroSection)
 * - hero_demo_click: "See How It Works" CTA in hero (HeroSection)
 * - video_thumbnail_click: Video thumbnail clicks with { video_name } (HeroSection)
 * - video_complete: Video finishes playing with { video_name } (HeroSection)
 * - pricing_plan_click: Plan CTA clicks with { plan_name } (PricingSection)
 * - nav_section_click: Navigation link clicks with { section } (Header)
 * - nav_download_header: "Download Free" button in header (Header)
 * - mobile_menu_open: Mobile menu toggle (Header)
 * - home_scroll_50: 50% scroll depth on home page (page.tsx)
 *
 * BETA PAGE EVENTS:
 * - beta_banner_click: Beta banner CTA (BetaBanner)
 * - beta_cta_click: Main CTA on beta page (BetaHeroSection)
 * - beta_form_submit: Successful form submission (BetaSignupForm)
 * - beta_form_error: Form validation error (BetaSignupForm)
 * - download_app_beta: Download button after signup (BetaSignupForm)
 * - discord_join_beta: Discord button after signup (BetaSignupForm)
 * - beta_scroll_50: 50% scroll depth on beta page (beta/page.tsx)
 */

interface UmamiTracker {
  track(event_name: string, event_data?: Record<string, string | number | boolean>): void;
}

interface Window {
  umami?: UmamiTracker;
}
