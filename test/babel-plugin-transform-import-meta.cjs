const { pathToFileURL } = require('node:url');

module.exports = function babelPluginTransformImportMeta({ types: t }) {
  return {
    name: 'transform-import-meta',
    visitor: {
      MemberExpression(path, state) {
        const { node } = path;
        if (
          node.computed ||
          node.object.type !== 'MetaProperty' ||
          node.object.meta.name !== 'import' ||
          node.property.type !== 'Identifier' ||
          node.property.name !== 'url'
        ) {
          return;
        }
        const filename = state.file.opts.filename;
        if (!filename) {
          return;
        }
        path.replaceWith(t.stringLiteral(pathToFileURL(filename).href));
      },
    },
  };
};
