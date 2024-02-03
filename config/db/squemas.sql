CREATE DATABASE prueba
/c prueba

CREATE TABLE coffe (
    id SERIAL,
    nombre varchar(50) NOT NULL, /* nombre del cafe */
    tipo varchar(50) NOT NULL/* cafe helado o caliente */
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    nombre VARCHAR(50) NOT NULL, 
    apellido VARCHAR(50) NOT NULL, 
    email VARCHAR(50) NOT NULL, 
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(), 
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);


CREATE FUNCTION update_updated_at_users()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_usuarios_updated_at
    BEFORE UPDATE
    ON
        users
    FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_users();