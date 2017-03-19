
#!/usr/bin/python
import csv
import datetime
import MySQLdb
import os, time, random
import  xml.dom.minidom
from xml.dom.minidom import parse
import xml.dom.minidom
import xml.etree.ElementTree as ET
from multiprocessing import Pool
from multiprocessing import Process, Queue
def buildtable():
    conn=MySQLdb.connect(host='localhost',user='root',passwd='qiu123456',db='nmap')
    sql1='SELECT max(id) from nmap_tableinfo'#now name nmap table
    cur=conn.cursor()
    bb=cur.execute(sql1)
    info1 = cur.fetchmany(bb)
    maxid=0
    for line in info1:
        maxid=line[0]
    if (maxid==None):
       maxid=0
    maxid=maxid+1
    sql2="CREATE TABLE IF NOT EXISTS `nmap`.`nmap%d` ( `id` bigint not null auto_increment,`ip` VARCHAR(20) NOT NULL , `date` DATETIME NOT NULL , `name` VARCHAR(50) NOT NULL , `version` VARCHAR(250) NOT NULL, `os` VARCHAR(50) NOT NULL  , `other` VARCHAR(150) NOT NULL, `state` VARCHAR(20) NOT NULL, `states` VARCHAR(25) NOT NULL ,`http` VARCHAR(2600) NOT NULL,`port` VARCHAR(20) NOT NULL,`address` VARCHAR(30),primary key (`id`))DEFAULT CHARSET=utf8 ENGINE = InnoDB PARTITION BY RANGE (`id`) (PARTITION P0 VALUES LESS THAN (25000000),PARTITION P1 VALUES LESS THAN (50000000), PARTITION P2 VALUES LESS THAN (75000000), PARTITION P3 VALUES LESS THAN(100000000), PARTITION P4 VALUES LESS THAN(125000000), PARTITION P5 VALUES LESS THAN(150000000), PARTITION P6 VALUES LESS THAN(175000000), PARTITION P7 VALUES LESS THAN(200000000))"%maxid
    sql3="INSERT INTO nmap_tableinfo (name,date) values ('nmap%d',now())"%maxid
    cur.execute(sql2)
    cur.execute(sql3)
    conn.commit()
    cur.close()
    conn.close()

def done():
    try:
        conn=MySQLdb.connect(host='localhost',user='root',passwd='qiu123456',db='nmap')
        cur=conn.cursor()
        sql="update newtime set isrun=0"
        sql2='update machine set isrun=0 where name="all"'
        cur.execute(sql)
        cur.execute(sql2)
        conn.commit()
        cur.close()
        conn.close()
    except MySQLdb.Error,e: 
        tt=open('wrong.txt','a+')
        ff= 'Mysql Error %s: %s' % (e.args[0], e.args[-1])
        tt.write("wrong"+ff+"\n")
        tt.close()

#sphinx
def sphinx():
    os.system("python sphinx.py")
    os.system("indexer --all --rotate")
    os.system("searchd")
    print "good"

#mysqldump
def mysqldump():
    now =datetime.datetime.now().strftime("%Y-%m-%d")
    os.system("mysqldump -u root -pqiu123456 nmap > nmap"+"%s"%now+".sql")
    print "good"

#deversion
def deversion():
    try:
        conn=MySQLdb.connect(host='localhost',user='root',passwd='qiu123456',db='nmap')
        cur=conn.cursor()
        sql1='SELECT deversion from newtime'#deversion name
        cur=conn.cursor()
        bb=cur.execute(sql1)
        info1 = cur.fetchmany(bb)
        deversion=''
        for line in info1:
             deversion=line[0]
        sql="drop table `%s`"%deversion
        cur.execute(sql)
        sql2="delete from nmap_tableinfo where name ='%s'"%deversion
        cur.execute(sql2)
        conn.commit()
        cur.close()
        conn.close()
    except MySQLdb.Error,e: 
        tt=open('wrong.txt','a+')
        ff= 'Mysql Error %s: %s' % (e.args[0], e.args[-1])
        tt.write("wrong"+ff+"\n")
        tt.close()

def begin():
    success=1
    while(success):
        time.sleep(random.random()*3)
        try:
            conn=MySQLdb.connect(host='localhost',user='root',passwd='qiu123456',db='nmap')
            cur=conn.cursor()
            sql="select isrun from  newtime where id=1" #0 not run;1 buildtable;2 sphinxfile--which times,
            aa=cur.execute(sql)
            info = cur.fetchmany(aa)
            for ii in info:
                a=ii[0]
            success=0
            if(a==0):
                success=1
            cur.close()
            conn.close()
        except MySQLdb.Error,e: 
            tt=open('wrong.txt','a+')
            ff= 'Mysql Error %s: %s' % (e.args[0], e.args[-1])
            tt.write("wrong"+ff+"\n")
            tt.close()
    if (a==1):
        buildtable()
        done()
    if (a==2):
        sphinx()
        done()
    if (a==3):
        mysqldump()
        done()
    if (a==4):
        deversion()
        done()

def main():
    while(1):
        begin()
   
if __name__=='__main__':
    main()
    
