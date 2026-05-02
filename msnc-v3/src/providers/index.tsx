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
      {/* 
        FIXED: Added timeZone="America/Toronto" here so the client 
        matches the server configuration in request.ts 
      */}
      <NextIntlClientProvider 
        locale={locale} 
        messages={messages} 
        timeZone="America/Toronto"
      >
        {children}
        <Toaster position="top-right" richColors theme="light" closeButton />
      </NextIntlClientProvider>
    </>
  );
}