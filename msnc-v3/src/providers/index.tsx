'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { Toaster } from 'sonner';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProgressBar
        height="3px"
        color="#0369a1"
        options={{ showSpinner: false }}
        shallowRouting
      />
      {children}
      <Toaster position="top-right" richColors theme="light" closeButton />
    </>
  );
}
