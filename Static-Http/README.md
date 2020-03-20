# HTTP HEADER
## 缓存控制头
### Cache-Control--强制缓存
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
    
### Last-Modified--比较缓存  
    响应首部，其中包含源头服务器认定的资源做出修改的日期及时间。 通常被用作一个验证器来判断接收到的或者存储的资源是否彼此一致。由于精确度比  ETag 要低，所以这是一个备用机制。包含有  If-Modified-Since 或 If-Unmodified-Since 首部的条件请求会使用这个字段。  

[详细内容](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Last-Modified)   
    
### If-Modified-Since--比较缓存  
    条件式请求首部，服务器只在所请求的资源在给定的日期时间之后对内容进行过修改的情况下才会将资源返回，状态码为 200  。如果请求的资源从那时起未经修改，那么返回一个不带有消息主体的  304  响应，而在 Last-Modified 首部中会带有上次修改时间。 不同于  If-Unmodified-Since, If-Modified-Since 只可以用在 GET 或 HEAD 请求中。  
    当与 If-None-Match 一同出现时，它（If-Modified-Since）会被忽略掉，除非服务器不支持 If-None-Match。  
[详细内容](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/If-Modified-Since)    
     
### ETag--比较缓存  
    ETagHTTP响应头是资源的特定版本的标识符。这可以让缓存更高效，并节省带宽，因为如果内容没有改变，Web服务器不需要发送完整的响应。而如果内容发生了变化，使用ETag有助于防止资源的同时更新相互覆盖（“空中碰撞”）。  
    如果给定URL中的资源更改，则一定要生成新的Etag值。 因此Etags类似于指纹，也可能被某些服务器用于跟踪。 比较etags能快速确定此资源是否变化，但也可能被跟踪服务器永久存留。  
#### 语法
```
ETag: W/"<etag_value>"   
ETag: "<etag_value>"   
```
- W/ 可选  
    'W/'(大小写敏感) 表示使用弱验证器。 弱验证器很容易生成，但不利于比较。 强验证器是比较的理想选择，但很难有效地生成。 相同资源的两个弱Etag值可能语义等同，但不是每个字节都相同。  
- "<etag_value>"  
    实体标签唯一地表示所请求的资源。 它们是位于双引号之间的ASCII字符串（如“675af34563dc-tr34”）。 没有明确指定生成ETag值的方法。 通常，使用内容的散列，最后修改时间戳的哈希值，或简单地使用版本号。 例如，MDN使用wiki内容的十六进制数字的哈希值。  
#### 避免“空中碰撞”
提交时根据请求所包含的If-Match来检查是否为最新版本。如果哈希值不匹配，则意味着文档已经被编辑，抛出412前提条件失败错误。  
#### 缓存未更改的资源
    ETag头的另一个典型用例是缓存未更改的资源。 如果用户再次访问给定的URL（设有ETag字段），显示资源过期了且不可用，客户端就发送值为ETag的If-None-Match header字段：  
    服务器将客户端的ETag（作为If-None-Match字段的值一起发送）与其当前版本的资源的ETag进行比较，如果两个值匹配（即资源未更改），服务器将返回不带任何内容的304未修改状态，告诉客户端缓存版本可用（新鲜）。  
[详细内容](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/ETag)    
  
------
------
## 多语言
### Accept-Language
    Accept-Language 请求头允许客户端声明它可以理解的自然语言，以及优先选择的区域方言。借助内容协商机制，服务器可以从诸多备选项中选择一项进行应用， 并使用 Content-Language 应答头通知客户端它的选择。  
    当服务器无法通过其他方式来确定应当使用的语言时——例如某一特定的 URL，这是用户明确指定的——这个请求头可以用作提示。  
#### 语法  
```
Accept-Language: <language>
Accept-Language: *

Accept-Language: fr-CH, fr;q=0.9, en;q=0.8, de;q=0.7, *;q=0.5
```  
- &lt;language&gt;  
    用含有两到三个字符的字符串表示的语言码或完整的语言标签。除了语言本身之外，还会包含其他方面的信息，显示在中划线（"-"）后面。最常见的额外信息是国家或地区变种（如"en-US"）或者表示所用的字母系统（如"sr-Lat"）。其他变种诸如拼字法（"de-DE-1996"）等通常不被应用在这种场合。  
- \*  
    任意语言；"*" 表示通配符（wildcard）。  
- ;q= (q-factor weighting)  
    此值代表优先顺序，用相对质量价值表示，又称为权重。  
[详细内容](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Accept-Language)  
------
------
## 断点续传(206)  
### Range:bytes  
    The Range 是一个请求首部，告知服务器返回文件的哪一部分。在一个  Range 首部中，可以一次性请求多个部分，服务器会以 multipart 文件的形式将其返回。如果服务器返回的是范围响应，需要使用 206 Partial Content 状态码。假如所请求的范围不合法，那么服务器会返回  416 Range Not Satisfiable 状态码，表示客户端错误。服务器允许忽略  Range  首部，从而返回整个文件，状态码用 200 。
```
Range: <unit>=<range-start>-  
Range: <unit>=<range-start>-<range-end>  
Range: <unit>=<range-start>-<range-end>, <range-start>-<range-end>  
Range: <unit>=<range-start>-<range-end>, <range-start>-<range-end>, <range-start>-<range-end>

Range: bytes=200-1000, 2000-6576, 19000-   
```
- &lt;unit&gt;  
    范围所采用的单位，通常是字节（bytes）。  
- &lt;range-start&gt;  
    一个整数，表示在特定单位下，范围的起始值。  
- &lt;range-end&gt;  
    一个整数，表示在特定单位下，范围的结束值。这个值是可选的，如果不存在，表示此范围一直延伸到文档结束。  
[详细内容](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Range)  
### Content-Range  
    在HTTP协议中，响应首部 Content-Range 显示的是一个数据片段在整个文件中的位置。  
```
Content-Range: <unit> <range-start>-<range-end>/<size>  
Content-Range: <unit> <range-start>-<range-end>/*  
Content-Range: <unit> */<size>  

Content-Range: bytes 200-1000/67589 
```
- &lt;unit&gt;    
    数据区间所采用的单位。通常是字节（byte）。  
- &lt;range-start&gt;    
    一个整数，表示在给定单位下，区间的起始值。  
- &lt;range-end&gt;    
    一个整数，表示在给定单位下，区间的结束值。  
- &lt;size&gt;    
    整个文件的大小（如果大小未知则用"*"表示）。  
[详细内容](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Range)  
------
------
## Referer   
    Referer 请求头包含了当前请求页面的来源页面的地址，即表示当前页面是通过此来源页面里的链接进入的。服务端一般使用 Referer 请求头识别访问来源，可能会以此进行统计分析、日志记录以及缓存优化等。  
在以下两种情况下，Referer 不会被发送：  
- 来源页面采用的协议为表示本地文件的 "file" 或者 "data" URI；  
- 当前请求页面采用的是非安全协议，而来源页面采用的是安全协议（HTTPS）。  
```
Referer: <url>  
Referer: https://developer.mozilla.org/en-US/docs/Web/JavaScript  
```
- &lt;url&gt;  
    当前页面被链接而至的前一页面的绝对路径或者相对路径。不包含 URL fragments (例如 "#section") 和 userinfo (例如 "https://username:password@example.com/foo/bar/" 中的 "username:password" )。  
### CSRF
    CSRF跨站点请求伪造(Cross—Site Request Forgery)  
* Example:  
    - Web A为存在CSRF漏洞的网站  
    -  Web B为攻击者构建的恶意网站   
    - User C为Web A网站的合法用户  
* CSRF攻击攻击原理及过程如:  
    - 用户C打开浏览器，访问受信任网站A，输入用户名和密码请求登录网站A   
    - 在用户信息通过验证后，网站A产生Cookie信息并返回给浏览器，此时用户登录网站A成功，可以正常发送请求到网站A   
    - 用户未退出网站A之前，在同一浏览器中，打开一个TAB页访问网站B   
    - 网站B接收到用户请求后，返回一些攻击性代码，并发出一个请求要求访问第三方站点A   
    - 浏览器在接收到这些攻击性代码后，根据网站B的请求，在用户不知情的情况下携带Cookie信息，向网站A发出请求。网站A并不知道该请求其实是由B发起的，所以会根据用户C的Cookie信息以C的权限处理该请求，导致来自网站B的恶意代码被执行。
* CSRF漏洞检测  
    - 检测CSRF漏洞是一项比较繁琐的工作，最简单的方法就是抓取一个正常请求的数据包，去掉Referer字段后再重新提交，如果该提交还有效，那么基本上可以确定存在CSRF漏洞。  
    - 随着对CSRF漏洞研究的不断深入，不断涌现出一些专门针对CSRF漏洞进行检测的工具，如CSRFTester，CSRF Request Builder等。  
    - CSRF漏洞检测工具的测试原理如下：
        - 使用CSRFTester进行测试时，首先需要抓取我们在浏览器中访问过的所有链接以及所有的表单等信息  
        - 通过在CSRFTester中修改相应的表单等信息，重新提交，这相当于一次伪造客户端请求  
        - 如果修改后的测试请求成功被网站服务器接受，则说明存在CSRF漏洞，当然此款工具也可以被用来进行CSRF攻击   
* 防御CSRF攻击：  
    目前防御 CSRF 攻击主要有三种策略：验证 HTTP Referer 字段；在请求地址中添加 token 并验证；在 HTTP 头中自定义属性并验证。
    - 验证 HTTP Referer 字段  
    在通常情况下，访问一个安全受限页面的请求来自于同一个网站，比如需要访问 http://bank.example/withdraw?account=bob&amount=1000000&for=Mallory，用户必须先登陆 bank.example，然后通过点击页面上的按钮来触发转账事件。这时，该转帐请求的 Referer 值就会是转账按钮所在的页面的 URL，通常是以 bank.example 域名开头的地址。而如果黑客要对银行网站实施 CSRF 攻击，他只能在他自己的网站构造请求，当用户通过黑客的网站发送请求到银行时，该请求的 Referer 是指向黑客自己的网站。因此，要防御 CSRF 攻击，银行网站只需要对于每一个转账请求验证其 Referer 值，如果是以 bank.example 开头的域名，则说明该请求是来自银行网站自己的请求，是合法的。如果 Referer 是其他网站的话，则有可能是黑客的 CSRF 攻击，拒绝该请求。   
    这种方法的显而易见的好处就是简单易行，网站的普通开发人员不需要操心 CSRF 的漏洞，只需要在最后给所有安全敏感的请求统一增加一个拦截器来检查 Referer 的值就可以。特别是对于当前现有的系统，不需要改变当前系统的任何已有代码和逻辑，没有风险，非常便捷。  
    然而，这种方法并非万无一失。Referer 的值是由浏览器提供的，虽然 HTTP 协议上有明确的要求，但是每个浏览器对于 Referer 的具体实现可能有差别，并不能保证浏览器自身没有安全漏洞。使用验证 Referer 值的方法，就是把安全性都依赖于第三方（即浏览器）来保障，从理论上来讲，这样并不安全。事实上，对于某些浏览器，比如 IE6 或 FF2，目前已经有一些方法可以篡改 Referer 值。如果 bank.example 网站支持 IE6 浏览器，黑客完全可以把用户浏览器的 Referer 值设为以 bank.example 域名开头的地址，这样就可以通过验证，从而进行 CSRF 攻击。  
    即便是使用最新的浏览器，黑客无法篡改 Referer 值，这种方法仍然有问题。因为 Referer 值会记录下用户的访问来源，有些用户认为这样会侵犯到他们自己的隐私权，特别是有些组织担心 Referer 值会把组织内网中的某些信息泄露到外网中。因此，用户自己可以设置浏览器使其在发送请求时不再提供 Referer。当他们正常访问银行网站时，网站会因为请求没有 Referer 值而认为是 CSRF 攻击，拒绝合法用户的访问。  
    - 在请求地址中添加 token 并验证  
    CSRF 攻击之所以能够成功，是因为黑客可以完全伪造用户的请求，该请求中所有的用户验证信息都是存在于 cookie 中，因此黑客可以在不知道这些验证信息的情况下直接利用用户自己的 cookie 来通过安全验证。要抵御 CSRF，关键在于在请求中放入黑客所不能伪造的信息，并且该信息不存在于 cookie 之中。可以在 HTTP 请求中以参数的形式加入一个随机产生的 token，并在服务器端建立一个拦截器来验证这个 token，如果请求中没有 token 或者 token 内容不正确，则认为可能是 CSRF 攻击而拒绝该请求。  
    这种方法要比检查 Referer 要安全一些，token 可以在用户登陆后产生并放于 session 之中，然后在每次请求时把 token 从 session 中拿出，与请求中的 token 进行比对，但这种方法的难点在于如何把 token 以参数的形式加入请求。对于 GET 请求，token 将附在请求地址之后，这样 URL 就变成 http://url?csrftoken=tokenvalue。 而对于 POST 请求来说，要在 form 的最后加上 &lt;input type=”hidden” name=”csrftoken” value=”tokenvalue”/&gt;，这样就把 token 以参数的形式加入请求了。但是，在一个网站中，可以接受请求的地方非常多，要对于每一个请求都加上 token 是很麻烦的，并且很容易漏掉，通常使用的方法就是在每次页面加载时，使用 javascript 遍历整个 dom 树，对于 dom 中所有的 a 和 form 标签后加入 token。这样可以解决大部分的请求，但是对于在页面加载之后动态生成的 html 代码，这种方法就没有作用，还需要程序员在编码时手动添加 token。   
    该方法还有一个缺点是难以保证 token 本身的安全。特别是在一些论坛之类支持用户自己发表内容的网站，黑客可以在上面发布自己个人网站的地址。由于系统也会在这个地址后面加上 token，黑客可以在自己的网站上得到这个 token，并马上就可以发动 CSRF 攻击。为了避免这一点，系统可以在添加 token 的时候增加一个判断，如果这个链接是链到自己本站的，就在后面添加 token，如果是通向外网则不加。不过，即使这个 csrftoken 不以参数的形式附加在请求之中，黑客的网站也同样可以通过 Referer 来得到这个 token 值以发动 CSRF 攻击。这也是一些用户喜欢手动关闭浏览器 Referer 功能的原因。  
    - 在 HTTP 头中自定义属性并验证  
    这种方法也是使用 token 并进行验证，和上一种方法不同的是，这里并不是把 token 以参数的形式置于 HTTP 请求之中，而是把它放到 HTTP 头中自定义的属性里。通过 XMLHttpRequest 这个类，可以一次性给所有该类请求加上 csrftoken 这个 HTTP 头属性，并把 token 值放入其中。这样解决了上种方法在请求中加入 token 的不便，同时，通过 XMLHttpRequest 请求的地址不会被记录到浏览器的地址栏，也不用担心 token 会透过 Referer 泄露到其他网站中去。  
    然而这种方法的局限性非常大。XMLHttpRequest 请求通常用于 Ajax 方法中对于页面局部的异步刷新，并非所有的请求都适合用这个类来发起，而且通过该类请求得到的页面不能被浏览器所记录下，从而进行前进，后退，刷新，收藏等操作，给用户带来不便。另外，对于没有进行 CSRF 防护的遗留系统来说，要采用这种方法来进行防护，要把所有请求都改为 XMLHttpRequest 请求，这样几乎是要重写整个网站，这代价无疑是不能接受的。    
------  
------  
## CORS  
    当一个资源从与该资源本身所在的服务器不同的域、协议或端口请求一个资源时，资源会发起一个跨域 HTTP 请求。   
    跨域资源共享标准新增了一组 HTTP 首部字段，允许服务器声明哪些源站通过浏览器有权限访问哪些资源。另外，规范要求，对那些可能对服务器数据产生副作用的 HTTP 请求方法（特别是 GET 以外的 HTTP 请求，或者搭配某些 MIME 类型的 POST 请求），浏览器必须首先使用 OPTIONS 方法发起一个预检请求（preflight request），从而获知服务端是否允许该跨域请求。服务器确认允许之后，才发起实际的 HTTP 请求。在预检请求的返回中，服务器端也可以通知客户端，是否需要携带身份凭证（包括 Cookies 和 HTTP 认证相关数据）。   
- 简单请求  
    某些请求不会触发 CORS 预检请求。该术语并不属于 Fetch （其中定义了 CORS）规范。若请求满足所有下述条件，则该请求可视为“简单请求”：
    - 使用下列方法之一：   
        - GET  
        - HEAD   
        - POST  
    - Fetch 规范定义了对 CORS 安全的首部字段集合，不得人为设置该集合之外的其他首部字段。该集合为：   
        - [Accept](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Accept)   
        - [Accept-Language](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Accept-Language)  
        - [Content-Language](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Language)  
        - [Content-Type](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Type)  
            - application/x-www-form-urlencoded  
            - multipart/form-data  
            - text/plain  
        - DPR   
        - Downlink  
        - Save-Data  
        - Viewport-Width  
        - Width  
        - 请求中的任意XMLHttpRequestUpload 对象均没有注册任何事件监听器；XMLHttpRequestUpload 对象可以使用 XMLHttpRequest.upload 属性访问。  
        - 请求中没有使用 [ReadableStream](https://developer.mozilla.org/zh-CN/docs/Web/API/ReadableStream) 对象。    
- HTTP 响应首部字段  
    - Access-Control-Allow-Origin   
    ```
    Access-Control-Allow-Origin: <origin> | *  
    // origin 参数的值指定了允许访问该资源的外域 URI。对于不需要携带身份凭证的请求，服务器可以指定该字段的值为通配符，表示允许来自所有域的请求。  
    // 如果服务端指定了具体的域名而非“*”，那么响应首部中的 Vary 字段的值必须包含 Origin。这将告诉客户端：服务器对不同的源站返回不同的内容。
    ```
    - Access-Control-Expose-Headers   
    ```
    Access-Control-Expose-Headers: X-My-Custom-Header, X-Another-Custom-Header  
    // 在跨域访问时，XMLHttpRequest对象的getResponseHeader()方法只能拿到一些最基本的响应头，Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma，如果要访问其他头，则需要服务器设置本响应头。  
    ```
    - Access-Control-Max-Age   
    ```
    Access-Control-Max-Age: <delta-seconds>  
    // Access-Control-Max-Age 头指定了preflight请求的结果能够被缓存多久  
    // delta-seconds 参数表示preflight请求的结果在多少秒内有效。  
    ```
    - Access-Control-Allow-Credentials  
    ```
    Access-Control-Allow-Credentials: true  
    // Access-Control-Allow-Credentials 头指定了当浏览器的credentials设置为true时是否允许浏览器读取response的内容。当用在对preflight预检测请求的响应中时，它指定了实际的请求是否可以使用credentials。请注意：简单 GET 请求不会被预检；如果对此类请求的响应中不包含该字段，这个响应将被忽略掉，并且浏览器也不会将相应内容返回给网页。  
    ```
    - Access-Control-Allow-Methods  
    ```
    Access-Control-Allow-Methods: <method>[, <method>]*  
    // Access-Control-Allow-Methods 首部字段用于预检请求的响应。其指明了实际请求所允许使用的 HTTP 方法。
    ```
    - Access-Control-Allow-Headers  
    ```
    Access-Control-Allow-Headers: <field-name>[, <field-name>]*  
    // Access-Control-Allow-Headers 首部字段用于预检请求的响应。其指明了实际请求中允许携带的首部字段。  
    ```  
    [详细](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)  