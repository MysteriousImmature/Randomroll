document.addEventListener('DOMContentLoaded', function () {
    const resultContainer = document.getElementById('random-number');
    const generateButton = document.getElementById('generate-button');
    const minInput = document.getElementById('min-value');
    const maxInput = document.getElementById('max-value');
    const showHistoryCheckbox = document.getElementById('show-history');
    const historyContainer = document.getElementById('history-container');
    const historyList = document.querySelector('.history-list');
  
    // History array
    let rollHistory = [];
    const MAX_HISTORY = 10;
  
    // Load saved values from storage if available
    if (localStorage.getItem('randomroll_minValue')) {
      minInput.value = localStorage.getItem('randomroll_minValue');
    }
  
    if (localStorage.getItem('randomroll_maxValue')) {
      maxInput.value = localStorage.getItem('randomroll_maxValue');
    }
  
    // Load history preference
    if (localStorage.getItem('randomroll_showHistory') === 'true') {
      showHistoryCheckbox.checked = true;
      historyContainer.style.display = 'block';
    }
  
    function getRandomNumber(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  
    function updateRandomNumber() {
      let min = parseInt(minInput.value) || 1;
      let max = parseInt(maxInput.value) || 100;
      
      // Validate min and max values
      if (min > max) {
        [min, max] = [max, min]; // Swap values
        minInput.value = min;
        maxInput.value = max;
      }
      
      // Save to storage
      localStorage.setItem('randomroll_minValue', min);
      localStorage.setItem('randomroll_maxValue', max);
      
      const randomNumber = getRandomNumber(min, max);
      
      // Add animation class
      resultContainer.classList.add('animate');
      
      // Remove animation class after transition
      setTimeout(() => {
        resultContainer.classList.remove('animate');
      }, 300);
      
      resultContainer.innerText = randomNumber;
      
      // Add to history
      addToHistory(randomNumber, min, max);
    }
  
    function addToHistory(number, min, max) {
      const timestamp = new Date().toLocaleTimeString();
      const historyItem = {
        number,
        range: `${min}-${max}`,
        timestamp
      };
      
      rollHistory.unshift(historyItem);
      
      // Keep history limited to MAX_HISTORY items
      if (rollHistory.length > MAX_HISTORY) {
        rollHistory.pop();
      }
      
      updateHistoryDisplay();
    }
  
    function updateHistoryDisplay() {
      if (rollHistory.length === 0) return;
      
      historyList.innerHTML = '';
      
      rollHistory.forEach(item => {
        const historyElement = document.createElement('div');
        historyElement.className = 'history-item';
        historyElement.textContent = `${item.number} (${item.range})`;
        historyList.appendChild(historyElement);
      });
    }
  
    // Event listeners
    generateButton.addEventListener('click', updateRandomNumber);
  
    // Keyboard support - Enter key
    minInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        updateRandomNumber();
      }
    });
  
    maxInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        updateRandomNumber();
      }
    });
  
    showHistoryCheckbox.addEventListener('change', function() {
      historyContainer.style.display = this.checked ? 'block' : 'none';
      localStorage.setItem('randomroll_showHistory', this.checked);
    });
  
    // Validate inputs
    minInput.addEventListener('change', function() {
      if (this.value === '') this.value = 1;
    });
  
    maxInput.addEventListener('change', function() {
      if (this.value === '') this.value = 100;
    });
  
    // Initial random number update
    updateRandomNumber();
  });
  