const KEY='eshuli_admin_token';export const setToken=t=>localStorage.setItem(KEY,t);export const getToken=()=>localStorage.getItem(KEY);export const clearToken=()=>localStorage.removeItem(KEY);
