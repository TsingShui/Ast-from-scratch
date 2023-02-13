# AST

> 曼查有个地方，地名就不用提了，不久前住着一位贵族。他那类贵族，矛架上有一支长矛，还有一面皮盾、一匹瘦马和一只猎兔狗。--《堂吉诃德》

Todo List

1. ast 是什么
2. ast 为什么可行

Current Doing

1. Babel Basic

## Index

1. Hello Ast

## Introduction

> 写于周会前的一个无聊的晚上。

### 为什么使用 Ts 而不是 AnyS

推荐使用 `Typescript` 而不是 `JavaScript`, `Js`写多了容易变成`anyScript` 很难维护的同时补全也很差，如果某个库没有对`Js`做过特别的适配，那么很容在某个地方数据变成`any`类型导致后面所有的类型推断都失效，总之`Js`非常烂。我非常讨厌`Js`这门语言。

如果你觉得代码太过冗余，可以把 ts-config 的 strict 关闭，Typescript 严格模式下写起来还是比较麻烦的，静态类型也有静态类型的不好吧。

### 项目使用的环境

安装 Babel 的时候要注意把类型文件也安装了，否则 Vscode 不能补全类型，你也无法利用`Typescript`的语言系统来帮助你快速书写代码。

我使用的环境配置

1. `npm install @babel/parser @babel/generator @babel/traverse @babel/types @types/babel__traverse @types/babel__generator`
2. npm install -g ts-node typescript
3. tsc --init : 生成 ts 配置文件
4. 运行 ts-node xx.ts / vscode: code runner`
5. 调试 vscode : code debugger 插件进行调试

### First Demo && Test Demo

在这个 Demo 使用了 AST 去混淆中最常见的几个工具,可以直接在 ts-node 中运行。正常来说，他会输出 `Hello AST!`。

```ts
import { parse } from "@babel/parser";
import traverse, { NodePath } from "@babel/traverse";
import generate from "@babel/generator";
let js_code = `const nobody = "Hello";`
let ast = parse(js_code);
traverse(ast, {
    StringLiteral(path) {
        let node = path.node;
        node.value += " AST!"
    }
})
console.log(generate(ast).code)
```
