/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BUSINESS_NAME?: string;
  readonly VITE_BUSINESS_DESCRIPTION?: string;
  readonly VITE_WHATSAPP_NUMBER?: string;
  readonly VITE_BUSINESS_PHONE?: string;
  readonly VITE_BUSINESS_ADDRESS?: string;
  readonly VITE_MAPS_URL?: string;
  readonly VITE_DELIVERY_AREA?: string;
  readonly VITE_OPEN_HOUR?: string;
  readonly VITE_CLOSE_HOUR?: string;
  readonly VITE_BUSINESS_TIMEZONE?: string;
  readonly VITE_SERVICE_DAYS?: string;
  readonly VITE_MENU_IMAGE_URL?: string;
  readonly VITE_FACEBOOK_URL?: string;
  readonly VITE_INSTAGRAM_URL?: string;
  readonly VITE_TIKTOK_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
