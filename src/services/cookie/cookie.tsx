import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

const SECRET_KEY = import.meta.env.VITE_ENCRYPTION_KEY;

export const setEncryptedCookie = (key, value, expiresDays = 7) => {
    const encryptedValue = CryptoJS.AES.encrypt(JSON.stringify(value), SECRET_KEY).toString();
    
    Cookies.set(key, encryptedValue, { expires: expiresDays, secure: true, sameSite: 'Strict' });
};

export const getDecryptedCookie = (key) => {
    const encryptedValue = Cookies.get(key);
    
    if (!encryptedValue) return null;

    try {
        const bytes = CryptoJS.AES.decrypt(encryptedValue, SECRET_KEY);
        const decryptedValue = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptedValue;
    } catch (error) {
        console.error('Error al desencriptar la cookie:', error);
        return null;
    }
};

