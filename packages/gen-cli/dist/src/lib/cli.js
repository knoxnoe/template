"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "runCLI", {
    enumerable: true,
    get: function() {
        return runCLI;
    }
});
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _cac = require("cac");
const _inquirer = /*#__PURE__*/ _interop_require_default._(require("inquirer"));
const cli = (0, _cac.cac)('gen');
async function runCLI() {
    // 设置版本号
    cli.version('0.0.1');
    cli.help();
    // 添加generate命令
    cli.command('generate', 'Generate a new template').alias('g').action(async ()=>{
        const answers = await _inquirer.default.prompt([
            {
                type: 'list',
                name: 'type',
                message: 'What do you want to generate?',
                choices: [
                    'component',
                    'page',
                    'hook'
                ]
            },
            {
                type: 'input',
                name: 'name',
                message: 'Enter the name:',
                validate: (input)=>{
                    if (!input.trim()) {
                        return 'Name is required';
                    }
                    return true;
                }
            },
            {
                type: 'input',
                name: 'path',
                message: 'Enter the path (press enter for current directory):',
                default: '.'
            }
        ]);
        await generateTemplate(answers);
    });
    // 解析命令行参数
    cli.parse();
}
async function generateTemplate(options) {
    console.log('Generating template with options:', options);
// TODO: 实现具体的模板生成逻辑
// 这里将根据不同的模板类型生成对应的代码
}

//# sourceMappingURL=cli.js.map