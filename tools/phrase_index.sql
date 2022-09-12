DROP TABLE IF EXISTS  phrase_index; 

CREATE TABLE phrase_index(
	entry text NOT NULL PRIMARY KEY,
	targets textphrase_index
);
