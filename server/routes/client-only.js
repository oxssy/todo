export default (app) => {
  app.get('/', (_, res) => {
    res.render('app', {
      title: 'Oxssy Todos',
      bundle: '/bundle.js',
      css: '/bundle.css',
      favicon: '/favicon.ico',
      manifest: '/manifest.json',
      fonts: [
        '//fonts.googleapis.com/css?family=Open+Sans:300,400,400i,600,700',
      ],
    });
  });
};
