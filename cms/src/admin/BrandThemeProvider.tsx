'use client';

import '@/styles/admin.css';

export function BrandThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
