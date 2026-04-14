/**
 * Native MongoDB driver connection to the legacy cluster.
 *
 * Required environment variables:
 *   LEGACY_DB_URI  — MongoDB Atlas connection string for the legacy cluster
 *
 * Provisioned via AWS SSM Parameter Store in production.
 * For local dev, set in .env.local.
 *
 * Databases on this cluster:
 *   olis_lab      — production source (read for seed)
 *   olis_lab_dev  — dev mirror (write target for sync-back)
 */

import { MongoClient } from 'mongodb';

import { serverEnv } from '@/lib/env/server';

import type { Db } from 'mongodb';

type TDbName = 'olis_lab' | 'olis_lab_dev';

let client: MongoClient | null = null;

async function getClient(): Promise<MongoClient> {
  if (!client) {
    const uri = serverEnv.LEGACY_DB_URI;
    client = new MongoClient(uri, {
      connectTimeoutMS: 10000,
      serverSelectionTimeoutMS: 10000,
    });

    await client.connect();
  }

  return client;
}

/**
 * Returns a connected Db instance for the given database name.
 * Reuses an existing client connection if already established.
 */
export async function getDb(name: TDbName): Promise<Db> {
  return (await getClient()).db(name);
}

/**
 * Closes the legacy MongoDB connection.
 * Call this after seed scripts or sync operations complete.
 */
export async function closeLegacyConnection(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
  }
}
