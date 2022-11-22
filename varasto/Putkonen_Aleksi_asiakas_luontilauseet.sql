drop database if exists asiakastietokanta;
create database asiakastietokanta;

use asiakastietokanta;

create table asiakas(
    asiakasnumero integer not null primary key,
    etunimi varchar(8) not null,
    sukunimi varchar(13) not null,
    tyyppi varchar(28) not null,
    osoite varchar(15) not null
);

create user if not exists 'meeri'@'localhost' identified by 'AsJUtA3J';

grant all privileges on asiakastietokanta.* to 'meeri'@'localhost';

insert into asiakas values(1,'Leila','Nieminen','VIP','Koodipolku 2');
insert into asiakas values(2,'Pirkko','Aakkonen','edustava asiakas','Datatie 35');
insert into asiakas values(3,'Tuuli','Puro','välteltävä','Datatie 56');
insert into asiakas values(4,'Matti','Rantala','superbonus','Koodipolku 200');
insert into asiakas values(5,'Rauha','Virtanen','tavallinen tallaaja','Maantie 1234');
insert into asiakas values(6,'Aapeli','Hökki','kultakimpale','Korvenperä 9');
insert into asiakas values(7,'Meri','Jokinen','kierrettävä kaukaa','Rantakatu 3');