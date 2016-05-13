### 模板的使用
***下载安装***

模板被托管在npm 上面和git 上面,如果在客户端使用，你可以在shell使用如下命令：
>npm install -g nody-templator


如果在应用中使用该插件，你可以在 package.json 中的dependencies中添加一行：
>"nody-templator":"1.0.20"


如果想使用最新的模板，使用如下命令：
>"nody-templator":"*"


***运行模板***

在完成模板引擎的安装之后我们来写一个小的demo。新建文件index.js:

```
var Render = require("nody-templator");
var render = new Render();
var result = render.renderTemplate("<h1>{{= param}}</h1>", {param: "hello world", false});
console.log(result);
```

输出：

> <h1>hello world</h1>

在这里，我们引用nody-templator 并生成一个对象。
生成 render 对象的时候，我们可以传入一些参数进去，比如模板文件的位置，是否预编译，是否开启debug模式等等。

生成对象之后我们便可以调用对象的 ***renderTemplate*** 函数。render
Template函数定义如下：

```
    function renderTemplate(file, param, isFile);
```

在这里第一个参数可以是一个文件的路径，也可以是一个将要被渲染的字符串，这个属性取决于 第三个参数， isFile。
当isFile为 ***true*** 时传入的 file 表示一个文件的路径，否则为一个将要被渲染的字符串。isFile 可以省略不写，默认 isFile 为
***true*** 即传入的是一个文件的名称/路径。

第二个参数是一个json 类型的变量，表示将被替换的模板参数，比如：
> {name: "yuekeyuan", sex: "男"}

文件模板渲染之后会返回一个字符串，这个就是渲染之后的结果。


