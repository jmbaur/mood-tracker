# Mood Tracker

Minimum Viable Product:

-   user auth functionality
-   mark mood
-   change past mood
-   delete past mood
-   view moods in chart

Freezer:

-   user can change mood names
-   user can view mood data by day, week, month, etc.

## Front

### Dependencies

-   axios
-   react-router-dom
-   redux
-   react-redux
-   redux-promise-middleware
-   react-chartjs-2

### Routes

-   home /
-   profile /profile
-   register /register

### File Structure

-   src/
    -   App.js
    -   App.css
    -   index.js
    -   setupProxy.js
    -   redux/
        -   store.js
        -   userReducer.js
    -   components/
        -   Header/
        -   Main
        -   Data
        -   Register
        -   NoUser
        -   Login
        -   _Settings_

## Back

### Dependencies

-   express
-   express-session
-   massive
-   dotenv
-   bcrypt

### Endpoints

auth:

-   login /auth/login
-   register /auth/register
-   logout /auth/logout
-   session /auth/session

mood:

-   GET /api/mood/?user=user_id
-   POST /api/mood/?user=user_id
-   PUT /api/mood/:id
-   DELETE /api/mood/:id

## DB

```sql
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
    name varchar(30) not null
);

create table marks
(
    mark_id serial primary key,
    user_id int references users(user_id),
    mood_id int references moods(mood_id),
    time timestamp(0) not null
);
```

Freezer:

```sql
alter table users
add column
(mood_num int references moods(num)),
(mood_id int references moods(mood_id)),
(mood_name varchar(30)),
(custom_names bool default false not null);
```
