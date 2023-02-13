import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import generate from "@babel/generator";
import { valueToNode } from "@babel/types";
import * as fs from 'fs'


// 从 文件中读取 js 代码
// 或者你也可以用一个非常大的 String 来包括你分析的所有的 Js 代码
const code = fs.readFileSync('js_code.js').toString()
// 把 Js 代码解析成 AST
// 在这个逆向过程中，AST 就像病人，我们是医生。
const ast = parse(code)

// 推荐使用在线的 AST Explorer 来观察 AST 树的形状，方便我们分析
// 网址为：https://astexplorer.net/

// traverse 是用来从一个节点开始遍历的 Babel 工具，非常有用。s
traverse(ast, {
    BinaryExpression(path) {
        // path.evaluate 会进行执行代码
        //
        const { confident, value } = path.evaluate();
        if (confident) {
            path.replaceInline(valueToNode(value))
        }
    }
})

const decoded_js = generate(ast).code

console.log(decoded_js);
