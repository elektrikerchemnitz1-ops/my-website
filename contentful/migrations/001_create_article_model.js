module.exports = function (migration) {
  const blogPost = migration
    .createContentType('blogPost')
    .name('Blog Post')
    .description('Модель для постов блога')
    .displayField('title');

  blogPost
    .createField('title')
    .name('Title')
    .type('Symbol')
    .required(true)
    .validations([
      {
        size: {
          max: 200
        }
      }
    ]);

  blogPost
    .createField('slug')
    .name('Slug')
    .type('Symbol')
    .required(true)
    .validations([
      {
        regexp: {
          pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$'
        }
      }
    ]);

  blogPost
    .createField('body')
    .name('Body')
    .type('Text');
};