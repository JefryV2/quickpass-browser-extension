import EmailService from '../services/emailService.js';
import CredentialService from '../services/credentialService.js';

class BackgroundManager {
  constructor() {
    this.initializeListeners();
  }

  initializeListeners() {
    chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
      switch (request.action) {
        case 'generateTempAccount':
          try {
            const tempEmail = await EmailService.generateTempEmail();
            const tempPassword = CredentialService.generatePassword();
            
            await CredentialService.storeCredentials(request.websiteUrl, {
              email: tempEmail,
              password: tempPassword
            });

            sendResponse({
              success: true,
              email: tempEmail,
              password: tempPassword
            });
          } catch (error) {
            sendResponse({
              success: false,
              error: error.message
            });
          }
          return true; // Indicates async response

        case 'getStoredCredentials':
          const credentials = await CredentialService.getCredentials(request.websiteUrl);
          sendResponse(credentials);
          return true;
      }
    });
  }
}

// Initialize background manager
const backgroundManager = new BackgroundManager();
