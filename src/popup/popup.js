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
