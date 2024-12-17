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
