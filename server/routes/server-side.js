import { renderToString } from 'react-dom/server';
import { Oxssy, OxssyMap } from 'oxssy';
import { todos } from '../../common/models';
import App from '../../common/App.jsx';

export default (app) => {
  const oxssyData = [
    { text: 'Figure out how to serve cached static pages', complete: false, edit: false },
    { text: 'Use hugo to generate static pages', complete: false, edit: false },
    { text: 'Use data injection to generate hugo templates', complete: false, edit: false },
    { text: 'Include routing and dispatches', complete: false, edit: false },
    { text: 'Hydrate the page with bundled code', complete: true, edit: false },
    { text: 'Device a way for data to be loaded', complete: true, edit: false },
    { text: 'Construct pug template to accept rendered elements', complete: true, edit: false },
    { text: 'Isolate App component for render', complete: true, edit: false },
    { text: 'Set up server', complete: true, edit: false },
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

  app.get('/server-side/', (_, res) => {
    res.render('app-server-side', {
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
  });
};
