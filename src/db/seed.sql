INSERT INTO
  albums (title, artist)
VALUES
  ('Malibu', 'Anderson .Paak'),
  ('A Seat at the Table', 'Solange Knowles'),
  ('Melodrama', 'Lorde'),
  ('In Rainbows', 'Radiohead')
;

INSERT INTO
  users (username, email, password)
VALUES
  ('a', 'a@a.com', 'a'),
  ('b', 'b@b.com', 'b')
;

INSERT INTO
  reviews (user_id, album_id, content)
VALUES
  (1, 1, 'first album review'),
  (1, 2, 'second album review'),
  (1, 3, 'third album review'),
  (2, 1, 'first album review')
;
