create table if not exists signup_tokens
(
    id      serial                                not null primary key,
    token   varchar(32)                           not null unique key,
    created timestamp default current_timestamp() not null
);

create table if not exists users
(
    id       serial                                not null primary key,
    username varchar(32)                           not null unique key,
    phc      tinytext                              not null,
    created  timestamp default current_timestamp() not null,
    token_id bigint unsigned unique references signup_tokens (id),
    deleted  timestamp default null                null
);

create table if not exists boards
(
    id       serial                                not null primary key,
    path     varchar(32)                           not null unique key,
    owner_id bigint unsigned                       not null references users (id) on delete cascade,
    title    varchar(32)                           not null,
    public   bool                                  not null default 0,
    created  timestamp default current_timestamp() not null,
    deleted  timestamp default null                null
);

create table if not exists boards_to_users
(
    id         serial                                not null primary key,
    board_id   bigint unsigned                       not null references boards (id) on delete cascade,
    user_id    bigint unsigned                       not null references users (id) on delete cascade,
    access_lvl tinyint   default 0                   not null,
    created    timestamp default current_timestamp() not null,
    constraint unique (board_id, user_id)
);

create table if not exists quotes
(
    id       serial                                not null primary key,
    board_id bigint unsigned                       not null references boards (id) on delete cascade,
    user_id  bigint unsigned                       not null references users (id) on delete cascade,
    quote    json                                  not null,
    created  timestamp default current_timestamp() not null,
    updated  timestamp default null                null,
    deleted  timestamp default null                null
);