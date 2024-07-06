-- creating the databse
CREATE DATABASE todo;

-- creating todo table with schema
CREATE TABLE todo(
    todo_id SERIAL PRIMARY_KEY,
    description VARCHAR(255) NOT NULL
);

-- Creating users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);