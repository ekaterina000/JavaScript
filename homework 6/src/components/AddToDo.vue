<template>
    <div class="add-todo">
      <input v-model="newTodo" placeholder="Добавить новое дело" @keyup.enter="addTodo" />
      <button @click="addTodo">Добавить</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newTodo: ''
      };
    },
    methods: {
      addTodo() {
        if (this.newTodo.trim()) {
          this.$emit('add-todo', this.newTodo);
          this.newTodo = '';
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .add-todo {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  
  .add-todo input {
    flex: 1;
    padding: 12px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    background-color: #f9f9f9;
    font-size: 16px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: border-color 0.3s ease;
  }
  
  .add-todo input:focus {
    border-color: #00bcd4;
    outline: none;
  }
  
  .add-todo button {
    padding: 12px 20px;
    margin-left: 10px;
    background-color: #00bcd4;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;
  }
  
  .add-todo button:hover {
    background-color: #0097a7;
  }
  </style>
  