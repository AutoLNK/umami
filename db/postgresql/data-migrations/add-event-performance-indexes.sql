-----------------------------------------------------
-- PostgreSQL
--
-- Indexes for the AutoLNK backend's event-performance
-- reads (umami_ro). Not managed by prisma migrate:
-- apply manually with psql, and re-apply after any
-- schema reset. CONCURRENTLY must run outside a
-- transaction block.
-----------------------------------------------------

CREATE INDEX CONCURRENTLY IF NOT EXISTS event_data_event_id_scope_idx
    ON event_data (string_value)
    WHERE data_key = 'eventId';

CREATE INDEX CONCURRENTLY IF NOT EXISTS website_event_website_id_url_path_created_at_idx
    ON website_event (website_id, url_path, created_at);
