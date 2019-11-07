import React from 'react';
import { oxssify } from 'oxssy';
import { inputText, todos, filters } from '../models';
import {
  addTodo,
  deleteTodo,
  selectFilterActive,
  selectFilterAll,
  selectFilterComplete,
} from '../dispatches';

const Todo = oxssify({
  text: 'text',
  complete: 'complete',
  edit: 'edit',
})((props) => {
  let className = '';
  if (props.edit) {
    className = 'editing';
  } else if (props.complete) {
    className = 'completed';
  }

  const doubleClick = (e) => {
    e.preventDefault();
    props.oxssy.edit.update(true);
  };

  const enterUp = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      props.oxssy.edit.update(false);
    }
  };

  return (
    <li className={className} key={props.key}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={props.complete} onChange={props.oxssy.complete.handler} />
        <label onDoubleClick={doubleClick}>
          {props.text}
        </label>
        <button className="destroy" type="button" onClick={e => deleteTodo(props.index, e)} />
      </div>
      <input className="edit" value={props.text} onChange={props.oxssy.text.handler} onKeyUp={enterUp} />
    </li>
  );
});

export default oxssify({
  inputText,
  todos,
  filters,
})((props) => {
  const todoItems = props.oxssy.todos
    .filter((todo) => {
      if (props.filters.active) {
        return !todo.value.complete;
      }
      if (props.filters.complete) {
        return todo.value.complete;
      }
      return true;
    })
    .map((todo, index) => (
      <Todo key={`todo-${index + 1}`} index={index} oxssy={todo} />
    ));

  const enterUp = (e) => {
    if (e.keyCode === 13) {
      addTodo(e);
    }
  };

  return (
    <section className="todoapp">
      <header className="header">
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={props.inputText}
          onChange={props.oxssy.inputText.handler}
          onKeyUp={enterUp}
        />
      </header>
      <section className="main">
        <ul className="todo-list">
          {todoItems}
        </ul>
      </section>
      <footer className="footer">
        <span className="todo-count">
          {`${todoItems.length} item${todoItems.length > 1 ? 's' : ''}`}
        </span>
        <ul className="filters">
          <li>
            <a href="/" className={!props.filters.active && !props.filters.complete ? 'selected' : ''} onClick={selectFilterAll}>
              All
            </a>
          </li>
          <li>
            <a href="/" className={props.filters.active ? 'selected' : ''} onClick={selectFilterActive}>
              Active
            </a>
          </li>
          <li>
            <a href="/" className={props.filters.complete ? 'selected' : ''} onClick={selectFilterComplete}>
              Completed
            </a>
          </li>
        </ul>
      </footer>
    </section>
  );
});
