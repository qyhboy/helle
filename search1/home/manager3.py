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
nmap_startnum=0   #the num of nmap before scan
def zmap(port,now,address):
    os.system("zmap -B 12M -w ip.txt -p %s -s 50000-60000 -o %s.csv "%(port,port))
    csvfile = file('%s.csv'%port, 'rb')
    conn=MySQLdb.connect(host='localhost',user='root',passwd='qiu123456',db='nmap')
    cur=conn.cursor()
    sql="insert ignore into `zmap%s`"%port+" values (%s,"+"'%s')"%now
    reader = csv.reader(csvfile)
    values=[]
    i=0
    a=0
    sum=0
    for lines in reader: 
        values.append(lines)
        if i>10000:
            a=cur.executemany(sql,values)
            conn.commit()
            i=0
            sum=sum+a
            values=[]
        i=i+1
    if i>0:
        a=cur.executemany(sql,values)
        conn.commit()
        sum=sum+a
    print sum
    csvfile.close()
    sql2="update machine set num=%d,date='%s',port=%s,address='%s' where name='sum'"%(sum,now,port,address)
    sql3="update dis_machine set isrun=1"
    cur.execute(sql2)
    cur.execute(sql3)
    conn.commit()
    cur.close()
    conn.close()

def getip(portt,now,num,address):
    conn=MySQLdb.connect(host='localhost',user='root',passwd='qiu123456',db='nmap')
    cur=conn.cursor()
    sql="select count(id) from dis_machine"
    bb=cur.execute(sql)
    info1 = cur.fetchmany(bb)
    for line in info1:
        num_machine=line[0]
    sql1="select * from machine where name='sum'"
    cur=conn.cursor()
    bb=cur.execute(sql1)
    info1 = cur.fetchmany(bb)
    for line in info1:
        b=line[1]
        script=line[5]
        port=line[6]
    pageSize=b/num_machine
    page=0
    startPage=page*pageSize
    sql2="select * from `zmap%s` where date>='%s' order by date desc limit %d,%d"%(port,now,startPage,pageSize) 
    cur=conn.cursor()
    aa=cur.execute(sql2)
    info = cur.fetchmany(aa)
    f1=open('0.txt','w+')
    f2=open('1.txt','w+')
    f3=open('2.txt','w+')
    f4=open('3.txt','w+')
    i=0
    list=[]
    for line in info:
        list.append(line[0])
        print line[0]
        print "test"
        if i>4000:
            j=1
            for ii in list:
                if j<=i/4:
                   f1.write(ii+'\n')
                elif j<=i/2:
                   f2.write(ii+'\n')
                elif j<=i*3/4:
                   f3.write(ii+'\n')
                elif j<=i:
                   f4.write(ii+'\n')
                j=j+1
            f1.close()
            f2.close()
            f3.close()
            f4.close()
            kk(port,num,address,script)
            i=0
            list=[]
            f1=open('0.txt','w+')
            f2=open('1.txt','w+')
            f3=open('2.txt','w+')
            f4=open('3.txt','w+')
        i=i+1
    if i>0:
        j=1
        for ii in list:
            if j<=i/4:
                f1.write(ii+'\n')
            elif j<=i/2:
                f2.write(ii+'\n')
            elif j<=i*3/4:
                f3.write(ii+'\n')
            elif j<=i:
                f4.write(ii+'\n')
            j=j+1
    cur.close()
    conn.close()
    f1.close()
    f2.close()
    f3.close()
    f4.close()
    kk(port,num,address,script)

def kk(port,num,address,script):
    p = Pool()
    for i in range(4):
        p.apply_async(nmap, args=(port,i,address,script,))
    p.close()
    p.join()
    tt=open('wrong.txt','a+')
    kk2='%d'%num
    tt.write("num:"+kk2+"\n"+"-----------"+"\n")
    tt.close()

def nmap(port,addr,address,script):
    os.system(script%(port,addr,addr))
    dom = xml.dom.minidom.parse('%d.xml'%addr)
    root = dom.documentElement
    values = [([]) for i in root.getElementsByTagName('host')]
    itemlist = root.getElementsByTagName('host')
    j=0
    for i in itemlist:
        itemlist1=i.getElementsByTagName('address')[0]
        sv1=itemlist1.getAttribute("addr")
        itemlist2=i.getElementsByTagName('service')[0]
        sv2=itemlist2.getAttribute("name")
        sv3=itemlist2.getAttribute("product")+itemlist2.getAttribute("version")
        sv4=itemlist2.getAttribute("ostype")
        sv5=itemlist2.getAttribute("extrainfo")+" "+itemlist2.getAttribute("method")+" "+itemlist2.getAttribute("conf")
        itemlist3=i.getElementsByTagName('state')[0]
        sv6=itemlist3.getAttribute("state")
        sv7=itemlist3.getAttribute("reason")+" "+itemlist3.getAttribute("reason_ttl")
        itemlist4=i.getElementsByTagName('script')
        if itemlist4==[]:
           sv8=""
        else:
           itemlist4=i.getElementsByTagName('script')[0]
           sv8=itemlist4.getAttribute("output")
        values[j].append(sv1)
        values[j].append(sv2)
        values[j].append(sv3)
        values[j].append(sv4)
        values[j].append(sv5)
        values[j].append(sv6)
        values[j].append(sv7)
        values[j].append(sv8)
        j=j+1 
    try:
        conn=MySQLdb.connect(host='localhost',user='root',passwd='qiu123456',db='nmap')
        cur=conn.cursor()
        sql="insert into nmap%d"%nmapname+" (`ip`, `date`,`name`,`version`, `os`,`other`,`state`,`states`,`http`,`port`,`address`) values (%s,now(),%s,%s,%s,%s,%s,%s,%s,"+"'%s'"%port+",'%s')"%address
        cur.executemany(sql,values)
        conn.commit()
        tt=open('wrong.txt','a+')
        kk2='%d'%addr
        tt.write("success"+kk2+"\n")
        tt.close()
        cur.close()
        conn.close()
    except MySQLdb.Error,e:
        tt=open('wrong.txt','a+')
        kk2='%d'%addr
        ff= 'Mysql Error %s: %s' % (e.args[0], e.args[-1])
        tt.write("wrong"+kk2+ff+"\n")
        tt.close()

def bar(num,begin):
    end =datetime.datetime.now()
    lefttime=(end-begin)*(scan_num-num)/num
    usetime=end-begin
    bar=num*100/scan_num
    try:
        conn=MySQLdb.connect(host='localhost',user='root',passwd='qiu123456',db='nmap')
        cur=conn.cursor()
        sql_num="select max(id) from nmap%d"%nmapname
        bb=cur.execute(sql_num)
        info1 = cur.fetchmany(bb)
        for line in info1:
            nmap_endnum=line[0]
        if(nmap_endnum==None):
            nmap_endnum=0
        scannum =nmap_endnum-nmap_startnum
        sql="update machine set bar=%d where name='tt'"%bar
        sql2="update machine set lefttime='%s' where name='tt'"%lefttime
        sql3="update scan set nmapnum=%d"%scannum
        sql4="update scan set usetime='%s'"%usetime
        cur.execute(sql)
        cur.execute(sql2)
        cur.execute(sql3)
        cur.execute(sql4)
        conn.commit()
        cur.close()
        conn.close()
    except MySQLdb.Error,e: 
        tt=open('wrong.txt','a+')
        ff= 'Mysql Error %s: %s' % (e.args[0], e.args[-1])
        tt.write("wrong"+ff+"\n")
        tt.close()

#if execute over
def done():
    try:
        conn=MySQLdb.connect(host='localhost',user='root',passwd='qiu123456',db='nmap')
        cur=conn.cursor()
        sql="update machine set isrun=0,bar=0,lefttime='0' "
        sql2="update dis_machine set isrun=0"
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

#distribute machine
def manager():
    success=1
    mnum=0#run times
    wrong=''
    while(success):
        time.sleep(random.random()*2)
        success=0
        mnum+=1
        try:
            conn=MySQLdb.connect(host='localhost',user='root',passwd='qiu123456',db='nmap')
            cur=conn.cursor()
            sql="select isrun from dis_machine"
            if(mnum>10000):
                startnum=0
                aa=cur.execute(sql)
                info = cur.fetchmany(aa)
                for ii in info:
                    startnum+=1
                    if(ii[0]==1):
                         if(wrong==''):
                             wrong+='%d'%startnum
                         else:
                             wrong+=',%d'%startnum 
                sql0="update dis_machine set state='wrong' where id in(%s)"%wrong
                cur.execute(sql0)
                conn.commit()
                mnum=0
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

def ini():
    os.system("./a.o")
    global nmap_startnum
    global nmapname
    nmapname=choosetable()
    try:
        conn=MySQLdb.connect(host='localhost',user='root',passwd='qiu123456',db='nmap')
        cur=conn.cursor()
        sql_num="select max(id) from nmap%d "%nmapname
        bb=cur.execute(sql_num)
        info1 = cur.fetchmany(bb)
        for line in info1:
            nmap_startnum=line[0]
        if(nmap_startnum==None):
            nmap_startnum=0
        sql1='update machine set isrun=0'
        sql2='update machine set bar=0'
        sql3='update machine set num=0'
        sql4="update machine set isrun=1 where name='tt'"
        sql5="update scan set usetime='0',nmapnum=0 "
        sql6="update dis_machine set isrun=0 where id=1"
        cur.execute(sql1)
        cur.execute(sql2)
        cur.execute(sql3)
        cur.execute(sql4)
        cur.execute(sql5)
        cur.execute(sql6)
        conn.commit()
        cur.close()
        conn.close()
    except MySQLdb.Error,e: 
        tt=open('wrong.txt','a+')
        ff= 'Mysql Error %s: %s' % (e.args[0], e.args[-1])
        tt.write("wrong"+ff+"\n")
        tt.close()
    
def over():
    for i in range(1):
        try:
            conn=MySQLdb.connect(host='localhost',user='root',passwd='qiu123456',db='nmap')
            cur=conn.cursor()
            sql="select isrun from machine where name='sum'"
            aa=cur.execute(sql)
            info = cur.fetchmany(aa)
            for ii in info:
                a=ii[0]
            cur.close()
            conn.close()
            if(a==1):
                done()
                end()
                main()
        except MySQLdb.Error,e: 
            tt=open('wrong.txt','a+')
            ff= 'Mysql Error %s: %s' % (e.args[0], e.args[-1])
            tt.write("wrong"+ff+"\n")
            tt.close()

def tables(portarray):
    conn=MySQLdb.connect(host='localhost',user='root',passwd='qiu123456',db='nmap')
    cur=conn.cursor()
    for j in portarray:
        sqlz="CREATE TABLE IF NOT EXISTS `zmap%s` ( `ip` VARCHAR(20) NOT NULL , `date` DATETIME NOT NULL , UNIQUE `ip` (`ip`))ENGINE = InnoDB"%j
        cur.execute(sqlz)
    conn.commit()
    cur.close()
    conn.close()

def start():
    try:
        conn=MySQLdb.connect(host='localhost',user='root',passwd='qiu123456',db='nmap')
        cur=conn.cursor()
        sql="update dis_machine set isrun=1 where id=1 "
        cur.execute(sql)
        conn.commit()
        cur.close()
        conn.close()
    except MySQLdb.Error,e: 
        tt=open('wrong.txt','a+')
        ff= 'Mysql Error %s: %s' % (e.args[0], e.args[-1])
        tt.write("wrong"+ff+"\n")
        tt.close()

def end():
    try:
        conn=MySQLdb.connect(host='localhost',user='root',passwd='qiu123456',db='nmap')
        cur=conn.cursor()
        sql="update dis_machine set isrun=0 where id=1 "
        cur.execute(sql)
        conn.commit()
        cur.close()
        conn.close()
    except MySQLdb.Error,e: 
        tt=open('wrong.txt','a+')
        ff= 'Mysql Error %s: %s' % (e.args[0], e.args[-1])
        tt.write("wrong"+ff+"\n")
        tt.close()

def getscan():
    global address
    try:
        conn=MySQLdb.connect(host='localhost',user='root',passwd='qiu123456',db='nmap')
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
    address=scan_address
    return scan_times,scan_port

def run(port,num,begin):
    f = open('ipget', 'r')
    a=''
    for line in f.readlines():
        if (line[0]!='#'):
            a+=line
        else:
            tt=open('ip.txt','w+')
            tt.write("%s"%a)
            tt.close()
            now =datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")#run_zmap->nmap
            tt=open('wrong.txt','a+')
            tt.write("begin"+now+"\n")
            tt.close()
            over()
            end()
            manager()
            start()
            over()
            zmap(port,now,address)
            over()
            getip(port,now,num,address)
            bar(num,begin)
            over()
            now =datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            tt=open('wrong.txt','a+')
            tt.write("end"+now+"\n")
            tt.close()
            a=''
            a+=line.strip('#')
    f.close()
    tt=open('ip.txt','w+')
    tt.write("%s"%a)
    tt.close()
    now =datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")#run_zmap->nmap
    tt=open('wrong.txt','a+')
    tt.write("begin"+now+"\n")
    tt.close()
    over()
    end()
    manager()
    start()
    over()
    zmap(port,now,address)
    over()
    getip(port,now,num,address)
    over()
    now =datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    tt=open('wrong.txt','a+')
    tt.write("end"+now+"\n")
    tt.close()

def allscript():
    global scan_num
    pp="ip"
    tt=open('wrong.txt','w+')
    tt.close()
    num=1
    ini()
    scan_times,scan_port=getscan()
    portarray=scan_port.split(',')#port array
    tables(portarray)
    portnum=len(portarray)
    scan_num=portnum*scan_times
    begin=datetime.datetime.now()
    for j in range(scan_times):      
        for port in portarray:
            conn=MySQLdb.connect(host='localhost',user='root',passwd='qiu123456',db='nmap')
            cur=conn.cursor()
            sql="update machine set port=%s where name='sum'"%port#sum:run info ---port
            aa=cur.execute(sql)
            conn.commit()
            cur.close()
            conn.close()
            run(port,num,begin)
            bar(num,begin)
            num=num+1
    done()
    end()

def begin():
    success=1
    while(success):
        time.sleep(random.random()*3)
        try:
            conn=MySQLdb.connect(host='localhost',user='root',passwd='qiu123456',db='nmap')
            cur=conn.cursor()
            sql="select isrun from  dis_machine where id=1"#1 run
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
        allscript()

def main():
    while(1):
        begin()
   
if __name__=='__main__':
    main()
    

