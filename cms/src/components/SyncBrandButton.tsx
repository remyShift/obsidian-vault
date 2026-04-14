'use client';

import { useState } from 'react';

import { toast, useDocumentInfo } from '@payloadcms/ui';

type TSyncResponse =
  | { success: true; duration: number }
  | { success: false; error: string };

export default function SyncBrandButton() {
  const { id } = useDocumentInfo();
  const [loading, setLoading] = useState(false);

  const handleSync = async () => {
    if (!id) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/sync/brand/${id}`, { method: 'POST' });
      const data: TSyncResponse = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(
          data.success === false ? data.error : `HTTP ${res.status}`
        );
      }

      toast.success(`Synced to legacy DB in ${data.duration}ms`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      toast.error(`Sync failed: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleSync}
      disabled={!id || loading}
      className="btn btn--style-secondary btn--size-small"
    >
      {loading ? 'Syncing…' : 'Sync to Legacy DB'}
    </button>
  );
}
