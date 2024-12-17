document.addEventListener('DOMContentLoaded', () => {
  const generateBtn = document.getElementById('generateAccountBtn');
  const credentialsDisplay = document.getElementById('credentialsDisplay');
  const tempEmailSpan = document.getElementById('tempEmail');
  const tempPasswordSpan = document.getElementById('tempPassword');

  generateBtn.addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      const currentTab = tabs[0];
      const websiteUrl = new URL(currentTab.url).hostname;

      chrome.runtime.sendMessage({
        action: 'generateTempAccount',
        websiteUrl: websiteUrl
      }, (response) => {
        if (response.success) {
          tempEmailSpan.textContent = response.email;
          tempPasswordSpan.textContent = response.password;
          credentialsDisplay.classList.remove('hidden');
        } else {
          alert('Failed to generate temp account');
        }
      });
    });
  });
});

# package.json
{
  "name": "quickpass",
  "version": "1.0.0",
  "description": "Temporary account generator browser extension",
  "scripts": {
    "build": "webpack",
    "watch": "webpack --watch"
  },
  "dependencies": {
    "crypto-js": "^4.1.1"
  },
  "devDependencies": {
    "webpack": "^5.75.0",
    "webpack-cli": "^4.10.0"
  }
}
