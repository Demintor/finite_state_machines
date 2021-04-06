const OperatorDoNothing = require('./OperatorDoNothing');
/**
 * Класс для оператора присваивания
 */
class OperatorAssign {
    /**
     * Конструктор
     * @param {String} name - название
     * @param {Object} expression - выражение
     */
    constructor(name = '', expression = {}) {
        this.name = String(name);
        this.expression = expression;
        this.reducible = true;
    };
    /**
     * Получить строковое представление значения
     * @returns {String}
     */
    getStr() {
        return `${this.name} = ${this.expression.getStr()}`;
    };
    /**
     * Свертка
     * @param {Object} environment - окружение
     * @returns {Object}
     */
    reduce(environment = {}) {
        const {reducible = false} = this.expression;
        if (reducible)
            return {statement: new OperatorAssign(this.name, this.expression.reduce(environment)), environment};
        else
            return {statement: new OperatorDoNothing(), environment: {...environment, [this.name]: this.expression}};
    };
};
module.exports = OperatorAssign;