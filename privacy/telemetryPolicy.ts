/**
 * Telemetry & PII Protection Policy
 * Enforces strict zero-PII and zero-user tracking.
 */

export const telemetryPolicy = {
  userTrackingEnabled: false,
  cookiesRequired: false,
  mediaPayloadRetentionDays: 0, // Never stored
  databaseMediaRecordCount: 0,
  auditLog: {
    ipHashing: 'SHA-256 with 24h salt rotation',
    storagePolicy: 'Ephemeral in-memory ring-buffer only'
  }
};
