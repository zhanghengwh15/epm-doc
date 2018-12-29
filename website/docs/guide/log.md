# 日志更改

 常见路径中/src/main/resources/logback.xml

DEBUG   --->    INFO
``` xml
    <root level="INFO">
        <!-- <appender-ref ref="ASYNC"/> -->
        <appender-ref ref="ASYNC_STD"/>
        <appender-ref ref="FILE"/>
    </root>
```











