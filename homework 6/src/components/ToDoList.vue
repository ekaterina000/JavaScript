<template>
    <div class="todo-list">
      <add-todo @add-todo="addTodo"></add-todo>
      <div v-for="todo in todos" :key="todo.id">
        <todo-item :todo="todo" @toggle-complete="toggleComplete" @delete-todo="deleteTodo"></todo-item>
      </div>
    </div>
  </template>
  
  <script>
  import AddTodo from './AddToDo.vue';
  import TodoItem from './ToDoItem.vue';
  
  export default {
    components: {
      AddTodo,
      TodoItem
    },
    data() {
      return {
        todos: []
      };
    },
    methods: {
      addTodo(text) {
        const newTodo = {
          id: Date.now(),
          text,
          completed: false
        };
        this.todos.push(newTodo);
      },
      toggleComplete(id) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
          todo.completed = !todo.completed;
        }
      },
      deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
      }
    }
  };
  </script>
  
  <style scoped>
  .todo-list {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f1f1f1;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  </style>
  