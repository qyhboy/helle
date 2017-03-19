#!/usr/bin/python        
import MySQLdb
def write():
    conn=MySQLdb.connect(host='localhost',user='root',passwd='qiu123456',db='nmap')
    cur=conn.cursor()
    sql="select version from newtime"
    bb=cur.execute(sql)
    info1 = cur.fetchmany(bb)
    for line in info1:
        version=line[0]
    tt=open('/etc/sphinxsearch/sphinx.conf','w+')
    for i in range(30):
        tt.write("\nsource version%d"%i+"{\n\
        type			= mysql\n\
        sql_host                = localhost\n\
        sql_user                = root\n\
        sql_pass                =qiu123456\n\
        sql_db                  = nmap\n\
        sql_port                = 3306\n \
        sql_query_pre          = SET NAMES utf8\n\
        sql_query_pre          = SET SESSION query_cache_type=OFF\n\
        sql_query   =select id,ip,version,port from %s"%version+" where id%30="+"%d"%i+"\n\
        sql_attr_uint		= port\n\
	sql_ranged_throttle	= 0\n\
}\n\
index version%d"%i+"\n\
{\n\
	source			= version%d"%i+"\n\
	path			= /var/lib/sphinxsearch/data/version%d"%i+"\n\
	docinfo			= extern\n\
	dict			= keywords\n\
	mlock			= 0\n\
	morphology		= none\n\
	min_word_len		= 1\n\
	html_strip		= 0\n\
        }\n")
    tt.write("indexer\n\
{\n\
	mem_limit		= 256M\n\
}\n\
searchd\n\
{\n\
	listen			= 9312\n\
	listen			= 9306:mysql41\n\
	log			= /var/log/sphinxsearch/searchd.log\n\
	query_log		= /var/log/sphinxsearch/query.log\n\
	read_timeout		= 5\n\
	client_timeout		= 300\n\
	max_children		= 30\n\
	persistent_connections_limit	= 30\n\
	pid_file		= /var/run/sphinxsearch/searchd.pid\n\
	seamless_rotate		= 1\n\
	preopen_indexes		= 1\n\
	unlink_old		= 1\n\
	mva_updates_pool	= 1M\n\
	max_packet_size		= 8M\n\
	max_filters		= 256\n\
	max_filter_values	= 4096\n\
	max_batch_queries	= 32\n\
	workers			= threads \n\
        }")
    tt.close()

write()




