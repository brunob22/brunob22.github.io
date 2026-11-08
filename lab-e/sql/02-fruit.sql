create table fruit
(
    id      integer not null
        constraint fruit_pk
            primary key autoincrement,
    name text not null,
    description text not null
);