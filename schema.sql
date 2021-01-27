create database if not exists `scp`;

use `scp`;

#  entity
create table if not exists `project`
(
    `id`          int         not null primary key auto_increment,
    `name`        varchar(64) not null,
    `desc`        varchar(256),
    `owner_id`    int,
    `create_time` timestamp default current_timestamp,
    `update_time` timestamp default current_timestamp
);

create table if not exists `app`
(
    `id`          int         not null primary key auto_increment,
    `project_id`  int         not null,
    `name`        varchar(64) not null,
    `desc`        varchar(256),
    `owner_id`    int,
    `create_time` timestamp default current_timestamp,
    `update_time` timestamp default current_timestamp
);

create table if not exists `scan_engine`
(
    `id`          int         not null primary key auto_increment,
    `name`        varchar(64) not null,
    `desc`        varchar(256),
    `owner_id`    int,

    `create_time` timestamp default current_timestamp,
    `update_time` timestamp default current_timestamp
);

create table if not exists `use_case`
(
    `id`          int          not null primary key auto_increment,
    `name`        varchar(64)  not null,
    `desc`        varchar(256),
    `owner_id`    int,
    `engine_id`   int          not null,
    `script_path` varchar(256) not null,
    `create_time` timestamp default current_timestamp,
    `update_time` timestamp default current_timestamp
);

create table if not exists `tech_stack`
(
    `id`          int         not null primary key auto_increment,
    `name`        varchar(64) not null,
    `create_time` timestamp default current_timestamp,
    `update_time` timestamp default current_timestamp
);


# relationship
create table if not exists `app_tech_stack`
(
    `id`            int not null primary key auto_increment,
    `app_id`        int not null,
    `tech_stack_id` int not null
);

create table if not exists `tech_stack_scan_engine`
(
    `id`            int not null primary key auto_increment,
    `tech_stack_id` int not null,
    `engine_id`     int not null
);


# others

create table if not exists `scan_task`
(
    `id`          int not null primary key auto_increment,
    `app_id`      int not null,
    `engine_id`   int not null,
    `use_case_id` int not null,
    `status`      varchar(32) default 'READY',
    `create_time` timestamp   default current_timestamp,
    `start_time`  timestamp   default current_timestamp,
    `end_time`    timestamp   default current_timestamp
);

create table if not exists `scan_result`
(
    `id`           int          not null primary key auto_increment,
    `scan_task_id` int          not null,
    `result_path`  varchar(256) not null,
    `create_time`  timestamp default current_timestamp
);
