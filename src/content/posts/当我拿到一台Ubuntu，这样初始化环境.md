---
title: "当我拿到一台Ubuntu，这样初始化环境"
publishedAt: 2023-10-22
description: "作为一名野生的全栈开发（主要职业经历是UX和PM），最近服务器到期，需要将服务迁移到另一台新购。相比几年前第一次独立部署服务器经常被一个问题卡很久，这次顺利了很多。如果你发现步骤中有哪些不好的实践，欢迎指教！"
slug: "When-I-get-a-Ubuntu-machine,-I-initialize-the-environment-like-this"
isPublish: true
tags:
  - "Dev"
  - "Server"
  - "Ubuntu"
---


# 创建本机ssh密钥，登录到主机

主机系统是ubuntu20，在服务商后台配置密钥，然后通过ssh登录服务器。一般云服务商支持两种ssh公钥认证登录方式：

1、服务商后台创建xxx.pem，下载到本地后作为登录凭证（ubuntu系统的默认账号一般都是'ubuntu'）

```bash
local > ssh -i xxx.pem ubuntu@1.1.1.1
```

2、使用本地密钥，将pub公钥配置到服务商管理后台


```bash
# 本地密钥一般用户目录里
local > ls ~/.ssh
# 如果没有私钥，执行这个命令生成
local > ssh-keygen
# 复制pub公钥，并配置到云服务商的后台
local > cat ~/.ssh/xxx.pub
# 之后就可以登录了
local > ssh -i ~/.ssh/xxx ubuntu@1.1.1.1
# 首次登录后，密钥会被记录
# 之后可以直接 ssh ubuntu@1.1.1.1
# 也可以使用 ssh-add xxx.pem 手动记录密钥
```

> 补充：
如果使用密钥时提示错误，可能是文件权限问题，尝试chmod 400对应密钥的公钥和私钥。


#  创建Root账号、apt更新

日常操作尽量用ubuntu（或者新建一个账号），但root账号还是需要最先被创建

```bash
ubuntu@1.1.1.1> sudo passwd root
# ubuntu使用apt管理软件，初次记得进行更新
ubuntu@1.1.1.1> sudo apt update
ubuntu@1.1.1.1> sudo apt upgrade -y
```

# 安装nginx

nginx安装就很容易了，具体的nginx配置就根据项目自定义了，这里不做说明。

```bash
ubuntu@1.1.1.1> sudo apt install nginx
```

# 安装php

```bash
ubuntu@1.1.1.1> sudo apt install php-fpm
ubuntu@1.1.1.1> systemctl status php[version]-fpm

# 安装php扩展，记得重启下php-fpm
ubuntu@1.1.1.1> sudo sudo apt install php-mysql php-gd
```

正常安装php不难，但我早期起写服务端程序主要是php，一些老项目依赖老php版本，所以需要特别操作：
安装旧版本的php

```bash
# 一般apt默认源是找不到旧版本php的
ubuntu@1.1.1.1> sudo apt search php7.2
# 从第三方源安装旧php（需要一些包的支持）
ubuntu@1.1.1.1> sudo apt -y install software-properties-common apt-transport-https lsb-release ca-certificates
ubuntu@1.1.1.1> sudo add-apt-repository ppa:ondrej/php  
ubuntu@1.1.1.1> sudo apt update
ubuntu@1.1.1.1> sudo apt install php7.2 libapache2-mod-php7.2 php7.2-fpm php7.2-mysql php7.2-curl php7.2-gd php7.2-mbstring php7.```2-xml php7.2-xmlrpc php7.2-zip php7.2-opcache php7.2-gmp php7.2-bcmath php7.2-dom
# 同样的若直接apt安装composer也会有问题，需要通过脚本安装（如果有其他依赖有版本问题，也可以这个思路想想）
ubuntu@1.1.1.1> sudo curl -sS https://getcomposer.org/installer | php
# 切换php版本
ubuntu@1.1.1.1> sudo update-alternatives --config php
```

Compser墙内可访问性不太好，可以设置添加国内源，例如阿里云：
```bash
composer config -g repo.packagist composer https://mirrors.aliyun.com/composer/ 
```

# Nodejs环境安装

Nodejs安装也有些tricky，因为apt的node版本比较久，所以要使用n这个包来获取新版本。

```bash
# apt先装上旧版本node
ubuntu@1.1.1.1> sudo apt install nodejs npm
ubuntu@1.1.1.1> sudo nodejs --version

# 升级npm
ubuntu@1.1.1.1> sudo npm i npm -g

# 安装n包，安装新版本node
ubuntu@1.1.1.1> sudo npm i n -g
ubuntu@1.1.1.1> sudo n latest
```

> 补充：
可能由于apt装了旧node的原因，环境变量错误导致Command 'node' not found，使用软链桥接下就好（/usr/bin/node => /user/local/bin/node）
Mysql安装

# Mysql安装
可以看出我还是很old style的，自己单机部署Mysql

```bash
ubuntu@1.1.1.1> sudo apt install mysql-server

# 检查安装
ubuntu@1.1.1.1> mysql --version
ubuntu@1.1.1.1> sudo systemctl mysql-server

# 若未启动，手动启动
ubuntu@1.1.1.1> sudo /etc/init.d/mysql start

# 配置mysql安全设置
ubuntu@1.1.1.1> sudo mysql_secure_installation

# 进入mysql创建超级用户（全部权限、可远程登录）
ubuntu@1.1.1.1> sudo mysql

    # 注意这里仍然使用了mysql_native_password加密方式，不然远程登录的客户端可能不支持
    CREATE USER 'yourname'@'%' IDENTIFIED WITH 'mysql_native_password' BY 'strong_password';

    GRANT ALL PRIVILEGES ON *.* TO 'yourname'@'%' WITH GRANT OPTION;

    SELECT user,host FROM mysql.user;

    EXIT;
 
# 允许远程登录
## 1、在服务商后台“防火墙“设置中打开开启3306端口

## 2、注释掉mysql配置 bind-adddress=127.0.0.1 一行，允许远程登录
ubuntu@10.10.10.10> sudo vim /etc/mysql/mysql.conf.d/mysqld.cnf

## 3、如果你使用ubuntu自带防火墙，这样：
ubuntu@1.1.1.1> sudo ufw allow mysql

# 重启mysql生效
ubuntu@1.1.1.1> systemctl restart mysql
```

# 完成

至此所需的业务环境基本完成！后面是更复杂的业务迁移了，包括但不限于部署代码、安装依赖、域名解析、Nginx配置、计划任务、进程守护以及数据迁移等等~ 
还好，在接下来的一天里也都陆陆续续顺利完成了，干杯！