<template>
    <div :class="{ completed: todo.completed }" class="todo-item">
      <span>{{ todo.text }}</span>
      <div class="buttons">
        <button class="complete-btn" @click="toggleComplete"></button>
        <button class="delete-btn" @click="deleteTodo">Удалить</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['todo'],
    methods: {
      toggleComplete() {
        this.$emit('toggle-complete', this.todo.id);
      },
      deleteTodo() {
        this.$emit('delete-todo', this.todo.id);
      }
    }
  };
  </script>
  
  <style scoped>
  .todo-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    margin-bottom: 15px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease, transform 0.3s ease;
  }
  
  .todo-item:hover {
    transform: translateY(-3px);
  }
  
  .todo-item.completed {
    background-color: #e1f5fe;
  }
  
  .todo-item span {
    font-size: 18px;
  }
  
  .buttons {
    display: flex;
    gap: 10px;
  }
  
  .complete-btn {
    width: 24px;
    height: 24px;
    background-color: #00bcd4;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .complete-btn:hover {
    background-color: #0097a7;
  }
  
  .delete-btn {
    background-color: transparent;
    color: #f44336;
    border: none;
    font-size: 16px;
    cursor: pointer;
    transition: color 0.3s ease;
  }
  
  .delete-btn:hover {
    color: #d32f2f;
  }
  </style>
  