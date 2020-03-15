# 缓存控制头
## Cache-Control
    被用于在http请求和响应中，通过指定指令来实现缓存机制。缓存指令是单向的，这意味着在请求中设置的指令，不一定被包含在响应中。  
    指令不区分大小写，并且具有可选参数，可以用令牌或者带引号的字符串语法。多个指令以逗号分隔。  
- 缓存请求指令  
    客户端可以在HTTP请求中使用的标准 Cache-Control 指令。  
```
Cache-Control: max-age=<seconds> 
Cache-Control: max-stale[=<seconds>] // 表明客户端愿意接收一个已经过期的资源。可以设置一个可选的秒数，表示响应不能已经过时超过该给定的时间。  
Cache-Control: min-fresh=<seconds>  
Cache-control: no-cache  
Cache-control: no-store  
Cache-control: no-transform  
Cache-control: only-if-cached  
```
- 缓存响应指令  
    服务器可以在响应中使用的标准 Cache-Control 指令。  
```
Cache-control: must-revalidate  
Cache-control: no-cache  
Cache-control: no-store  
Cache-control: no-transform  
Cache-control: public  
Cache-control: private  
Cache-control: proxy-revalidate  
Cache-Control: max-age=<seconds>  
Cache-control: s-maxage=<seconds>  
```
[详细内容](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cache-Control)