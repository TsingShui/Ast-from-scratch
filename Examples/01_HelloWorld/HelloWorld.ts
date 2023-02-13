// parse: 将代码解析为 AST 抽象语法树
import { parse } from "@babel/parser";
// traverse: 提供遍历 AST 语法树的工具
import traverse, { NodePath } from "@babel/traverse";
// generate: 将 AST 生成为新的 Js 代码
import generate from "@babel/generator";
let js_code = `
const nobody = "Hello";
const its_me = "Bye Bye";
`
let ast = parse(js_code);

console.log(ast.program)
// 处理方法
traverse(ast, {
    // 针对的类型
    StringLiteral(path) {
        let node = path.node;
        node.value += " World!"
    }
})

console.log(generate(ast).code)
