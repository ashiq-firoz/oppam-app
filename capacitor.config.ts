import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.dating-sura.app',
  appName: 'my-mobile-app',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    // Add any Capacitor plugins configuration here
  }
};

export default config;