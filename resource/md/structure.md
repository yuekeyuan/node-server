###面向对象的模板编程
这里我们把面向对象的思想引入模板的编程，它表示我们可以把任何一个模板看成一个 **类** 来对待，
类有一下三个特性，**封装**，**继承**，**多态** ,同样在模板中我们也引入了这样的三种特性。

而为了引入这三个特性感，我们定义了三个关键字 **extends**， **include**， **block**，在这三个关键字的基础上，我们便能将模板以模块化，的方式进行开发。

首先，是 extends关键字，extends 关键字的用法是:
> { {extends filepath} }

其次是 block 关键字的用法:
 > { {block blockNane} }

extends 关键字使用时，当前的模板继承另外一个模板， 而 父模板中间可以存在 block 关键字。
block 关键字的作用相当于一个函数，可以被子模板重载的函数。比如父模板中定义了 block a
而子模板中也定义了 block a， 那么编译子模板的结果就是父模板中间的内容不会被显示，而是显示子模板中间的内容。


-------------------------------------------------------
#####eg of extends and block
>现在有文件 a.yky:

```
<h1> hello world</h1>
{ {block tem} }
    <h1>it's a.yky</h1>
{ {end block} }
```

有文件 b.yky:

```
{ { extends a.yky} }
{ {block tem} }
    it's b.yky
{ {end block} }
```

那么我们就说b.yky继承a.yky.在编译 b.yky 模板的时候 首先是展开 编译出整个b.yky模板，然再展开 a.yky 模板 （{ {extends a.yky} }）, 然后将 a.yky  中的 block 标签替换为b.yky 中的标签，返回a.yky编译后的结果，
所以我们可以粗略的说 展开后的结果是
```
<h1> hello world</h1>
{ {block tem} }
    it's b.yky
{ {end block} }
```

> 注意： 如果使用 extends 关键字那么extends关键字只能有一个，换一个说法，就是模板只能够像 java一样单继承，而不是像 C++ 那样多继承；
而且使用extends是被放在逻辑的顶部的，意思是该关键字的使用不能够被其他关键字所包含。

---

###include 命令的使用
include 的使用是将外部的文件包含进本文件中。而且 include 命令是有三种使用方法的。
* 静态引用 page
* 动态引入 dynamic （default）
* 文件引入 file

####网络引用
**网络引用**的意思是从网络上下载一个文件，并将该文件写在 include 的位置上。这里的网络上也有可能是已经编译好了的**本地文件**。
这样做的好处是可以将文件分别进行编译赋值，然后再异步结合在一起。使用方法为：
> { {include filepath page} }

这里的filepath可以是网络上的一个url， 也可义是localhost 的一个url，但是强烈建议写完整的url。
static 表示这种请求类型引用的结果是一个web page。最后处理的时候，将web page 的body 写在include 的位置上。

**动态引入** 是将文件以模板的方式直接拷贝赋值到 include 关键字的位置。
它的使用方式是：
> { {include a.yky dynamic} }

或者省略 dynamic，写作：
>{ {include a.yky} }

但是文件必须是模板文件。

这是使用最广泛的一种应用方式，下面举一个具体的例子:
```
<div class="main">
    <header style="display: block;">
        { {include division/header.yky} }
    </header>
    <nav>
        { {include division/navigator.yky} }
    </nav>
    <div class="content" style="position:relative;">
        { {include division/content.yky} }
    </div>
</div>
```
 在这样的一个使用过程中，我们很大的简化了代码，并且将文件拆分，方便了编程，提高的开发的效率。

**文件引用**的意思是将一个文件以字符串的方式引入到文件当中，并插入到 include 的位置。这是最简单的一种引用方式，同样，这样的引用方式可以被动态引用代替。它的用法具体如下：
> { {include a.txt file} }

###总结
在nody-templator 引擎中，extends，include 和 block 是很有用的三个关键字。他们搭起了模板引擎的框架，节省代码的开发量。
