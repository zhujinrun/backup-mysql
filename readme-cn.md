# AWS RDS MySQL 自动备份工具

AWS RDS自带了备份功能，只需要在数据库初始化阶段打开即可。
Additional Configuration -> Backup

## 有两个不方便的点

1. AWS RDS的备份文件没有提供下载选项，不能还原到本地数据库。
2. 另外，如果是自己maintain的mysql数据库实例，有时候也需要做定期备份。

这里介绍一个使用serverless部署lambda，利用**CloudWatch schedule**定期备份mysql数据库到S3的解决方案：

![backup-mysql-arch](https://img2020.cnblogs.com/blog/781529/202101/781529-20210121090150092-1350188474.png)

## 源码

[源码地址](https://github.com/neoxie/backup-mysql)

## 涉及的技术

- [serverless](https://serverless.com)
  我一般用serverless framework部署lambda，它同时会生成lambda的依赖性，例如S3 Bucket, IAM Policy和CloudWatch的schedule
- [CloudFormation](https://aws.amazon.com/cloudformation/)
  serverless部署到AWS，本质上，在后台是翻译成CloudFormation支持的语法，最终部署到AWS上。在写serverless脚本的时候，特别是写resources节点的时候，如果不知道怎么写，可以参考CloudFormation的文档
- [typescript](https://www.typescriptlang.org/)
  现在比较习惯用typescript写nodejs代码，因为可维护性比较强；同时我选择的lambda运行时是node.js, 在部署的时候需要将typescript translate to JavaScript
- [mysqldump](https://dev.mysql.com/doc/refman/5.7/en/backup-methods.html)
  mysql官方给的备份工具就是mysqldump, 在这里我找到一个nodejs的实现[npm包](https://www.npmjs.com/package/mysqldump)
