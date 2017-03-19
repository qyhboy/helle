#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <math.h>
#include <strings.h>
#include <mysql/mysql.h>

//20为设定每个段的最大IP数量，2^20个IP
//16与20对应
#define NUM 20
#define ADD 16

//对IP段进行处理，存成相应符合要求的文件文件
//此函数对每个输入的ip进行判断，如果超过设定的范围就对其进行分割
//如果没有超过直接保存
//ippart为要分割的ip地址，fp为为分割后保存的文件
int exchange(char *ippart,FILE * fp ){
	//char ippart[] = "192.168.1.1/6";
	char *ip = NULL;
	char *num=NULL;
	char delims1[] ="/";
	char delims2[] =".";
	int part1,part2;
	int limit;

	ip = strtok( ippart, delims1 );
	num = strtok(NULL,delims1);
	limit= 32 - atoi(num);
	if(limit==0){
		printf("输入的掩码有误\n");
		return -1;
	}

	part1 = atoi(strtok( ip, delims2 ));
	part2 = atoi(strtok( NULL, delims2 ));

	if(limit < NUM){
		fprintf(fp,"%d.%d.0.0/%s",part1,part2,num);
		return 0;
	}


	if(limit > 24){
		part2=0;
		part1=part1/(int)(pow(2.0,limit-24))*(pow(2.0,limit-24));
	}else{
		part2=(part2/(int)(pow(2.0,limit-16)))*(pow(2.0,limit-16));
	}

	for(int i=0;i<pow(2.0,limit-20);i++){
		fprintf(fp,"%d.%d.0.0/12\n",part1,part2);
		part2 = part2+16;
		if(part2>255){
			part1 ++;
			if(part1>255)
				return -2;
			part2=0;
		}
	}
}
//此函数对输入的IP池文件进行控制，并且对去IP池内文件，进行切割处理
//filename为传进的IP池文件
int makenew(char * filename){

	FILE * fp;
	FILE * fp1;
	char a[50];
	if(fp=fopen("final.txt","w+"))
		printf("final.txt is ready!\n"); 
	else {
		printf("打开final.txt文件成败\n");
		return -1;
	}
	if(fp1=fopen(filename,"r"))
		printf("file is ready!\n"); 
	else {
		printf("IP pool file error!\n");
		return -1;
	}

	while(!feof(fp1))
	{
		if(fgets(a,1000,fp1)){
			if(strlen(a)<5)break;
			if(exchange(a,fp)==-1){
				fclose(fp);
				fclose(fp1);
				return -1;
			}
		}
	}
	fclose(fp);
	fclose(fp1);
	return 0;
}
//此函数是对传进的IP池文件进行整体控制
//如果是已经分割过的这跳过
//如果是未分割的这进行分割，同时配置config1和从config2配置文件
//参数filename为要处理的文件
int control(char *filename){
	FILE * fp;
	char a[50];
	//char filename[] ="cina";
	if(fp=fopen("config1","r"))
		printf("2\n"); 
	else {
		printf("打开配置文件失败\n");
		return -1;
	}
	if(!feof(fp))
	{
		if(fgets(a,1000,fp)){
			if ( strcasecmp( a, filename ) != 0 )
				{ 
					fclose(fp);
					if(fp=fopen("config1","w+"))
						printf("3\n"); 
					else {
						printf("打开配置文件失败");
						return -1;
					}
					fprintf(fp,"%s",filename);
					makenew( filename);
					fclose(fp);
					//if(fp=fopen("config2","w+"))
					//	printf("3\n"); 
					//else {
					//	printf("打开配置文件失败");
					//	return -1;
					//}
					//fclose(fp);
				}
		}else{
			fclose(fp);
			if(fp=fopen("config1","w+"))
				printf("3\n"); 
			else {
				printf("打开配置文件失败");
				return -1;
			}
			fprintf(fp,"%s",filename);
			makenew( filename);
			fclose(fp);
			//if(fp=fopen("config2","w+"))
			//printf("3\n"); 
			//else {
			//	printf("打开配置文件失败");
			//	return -1;
			//}
			//fclose(fp);
		}
	}else{
		fclose(fp);
		if(fp=fopen("config1","w+"))
		printf("打开文件成功\n"); 
		else {
				printf("打开配置文件失败");
				return -1;
		}
		fprintf(fp,"%s",filename);
		makenew( filename);
		fclose(fp);
		//if(fp=fopen("config2","w+"))
		//		printf("打开文件成功\n"); 
		//else {
		//		printf("打开配置文件失败");
		//		return -1;
		//}
		//fclose(fp);
	}
}

int sava(long long num){
const char *host = "localhost";
const char *user = "root";
const char *pass = "qiu123456";
const char *db   = "nmap";
char query[100]; 
int flag;
MYSQL mysql;
mysql_init(&mysql);
if(!mysql_real_connect(&mysql, host, user, pass, db, 0, NULL, 0)) {
    printf("%s", mysql_error(&mysql));
}
else{
	 printf("YES, Conected succeed!");
	}
sprintf(query,"update scan set total=%ld",num); 
printf("%s\n",query);
flag = mysql_real_query(&mysql, query, (unsigned int)strlen(query));  
if(flag) {  
    printf("Insert data failure!\n");  
    return 0;  
}else {  
    printf("Insert data success!\n");  
}
mysql_close(&mysql);
return 0;
}

//此文件是进行IP的读取工作，
//在没有更新ip池的前提下每次顺序读取final文件
//保证每次给出的IP段是在要求的数量之下
//并形成ipget文件，正是要得到的文件
int getip(){
	//FILE * fp;
	//if(fp=fopen("config2","r"))
	//	printf("打开文件成功\n"); 
	//else {
	//	printf("打开配置文件失败");
	//	return -1;
	//}
	FILE * fp1;
	if(fp1=fopen("final.txt","r"))
		printf("打开文件成功\n"); 
	else {
		printf("打开配置文件失败");
		return -1;
	}
	int d=0;
	char a[100];
	//if(fgets(a,100,fp)){
	//	d = atoi(a);
	//}
	//for(int i=0;i<d && !feof(fp1);i++){
	//	fgets(a,100,fp1);
	//}
	//if(feof(fp1)){
		//fclose(fp);
		//d=0;
		//if(fp=fopen("config2","w+"))
		//printf("打开文件成功\n"); 
		//else {
		//printf("打开配置文件失败");
		//return -1;
		//}
		//fprintf(fp,"%d",d);
		//fclose(fp);
		//return 1;
	//}
	FILE * fp2;
	if(fp2=fopen("ipget","w+"))
		printf("打开文件成功\n"); 
	else {
		printf("打开配置文件失败");
		return -1;
	}

	char str[50];
	long long  sum=0;
	long long k=0;
	fgets(a,100,fp1);
	while(!feof(fp1)){
		strcpy(str,a);
		char *ip = strtok( str, "/" );
		char *num = strtok(NULL,"/");
		int limit = 32 - atoi(num);
		if(limit==0){
			printf("输入的掩码有误\n");
			return -1;
		}

		sum = sum+pow(2.0,limit);
		k=k+pow(2.0,limit);
		if(sum<2000000){
			fprintf(fp2,"%s",a);
		}else{
			fprintf(fp2,"#");
			fprintf(fp2,"%s",a);
			sum = pow(2.0,limit);
		}
		fgets(a,100,fp1);
		d++;
	}
	//if(feof(fp2))d=0;
	fclose(fp2);
	fclose(fp1);
	//fclose(fp);

	//if(fp=fopen("config2","w+"))
	//	printf("打开文件成功\n"); 
	//else {
	//	printf("打开配置文件失败");
	//	return -1;
	//}
	//fprintf(fp,"%d",d);
	//fclose(fp);
	sava(k);
	return d;
}



int main(int argc,char *argv[]){
	char filename[]= "/home/qq/search/ip";
	//if(argc<2){
	//	fprintf(stderr,"输入参数有误，应为：程序名+IP池文件\n");
	//	return 0;
	//}
	makenew(filename);
	printf("1\n");
	//control(filename);
	getip();
	return 1;
}
