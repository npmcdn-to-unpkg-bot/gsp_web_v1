#  TODO: May need to make this column match the updated_at
# `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
ALTER TABLE map_section ADD `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;