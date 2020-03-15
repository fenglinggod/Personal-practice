# 缓存控制头
## Cache-Control--强制缓存
    被用于在http请求和响应中，通过指定指令来实现缓存机制。缓存指令是单向的，这意味着在请求中设置的指令，不一定被包含在响应中。  
    指令不区分大小写，并且具有可选参数，可以用令牌或者带引号的字符串语法。多个指令以逗号分隔。兼容老版本Expires  
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
## Last-Modified--比较缓存  
    响应首部，其中包含源头服务器认定的资源做出修改的日期及时间。 通常被用作一个验证器来判断接收到的或者存储的资源是否彼此一致。由于精确度比  ETag 要低，所以这是一个备用机制。包含有  If-Modified-Since 或 If-Unmodified-Since 首部的条件请求会使用这个字段。  

[详细内容](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Last-Modified)   
## If-Modified-Since--比较缓存  
    条件式请求首部，服务器只在所请求的资源在给定的日期时间之后对内容进行过修改的情况下才会将资源返回，状态码为 200  。如果请求的资源从那时起未经修改，那么返回一个不带有消息主体的  304  响应，而在 Last-Modified 首部中会带有上次修改时间。 不同于  If-Unmodified-Since, If-Modified-Since 只可以用在 GET 或 HEAD 请求中。  
    当与 If-None-Match 一同出现时，它（If-Modified-Since）会被忽略掉，除非服务器不支持 If-None-Match。  
[详细内容](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/If-Modified-Since)   
## ETag--比较缓存  
    ETagHTTP响应头是资源的特定版本的标识符。这可以让缓存更高效，并节省带宽，因为如果内容没有改变，Web服务器不需要发送完整的响应。而如果内容发生了变化，使用ETag有助于防止资源的同时更新相互覆盖（“空中碰撞”）。  
    如果给定URL中的资源更改，则一定要生成新的Etag值。 因此Etags类似于指纹，也可能被某些服务器用于跟踪。 比较etags能快速确定此资源是否变化，但也可能被跟踪服务器永久存留。  
### 语法
```
ETag: W/"<etag_value>"   
ETag: "<etag_value>"   
```
- W/ 可选  
'W/'(大小写敏感) 表示使用弱验证器。 弱验证器很容易生成，但不利于比较。 强验证器是比较的理想选择，但很难有效地生成。 相同资源的两个弱Etag值可能语义等同，但不是每个字节都相同。  
- "<etag_value>"  
实体标签唯一地表示所请求的资源。 它们是位于双引号之间的ASCII字符串（如“675af34563dc-tr34”）。 没有明确指定生成ETag值的方法。 通常，使用内容的散列，最后修改时间戳的哈希值，或简单地使用版本号。 例如，MDN使用wiki内容的十六进制数字的哈希值。  
### 避免“空中碰撞”
提交时根据请求所包含的If-Match来检查是否为最新版本。如果哈希值不匹配，则意味着文档已经被编辑，抛出412前提条件失败错误。  
### 缓存未更改的资源
ETag头的另一个典型用例是缓存未更改的资源。 如果用户再次访问给定的URL（设有ETag字段），显示资源过期了且不可用，客户端就发送值为ETag的If-None-Match header字段：  
服务器将客户端的ETag（作为If-None-Match字段的值一起发送）与其当前版本的资源的ETag进行比较，如果两个值匹配（即资源未更改），服务器将返回不带任何内容的304未修改状态，告诉客户端缓存版本可用（新鲜）。  
[详细内容](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/ETag)    