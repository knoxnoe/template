import { cac } from 'cac';
import inquirer from 'inquirer';

const cli = cac('gen');

// 定义生成模板的类型
type TemplateType = 'component' | 'page' | 'hook';

interface TemplateOptions {
  name: string;
  type: TemplateType;
  path: string;
}

export async function runCLI() {
  // 设置版本号
  cli.version('0.0.1');
  cli.help();

  // 添加generate命令
  cli
    .command('generate', 'Generate a new template')
    .alias('g')
    .action(async () => {
      const answers = await inquirer.prompt([
        {
          type: 'list',
          name: 'type',
          message: 'What do you want to generate?',
          choices: ['component', 'page', 'hook']
        },
        {
          type: 'input',
          name: 'name',
          message: 'Enter the name:',
          validate: (input: string) => {
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

      await generateTemplate(answers as TemplateOptions);
    });

  // 解析命令行参数
  cli.parse();
}

async function generateTemplate(options: TemplateOptions) {
  console.log('Generating template with options:', options);
  // TODO: 实现具体的模板生成逻辑
  // 这里将根据不同的模板类型生成对应的代码
}
