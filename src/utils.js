class Utils {
    static isVariable(text) {
        if (text.startsWith('$')) {
            return true;
        }

        return false;
    }
}

export default Utils;