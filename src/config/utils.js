export class Utils {
    static isValidString = (string) => string.length > 4
    static isValidFloat = (float) => parseFloat(float) > 0
    static isValidInt = (int) => parseInt(int) > 0
}