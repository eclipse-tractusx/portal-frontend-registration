export {};

declare global {
  const ENV: {
    PORTAL_ASSETS_URL: string;
    PORTAL_BACKEND_URL: string;
    CENTRALIDP_URL: string;
    REALM: string;
    CLIENT_ID_REGISTRATION: string;
    ISSUER_ID: string;
  };
}