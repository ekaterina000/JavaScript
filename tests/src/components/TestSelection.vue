<template>
    <div class="test-selection">
      <h1>Выберите тест</h1>
      <div class="test-list">
        <button @click="navigateToTest('time-test')">Тест на восприятие времени</button>
        <button @click="navigateToTest('stroop-test')">Тест Струпа</button>
        <button @click="navigateToTest('memory-test')">Тест на память</button>
        <button @click="navigateToTest('reaction-test')">Тест на реакцию</button>
        <button @click="navigateToTest('stroop-test2')">Тест Струпа 2</button>
        <button @click="navigateToTest('vigilance-test')">Тест на психомоторную бдительность</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      navigateToTest(testName) {
        this.$router.push(`/${testName}`);
      },
    },
  };
  </script>
  
  <style>
  .test-selection {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
  }
  
  h1 {
    font-size: 28px;
    color: #4a5568;
    margin-bottom: 20px;
  }
  
  .test-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  button {
    padding: 12px 18px;
    font-size: 16px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    color: #ffffff;
    background: linear-gradient(135deg, #42a5f5, #478ed1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  button:hover {
    transform: scale(1.05);
  }
  </style>
  