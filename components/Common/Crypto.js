
import CryptoJS from 'crypto-js';
import { Security } from '../Common/Constants';

const Encrypt = (text) => {
    let encryptedData = CryptoJS.AES.encrypt(text, Security.SecurityEDKey).toString();
    return encryptedData;
}

const Decrypt = (text) => {
    var bytes = CryptoJS.AES.decrypt(text, Security.SecurityEDKey);
    var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
}

export const Crypto = {
    Encrypt, Decrypt
};