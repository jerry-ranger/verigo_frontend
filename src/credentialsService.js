import { DEFAULT_CREDENTIALS } from './aws-config';

// Service to handle credentials via localStorage
export const credentialsService = {
  getCredentials() {
    return JSON.parse(localStorage.getItem('credentials')) || DEFAULT_CREDENTIALS;
  },

  createUser(id, password) {
    const credentials = this.getCredentials();
    credentials.push({ id, password });
    localStorage.setItem('credentials', JSON.stringify(credentials));
    return { success: true };
  },

  deleteUser(id) {
    const credentials = this.getCredentials();
    const filtered = credentials.filter(user => user.id !== id);
    localStorage.setItem('credentials', JSON.stringify(filtered));
    return { success: true };
  }
};