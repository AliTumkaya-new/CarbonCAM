'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

const LOCALES = [
  { value: 'tr', label: 'Türkçe' },
  { value: 'en', label: 'English' },
] as const;

type LocaleValue = (typeof LOCALES)[number]['value'];

function setLocaleCookie(locale: string) {
  // 1 yıl sakla, tüm path'lerde geçerli
  document.cookie = `NEXT_LOCALE=${encodeURIComponent(locale)}; Path=/; Max-Age=${60 * 60 * 24 * 365}; SameSite=Lax`;
}

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations();

  const initialSelected: LocaleValue = useMemo(() => (locale === 'tr' ? 'tr' : 'en'), [locale]);
  const [selected, setSelected] = useState<LocaleValue>(initialSelected);
  const [open, setOpen] = useState(false);

  const selectedLabel = useMemo(() => {
    return LOCALES.find((l) => l.value === selected)?.label ?? 'English';
  }, [selected]);

  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        aria-label={t('language.label')}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm text-slate-700 shadow-sm transition-colors hover:bg-slate-50 active:scale-95"
      >
        <span className="text-xs font-semibold text-slate-500">{t('language.label')}</span>
        <span className="text-sm font-semibold text-slate-700">{selectedLabel}</span>
        <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-slate-400">
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open ? (
        <div
          role="menu"
          aria-label={t('language.label')}
          className="absolute right-0 top-full z-50 mt-2 w-40 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
        >
          {LOCALES.map((opt) => (
            <button
              key={opt.value}
              type="button"
              role="menuitem"
              onClick={() => {
                setSelected(opt.value);
                setOpen(false);
                setLocaleCookie(opt.value);
                router.refresh();
              }}
              className={
                opt.value === selected
                  ? 'flex w-full items-center justify-between px-3 py-2 text-sm font-semibold text-slate-900 bg-slate-50'
                  : 'flex w-full items-center justify-between px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50'
              }
            >
              <span>{opt.label}</span>
              {opt.value === selected ? (
                <span className="text-xs font-semibold text-emerald-700">✓</span>
              ) : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
