-- +goose Up
-- SQL in this section is executed when the migration is applied.
CREATE TABLE users (
    id SERIAL NOT NULL ,
    email varchar(255) NOT NULL,
    password  varchar(255) NOT NULL,
    role  varchar(255) NULL,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  	deleted_at timestamp NULL,

    PRIMARY KEY(id)

);
-- +goose Down
-- SQL in this section is executed when the migration is rolled back.
DROP TABLE users;
