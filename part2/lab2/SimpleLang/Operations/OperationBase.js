/**
 * Базовый класс для операций
 */
class OperationBase {
    /**
     * Конструктор
     * @param {Object} left - левый оператор
     * @param {Object} right - правый оператор
     */
    constructor(left = {}, right = {}) {
        this.left = left;
        this.right = right;
        this.reducible = true;
    };
    /**
     * Получить строковое представление значения
     * @param {String} operator - оператор
     * @returns {String}
     */
    getStr(operator = '') {
        return `${this.left.getStr()} ${operator} ${this.right.getStr()}`;
    };
    /**
     * Свертка
     * @returns {Object}
     */
    reduce() {
        const {reducible: reducibleLeft = false, value: valueLeft = 0} = this.left;
        const {reducible: reducibleRight = false, value: valueRight = 0} = this.right;
        return {reducibleLeft, reducibleRight, valueLeft, valueRight};
    };
};
module.exports = OperationBase;