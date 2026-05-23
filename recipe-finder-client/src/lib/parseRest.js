import axios from 'axios';

const SERVER_URL = import.meta.env.VITE_BACK4APP_SERVER_URL || 'https://parseapi.back4app.com/';
const APP_ID = import.meta.env.VITE_BACK4APP_APP_ID;
const REST_KEY = import.meta.env.VITE_BACK4APP_REST_KEY || import.meta.env.VITE_BACK4APP_JS_KEY;

const STORAGE_USER_KEY = 'parse_current_user';
const STORAGE_SESSION_KEY = 'parse_session_token';

const api = axios.create({
  baseURL: SERVER_URL,
  headers: {
    'X-Parse-Application-Id': APP_ID,
    ...(REST_KEY ? { 'X-Parse-REST-API-Key': REST_KEY } : {}),
    'Content-Type': 'application/json',
  },
});

export function getAuthHeaders() {
  const sessionToken = localStorage.getItem(STORAGE_SESSION_KEY);
  const headers = {
    'X-Parse-Application-Id': APP_ID,
    ...(REST_KEY ? { 'X-Parse-REST-API-Key': REST_KEY } : {}),
  };
  if (sessionToken) headers['X-Parse-Session-Token'] = sessionToken;
  return headers;
}

export function setSession(user, sessionToken) {
  if (user) localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
  if (sessionToken) localStorage.setItem(STORAGE_SESSION_KEY, sessionToken);
}

export function clearSession() {
  localStorage.removeItem(STORAGE_USER_KEY);
  localStorage.removeItem(STORAGE_SESSION_KEY);
}

export function getCurrentUser() {
  const raw = localStorage.getItem(STORAGE_USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

export default api;
