document.addEventListener('DOMContentLoaded', function () {
    const resultContainer = document.getElementById('random-number');
    const generateButton = document.getElementById('generate-button');
  
    function updateRandomNumber() {
      const randomNumber = Math.floor(Math.random() * 100) + 1;
      resultContainer.innerText = randomNumber;
    }
  
    generateButton.addEventListener('click', updateRandomNumber);
  
    // Initial random number update
    updateRandomNumber();
  });
  