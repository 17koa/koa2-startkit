#### 2016年06月28日

- 重写 readme

#### 2016年06月03日

- 增加热替换 (HMR), 对 `controller` 的修改保存即生效, 不需要重启进程
- `src` 目录下的删除, 新建文件等操作能够监听了, fix #4
- 更新 README

#### 2016年05月06日

- 更新 README

#### 2016年05月04日

- 优化 development 模式下的热启动体验, 自动编译变化的单文件
- 从 `babel-preset-es2015-node5` 切换到 `babel-preset-es2015`

#### 2016年05月03日

- 静态文件路径使用`/static/*`来做统一入口, 更新 nginx.conf 配置, 对静态资源线上环境使用 nginx代理 + etag/expires 指令.
- 修改目录结构, test 目录挪到根目录下, 依然可以使用 ES6 书写测试用例.