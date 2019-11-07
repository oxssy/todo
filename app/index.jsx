import React from 'react';
import ReactDOM from 'react-dom';
import { Oxssy, OxssyMap } from 'oxssy';
import { todos } from '../common/models'
import App from '../common/App.jsx';
import 'todomvc-app-css/index.css';

if (document.OXSSYDATA) {
  document.OXSSYDATA.forEach((item) => {
    const itemOxssy = new OxssyMap({
      text: new Oxssy('', true),
      complete: new Oxssy(false, true),
      edit: new Oxssy(false),
    });
    itemOxssy.update(item); 
    todos.push(itemOxssy);
  });
}

ReactDOM.hydrate(<App />, document.getElementById('app'));
