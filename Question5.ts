/**
 * Problem: Todo List Filter Component
 * You are given a partially implemented Angular component TodoListComponent that displays a list of todos. Each todo has a title and a completed boolean.
 * Your task is to implement the filterTodos method that returns a filtered list of todos based on a filter string input:
    - "all" → return all todos
    - "completed" → return only completed todos
    - "pending" → return only pending todos
 */

// todo.model.ts
export interface Todo {
  title: string;
  completed: boolean;
}

// todo-list.component.ts
import { Component } from '@angular/core';
import { Todo } from './todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html'
})
export class TodoListComponent {
  todos: Todo[] = [
    { title: 'Learn Angular', completed: true },
    { title: 'Buy groceries', completed: false },
    { title: 'Write blog post', completed: false },
    { title: 'Exercise', completed: true }
  ];

  filter: string = 'all';

  // Implement this method
  filterTodos(): Todo[] {
    switch (this.filter) {
        case 'completed':
          return this.todos.filter(todo => todo.completed);
        case 'pending':
          return this.todos.filter(todo => !todo.completed);
        case 'all':
          default:
            return this.todos;
    }
  }
}
