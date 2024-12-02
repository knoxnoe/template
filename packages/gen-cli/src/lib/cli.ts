import { cac } from 'cac';
import inquirer from 'inquirer';
import path from 'path';
import { TemplateManager } from './template-manager';

const cli = cac('gen');
const templateManager = new TemplateManager();


export async function runCLI() {
  // 设置版本号
  cli.version('0.0.1');
  cli.help();

  // 添加generate命令
  cli
    .command('generate [name]', 'Generate a new template')
    .alias('g')
    .action(async (name?: string) => {
      const availableTemplates = templateManager.getAvailableTemplates();
      
      const answers = await inquirer.prompt([
        {
          type: 'list',
          name: 'type',
          message: 'What do you want to generate?',
          choices: availableTemplates
        },
        {
          type: 'input',
          name: 'name',
          message: 'Enter the name:',
          default: name,
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
          message: 'Enter the target directory (press enter for current directory):',
          default: '.'
        }
      ]);

      const targetPath = path.resolve(process.cwd(), answers.path);
      
      try {
        await templateManager.generateFile({
          type: answers.type,
          name: answers.name,
          targetPath
        });
        console.log('✨ Template generated successfully!');
      } catch (error) {
        console.error('Error generating template:', error);
      }
    });

  // 解析命令行参数
  cli.parse();
}
