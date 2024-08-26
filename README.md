# shirosaki-bot-framework
名称来源于白咲花（しろさき はな/Shirosaki Hana），她是我很喜欢的一个角色

基于Nodejs和ws(npm包)的极简OneBot v11框架(?)，使用前须安装ws包（npm i ws）

### 使用方法
`new Bot("ws://host:port/")`创建Bot对象，为正向ws连接

`Bot.on(event, data => callback)`监听事件，`event`是事件类型字符串，`data`是事件数据，格式与对应OneBot事件数据相同，事件有下列六种：

- `connect`：连接上bot时，等同于[元事件](https://github.com/botuniverse/onebot-11/blob/master/event/meta.md) `meta_event_type: lifecycle, sub_type: connect` 的情况
- `enable`：bot启用时，等同于[元事件](https://github.com/botuniverse/onebot-11/blob/master/event/meta.md) `meta_event_type: lifecycle, sub_type: enable` 的情况
- `disable`：bot禁用时，等同于[元事件](https://github.com/botuniverse/onebot-11/blob/master/event/meta.md) `meta_event_type: lifecycle, sub_type: disable` 的情况
- `message`：等同于[消息事件](https://github.com/botuniverse/onebot-11/blob/master/event/message.md)
- `notice`：等同于[通知事件](https://github.com/botuniverse/onebot-11/blob/master/event/notice.md)
- `request`：等同于[请求事件](https://github.com/botuniverse/onebot-11/blob/master/event/request.md)

`Bot.send(action, params)`是调用api，`action`是api名称字符串，`params`是api所需参数，格式同[公开 API](https://github.com/botuniverse/onebot-11/blob/master/api/public.md)。
该方法返回一个Promise，在调用api成功时会返回调用结果的`data`字段
