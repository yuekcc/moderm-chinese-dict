# 汉语词典

自用的汉语词典。词语数据源自《现代汉语词典》。功能特性：

- 支持长句子查询，会自动进行分词（尽可能多的模式）
- 支持按部首查找汉字
- 支持按拼音查找汉字
- 支持朗读（需要 chrome 新版本）

![screenshot](screenshot.png)

## 声明

此资源仅供学习和交流，禁止商用，请务必于下载试用后 24 小时内删除。数据源自多个开源项目。毕竟是非官方的数据源，会存在数据错误。如有疑问或不同意见，请以你为准。若使用了本项目的代码或内置的源自其他开源项目的数据而产生问题或纠纷，概不负责。

## 感谢

本应用使用了多个开源软件作为数据源：

- [theajack/cnchar](https://github.com/theajack/cnchar) 偏旁部首数据
- [bamboo512/ModernChineseDict](https://github.com/bamboo512/ModernChineseDict) 词典数据
- [jaywcjlove/table-of-general-standard-chinese-characters](https://github.com/jaywcjlove/table-of-general-standard-chinese-characters) 拼音数据

## 构建

环境要求：node v16、pnpm v7、rust 1.63、cargo 1.63。构建过程请见 `build.sh`。

## 部署

构建成功后，会创建 `mcd_install` 目录，启动 `mcd_install` 目录下的 `modern_chinese_dict` 即可启动后台服务，默认只监听 `127.0.0.1:10088`。通过 `.env` 文件可以配置 `dict.db` 的目录。

# 协议

代码部分采用 MIT；数据，包括但不限于 JSON 格式数据、sqlite 数据库等格式的数据，按原作者许可。
