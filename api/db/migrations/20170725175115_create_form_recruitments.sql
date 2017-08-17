-- +goose Up
-- SQL in this section is executed when the migration is applied.
CREATE TABLE form_recruitments (
    id SERIAL NOT NULL ,
    email  varchar(255) NOT NULL,
    self_pr text  NOT NULL,
    link_github  varchar(100)  NULL,
    position varchar(50)  NOT NULL DEFAULT 'General Staff',
    status varchar(50) NOT NULL DEFAULT 'Not Processed',
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY(id)

);
-- +goose Down
-- SQL in this section is executed when the migration is rolled back.
DROP TABLE form_recruitments;
