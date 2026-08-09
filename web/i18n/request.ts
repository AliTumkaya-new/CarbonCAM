import {getRequestConfig} from 'next-intl/server';
import {routing, type AppLocale} from './routing';

function isSupportedLocale(value: string): value is AppLocale {
  return (routing.locales as readonly string[]).includes(value);
}

export default getRequestConfig(async ({requestLocale}) => {
  const candidate = (await requestLocale) ?? routing.defaultLocale;
  const locale: AppLocale = isSupportedLocale(candidate) ? candidate : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../locales/${locale}.json`)).default,
  };
});
