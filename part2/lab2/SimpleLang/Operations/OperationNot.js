const TypeBoolean = require('../Types/TypeBoolean');
/**
 * Класс для операции логического отрицания
 */
class OperationNot {
    /**
     * Конструктор
     * @param {Object} value - значение
     */
    constructor(value) {
        this.value = value;
        this.reducible = true;
    };
    /**
     * Получить строковое представление значения
     * @returns {String}
     */
    getStr() {
        return `!${this.value.getStr()}`;
    };
    /**
     * Свертка
     * @param {Object} environment - окружение
     * @returns {Object}
     */
    reduce(environment = {}) {
        const {reducible = false, value = true} = this.value;
        if (reducible)
            return new OperationNot(this.value.reduce(environment));
        else
            return new TypeBoolean(!Boolean(value));
    };
};
module.exports = OperationNot;