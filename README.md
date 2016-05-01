# koa2-startkit

一个 Koa2 的脚手架

可以直接在项目里使用 ES6/7（Generator Function, Class, Async & Await）等特性，借助 Babel 编译，可稳定运行在 Node.js 环境上。

[开发模式] 集成 nodemon，开发模式下，文件修改后自动重启 Node.js 服务。
[部署模式] 将 ES2015 代码预编译成 ES5, 提高运行效率, 借助 pm2 使用 cluster 模式压榨多核 CPU 性能 

## Tech Stack

- Koa 2
- nodemon 
- babel6
- express-style middlewares
  - koa-router
  - koa-views
  - koa-static
  - koa-bodyparser
- PM2

## Getting Start

```
git clone https://github.com/17koa/koa2-startkit.git
cd koa2-startkit
npm install
npm start
```

open in browser

http://127.0.0.1:3000/ 

## 目录说明

```bash
.
├── LICENSE
├── README.md
├── app                    // babel outDir
│   ├── ...
├── bin
│   ├── _base.js
│   ├── development.js     // 开发模式下项目的入口文件
│   └── production.js      // 线上入口文件, 请预先使用 npm run compile 编译
├── package.json
├── pm2.json               // 用于 pm2 部署
├── nginx.conf             // nginx 的配置文件，建议线上使用 nginx 做反向代理。 
├── public                 // 静态资源路径
│   └── stylesheets
├── src                    // 源代码目录，编译时会自动将 src 目录下的文件编译到 app 目录下。
                           // src 下的目录结构可以自行组织, 不统一
│   ├── app.js             // koa app.js
│   ├── controllers        // 控制器
│   ├── main.js            // 入口文件
│   ├── models             // 模型
│   ├── routes             // 路由
│   ├── services           // service
│   └── test               // 测试
└── views                  // 视图目录，存放对应的模版文件。
    ├── error.ejs
    └── index.ejs

13 directories, 20 files
```



## 开发模式

一句话: 

```
npm start
```

 项目源代码目录位于 /src, 开启开发模式之后对于 src 目录内的改动会自动生效 (nodemon).



## 线上部署

```bash
npm run compile #编译 ES6/7 代码至 ES5
npm test #mocha
vim pm2.json #检查 pm2 的配置
pm2 start pm2.json #请确保已经 global 安装 pm2    (npm i pm2-cli -g)
```

