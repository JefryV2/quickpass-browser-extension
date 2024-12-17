class ContentManager {
  static initializeAutoFill() {
    // Detect and auto-fill sign-up forms
    const emailInputs = document.querySelectorAll('input[type="email"]');
    const passwordInputs = document.querySelectorAll('input[type="password"]');

    if (emailInputs.length > 0 && passwordInputs.length > 0) {
      chrome.runtime.sendMessage({
        action: 'getStoredCredentials',
        websiteUrl: window.location.hostname
      }, (credentials) => {
        if (credentials) {
          emailInputs[0].value = credentials.email;
          passwordInputs[0].value = credentials.password;
        }
      });
    }
  }
}

// Run auto-fill when page loads
window.addEventListener('load', ContentManager.initializeAutoFill);
