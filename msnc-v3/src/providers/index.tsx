'use client';
import { NextIntlClientProvider } from 'next-intl';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { Toaster } from 'sonner';

export default function Providers({
  children,
  messages,
  locale,
}: {
  children: React.ReactNode;
  messages: any;
  locale: string;
}) {
  return (
    <>
      <ProgressBar
        height="3px"
        color="#0369a1"
        options={{ showSpinner: false }}
        shallowRouting
      />
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
        <Toaster position="top-right" richColors theme="light" closeButton />
      </NextIntlClientProvider>
    </>
  );
}
