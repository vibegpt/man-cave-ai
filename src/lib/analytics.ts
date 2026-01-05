// Google Analytics event tracking utility
// Docs: https://developers.google.com/analytics/devguides/collection/ga4/events

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

type GAEventParams = {
  [key: string]: string | number | boolean | undefined;
};

// Core event tracking function
export const trackEvent = (
  eventName: string,
  params?: GAEventParams
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
    console.log(`[GA] Event: ${eventName}`, params);
  }
};

// ============================================
// ManCaveAI Specific Events
// ============================================

// Photo Upload Events
export const trackPhotoUpload = (fileSize?: number, fileType?: string) => {
  trackEvent('photo_upload', {
    file_size_kb: fileSize ? Math.round(fileSize / 1024) : undefined,
    file_type: fileType,
  });
};

// Style Selection Events
export const trackStyleSelect = (styleId: string) => {
  trackEvent('style_select', {
    style_id: styleId,
    style_name: styleId.replace(/_/g, ' '),
  });
};

// Generation Events
export const trackGenerationStart = (styleId: string, hasCustomDescription: boolean) => {
  trackEvent('generation_start', {
    style_id: styleId,
    has_custom_description: hasCustomDescription,
  });
};

export const trackGenerationComplete = (
  styleId: string,
  processingTimeMs: number,
  generationId?: string
) => {
  trackEvent('generation_complete', {
    style_id: styleId,
    processing_time_seconds: Math.round(processingTimeMs / 1000),
    generation_id: generationId,
  });
};

export const trackGenerationError = (styleId: string, errorMessage: string) => {
  trackEvent('generation_error', {
    style_id: styleId,
    error_message: errorMessage.substring(0, 100), // Truncate long errors
  });
};

// Result Page Events
export const trackDownload = (styleId: string) => {
  trackEvent('download_image', {
    style_id: styleId,
  });
};

export const trackCreateAnother = (previousStyle: string) => {
  trackEvent('create_another', {
    previous_style: previousStyle,
  });
};

// SEO Page Events
export const trackSEOPageView = (pageSlug: string) => {
  trackEvent('seo_page_view', {
    page_slug: pageSlug,
  });
};

export const trackCTAClick = (ctaLocation: string, pageSlug?: string) => {
  trackEvent('cta_click', {
    cta_location: ctaLocation,
    page_slug: pageSlug,
  });
};

// Engagement Events
export const trackTimeOnPage = (seconds: number, pageType: 'home' | 'seo' | 'result') => {
  trackEvent('time_on_page', {
    seconds,
    page_type: pageType,
  });
};

export const trackScrollDepth = (percentage: number, pageSlug?: string) => {
  trackEvent('scroll_depth', {
    percentage,
    page_slug: pageSlug,
  });
};

// Outbound Link Tracking (for affiliate links)
export const trackOutboundClick = (url: string, linkType: 'affiliate' | 'external') => {
  trackEvent('outbound_click', {
    url: url.substring(0, 200),
    link_type: linkType,
  });
};
