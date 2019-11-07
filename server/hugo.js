import pug from 'pug';
import fs from 'fs';
import { renderToString } from 'react-dom/server';
import { Oxssy, OxssyMap } from 'oxssy';
import { todos } from '../common/models';
import App from '../common/App.jsx';

const oxssyData = [
  { text: '{{.Site.Data.Todo1.Text}}', complete: false, edit: false },
  { text: '{{.Site.Data.Todo2.Text}}', complete: false, edit: false },
  { text: '{{.Site.Data.Todo3.Text}}', complete: false, edit: false },
  { text: '{{.Site.Data.Todo4.Text}}', complete: false, edit: false },
  { text: '{{.Site.Data.Todo5.Text}}', complete: false, edit: false },
];
oxssyData.forEach((item) => {
  const itemOxssy = new OxssyMap({
    text: new Oxssy('', true),
    complete: new Oxssy(false, true),
    edit: new Oxssy(false),
  });
  itemOxssy.update(item);
  todos.push(itemOxssy);
});

const render = pug.compileFile(
  `${__dirname}/html/app-server-side.pug`,
  {
    pretty: true,
  }
);
const template = render({
  title: 'Oxssy Todos',
  bundle: '/bundle.js',
  css: '/bundle.css',
  favicon: '/favicon.ico',
  manifest: '/manifest.json',
  fonts: [
    '//fonts.googleapis.com/css?family=Open+Sans:300,400,400i,600,700',
  ],
  rendered: renderToString(App()),
  data: `document.OXSSYDATA = ${JSON.stringify(oxssyData)};`,
});
fs.writeFileSync(`${__dirname}/hugo/layouts/index.html`, template);
