#  TODO: May need to make this column match the updated_at
# `created_at` TIMESTAMP NOT NULL DEFAULT '0000-00-00 00:00:00',
ALTER TABLE map_section ADD `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;


CREATE TABLE point_type (
    id int NOT NULL PRIMARY KEY,
    type_name varchar (100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8;

INSERT INTO `point_type` (`type_name`,`id`) VALUES
('motorcycle', 1),
('handicap', 2),
('loading', 3),
('electric', 4),
('freight', 5),
('misc', 6);

CREATE TABLE map_point (
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    point_type_id int NOT NULL,
    street_side TINYINT(1) NOT NULL DEFAULT 1, -- -1 or 0 or 1
    main_parking_type_id int NOT NULL,
    main_pph DECIMAL(5,2) UNSIGNED DEFAULT NULL,
    main_short_term_min int DEFAULT NULL,
    num_spots int DEFAULT NULL,
    is_hours_restricted TINYINT(1) NOT NULL DEFAULT 0,
    hours_data VARCHAR(2500) DEFAULT NULL,
    notes VARCHAR(255) DEFAULT NULL,
    availability_rating TINYINT(1) DEFAULT NULL,
    lat DECIMAL(17,14) NOT NULL, -- 17 digits, signed, 14 decimal places
    lng DECIMAL(17,14) NOT NULL,
    -- `created_at` TIMESTAMP NOT NULL DEFAULT '0000-00-00 00:00:00',
    -- updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    submitted_by int DEFAULT NULL,
    approved TINYINT(1) DEFAULT 0 NOT NULL,
    FOREIGN KEY (`main_parking_type_id`) REFERENCES `parking_type` (`id`),
    FOREIGN KEY (`point_type_id`) REFERENCES `point_type` (`id`)
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8;

ALTER TABLE map_point ADD `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
ALTER TABLE map_point ADD `created_at` TIMESTAMP NOT NULL DEFAULT '0000-00-00 00:00:00';


INSERT INTO `account` (`username`, `password`, `email`, `fname`, `lname`, `created_at`, `phone`, `address`, `city`, `state`, `postal_code`) VALUES
('admin', '21232f297a57a5a743894a0e4a801fc3', 'admin@example.com', 'Admin', 'Admin', '2007-05-05 02:46:10', NULL, NULL, NULL, NULL, NULL),
('nwilliams', '20b132cc1104d2da48d96b45e9807c9b', 'nathan.williams@law.utah.edu', 'Nate', 'Williams', '2010-04-23 00:00:00', '8017355690','567 K St', 'Salt Lake City', 'UT', '84103'),
('Anon', '20b132cc1104d2da48d96b45e9807c9b', 'anon@anon.com', 'Anonymous', 'User', '2010-04-23 00:00:00', '8017355690','123 St', 'Culver City', 'CA', '90104');

INSERT INTO `parking_type` (`type_name`,`id`) VALUES
('free', 1),
('paid', 2),
('no parking', 3),
('permit', 4);

CREATE TABLE `account` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(128) NOT NULL,
  `password` varchar(32) NOT NULL,
  `email` varchar(128) DEFAULT NULL,
  `fname` varchar(124) DEFAULT NULL,
  `lname` varchar(124) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `postal_code` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB  DEFAULT CHARSET utf8;

CREATE TABLE parking_type (
    id int NOT NULL PRIMARY KEY,
    type_name varchar (100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8;


CREATE TABLE map_section (
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    -- shape_type_id int NOT NULL,
    -- street_side ENUM('left','topleft','top','topright','right','bottomright','bottom','bottomleft') NOT NULL,
    street_side TINYINT(1) NOT NULL DEFAULT 1, -- -1 or 0 or 1
    main_parking_type_id int NOT NULL,
    main_pph DECIMAL(5,2) UNSIGNED DEFAULT NULL,
    main_short_term_min int DEFAULT NULL,
    num_spots int DEFAULT NULL,
    is_hours_restricted TINYINT(1) NOT NULL DEFAULT 0,
    hours_data VARCHAR(2500) DEFAULT NULL,
    notes VARCHAR(255) DEFAULT NULL,
    availability_rating TINYINT(1) DEFAULT NULL,
    start_lat DECIMAL(17,14) NOT NULL, -- 17 digits, signed, 14 decimal places
    start_lng DECIMAL(17,14) NOT NULL,
    end_lat DECIMAL(17,14) NOT NULL,
    end_lng DECIMAL(17,14) NOT NULL,
    `polyline` TEXT NOT NULL,
    `created_at` datetime NOT NULL,
    submitted_by int DEFAULT NULL,
    approved TINYINT(1) DEFAULT 0 NOT NULL,
    FOREIGN KEY (`main_parking_type_id`) REFERENCES `parking_type` (`id`)
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8;



/*
CREATE TABLE comment (
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    problem_id int NOT NULL,
    submitted_by int NULL,
    is_anonymous
    `content` TEXT,
    `edition` varchar(50),
    `created_at` datetime NOT NULL,
    FOREIGN KEY (`problem_id`) REFERENCES `problem` (`id`) on delete cascade on update cascade,
    FOREIGN KEY (`submitted_by`) REFERENCES `account` (`id`) on delete cascade on update cascade
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8;
*/
