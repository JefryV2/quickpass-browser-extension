class EmailService {
  static async generateTempEmail() {
    try {
      // Using 1secmail API for temp email generation
      const response = await fetch('https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1');
      const emails = await response.json();
      return emails[0];
    } catch (error) {
      console.error('Failed to generate temp email:', error);
      // Fallback email generation
      const randomString = Math.random().toString(36).substring(2, 10);
      return `quickpass_${randomString}@1secmail.com`;
    }
  }

  static async checkEmailInbox(email) {
    const [username, domain] = email.split('@');
    try {
      const response = await fetch(`https://www.1secmail.com/api/v1/?action=getMessages&login=${username}&domain=${domain}`);
      const messages = await response.json();
      return messages;
    } catch (error) {
      console.error('Failed to check email inbox:', error);
      return [];
    }
  }
}

export default EmailService;

# src/services/credentialService.js
class CredentialService {
  static generatePassword(length = 12) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    return Array.from(crypto.getRandomValues(new Uint32Array(length)))
      .map((x) => charset[x % charset.length])
      .join('');
  }

  static async storeCredentials(websiteUrl, credentials) {
    const expirationTime = Date.now() + (24 * 60 * 60 * 1000); // 24 hours
    await chrome.storage.sync.set({
      [websiteUrl]: {
        ...credentials,
        createdAt: Date.now(),
        expiresAt: expirationTime
      }
    });
  }

  static async getCredentials(websiteUrl) {
    const storedData = await chrome.storage.sync.get(websiteUrl);
    const credentials = storedData[websiteUrl];

    // Check if credentials exist and are not expired
    if (credentials && credentials.expiresAt > Date.now()) {
      return credentials;
    }

    return null;
  }
}

export default CredentialService;
