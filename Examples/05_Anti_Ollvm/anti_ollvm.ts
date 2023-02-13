import { parse } from '@babel/parser'
import traverse, { Node } from '@babel/traverse'
import generate from '@babel/generator'
import { readFileSync, writeFileSync } from 'fs'
import * as t from '@babel/types'

const jsCode = readFileSync("js_code.js").toString();
const ast = parse(jsCode);

traverse(ast, {
    WhileStatement(path) {
        // get context
        // let all_prev_nodes = path.getAllPrevSiblings();
        let switch_node = (path.node.body as t.BlockStatement).body[0] as t.SwitchStatement;
        let op_codes_name = ((switch_node.discriminant as t.MemberExpression).object as t.Identifier).name;
        // get the name binding in current scope
        // In this case, the scope is the role of WhileStatement, which is the outermost scope.
        let op_codes_node = path.scope.getBinding(op_codes_name)?.path.node;
        // check exist
        t.assertVariableDeclarator(op_codes_node);
        t.assertCallExpression(op_codes_node.init)
        // get init
        let init = generate(op_codes_node.init).code;
        // get codes , if you like you can use
        let op_codes: string[] = (new Function(`return ${init}`))();
        // start emulate execute
        const cases = switch_node.cases;
        const replace_nodes = op_codes.reduce((acc, curr) => {
            let idx = parseInt(curr);
            return [...acc,...cases[idx].consequent.filter(i=>i.type !='ContinueStatement')]
        }, [] as Node[]);
        // replace the while loop
        path.replaceInline(replace_nodes);
    }
});

// rename
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


writeFileSync('js_decode.js',generate(ast).code)
// console.log(generate(ast).code)