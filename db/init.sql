create table users
(
    user_id serial primary key,
    username varchar(30) not null,
    email varchar(50) not null,
    password text not null
);

create table moods
(
    mood_id serial primary key,
    num int not null,
    name varchar(60) not null
);

create table marks
(
    mark_id serial primary key,
    user_id int references users(user_id),
    mood_id int references moods(mood_id),
    time timestamp(0) not null
);

insert into moods
(num, name)
values
(1, 'Not so good'),
(2, 'Could be better'),
(3, 'Not terrible, not great'),
(4, 'Pretty darn good!'),
(5, 'I am on top of the world!');
