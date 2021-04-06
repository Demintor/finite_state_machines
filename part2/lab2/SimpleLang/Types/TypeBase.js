/**
 * Класс базового типа
 */
class TypeBase {
    /**
     * Конструктор
     * @param {Number|Boolean} value - значение
     */
    constructor(value = '') {
        this.value = value;
        this.reducible = false;
    };
    /**
     * Получить строковое представление значения
     * @returns {String}
     */
    getStr() {
        return String(this.value);
    };
};
module.exports = TypeBase;