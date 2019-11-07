import clientOnly from './client-only';
import serverSide from './server-side';

export default function(app) {
  clientOnly(app);
  serverSide(app);
}
