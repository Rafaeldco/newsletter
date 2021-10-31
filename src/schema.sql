DROP TABLE IF EXISTS assinantes;

CREATE TABLE assinantes (
  id serial PRIMARY KEY,
  email text NOT NULL UNIQUE,
  nome text NOT NULL
  );

