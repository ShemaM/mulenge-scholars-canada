-- Cleanup orphaned payload_preferences_rels (users_id=2 missing)
DELETE FROM "payload_preferences_rels" WHERE "users_id" NOT IN (SELECT id FROM "users");

