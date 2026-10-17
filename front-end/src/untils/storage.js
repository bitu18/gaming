const storage = {
    set(key, value) {
        return localStorage.setItem(key, JSON.stringify(value));
    },
    get(key) {
        const value = localStorage.getItem(key);
        if (!value) return null;
        try {
            return JSON.parse(value);
        } catch (error) {
            return null;
        }
    },
    remove(key) {
        return localStorage.removeItem(key);
    },
};

export default storage;
