![shirosaki-onebot](https://socialify.git.ci/Ceale/shirosaki-onebot/image?description=1&descriptionEditable=%E6%9E%81%E7%AE%80OneBot%20v11%E6%A1%86%E6%9E%B6&font=KoHo&forks=1&issues=1&language=1&logo=https%3A%2F%2Fraw.githubusercontent.com%2FCeale%2Fshirosaki-onebot%2Frefs%2Fheads%2Fmain%2Ficon.png&name=1&owner=1&pattern=Diagonal%20Stripes&pulls=1&stargazers=1&theme=Light&)

>[!IMPORTANT] 
>框架正处于起步阶段，使用方式变化较快，而readme暂未同步更改。
>
>在当前阶段使用可能需要您自行查阅源码。

# Shirosaki OneBot
名称来源于白咲花（しろさき はな/Shirosaki Hana），她是我很喜欢的一个角色

基于Nodejs和ws(npm包)的极简OneBot v11框架(?)，使用前须安装ws包（npm i ws）

虽说叫框架，但实际上也只是对ws对象的简单封装

### 使用方法
```
import Logger from "./log.js"
import Bot from "./bot.js"
```
其中log.js是可选的，不一定要导入，但也须放在bot.js同目录下，因为bot.js导入了log.js

`new Bot("ws://host:port/")`创建Bot对象，地址为正向ws连接地址

`Bot.on(event, data => callback)`监听事件，`event`是事件类型字符串，`data`是事件数据，格式与对应OneBot事件数据相同，事件有下列六种：

- `connect`：连接上bot时，等同于[元事件](https://github.com/botuniverse/onebot-11/blob/master/event/meta.md) `meta_event_type: lifecycle, sub_type: connect` 的情况
- `enable`：bot启用时，等同于[元事件](https://github.com/botuniverse/onebot-11/blob/master/event/meta.md) `meta_event_type: lifecycle, sub_type: enable` 的情况
- `disable`：bot禁用时，等同于[元事件](https://github.com/botuniverse/onebot-11/blob/master/event/meta.md) `meta_event_type: lifecycle, sub_type: disable` 的情况
- `message`：等同于[消息事件](https://github.com/botuniverse/onebot-11/blob/master/event/message.md)
- `notice`：等同于[通知事件](https://github.com/botuniverse/onebot-11/blob/master/event/notice.md)
- `request`：等同于[请求事件](https://github.com/botuniverse/onebot-11/blob/master/event/request.md)

`Bot.send(action, params)`是调用api，`action`是api名称字符串，`params`是api所需参数，格式同[公开 API](https://github.com/botuniverse/onebot-11/blob/master/api/public.md)。
该方法返回一个Promise，在调用api成功时会返回调用结果的`data`字段

### 其他
项目icon修改自[萌娘百科](https://mzh.moegirl.org.cn/File:Nav-wataten3.png)，非商用引用，版权属于原作者。
