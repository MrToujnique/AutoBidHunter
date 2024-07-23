import createMiddleware from 'next-intl/middleware';

import { locales, localePrefix } from './navigation';

export default createMiddleware({
  locales,
  localePrefix,
  defaultLocale: 'pl',
});

export const config = {
  matcher: ['/', '/(pl|en)/:path*'],
};
