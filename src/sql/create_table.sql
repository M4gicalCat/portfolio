drop table if exists connections;

create table if not exists connections (
   url varchar(255),
   nombre int,
   last varchar(10),
   primary key(url)
);