<template>
  <div class="converter-app">
    <h1>Конвертер биткоинов</h1>

    <div class="form-section">
      <label>Введите количество биткоинов:</label>
      <input
        type="number"
        v-model="btcAmount"
        min="0"
        placeholder="Например, 0.5"
      />

      <label>Выберите валюту:</label>
      <select v-model="selectedCurrency">
        <option v-for="(rate, currency) in rates" :key="currency" :value="currency">
          {{ currency }}
        </option>
      </select>
    </div>

    <div class="result-section">
      <h3>Итог:</h3>
      <p v-if="btcAmount > 0 && selectedCurrency">
        {{ btcAmount }} BTC = {{ convertedAmount }} {{ selectedCurrency }}
      </p>
      <p v-else class="hint">Введите сумму и выберите валюту</p>
      <button
        class="convert-button"
        @click="saveToHistory"
        :disabled="!btcAmount || !selectedCurrency"
      >
        Конвертировать
      </button>
    </div>

    <div class="history-section" v-if="conversionHistory.length > 0">
      <h3>История операций:</h3>
      <ul>
        <li v-for="(entry, index) in conversionHistory" :key="index">
          {{ entry.btcAmount }} BTC → {{ entry.convertedAmount }} {{ entry.currency }}
          ({{ entry.timestamp }})
        </li>
      </ul>
    </div>

    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      rates: {},
      btcAmount: 0,
      selectedCurrency: "",
      conversionHistory: [],
      error: "",
    };
  },
  computed: {
    convertedAmount() {
      if (this.selectedCurrency && this.rates[this.selectedCurrency]) {
        return (this.btcAmount * this.rates[this.selectedCurrency]).toFixed(2);
      }
      return 0;
    },
  },
  methods: {
    async fetchRates() {
      try {
        this.error = "";
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,eur,gbp"
        );
        this.rates = {
          USD: response.data.bitcoin.usd,
          EUR: response.data.bitcoin.eur,
          GBP: response.data.bitcoin.gbp,
        };
      } catch (err) {
        this.error = "Ошибка при получении курсов валют. Попробуйте позже.";
        console.error(err);
      }
    },
    saveToHistory() {
      const timestamp = new Date().toLocaleString();
      const entry = {
        btcAmount: this.btcAmount,
        convertedAmount: this.convertedAmount,
        currency: this.selectedCurrency,
        timestamp: timestamp,
      };
      this.conversionHistory.unshift(entry);
      this.btcAmount = 0;
      this.selectedCurrency = "";
    },
  },
  mounted() {
    this.fetchRates();
  },
};
</script>

<style scoped>
.converter-app {
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  border: 3px solid #4caf50;
  border-radius: 15px;
  background: linear-gradient(135deg, #b8e994, #78e08f);
  text-align: center;
  font-family: "Arial", sans-serif;
}

h1 {
  color: #2c3e50;
  font-size: 24px;
  margin-bottom: 15px;
  text-transform: uppercase;
}

.form-section label {
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 5px;
  display: block;
}

input,
select {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 2px solid #4caf50;
  border-radius: 5px;
  font-size: 14px;
}

.result-section {
  background-color: #ffffff;
  padding: 15px;
  border-radius: 10px;
  font-size: 16px;
  color: #34495e;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.history-section {
  margin-top: 20px;
  text-align: left;
}

.history-section ul {
  list-style-type: none;
  padding: 0;
}

.history-section li {
  background: #dcdde1;
  margin-bottom: 10px;
  padding: 10px;
  border-left: 5px solid #4caf50;
  border-radius: 5px;
  font-size: 14px;
}

.convert-button {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  transition: all 0.3s;
}

.convert-button:disabled {
  background-color: #a5d6a7;
  cursor: not-allowed;
}

.convert-button:hover {
  background-color: #45a049;
}

.error {
  color: #c0392b;
  font-weight: bold;
}
</style>
