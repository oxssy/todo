import React from 'react';
import { oxssify } from 'oxssy';
import { inputText, todos, filters } from '../models';
import { addTodo, deleteTodo, selectFilterActive, selectFilterAll, selectFilterComplete } from '../dispatches';

const Todo = oxssify({
  text: 'text',
  complete: 'complete',
  edit: 'edit',
})(class extends React.Component {
  render() {
    return (
      <li className={
          this.props.edit
          ? 'editing'
          : (this.props.complete ? 'completed' : '')
        } key={this.props.key} >
        <div className="view">
          <input className="toggle" type="checkbox" checked={this.props.complete}
            onChange={this.props.oxssy.complete.handler} />
          <label onDoubleClick={(e) => { this.props.oxssy.edit.update(true); }} >{this.props.text}</label>
          <button className="destroy" onClick={e => deleteTodo(this.props.index, e)} />          
        </div>
        <input className="edit" value={this.props.text} onChange={this.props.oxssy.text.handler}
            onKeyUp={(e) => { if (e.keyCode === 13) { this.props.oxssy.edit.update(false); } }} />
      </li>
    );
  }
});

class TodoList extends React.Component {
  render() {
    const todoItems = this.props.oxssy.todos
      .filter(todo => this.props.filters.active
        ? !todo.value.complete
        : (this.props.filters.complete ? todo.value.complete : true)
      )
      .map((todo, index) => (
        <Todo key={`todo-${index}`} index={index} oxssy={todo}/>
      ));

    return (
      <section className="todoapp">
        <header className="header">
          <input className="new-todo" placeholder="What needs to be done?"
            value={this.props.inputText} onChange={this.props.oxssy.inputText.handler}
            onKeyUp={(e) => { if (e.keyCode === 13) { addTodo(e); } }}
          />
        </header>
        <section className="main">
          <ul className="todo-list">
            {todoItems}
          </ul>
        </section>
        <footer className="footer">
          <span className="todo-count">{todoItems.length} item{todoItems.length > 1 ? `s` : ''}</span>
          <ul className="filters">
            <li>
              <a href="/" className={
                !this.props.filters.active && !this.props.filters.complete ? 'selected' : ''
              } onClick={selectFilterAll}>All</a>
            </li>
            <li>
              <a href="/" className={
                this.props.filters.active ? 'selected' : ''
              } onClick={selectFilterActive}>Active</a>
            </li>
            <li>
              <a href="/" className={
                this.props.filters.complete ? 'selected' : ''
              } onClick={selectFilterComplete}>Completed</a>
            </li>
          </ul>
        </footer>
      </section>
    );
  }
}

export default oxssify({
  inputText,
  todos,
  filters,
})(TodoList);
