import { jParse, jStringify } from "../helper.js";

class LocalStorage {
    static getItem(key) {
        return localStorage.getItem(key);
    }

    static setItem(key, value) {
        localStorage.setItem(key, jStringify(value));
    }

    static getParsedStorageArray(value) {
        return value ? jParse(value) : [];
    }
}

export default LocalStorage