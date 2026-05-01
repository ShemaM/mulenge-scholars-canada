"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTransition } from "react";

const LOCALES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
] as const;

type LocaleCode = (typeof LOCALES)[number]["code"];

export default function LocaleSwitcher() {
  const locale = useLocale() as LocaleCode;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  function switchLocale(nextLocale: LocaleCode) {
    if (nextLocale === locale) return;

    // Replace the current locale segment in the path.
    // Assumes URL structure: /[locale]/...
    const segments = pathname.split("/");
    segments[1] = nextLocale;
    let newPath = segments.join("/");

    // Preserve query parameters
    const search = searchParams.toString();
    if (search) {
      newPath += `?${search}`;
    }

    // Preserve hash fragment if present
    if (typeof window !== "undefined" && window.location.hash) {
      newPath += window.location.hash;
    }

    startTransition(() => {
      router.replace(newPath);
    });
  }

  return (
    <div
      role="navigation"
      aria-label="Language switcher"
      className="flex items-center gap-1 rounded-full border border-neutral-200 bg-white p-1 shadow-sm dark:border-neutral-700 dark:bg-neutral-900"
    >
      {LOCALES.map(({ code, label, flag }) => {
        const isActive = code === locale;
        return (
          <button
            key={code}
            onClick={() => switchLocale(code)}
            disabled={isPending || isActive}
            aria-current={isActive ? "true" : undefined}
            aria-label={`Switch to ${label}`}
            title={label}
            className={[
              "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1",
              "disabled:cursor-not-allowed",
              isActive
                ? "bg-neutral-900 text-white shadow-sm dark:bg-white dark:text-neutral-900"
                : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white",
              isPending && !isActive ? "opacity-50" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <span aria-hidden="true">{flag}</span>
            <span className="hidden sm:inline">{label}</span>
            <span className="sm:hidden">{code.toUpperCase()}</span>
          </button>
        );
      })}
    </div>
  );
}