import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import generate from "@babel/generator";
import { readFileSync } from "fs";
import { valueToNode } from "@babel/types";

const js_code = readFileSync('js_code.js').toString()

const ast = parse(js_code)

traverse(ast, {
    CallExpression(path) {
        const { confident, value } = path.evaluate();
        if (confident) {
            path.replaceInline(valueToNode(value))
        }
    }
}
)
console.log(generate(ast).code);
