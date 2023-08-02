## Social.

[项目地址](https://github.com/Yuanmingyangymy/socialM.git)

[TOC]

### 项目技术栈：

**react18, scss, nodejs, mysql**

---

**功能实现：**

- 暗夜模式

- LeftBar: 分类栏（具体暂时不准备去写）

- 中间：

  “故事”：类似于朋友圈

  发帖子（我和我的朋友，都会在页面中间展示）：点赞，评论，分享功能

  可以点击展示**个人信息页面**（“我”：可更新个人信息；好友则是关注or not）

- RightBar: **好友请求|** **时间线|** **在线好友显示**

- 需要附加的功能：**私信，群组聊天**





7.20:

写好了登录注册页面的UI和Home页面的导航栏部分

7.21:

暗夜模式切换🆗

7.22：

理清用到的context逻辑

7.24：

页面UI基本完成

## 后台（nodejs & MySql）



`npm i  express mysql nodemon`

`npm init -y`

修改了package.json文件中的命令

"start": "nodemon index.js"

入口文件是：index.js

routes文件夹：各个路由

- user.js：用户信息
- posts.js：帖子相关
- lieks.js：点赞
- comments.js：评论功能
- auth.js：登录注册，登出

controllers文件夹：routes文件夹中相关的处理函数写在此文件夹中

connection.js：连接数据库





### 登录注册

加密密码：`npm i bcryptjs`

**测试请求是否有效可以用postman或者insomnia**

#### 常用的 HTTP 状态码及其用法

- 200 OK：请求成功。例如：res.status(200).send('请求成功！')
- 201 Created：请求已经被成功处理，并创建了一个新的资源。例如：res.status(201).send('资源创建成功！')
- 400 Bad Request：请求无效或不合法。例如：res.status(400).send('请求无效，请检查参数！')
- 401 Unauthorized：请求需要用户身份验证。例如：res.status(401).send('请先登录！')
- 403 Forbidden：服务器拒绝了请求。例如：res.status(403).send('无权访问该资源！')
- 404 Not Found：请求的资源不存在。例如：res.status(404).send('请求的资源不存在！')
- 500 Internal Server Error：服务器出现了错误。例如：res.status(500).send('服务器出现了错误，请稍后重试！')

> 这些状态码可以与 res.status() 方法一起使用，以设置 HTTP 响应的状态码。在设置状态码后，可以使用 res.send() 方法或其他响应方法来发送响应体。

#### res.send()和res.json()

> res.json() 和 res.send() 都是 Express 响应对象的方法，用于向客户端发送 HTTP 响应。它们的主要区别在于发送的响应体的格式。
>
> res.send() 方法可以发送任何类型的响应体，包括字符串、数字、布尔值、对象、数组等。它会自动检测响应体的类型，并将其转换成合适的格式。例如，如果响应体是一个对象，它会将其转换成 JSON 格式的字符串。如果响应体是一个 Buffer，则会将其作为二进制数据发送。
>
> res.json() 方法专门用于发送 JSON 格式的响应体。它会将 JavaScript 对象转换成 JSON 格式的字符串，并将其作为响应体发送。
>
> 因此，res.json() 包含了 res.send() 的功能，但是它只能发送 JSON 格式的响应体。如果需要发送其他类型的响应体，则需要使用 res.send() 方法。

**其他几种res**

- res.status(code)：设置HTTP响应的状态码。例如，res.status(200)将设置HTTP响应状态码为200。
- res.cookie(name, value, [options])：向客户端发送一个新的Cookie。可以使用name和value参数指定Cookie的名称和值，并使用options参数指定Cookie的选项，例如过期时间、域名等。
- res.redirect([status,] path)：重定向客户端到另一个URL。可以使用可选的状态码和路径参数指定重定向的目标URL。例如，res.redirect('/login')将重定向客户端到"/login"路径。
- res.render(view [, locals][, callback])：使用指定的模板引擎渲染视图，并将渲染后的HTML发送到客户端。可以使用locals参数传递给模板引擎的变量。例如，res.render('index', { title: 'Home' })将使用模板引擎渲染名为"index"的视图，并将"title"变量设置为"Home"。



#### 常用的几种网络请求

- GET请求：GET请求是最常见的请求类型。它用于从服务器检索数据。当您在浏览器中输入URL时，实际上是发起了一个GET请求。

- POST请求：POST请求用于向服务器发送数据。当您在Web应用程序中提交表单时，通常会使用POST请求将表单数据发送到服务器。

- PUT请求：PUT请求用于更新服务器上的现有资源。如果您需要更新服务器上的某个资源，可以使用PUT请求。

- DELETE请求：DELETE请求用于删除服务器上的资源。如果您需要删除服务器上的某个资源，可以使用DELETE请求。

- PATCH请求：PATCH请求用于部分更新服务器上的现有资源。如果您只需要更新资源的一部分内容，可以使用PATCH请求。




### 跨域，JWT

`npm i jsonwebtoken cookie-parser cors`

**app.use(cors())**是一个Express中间件函数，用于解决跨域资源共享（CORS）问题。CORS是一种安全机制，浏览器使用它来限制从一个源加载的资源能够与来自其他源的资源进行交互。

**app.use(cookieParser)**是一个Express中间件函数，用于解析HTTP请求中的Cookie。当客户端向服务器发送HTTP请求时，可以在请求头中包含Cookie信息，以便服务器可以识别客户端并跟踪其状态。

在Express应用程序中使用cookie-parser中间件，可以将Cookie信息解析为JavaScript对象，并将其添加到请求对象（req）中的cookies属性中。这使得在处理请求时可以轻松地访问Cookie值。

### ==使用jwt是很重要的知识点==

通过使用jwt,可以得到一个cookie，该项目中设置为accessToken，这是一个加密了的字符串，在项目中对其解密即可得到用户id，有了id，才可以进行，删除帖子，点赞，关注用户等操作。





## 交互

### 登录

```ts
const login =async (inputs:any) => {
        const res: any = axios.post("http://localhost:8800/api/auth/login", inputs, {
            withCredentials: true,
        })

        setCurrentUser(res.data)
    }
```

authContext.tsx中，`withCredentials`设为true

- withCredentials是一个XMLHttpRequest（XHR）对象的属性，它指示是否应该在跨域请求中发送凭据（例如，cookie、HTTP认证或客户端SSL证书）。

  当设置withCredentials为true时，XHR对象将在请求头中包含凭据信息，这使得服务器可以识别用户的身份并授予相应的权限。如果withCredentials设置为false（默认值），则不会在请求头中包含凭据信息，这意味着服务器将无法识别用户的身份。

此外，还要在后台入口文件配置相关中间件，设置请求头

### React Query

`npm i @tanstack/react-query `(客户端client)

[react query 文档](https://tanstack.com/query/latest/docs/react/overview)

在项目中使用时遇到问题：mutation.mutate()一直报错，我需要传参数，但是错误提示：不能将XXX传给返回值为void的函数。但是官方文档是传了参数的。只好作罢。

使用这个主要是希望用其方便快捷的实现局部刷新（比如：点赞，评论等等）。有个替代方法：参考之前做的后台管理系统，表单提交之后再发送一次获取数据的请求（组件挂在时发送的那个 ），感觉可行。



### 帖子部分

身份认证是必要的，无论是看还是发帖子，后端在操作之前都要核实用户身份`jsonwebtoken`，之前在cookie中存入过accessToken

1. 登录的用户进入主页首先就会看到自己发过的，以及关注的人的帖子（应按时间顺序排列）
2. 发帖子：前后端都要安装一个包`moment`，用于date;后台安装`multer`，用于上传图片

本来想用react query的方法来实现页面局部刷新，但是类型判断一直有问题，没有用。（参考上述👆方法）



**点赞，评论基本主要问题就是局部刷新**

还有一点：**删除操作**！，delete请求用着不得劲。还是得post。



## 总结

写UI页面时一定要考虑到多数据的问题，这样帮页面的排版布局做好了，后边前后端交互要舒服很多。



## 遇到的问题

**局部刷新**（发帖，点赞，评论，更新个人信息……）:useState + useEffect解决

**数据库操作（不重复存储，删除）**

**TS没写熟，类型判断不熟练**

**nodejs中想使用esmodule语法，需要在package.json文件中"main"下方添加"type": "module"**







