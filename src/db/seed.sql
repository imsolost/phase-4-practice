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
  (1, 1, 'a review of Malibu. It is great!'),
  (1, 2, 'a review of A Seat at the Table. It is great!'),
  (1, 3, 'a review of Melodrama. It is ok'),
  (2, 1, 'a review of Malibu. It is ok.')
;
