drop table if exists connections;
drop table if exists contact;

create table if not exists connections (
   url varchar(255),
   nombre int,
   last varchar(10),
   primary key(url)
);

create table if not exists contact (
    id int primary key auto_increment,
    name varchar(50),
    firstName varchar(50),
    email varchar(50),
    message text,
    discord boolean
);