const TypeBoolean = require('../Types/TypeBoolean');
const OperationBase = require('./OperationBase');
/**
 * Класс для операции логическое и
 * @extends OperationBase
 */
class OperationAnd extends OperationBase {
    /**
     * Конструктор
     * @param {Object} left - левый оператор
     * @param {Object} right - правый оператор
     */
    constructor(left = {}, right = {}) {
        super(left, right);
    };
    /**
     * Получить строковое представление значения
     * @returns {String}
     */
    getStr() {
        return super.getStr('&&');
    };
    /**
     * Свертка
     * @param {Object} environment - окружение
     * @returns {Object}
     */
    reduce(environment = {}) {
        const {reducibleLeft = false, reducibleRight = false, valueLeft = false, valueRight = false} = super.reduce();
        if (reducibleLeft)
            return new OperationAnd(this.left.reduce(environment), this.right);
        else if (reducibleRight)
            return new OperationAnd(this.left, this.right.reduce(environment));
        else
            return new TypeBoolean(Boolean(valueLeft) && Boolean(valueRight));
    };
};
module.exports = OperationAnd;