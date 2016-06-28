# koa2-startkit
[![Build Status](https://travis-ci.org/17koa/koa2-startkit.svg?branch=master)](https://travis-ci.org/17koa/koa2-startkit)  
一个 Koa2 的脚手架

可以直接在项目里使用 ES6/7（Generator Function, Class, Async & Await）等特性，借助 Babel 编译，可稳定运行在 Node.js 环境上。

[开发模式] 开发模式下，文件修改后~~自动重启 Node.js~~ 自动热重启服务。       

[调试模式] 断点调试 (test feature)

[线上模式] 借助 pm2 使用 cluster 模式压榨多核 CPU 性能 

## Getting Start

```
git clone https://github.com/17koa/koa2-startkit.git
cd koa2-startkit
npm install # 国内可以使用 cnpm 加速, 教育网可使用 rednpm (https://npm.mirror.cqupt.edu.cn) 加速
npm start
```

然后使用浏览器打开 http://127.0.0.1:3000/ 即可

## Npm scripts

```bash
$ npm start # 开发模式, 开启开发模式之后对于 /src 目录内的任何改动会自动热替换生效
$ npm run build # build
$ npm test # 单元测试
$ npm run compile # 编译
$ npm run production # 生产模式
```



## 线上部署

```bash
npm run build # 单测, 编译 ES6/7 代码至 ES5
vim pm2.json # 检查 pm2 的配置
pm2 start pm2.json # 请确保已经 global 安装 pm2    (npm i pm2-cli -g)
cp nginx.conf /etc/nginx/conf.d/YourProject.conf # 自行配置 nginx 反代
```



## 配置文件的 trick

引用配置的方式: 

```javascript
import config from './config'
```

默认配置文件位于 `src/config/default.js`, 建议只在这里创建配置字段, 在同目录下创建另一个 `custom.js`, 这个配置会覆盖(override) 默认配置, 且此文件不会被包含在 git 中, 避免密码泄露, 线上配置等问题.



## 断点调试

[测试功能]

```bash
$ npm run debug
```

在 VSCode 编辑器中: 

![1](https://dn-redrock.qbox.me/github/koa-1.png)

1. 选择DEBUG图标
2. 点击绿色三角, 环境选择 Node.js
3. 把program改成 ${workspaceRoot}/bin/debug.js, 把sourceMaps设为true
4. ![2](https://dn-redrock.qbox.me/github/koa-2.png)
5. 再次点击绿色三角启动debug
6. 进入 app/ 目录下找到对应的文件(!!注意是app目录), 在需要的地方打上断点(这里的代码是babel编译后的, 很难看懂啊, 但是在 node 支持 async, import 之前, 只能采用这种方法)
7. ![3](https://dn-redrock.qbox.me/github/koa-3.png)
8. 访问对应页面, vscode应该会弹出到断点处, 这个时候应该显示的就是 ES6/7 代码了
9. ![4](https://dn-redrock.qbox.me/github/koa-4.png)
10. 左侧的调试窗口已经可以正常使用了
11. ![5](https://dn-redrock.qbox.me/github/koa-5.png)




## 目录结构说明

```bash
.
├── LICENSE
├── README.md
├── app                     # babel outDir
│   ├── *
├── bin
│   ├── debug.js
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


## Contact

[issues](https://github.com/17koa/koa2-startkit/issues)

[@Ling](https://github.com/wssgcg1213)    