import * as fs from 'fs';
import * as path from 'path';

interface GenerateOptions {
  type: string;
  name: string;
  targetPath: string;
  variables?: Record<string, string>;
}

export class TemplateManager {
  private templatesDir: string;

  constructor() {
    // 获取templates目录的绝对路径
    this.templatesDir = path.join(__dirname, '../../templates');
  }

  /**
   * 获取模板内容并替换变量
   */
  private getTemplateContent(templateType: string, variables: Record<string, string> = {}): string {
    const templatePath = path.join(this.templatesDir, templateType);
    let templateFile: string;

    // 根据模板类型选择正确的模板文件
    if (templateType === 'license') {
      templateFile = path.join(templatePath, 'MIT.template');
    } else {
      templateFile = path.join(templatePath, 'index.ts.template');
    }

    let content = fs.readFileSync(templateFile, 'utf-8');

    // 替换模板中的变量
    Object.entries(variables).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      content = content.replace(regex, value);
    });

    return content;
  }

  /**
   * 生成文件
   */
  public async generateFile(options: GenerateOptions): Promise<void> {
    const { type, name, targetPath, variables = {} } = options;

    // 确保目标目录存在
    fs.mkdirSync(targetPath, { recursive: true });

    // 获取处理后的模板内容
    const content = this.getTemplateContent(type, { name, ...variables });

    // 根据类型决定文件名和扩展名
    let fileName: string;
    if (type === 'license') {
      fileName = name;
    } else {
      fileName = type === 'component' ? `${name}.tsx` : 'index.tsx';
    }

    const filePath = path.join(targetPath, fileName);
    fs.writeFileSync(filePath, content);

    console.log(`Generated ${type} at: ${filePath}`);
  }

  /**
   * 获取可用的模板类型
   */
  public getAvailableTemplates(): string[] {
    return fs.readdirSync(this.templatesDir).filter(file => 
      fs.statSync(path.join(this.templatesDir, file)).isDirectory()
    );
  }
}
