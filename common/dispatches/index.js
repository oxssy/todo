import { inputText, todos, filters } from '../models';
import { Oxssy, OxssyMap } from 'oxssy';

export const addTodo = (e) => {
  e.preventDefault();
  if (!inputText.value) {
    return;
  }
  const text = new Oxssy(inputText.value, true);
  const complete = new Oxssy(false, true);
  const edit = new Oxssy(false);
  const todo = new OxssyMap({
    text,
    complete,
    edit,
  });
  todos.unshift(todo);
  inputText.update('');
};

export const deleteTodo = (index, e) => {
  e.preventDefault();
  todos.splice(index, 1);
}

export const selectFilterActive = (e) => {
  e.preventDefault();
  filters.update({
    active: true,
    complete: false,
  });
}

export const selectFilterComplete = (e) => {
  e.preventDefault();
  filters.update({
    active: false,
    complete: true,
  });
}

export const selectFilterAll = (e) => {
  e.preventDefault();
  filters.update({
    active: false,
    complete: false,
  });
}
