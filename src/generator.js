require('dotenv').config();
const { createClient } = require('contentful');
const fs = require('fs');
const path = require('path');

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

async function generateHTML() {
  try {
    // Загружаем шаблон
    const template = fs.readFileSync(path.join(__dirname, '../templates/article.html'), 'utf-8');
    
    // Запрашиваем BlogPost из Contentful
    const entries = await client.getEntries({ content_type: 'blogPost' });
    
    // Проверяем есть ли данные
    if (entries.items.length === 0) {
      console.log('Нет записей в Contentful');
      return;
    }
    
    // Генерируем HTML для каждого поста
    entries.items.forEach((entry) => {
      const { title, slug, body } = entry.fields;
      
      // Заменяем плейсхолдеры в шаблоне
      let html = template
        .replace(/{{title}}/g, title || 'No Title')
        .replace(/{{slug}}/g, slug || 'no-slug')
        .replace(/{{body}}/g, body || 'No content');
      
      // Сохраняем в public/
      const fileName = `${slug}.html`;
      const filePath = path.join(__dirname, '../public', fileName);
      
      fs.writeFileSync(filePath, html);
      console.log(`✓ Generated: ${fileName}`);
    });
    
    console.log('✓ All files generated successfully');
  } catch (error) {
    console.error('Error:', error);
  }
}

generateHTML();