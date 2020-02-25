insert into users
(firstName, username, email, password)
values
($1, $2, $3, $4);

select * from users
where email = $3;
