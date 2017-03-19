# -*- coding: utf-8 -*-
import MySQLdb
import os, time, random
ini=0
def kk():
    nmapname=choosetable()
    conn=MySQLdb.connect(host='localhost',user='root',passwd='qiu123456',db='nmap')
    sql_num="select max(id) from nmap%d "%nmapname
    cur=conn.cursor()
    bb=cur.execute(sql_num)
    info1 = cur.fetchmany(bb)
    nmap_startnum=0
    for line in info1:
        nmap_startnum=line[0]
    if(nmap_startnum==None):
        print "asd"
    print nmap_startnum


def choosetable():
    conn=MySQLdb.connect(host='localhost',user='root',passwd='qiu123456',db='nmap')
    sql1='SELECT max(id) from nmap_tableinfo'#now name nmap table
    cur=conn.cursor()
    bb=cur.execute(sql1)
    info1 = cur.fetchmany(bb)
    maxid=1
    for line in info1:
        maxid=line[0]
    conn.commit()
    cur.close()
    conn.close()
    return maxid

def manager():
    success=1
    while(success):
        time.sleep(random.random()*5)
        try:
            conn=MySQLdb.connect(host='localhost',user='root',passwd='qiu123456',db='nmap')
            cur=conn.cursor()
            sql="select isrun from dis_machine"
            aa=cur.execute(sql)
            info = cur.fetchmany(aa)
            for ii in info:
                if(ii[0]==1):
                   success=1
            success=0
            cur.close()
            conn.close()
        except MySQLdb.Error,e: 
            tt=open('wrong.txt','a+')
            ff= 'Mysql Error %s: %s' % (e.args[0], e.args[-1])
            tt.write("wrong"+ff+"\n")
            tt.close()


def getscan():
    global aa,ba,ca
    try:
        conn=MySQLdb.connect(host='localhost',user='root',passwd='qiu123456',db='nmap',charset="utf8")
        cur=conn.cursor()
        sql="select * from scan"
        bb=cur.execute(sql)
        info1 = cur.fetchmany(bb)
        for line in info1:
            scan_times=line[2]
            scan_port=line[6]
            scan_address=line[7]        
        cur.close()
        conn.close()
    except MySQLdb.Error,e: 
        tt=open('wrong.txt','a+')
        ff= 'Mysql Error %s: %s' % (e.args[0], e.args[-1])
        tt.write("wrong"+ff+"\n")
        tt.close()
    aa,ba,ca=scan_times,scan_port,scan_address
    return scan_times,scan_port,scan_address

def manager():
    success=1
    mnum=0#run times
    wrong=''
    while(success):
        time.sleep(random.random()*2)
        success=0
        try:
            conn=MySQLdb.connect(host='localhost',user='root',passwd='qiu123456',db='nmap')
            cur=conn.cursor()
            sql="select isrun from dis_machine"
            if(1):
                startnum=0
                aa=cur.execute(sql)
                info = cur.fetchmany(aa)
                for ii in info:
                    startnum+=1
                    if(1):
                         if(wrong==''):
                             wrong+='%d'%startnum
                         else:
                             wrong+=',%d'%startnum 
                         print wrong
                sql0="update dis_machine set state='wrong' where id in(%s)"%wrong
                print sql0
                cur.execute(sql0)
                conn.commit()
                mnum=0
                print 'fa11'
                print startnum
            aa=cur.execute(sql)
            info = cur.fetchmany(aa)
            for ii in info:
                if(ii[0]==1):
                   success=1
            cur.close()
            conn.close()
        except MySQLdb.Error,e: 
            tt=open('wrong.txt','a+')
            ff= 'Mysql Error %s: %s' % (e.args[0], e.args[-1])
            tt.write("wrong"+ff+"\n")
            tt.close()

#manager()
#kk()
#manager()
#print choosetable()

def readfile():
    f = open('ipget', 'r')
    a=''
    for line in f.readlines():
        if (line[0]!='#'):
            a+=line
        else:
            tt=open('ip.txt','w+')
            tt.write("%s"%a)
            tt.close()
            a=''
            a+=line.strip('#')
    tt=open('ip.txt','w+')
    tt.write("%s"%a)
    tt.close()

#readfile()

def num():
    sum=123
    num=3
    bar=num*100/sum
    print bar

num()



