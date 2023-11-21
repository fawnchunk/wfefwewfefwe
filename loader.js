javascript:(function() {
  var popup = window.open('', '_blank', 'width=600,height=400,scrollbars=no,resizable=yes');

  popup.document.write('<html><head><title>celestial temp cmd fetcher</title><style>* {box-sizing: border-box; font-family: monospace;} body {margin: 0; background-color: #0f0f0f; color: #00ff00; overflow: hidden;} .cmd-window {padding: 20px; height: 100%; overflow-y: scroll; background-color: #000; border: 2px solid #00ff00; border-radius: 10px;} .cmd-text {padding-bottom: 20px; white-space: pre;} .cmd-input-container {display: flex; align-items: center;} .cmd-input {flex: 1; width: 0; background-color: #0f0f0f; border: none; color: #00ff00; padding: 5px; margin-right: 5px;} .cmd-input:focus {outline: none;} .cmd-text::after {content: "_"; animation: blink-caret 1s step-end infinite;} @keyframes blink-caret {from, to {border-color: transparent;} 50% {border-color: #00ff00;}} .awaiting-command {color: #ffcc00;}</style></head><body>');

  var cmdWindow = popup.document.createElement('div');
  cmdWindow.classList.add('cmd-window');
  popup.document.body.appendChild(cmdWindow);

  var cmdText = popup.document.createElement('div');
  cmdText.classList.add('cmd-text');
  cmdWindow.appendChild(cmdText);

  var cmdInputContainer = popup.document.createElement('div');
  cmdInputContainer.classList.add('cmd-input-container');
  cmdWindow.appendChild(cmdInputContainer);

  var cmdInput = popup.document.createElement('input');
  cmdInput.classList.add('cmd-input');
  cmdInput.type = 'text';
  cmdInputContainer.appendChild(cmdInput);

  var awaitingCommand = popup.document.createElement('div');
  awaitingCommand.classList.add('awaiting-command');
  awaitingCommand.textContent = 'Awaiting command...';
  cmdWindow.appendChild(awaitingCommand);

  var choices = [
    "Hello! Welcome to a temporary method of retrieving our tools. Please type 1 or 2.",
    "1. Blooket",
    "2. Gimkit (live)"
  ];

  var currentIndex = 0;

  function typeText() {
    cmdText.textContent += choices[currentIndex] + '\n';
    currentIndex++;

    if (currentIndex < choices.length) {
      setTimeout(typeText, 100);
    } else {
      awaitingCommand.style.display = 'none';
      cmdInputContainer.style.display = 'flex';
      cmdInput.focus();
    }
  }

  typeText();

  cmdInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
      var choice = cmdInput.value;
      cmdText.textContent += '>> ' + choice + '\n';

      if (choice === '1') {
        fetch('https://cdn.jsdelivr.net/gh/fawnchunk/wfefwewfefwe@main/blooket.js')
          .then(response => response.text())
          .then(code => {
            cmdText.textContent += code;
          });
      } else if (choice === '2') {
        fetch('https://cdn.jsdelivr.net/gh/fawnchunk/wfefwewfefwe@main/gimkit.js')
          .then(response => response.text())
          .then(code => {
            cmdText.textContent += code;
          });
      } else {
        cmdText.textContent += 'Invalid choice. Please type 1 or 2.\n';
      }

      cmdInputContainer.style.display = 'none';
    }
  });

  popup.document.write('</body></html>');
})();
