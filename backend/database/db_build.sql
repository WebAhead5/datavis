BEGIN;

DROP TABLE IF EXISTS users, tables CASCADE;

CREATE TABLE users(
                       user_id SERIAL PRIMARY KEY,
                       first_name VARCHAR(100) NOT NULL,
                       last_name VARCHAR(100) NOT NULL,
                       email VARCHAR(100) unique NOT NULL ,
                       password TEXT NOT NULL
);


INSERT INTO users (first_name,last_name, email, password)
VALUES
      ('Berry', 'Johnson', 'berryj@gmail.com', 'berry123'),
      ('Tina', 'Goldweather', 'tinag@gmail.com', 'tina123');





      CREATE TABLE tables(
                       table_id SERIAL PRIMARY KEY,
                       table_name VARCHAR(100) NOT NULL,
                       user_id VARCHAR(100) NOT NULL,
                       data jsonb
                    
);

INSERT INTO tables (table_name, user_id, data)
VALUES
      ('Supplier Info', 4, '[{"name": "test1", "cost": "£100.00"},{"name": "test1", "cost": "£100.00"}]'::JSON);




      CREATE TABLE charts(
                       chart_id SERIAL PRIMARY KEY,
                       user_id VARCHAR(100) NOT NULL,
                       jpeg VARCHAR NOT NULL
                    
);


INSERT INTO charts (user_id, jpeg)
VALUES
      (2, '9ur09w4hg904g40jg4ojkg40gj40jgmj40mb');




COMMIT;
