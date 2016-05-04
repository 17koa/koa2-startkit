# koa2-startkit
[![Build Status](https://travis-ci.org/17koa/koa2-startkit.svg?branch=master)](https://travis-ci.org/17koa/koa2-startkit)  
一个 Koa2 的脚手架

可以直接在项目里使用 ES6/7（Generator Function, Class, Async & Await）等特性，借助 Babel 编译，可稳定运行在 Node.js 环境上。

[开发模式] 集成 nodemon，开发模式下，文件修改后自动重启 Node.js 服务。  
[线上模式] 将 ES2015 代码预编译成 ES5, 提高运行效率, 借助 pm2 使用 cluster 模式压榨多核 CPU 性能 

## 更新说明

#### 2016年05月03日

- 静态文件路径使用`/static/*`来做统一入口, 更新 nginx.conf 配置, 对静态资源线上环境使用 nginx代理 + etag/expires 指令.
- 修改目录结构, test 目录挪到根目录下, 依然可以使用 ES6 书写测试用例.

#### 2016年05月04日

- 优化 development 模式下的热启动体验, 自动编译变化的单文件
- 从 `babel-preset-es2015-node5` 切换到 `babel-preset-es2015`
- TODO: 断点调试, 不重启源码替换

## Tech Stack

- Koa 2
- nodemon 
- babel6
- express-style middlewares
  - koa-router
  - koa-views
  - [koa-static-plus](https://github.com/wssgcg1213/koa-static-plus)
  - koa-bodyparser
- PM2

## Getting Start

```
git clone https://github.com/17koa/koa2-startkit.git
cd koa2-startkit
npm install # 国内可以使用 cnpm 加速, 教育网可使用 rednpm (http://npm.mirror.cqupt.edu.cn)加速
npm start
```

open in browser

http://127.0.0.1:3000/ 

## 目录说明

```bash
.
├── LICENSE
├── README.md
├── app                     # babel outDir
│   ├── *
├── bin
│   ├── _base.js
│   ├── development.js      # 开发模式下项目的入口文件
│   └── production.js       # 线上入口文件, 请预先使用 npm run compile 编译
├── nginx.conf              # nginx 的配置文件，建议线上使用 nginx 做反向代理。 
├── package.json            # package.json
├── pm2.json                # 用于 pm2 部署
├── public                  # 静态资源路径
│   ├── favicon.ico
│   ├── robots.txt
│   └── static
├── src                     # 源代码目录，编译时会自动将 src 目录下的文件编译到 app 目录下。src 下的目录结构可以自行组织, 但是必须是 babel 可接受的类型(js, json, etc...)。
│   ├── app.js              # koa 配置
│   ├── config              # 配置目录
│   ├── controllers         # 控制器
│   ├── index.js            # 入口文件
│   ├── models              # 模型
│   ├── routes              # 路由
│   └── services            # service
├── test                    # 测试目录现在在项目根目录下
│   └── test.js
└── views                   # 视图(前端模板)
    ├── error.ejs
    └── index.ejs
```

## npm scripts

```bash
$ npm start # 开发模式
$ npm run build # build
$ npm test # 单元测试
$ npm run compile # 编译
```

## 开发模式

启动: 

```
npm start
```

 项目源代码目录位于 /src, 开启开发模式之后对于 src 目录内的任何改动会自动重启 node 进程 (nodemon).

## 配置文件的 trick

引用配置的方式: 

```javascript
import config from './config'
```

默认配置文件位于 `src/config/default.js`, 建议只在这里创建配置字段, 在同目录下创建另一个 `custom.js`, 这个配置会覆盖(override) 默认配置, 且此文件不会被包含在 git 中, 避免密码泄露, 线上配置等问题.

## 断点调试

todo

## 线上部署

```bash
npm run build # 单测, 编译 ES6/7 代码至 ES5
vim pm2.json # 检查 pm2 的配置
pm2 start pm2.json # 请确保已经 global 安装 pm2    (npm i pm2-cli -g)
cp nginx.conf /etc/nginx/conf.d/YourProject.conf # 自行配置 nginx 反代
```

## 第三方模块推荐

### 基础库

- lodash

### 网络请求

- request-promise
- superagent

### 数据库

- sequelize
- mongoose

### Dom 解析

- cheerio
- jsdom

### template

- handerbars
- nunjunks

### 编码(GBK - Unicode(UTF-*))

- iconv-lite

### 时间/日期

- moment

### websocket

- socket.io

### crontab

- node-schedule

### 测试相关

- mocha
- karma
- should
- chai.js
- istanbul

### 部署

- pm2



## Contact

[issues](issues)

[@Ling](https://github.com/wssgcg1213)    