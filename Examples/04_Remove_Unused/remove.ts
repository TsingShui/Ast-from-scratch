import { parse } from "@babel/parser";
import generate from "@babel/generator";
import traverse from "@babel/traverse";
import { Identifier } from "@babel/types";
import { readFileSync } from "fs";

const js_code = readFileSync('./js_code.js').toString();
const ast = parse(js_code)

traverse(ast, {
    VariableDeclarator(path) {
        const binding = path.scope.getBinding((path.node.id as Identifier).name);
        if (!binding?.referenced) {
            path.remove()
        }
    }
})
console.log(generate(ast).code);
