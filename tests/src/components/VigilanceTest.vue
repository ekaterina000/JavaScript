<template>
    <!-- основной контейнер для теста -->
    <div class="vigilance-test">
      <!-- заголовок страницы, указывает название теста -->
      <h1>Тест на психомоторную бдительность</h1>
  
      <!-- описание задания для пользователя -->
      <p>Задание: Нажмите на 10 кружков как можно быстрее</p>
  
      <!-- условие отображения блока: если тест ещё не начался -->
      <div v-if="!testStarted" class="start-message">
        <!-- кнопка для начала теста, при нажатии вызывается метод startTest -->
        <button @click="startTest" class="start-btn">Начать тест</button>
        
        <!-- кнопка для возвращения на предыдущую страницу, вызывает метод goBack -->
        <button @click="goBack" class="back-btn">Назад</button>
      </div>
  
      <!-- условие отображения блока: если тест уже начался -->
      <div v-else>
        <!-- условие отображения: если тест ещё не завершён -->
        <div v-if="!testCompleted" class="test-area">
          <!-- текст, показывающий сколько целей осталось найти -->
          <p>Осталось кружков: {{ remainingTargets }}</p>
  
          <!-- текст, отображающий текущий таймер -->
          <p>Время: {{ timer }} секунд</p>
  
          <!-- цикл для создания элементов целей на экране -->
          <div
            v-for="(target, index) in targets" <!-- перебираем список целей -->
            :key="index" <!-- назначаем уникальный ключ для каждой цели -->
            :class="['target', target.shape]" <!-- добавляем классы для формы цели -->
            :style="{
              width: target.size + 'px',  <!-- ширина цели в пикселях -->
              height: target.size + 'px', <!-- высота цели в пикселях -->
              top: target.position.top + '%', <!-- позиция сверху в процентах -->
              left: target.position.left + '%', <!-- позиция слева в процентах -->
              backgroundColor: '#d9f0fc', <!-- цвет фона цели -->
            }"
            @click="handleClick(target, index)" <!-- обработчик клика по цели -->
          ></div>
        </div>
  
        <!-- условие отображения: если тест завершён -->
        <div v-else class="test-completed">
          <!-- сообщение о завершении теста -->
          <h2>Тест завершён</h2>
  
          <!-- отображение количества правильных кликов из общего числа целей -->
          <p>Точность: {{ correctClicks }} из {{ totalTargets }}</p>
  
          <!-- отображение среднего времени реакции -->
          <p>Среднее время реакции: {{ averageReactionTime.toFixed(2) }} мс</p>
  
          <!-- блок с кнопками -->
          <div class="buttons">
            <!-- кнопка для повторного прохождения теста -->
            <button @click="restartTest" class="reset-btn">Пройти тест ещё раз</button>
            
            <!-- кнопка для возврата на предыдущую страницу -->
            <button @click="goBack" class="back-btn">Назад</button>
          </div>
        </div>
      </div>
    </div>
  </template>
<script>
export default {
  // объект, который содержит данные для компонента
  data() {
    return {
      testStarted: false, // флаг указывает начался ли тест
      testCompleted: false, // флаг указывает завершён ли тест
      targets: [], // массив для хранения всех целей (фигур) на экране
      correctClicks: 0, // счётчик правильных кликов по кругам
      reactionTimes: [], // массив для хранения времени реакции на каждую цель
      startTime: null, // время начала отсчёта для вычисления реакции
      timer: 0, // текущий счётчик времени в секундах
      timerInterval: null, // идентификатор интервала для таймера
      totalTargets: 10, // общее количество целей, которое нужно найти
      textAreaHeight: 20, // высота области текста, чтобы исключить её из зоны появления целей
    };
  },
  // вычисляемые свойства для динамического расчёта значений
  computed: {
    // вычисление среднего времени реакции
    averageReactionTime() {
      // если массив времени реакции не пустой, вычисляем среднее
      return this.reactionTimes.length > 0
        ? this.reactionTimes.reduce((a, b) => a + b, 0) / this.reactionTimes.length
        : 0; // если массив пустой, возвращаем 0
    },
    // вычисление количества оставшихся целей
    remainingTargets() {
      return this.totalTargets - this.correctClicks; // общее количество минус правильные клики
    },
  },
  // методы, которые определяют действия в компоненте
  methods: {
    // метод запуска теста
    startTest() {
      this.resetTest(); // сбрасываем данные перед началом
      this.generateTargets(); // создаём новые цели
      this.startTimer(); // запускаем таймер
    },

    // метод для генерации целей
    generateTargets() {
      const shapes = ["circle", "hexagon"]; // список форм для целей
      for (let i = 0; i < this.totalTargets * 2; i++) { // цикл для создания двойного числа целей
        let newPosition; // переменная для хранения позиции новой цели
        let overlap; // переменная для проверки перекрытия с другими целями
        do {
          // генерация случайных координат в пределах зоны
          newPosition = {
            top: Math.random() * (80 - this.textAreaHeight) + this.textAreaHeight, // случайная позиция сверху
            left: Math.random() * 80, // случайная позиция слева
          };
          // проверка на перекрытие с уже существующими целями
          overlap = this.targets.some((target) => {
            const distance = Math.sqrt(
              Math.pow(target.position.top - newPosition.top, 2) + // разница по оси y
              Math.pow(target.position.left - newPosition.left, 2) // разница по оси x
            );
            return distance < 15; // если расстояние меньше 15%, считаем что есть перекрытие
          });
        } while (overlap); // повторяем генерацию, пока не найдём свободное место

        // добавление новой цели в массив целей
        this.targets.push({
          shape: shapes[i % shapes.length], // форма цели, чередуется между кругом и шестиугольником
          size: Math.floor(Math.random() * 40) + 60, // случайный размер цели от 60 до 100 пикселей
          position: newPosition, // позиция цели
          isCircle: shapes[i % shapes.length] === "circle", // флаг, является ли цель кругом
        });
      }
      this.startTime = performance.now(); // фиксируем текущее время для расчёта реакции
    },

    // метод для обработки кликов по целям
    handleClick(target, index) {
      if (!target.isCircle) return; // если цель не круг, пропускаем

      const clickTime = performance.now(); // фиксируем время клика
      const reactionTime = clickTime - this.startTime; // вычисляем время реакции

      this.correctClicks++; // увеличиваем счётчик правильных кликов
      this.reactionTimes.push(reactionTime); // добавляем время реакции в массив
      this.targets.splice(index, 1); // удаляем цель из массива

      if (this.correctClicks === this.totalTargets) {
        this.completeTest(); // если достигли нужного числа кликов, завершаем тест
      }

      this.startTime = performance.now(); // обновляем время начала для следующей реакции
    },

    // метод для запуска таймера
    startTimer() {
      this.timer = 0; // сбрасываем таймер
      this.timerInterval = setInterval(() => { // создаём интервал
        this.timer++; // увеличиваем таймер каждую секунду
      }, 1000);
    },

    // метод для остановки таймера
    stopTimer() {
      clearInterval(this.timerInterval); // очищаем интервал таймера
    },

    // метод для завершения теста
    completeTest() {
      this.stopTimer(); // останавливаем таймер
      this.testCompleted = true; // устанавливаем флаг завершения теста
    },

    // метод для сброса данных теста
    resetTest() {
      this.testStarted = true; // устанавливаем флаг начала теста
      this.testCompleted = false; // сбрасываем флаг завершения
      this.correctClicks = 0; // обнуляем счётчик правильных кликов
      this.reactionTimes = []; // очищаем массив времени реакции
      this.targets = []; // очищаем массив целей
      this.stopTimer(); // останавливаем таймер, если он был запущен
    },

    // метод для возврата на главную страницу
    goBack() {
      this.$router.push("/"); // перенаправляем на корневой маршрут
    },
  },
};
</script>
<style scoped>
.vigilance-test {
  text-align: center;
  padding: 20px;
}

.start-message {
  margin-top: 20px;
}

.test-area {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
}

.target {
  position: absolute;
  cursor: pointer;
  transition: transform 0.2s;
}

.target.circle {
  border-radius: 50%;
}

.target.hexagon {
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
}

.target:hover {
  transform: scale(1.1);
}

.test-completed {
  margin-top: 30px;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  background-color: #4caf50;
  color: white;
  border: none;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}

.back-btn {
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  color: white;
}

.back-btn:hover {
  background: linear-gradient(135deg, #f59e0b, #fbbf24);
}
</style>  