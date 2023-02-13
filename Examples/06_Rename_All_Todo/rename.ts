import { parse } from '@babel/parser'
import traverse from '@babel/traverse'
import generate from '@babel/generator'
import { readFileSync,writeFileSync } from 'fs'
import { valueToNode } from '@babel/types';

const js_code = readFileSync("js_code.js").toString();

const ast = parse(js_code);
// rename all hex name
const name_map: Map<String, String> = new Map();
let var_count = 0;
traverse(ast, {
    Identifier(path) {
        const node = path.node;
        const get_name = name_map.get(node.name);
        if (!get_name) {
            name_map.set(node.name, `v${var_count}`);
            path.node.name = `v${var_count}`
            var_count += 1;
        } else {
            node.name = get_name as string;
        }
    },

})

const rename_code = generate(ast).code;
writeFileSync('js_code_rename.js', rename_code);
// console.log(rename_code);
