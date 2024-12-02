import * as fs from 'fs';
import * as path from 'path';

export class TemplateManager {
  private templatesDir: string;

  constructor() {
    // 获取templates目录的绝对路径（在dist目录下）
    this.templatesDir = path.join(__dirname, '../../../dist/templates');
  }

  /**
   * 获取模板内容并替换变量
   */
  private getTemplateContent(templateType: string, variables: Record<string, string>): string {
    const templatePath = path.join(this.templatesDir, templateType, 'index.ts.template');
    let content = fs.readFileSync(templatePath, 'utf-8');

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
  public async generateFile(options: {
    type: string;
    name: string;
    targetPath: string;
  }): Promise<void> {
    const { type, name, targetPath } = options;

    // 确保目标目录存在
    fs.mkdirSync(targetPath, { recursive: true });

    // 获取处理后的模板内容
    const content = this.getTemplateContent(type, { name });

    // 写入文件
    const fileName = type === 'component' ? `${name}.tsx` : 'index.tsx';
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
