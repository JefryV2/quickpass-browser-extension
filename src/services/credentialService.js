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
