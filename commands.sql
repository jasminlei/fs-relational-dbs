CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author TEXT,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title)
VALUES
    ('Harry Potter', 'https://hogwarts.example/harry', 'How to Survive Another Year at Hogwarts'),
    ('Draco Malfoy', 'https://hogwarts.example/draco', 'Why Slytherin Is Obviously the Best House'),
    ('Voldemort', 'https://hogwarts.example/darklord', 'How to Become the Dark Lord in 10 Easy Steps');