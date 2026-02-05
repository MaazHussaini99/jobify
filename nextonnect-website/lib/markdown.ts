import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDirectory = path.join(process.cwd(), 'content');

export interface ContentData {
  slug: string;
  title: string;
  description: string;
  icon?: string;
  order?: number;
  content: string;
  category: string;
}

export async function getContentBySlug(
  category: string,
  slug: string
): Promise<ContentData | null> {
  try {
    const fullPath = path.join(contentDirectory, category, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      icon: data.icon,
      order: data.order,
      content: contentHtml,
      category,
    };
  } catch (error) {
    console.error(`Error reading content for ${category}/${slug}:`, error);
    return null;
  }
}

export function getAllContentByCategory(category: string): ContentData[] {
  try {
    const categoryPath = path.join(contentDirectory, category);

    if (!fs.existsSync(categoryPath)) {
      return [];
    }

    const fileNames = fs.readdirSync(categoryPath);

    const allContent = fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(categoryPath, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);

        return {
          slug,
          title: data.title || '',
          description: data.description || '',
          icon: data.icon,
          order: data.order || 999,
          content: '',
          category,
        };
      })
      .sort((a, b) => (a.order || 999) - (b.order || 999));

    return allContent;
  } catch (error) {
    console.error(`Error reading content for category ${category}:`, error);
    return [];
  }
}

export function getAllCategories(): string[] {
  try {
    const categories = fs
      .readdirSync(contentDirectory)
      .filter((file) => {
        return fs.statSync(path.join(contentDirectory, file)).isDirectory();
      });

    return categories;
  } catch (error) {
    console.error('Error reading categories:', error);
    return [];
  }
}
