## Social.

[项目地址](https://github.com/Yuanmingyangymy/socialM.git)

[TOC]

### 项目技术栈：

**React18, sass, Nodejs, Mysql**

---

**功能实现：**

- 暗夜模式


  “故事”：类似于朋友圈

  发帖子（我和我的朋友，都会在页面中间展示）：点赞，评论，分享功能

  可以点击展示**个人信息页面**（“我”：可更新个人信息；好友则是关注or not）





## 前端特点

- 使用 React 框架和 TypeScript 进行开发，提高代码的可维护性和可读性。
- 使用 Ant Design 组件库美化界面，提供现代化的用户界面和交互体验。
- 通过 React Router 实现页面之间的导航和路由管理，实现单页面应用的特性。
- 使用 Axios 库进行网络请求，与后端 API 进行数据交互。
- 使用 Context API 实现状态管理，便于在不同组件之间共享数据。
- 利用 useEffect 和 useState 等 React 钩子函数处理异步操作和状态管理。

## 后端特点

- 使用 Node.js 和 Express 框架搭建后端服务，提供 RESTful API 接口。
- 使用 MySQL 数据库存储用户数据和帖子数据，通过 Sequelize ORM 进行数据模型的定义和操作。
- 使用 JWT（JSON Web Token）进行用户身份认证，保护敏感数据的安全性。
- 使用 Cookie 存储用户登录状态，实现持久化登录功能。
- 实现帖子的增删改查功能，让用户可以方便地发布、编辑和删除帖子。
- 实现用户关注功能，让用户可以关注其他用户，查看关注用户的最新帖子。

## 主要功能

- 用户注册和登录：用户可以通过注册新账号或登录已有账号来使用应用。
- 发布和管理帖子：用户可以发布新的帖子，并查看、编辑和删除自己发布的帖子。
- 查看帖子：用户可以在主页上浏览所有用户的帖子，并在个人信息页面查看自己的帖子和关注的用户的帖子。
- 关注其他用户：用户可以关注其他用户，查看关注用户的最新帖子。
- 搜索用户：用户可以通过搜索功能查找其他用户的个人信息。


## 后台（nodejs & MySql）


`npm i  express mysql nodemon`

`npm init -y`

修改了package.json文件中的命令

"start": "nodemon index.js"

nodejs中想使用esmodule语法，需要在package.json文件中"main"下方添加"type": "module"

入口文件是：index.js

routes文件夹：各个路由

- user.js：用户信息
- posts.js：帖子相关
- lieks.js：点赞
- comments.js：评论功能
- auth.js：登录注册，登出
- relationship.js：关注关系
- search.js：搜索

controllers文件夹：routes文件夹中相关的处理函数写在此文件夹中

connection.js：连接数据库





### 登录注册

加密密码：`npm i bcryptjs`


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



### 帖子部分

身份认证是必要的，无论是看还是发帖子，后端在操作之前都要核实用户身份`jsonwebtoken`，之前在cookie中存入过accessToken

1. 登录的用户进入主页首先就会看到自己发过的，以及关注的人的帖子（应按时间顺序排列）
2. 发帖子：前后端都要安装一个包`moment`，用于date;后台安装`multer`，用于上传图片

本来想用react query的方法来实现页面局部刷新，但是类型判断一直有问题，没有用。（参考上述👆方法）



**点赞，评论基本主要问题就是局部刷新**

还有一点：**删除操作**！，delete请求用着不得劲。还是得post。

## 遇到的问题

**局部刷新**（发帖，点赞，评论，更新个人信息……）:useState + useEffect解决

**数据库操作（不重复存储，删除）**

**TS没写熟，类型判断不熟练**

**新用户发了帖子，都是默认头像，更新头像之后，原来发的帖子还是默认头像**：解决：使用了mysql中的trigger，使得users的头像更新时，posts中对应用户的头像也改变

**首页获取帖子数据时，登录用户的帖子获取了两遍，其他的正常**？(修改了nodejs中post.js部分的代码，浅测一下，应该是解决了吧)

- 

## 总结

该 React 社交媒体应用项目结合了现代化的前端技术和后端服务，实现了一个简单而实用的社交平台。用户可以方便地发布自己的帖子，关注其他用户的动态，并通过搜索功能查找感兴趣的用户。












