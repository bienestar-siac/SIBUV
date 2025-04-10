import CryptoJS from 'crypto-js';

type FunctionDescrypt = (ciphertext: string) => object

export async function decryptData<FunctionDescrypt>(ciphertext: string) {
    // Convertir la cadena Base64 a Uint8Array
    const binaryStr = atob(ciphertext);
    const bytes = new Uint8Array(binaryStr.length);
    for (let i = 0; i < binaryStr.length; i++) {
      bytes[i] = binaryStr.charCodeAt(i);
    }
  
    // Extraer nonce, tag y ciphertext
    const nonce = bytes.slice(0, 16);
    const tag = bytes.slice(16, 32);
    const ct = bytes.slice(32);
  
    const ciphertextAndTag = new Uint8Array(ct.length + tag.length);
    ciphertextAndTag.set(ct, 0);
    ciphertextAndTag.set(tag, ct.length);
  
    // Secret Key
    const secretKeyStr = import.meta.env.VITE_ENCRYPTION_KEY;
    const adjustedKey = secretKeyStr.padEnd(32, ' ').slice(0, 32);
    const encoder = new TextEncoder();
    const keyData = encoder.encode(adjustedKey);
  
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "AES-GCM" },
      false,
      ["decrypt"]
    );
  
    try {
      const decryptedBuffer = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv: nonce },
        cryptoKey,
        ciphertextAndTag
      );
      
      const decoder = new TextDecoder();
      return decoder.decode(decryptedBuffer);
    } catch (error) {
      console.error("Error al descifrar:", error);
      return null;
    }
  }
  