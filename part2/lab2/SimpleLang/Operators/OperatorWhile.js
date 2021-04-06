const OperatorIf = require('./OperatorIf');
const UnitSequence = require('../Units/UnitSequence');
const OperatorDoNothing = require('./OperatorDoNothing');
/**
 * Класс для оператора цикл
 */
class OperatorWhile {
    /**
     * Конструктор
     * @param {Object} condition - условие цикла
     * @param {Object} body - тело цикла 
     */
    constructor(condition = {}, body = {}) {
        this.condition = condition;
        this.body = body;
        this.reducible = true;
    };
    /**
     * Получить строковое представление значения
     * @returns {String}
     */
    getStr() {
        return `while (${this.condition.getStr()}) { ${this.body.getStr()} }`;
    };
    /**
     * Свертка
     * @param {Object} environment - окружение
     * @returns {Object}
     */
    reduce(environment = {}) {
        return {
            statement: new OperatorIf(
                this.condition, 
                new UnitSequence(
                    this.body, 
                    new OperatorWhile(this.condition, this.body)
                ),
                new OperatorDoNothing()
            ),
            environment
        };
    }
};
module.exports = OperatorWhile;