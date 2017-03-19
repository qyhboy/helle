import MySQLdb
import os
import datetime
def tables():
    conn=MySQLdb.connect(host='localhost',user='root',passwd='qiu123456',db='nmap')
    cur=conn.cursor()
    a=['80','443','23','22','3306','445','110','21','139','25']
    b=['nmap']
    for j in b:
        sql="CREATE TABLE IF NOT EXISTS `nmap`.`%s2` ( `id` bigint not null auto_increment,`ip` VARCHAR(20) NOT NULL , `date` DATETIME NOT NULL , `name` VARCHAR(20) NOT NULL , `version` VARCHAR(250) NOT NULL, `os` VARCHAR(20) NOT NULL  , `other` VARCHAR(150) NOT NULL, `state` VARCHAR(20) NOT NULL, `states` VARCHAR(25) NOT NULL ,`http` VARCHAR(2600) NOT NULL,`port` VARCHAR(20) NOT NULL,`address` VARCHAR(30),primary key (`id`))ENGINE = InnoDB PARTITION BY RANGE (`id`) (PARTITION P0 VALUES LESS THAN (25000000),PARTITION P1 VALUES LESS THAN (50000000), PARTITION P2 VALUES LESS THAN (75000000), PARTITION P3 VALUES LESS THAN(100000000), PARTITION P4 VALUES LESS THAN(125000000), PARTITION P5 VALUES LESS THAN(150000000), PARTITION P6 VALUES LESS THAN(175000000), PARTITION P7 VALUES LESS THAN(200000000));"%j
        cur.execute(sql)
    cur.close()
    conn.close()

def insert2():
    conn=MySQLdb.connect(host='localhost',user='root',passwd='qiu123456',db='nmap')
    cur=conn.cursor()
    a=['nmap']
    for j in a:
        sql="INSERT INTO `nmap1`(`ip`,`date`,`name`,`version`,`os`, `other`, `state`,`states`,`http`,`port`,`address`) SELECT  `ip`,`date`,`name`,`version`,`os`, `other`, `state`, `states`,`http`,`port`,`address`  FROM `%s`"%j
        cur.execute(sql)
        conn.commit()
    cur.close()
    conn.close()

def insert():
    conn=MySQLdb.connect(host='localhost',user='root',passwd='qiu123456',db='nmap')
    cur=conn.cursor()
    port='443'
    now =datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    address='korea'
    values = [([]) for i in range(10000)]
    j=0
    sv1='qxhh'
    for i in range(10000):
        values[j].append(sv1+'%d'%i)
        values[j].append(now)
        values[j].append(sv1)
        values[j].append(sv1)
        values[j].append(sv1)
        values[j].append('')
        values[j].append(sv1)
        values[j].append(sv1)
        values[j].append(sv1)
        j=j+1   
    sql="insert into `nmap` (`ip`, `date`,`name`,`version`, `os`,`other`,`state`,`states`,`http`,`port`,`address`)values (%s,%s,%s,%s,%s,%s,%s,%s,%s,"+"'%s'"%port+",'%s')"%address
    for k in range(100):
        cur.executemany(sql,values)
        conn.commit()
        tt=open('wrong.txt','a+')
        tt.write("%d"%k+"\n")
    cur.close()
    conn.close()

begin =datetime.datetime.now()
tables()

tt=open('wrong.txt','w+')
tt.write("begin"+"%s"%begin+"\n")
tt.close()
#insert2()
tt=open('wrong.txt','a+')
end =datetime.datetime.now()
tt.write("use "+"%s"%(end-begin)+"\n")
tt.close()

