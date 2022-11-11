export const getToken = () => localStorage.getItem('auth_token');

export const setToken = (token) => localStorage.setItem('auth_token', token);
