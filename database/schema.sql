CREATE DATABASE flashcards;

\c flashcards

CREATE TABLE flashcards (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    explanation TEXT NOT NULL
);
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);
