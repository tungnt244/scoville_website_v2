-- +goose Up
-- SQL in this section is executed when the migration is applied.
CREATE TABLE form_contacts (
    id SERIAL NOT NULL ,
    company_name  varchar(255) NOT NULL,
    staff_name varchar(50)  NOT NULL,
    email_address  varchar(100)  NULL,
    phone_number varchar(50)  NOT NULL ,
    description_of_contact text NOT NULL ,
    status varchar(50) NOT NULL DEFAULT 'Not Processed',
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY(id)

);
-- +goose Down
-- SQL in this section is executed when the migration is rolled back.
DROP TABLE form_contacts;
