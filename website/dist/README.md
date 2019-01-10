# Introduction to EPM
 

EPM是一个地铁的项目，业务很成熟的一个框架。

## What is EPM
- 支持MySQL、Oracle 数据库
- 这个使用写是[leap框架](http://leapframework.org/)
- [wui框架](http://111.230.47.180:9090/)

**具有如下特点** 
- 优秀的运行性能


- 便捷的安全配置
内置支持CSRF校验，一行代码启用CSRF校验
内置登录校验，一行代码启用登录校验，轻松实现用户身份认证

## How does it work

**后端项目结构** 
```
bingosoft-epm
├─database  项目SQL语句
├─bash 脚本语句
├─doc  项目脚本语句
├─uums 公共用户管理系统   /epm-uums
├─bingosoft-epm-base-api 基础模块（必须）  /epm-base-api
├─bingosoft-epm-base-web 基础web服务（必须） /epm-base-web
├─bingosoft-epm-task-api基础模块（必须）  /epm-task-api/task
├─bingosoft-epm-task-web 任务模块web（必须） /epm-task-web
├─bingosoft-epm-safqua-api 安全质量（非必须）/epm-safqua-api
├─bingosoft-epm-safqua-web 安全质量（非必须）/epm-safqua-web
├─bingosoft-epm-elec-api 机电施工（非必须）/epm-elec-api
├─bingosoft-epm-elec-web 机电施工（非必须）/epm-elec-web
├─bingosoft-epm-engine-api 土建施工（非必须）/epm-engine-api
├─bingosoft-epm-engine-web 土建施工（非必须）/epm-elec-web

```
<br> 


## 快速启动

1、下载例子代码从[部门的Git网址](https://gitlab.bingosoft.net/)

2、由于ssl是没有认证过的，所以要设置git 

``` bash
# 设置git https 不用认证
git config --global http.sslVerify false
# 下载
git clone https://gitlab.bingosoft.net/BusinessDept1-ConstructionManagementDept/bingosoft-epm.git
```

> 在输入账号密码时，请使用邮箱账号@之前的那一段，及邮箱密码即可。
  品高git账号不是邮箱账号！默认是个人<strong style="color:#E01A1A;">邮箱的前缀</strong>！品高邮箱账号识别不了

3、切换分支到 <strong style="color:#E01A1A;">epm-lz</strong>
如果相应的本地分支不存在（如：Local Branches 里不存在epm-lz分支），则需要先执行以下操作，将Remote Branches中将origin/epm-lz分支检出到本地。

<div align="center">
    <img src="../img/WX20181229-130051@2x.png" >
</div> 

4、项目导入
安装mvn 之后执行
``` bash
# 设置--settings  可以指定本地路径
mvn install:install-file -DgroupId=com.oracle -DartifactId=ojdbc8 -Dversion=10.2.0.1.0 -Dpackaging=jar -Dfile=/Users/zhangheng/git/subway/bingosoft-epm/epmLib/ojdbc8.jar  --settings /Users/zhangheng/svn/respository/settings-1.8.xml
```


5、数据库配置
配置修改：通过ij的文件查找文件名为jdbc.xml 的文件，将以下配置

``` xml
	<properties>
		<property name="jdbc.driverClassName">oracle.jdbc.driver.OracleDriver</property>
		<property name="jdbc.url">jdbc:oracle:thin:@(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=47.107.171.54)(PORT=1521))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=orcl)))</property>
		<property name="jdbc.username">EPM_LZ</property>
		<property name="jdbc.password">EPM_LZ</property>
	</properties>
```
 redis.xml的 配置


``` xml
<properties>
		<property name="redis.hostAndPorts">127.0.0.1:6379</property>
</properties>

```
` http://192.168.100.24:30078/sso` `http://61.178.19.46:30078/sso/`  改为 `http://epm.projects.bingosoft.net:20037/sso`
``` xml
<servlet>
		<servlet-name>ssoclient</servlet-name>
		<servlet-class>bingosoft.epm.sso.servlet.SingleSignOnServlet</servlet-class>
		<init-param>
			<param-name>ssoBaseEndpoint</param-name>
			<!--单点登录地址-->
		<param-value>http://epm.projects.bingosoft.net:20037/sso</param-value>
		</init-param>
		<init-param>
			<param-name>clientId</param-name>
			<param-value>clientId</param-value>
		</init-param>
		<init-param>
			<param-name>clientSecret</param-name>
			<param-value>clientSecret</param-value>
		</init-param>
		<load-on-startup>1</load-on-startup>
	</servlet>
```

## 安装问题

1、因为用的是封装好的包，所以一般要多clean  多install

<strong style="color:#E01A1A;">bingosoft.epm.core.task.model.PrjResourceModel</strong>  没注释

``` java
//@Table("prj_resource")
public class PrjResourceModel extends Model {

    //todo 补充字段
    /**
     * 主键
     */
    @Column
    private String id;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}

```

2、删除多余的配置 删掉 bingosoft-epm.xml

- 多余的jar包删除 有2018等结尾的

3、菜单没有，删除redis的缓存



