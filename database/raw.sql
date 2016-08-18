#  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
#   `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
# ALTER TABLE table_name ADD `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
# TODO:NW make this a script and make dbs consistent. On frontend, make js paths work for sectoin service,
# the templateUrls, and systemjs.config.js, icon images, section renderer, form markers
# minify angular 2 app files, see https://www.npmjs.com/package/gulp-angular-embed-templates