import MySQLdb
import os
def mysql():
    conn=MySQLdb.connect(host='localhost',user='root',passwd='qiu123456',db='nmap')
    cur=conn.cursor()

def backup():
    conn=MySQLdb.connect(host='192.168.2.102',user='root',passwd='qiu123456',db='nmap',port=3306)
    os.system("mysqldump -h 192.168.2.102 -u root -p'qiu123456' nmap >nmap1.sql")

def source():
    os.system("mysql -u root -p'qiu123456' nmap < nmap1.sql")

def tablezmap():
    conn=MySQLdb.connect(host='localhost',user='root',passwd='qiu123456',db='nmap')
    cur=conn.cursor()
    a=['80','443','23','22','3306','445','110','21','139','25']
    for j in a:
        sql="CREATE TABLE IF NOT EXISTS `zmap_%s` ( `ip` VARCHAR(20) NOT NULL , `date` DATETIME NOT NULL , UNIQUE `ip` (`ip`))ENGINE = InnoDB"%j
        cur.execute(sql)

def tables(date):
    conn=MySQLdb.connect(host='localhost',user='root',passwd='qiu123456',db='nmap')
    cur=conn.cursor()
    a=['80','443','23','22','3306','445','110','21','139','25']
    for j in a:
        sqlz="CREATE TABLE IF NOT EXISTS `zmap_%s_%s` ( `ip` VARCHAR(20) NOT NULL , `date` DATETIME NOT NULL , UNIQUE `ip` (`ip`))ENGINE = InnoDB"%(date,j)
        sqln="CREATE TABLE `nmap`.`%s_%s` ( `ip` VARCHAR(20) NOT NULL , `date` DATETIME NOT NULL , `name` VARCHAR(20)  , `version` VARCHAR(250) , `os` VARCHAR(20)  , `other` VARCHAR(150), `state` VARCHAR(20)  , `states` VARCHAR(25) ,`http` VARCHAR(2600),`port` VARCHAR(20),`address` VARCHAR(50),index `ip` (`ip`))ENGINE = InnoDB;"%(date,j)
        cur.execute(sql)

def test():
    list=[]
    for line in info:
        list.append(line[0])

def index():
    conn=MySQLdb.connect(host='localhost',user='root',passwd='qiu123456',db='nmap')
    cur=conn.cursor()
    a=['443','23','22','3306','445','110','21','139','25']
    for j in a:
        sql="ALTER TABLE `%s` ADD `id` BIGINT NOT NULL AUTO_INCREMENT FIRST, ADD PRIMARY KEY (`id`);"%j;
        cur.execute(sql)
    cur.close()
    conn.close()

index()
#test()
#backup()
#source()
#tablezmap()
