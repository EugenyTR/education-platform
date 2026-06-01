const API_BASE = 'http://localhost:8000/api';

const api = {
    async request(endpoint, options = {}) {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers,
        };
        
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${API_BASE}${endpoint}`, {
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
            localStorage.setItem('token', result.token);
            localStorage.setItem('user', JSON.stringify(result.user));
        }
        return result;
    },

    async me() {
        return this.request('/auth/me');
    },

    // Courses
    async getCourses() {
        const result = await this.request('/courses');
        return result.data || [];
    },

    async getCourse(id) {
        const result = await this.request(`/courses/${id}`);
        return result.data;
    },

    // Users
    async getUsers() {
        const result = await this.request('/users');
        return result.data || [];
    },

    async getUser(id) {
        const result = await this.request(`/users/${id}`);
        return result.data;
    },

    // Achievements
    async getMyAchievements() {
        const result = await this.request('/my/achievements');
        return result.data || [];
    },

    async getAllAchievements() {
        const result = await this.request('/achievements');
        return result.data || [];
    },

    async updateAchievementProgress(achievementId, progress) {
        return this.request('/my/achievements/progress', {
            method: 'POST',
            body: JSON.stringify({ achievement_id: achievementId, progress }),
        });
    },

    // Points
    async getBalance() {
        const result = await this.request('/my/points');
        return result.balance || 0;
    },

    async getPointsHistory() {
        const result = await this.request('/my/points/history');
        return result.data || [];
    },

    async sharePoints(recipientId, amount) {
        return this.request('/points/share', {
            method: 'POST',
            body: JSON.stringify({ recipient_id: recipientId, amount }),
        });
    },

    async adminAddPoints(userId, amount, reason) {
        return this.request('/admin/points', {
            method: 'POST',
            body: JSON.stringify({ user_id: userId, amount, reason }),
        });
    },

    async adminGiftCourse(userId, courseId) {
        return this.request('/admin/gift-course', {
            method: 'POST',
            body: JSON.stringify({ user_id: userId, course_id: courseId }),
        });
    },

    // Certificates
    async getMyCertificates() {
        const result = await this.request('/my/certificates');
        return result.data || [];
    },

    async generateCertificate(courseId, score, isBaseCourse = false) {
        return this.request('/certificates/generate', {
            method: 'POST',
            body: JSON.stringify({ course_id: courseId, score, is_base_course: isBaseCourse ? 1 : 0 }),
        });
    },

    // Invites
    async getMyInvites() {
        const result = await this.request('/my/invites');
        return result.data || [];
    },

    async createInvite() {
        return this.request('/invites', { method: 'POST' });
    },

    async getInvite(code) {
        return this.request(`/invites/${code}`);
    },

    async useInvite(code, userId) {
        return this.request('/invites/use', {
            method: 'POST',
            body: JSON.stringify({ code, user_id: userId }),
        });
    },
};
