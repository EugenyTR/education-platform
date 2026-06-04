// API конфигурация для Next.js
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://semenovsnk.ru/backend/public/api';

// API клиент
export const apiClient = {
  async request(endpoint, options = {}) {
    const token = localStorage?.getItem('token') || null;
    
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || data.message || 'Request failed');
    }

    return data;
  },

  // Auth
  async register(data) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async login(data) {
    const result = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (result.success && result.token) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
      }
    }
    return result;
  },

  async me() {
    return this.request('/auth/me');
  },

  // Courses
  async getCourses() {
    return this.request('/courses');
  },

  async getCourse(id) {
    return this.request(`/courses/${id}`);
  },

  // Achievements
  async getMyAchievements() {
    return this.request('/my/achievements');
  },

  async getAllAchievements() {
    return this.request('/achievements');
  },

  // Points
  async getBalance() {
    const result = await this.request('/my/points');
    return result.balance || 0;
  },

  async getPointsHistory() {
    return this.request('/my/points/history');
  },

  // Certificates
  async getMyCertificates() {
    return this.request('/my/certificates');
  },

  // Invites
  async getMyInvites() {
    return this.request('/my/invites');
  },

  async createInvite() {
    return this.request('/invites', { method: 'POST' });
  },
};
