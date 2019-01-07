# 前后端分离

## 后端架构
后端主要是利用shiro 来完成的，这个是OAuth2Filter链进行过滤
```java
  @Override
    protected AuthenticationToken createToken(ServletRequest request, ServletResponse response) throws Exception {
        //获取请求token
        String token = getRequestToken((HttpServletRequest) request);

        if(StringUtils.isBlank(token)){
            return null;
        }

        return new OAuth2Token(token);
    }


    /**
     * 获取请求的token,用于后面的用途
     */
    private String getRequestToken(HttpServletRequest httpRequest){
        //从header中获取token
        String token = httpRequest.getHeader("token");

        //如果header中不存在token，则从参数中获取token
        if(StringUtils.isBlank(token)){
            token = httpRequest.getParameter("token");
        }

        return token;
    }
```
而springboot里面有对除去匿名的全部要进行过滤，这个在shiro的配置之中。
类 com.bingo.config.ShiroConfig 之中

```java
    @Bean("shiroFilter")
    public ShiroFilterFactoryBean shirFilter(SecurityManager securityManager) {
        ShiroFilterFactoryBean shiroFilter = new ShiroFilterFactoryBean();
        shiroFilter.setSecurityManager(securityManager);

        //oauth过滤
        Map<String, Filter> filters = new HashMap<>();
        filters.put("oauth2", new OAuth2Filter());  //这里做设置
        shiroFilter.setFilters(filters);

        Map<String, String> filterMap = new LinkedHashMap<>();
        filterMap.put("/webjars/**", "anon");
        filterMap.put("/druid/**", "anon");
        filterMap.put("/app/**", "anon");
        filterMap.put("/sys/login", "anon");
        filterMap.put("/swagger/**", "anon");
        filterMap.put("/v2/api-docs", "anon");
        filterMap.put("/swagger-ui.html", "anon");
        filterMap.put("/swagger-resources/**", "anon");
        filterMap.put("/captcha.jpg", "anon");
        filterMap.put("/getCode", "anon");

        filterMap.put("/**", "oauth2");
        shiroFilter.setFilterChainDefinitionMap(filterMap);

        return shiroFilter;
    }
```

当然还有写到配置文件中的做法 ，可以思考下怎么做到。

权限的加载以及验证
com.bingo.modules.sys.oauth2.OAuth2Realm

## 前端架构




