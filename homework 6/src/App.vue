<template>
  <div id="app">
    <h1>Список дел</h1>
    <todo-list></todo-list>
  </div>
</template>

<script>
import TodoList from './components/ToDoList.vue';

export default {
  components: {
    TodoList
  }
};
</script>

<style>
#app {
  text-align: center;
  color: #333;
  background-color: #fafafa;
  font-family: 'Roboto', sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
}

h1 {
  font-size: 2.5rem;
  color: #00bcd4;
  margin-bottom: 20px;
}
</style>
