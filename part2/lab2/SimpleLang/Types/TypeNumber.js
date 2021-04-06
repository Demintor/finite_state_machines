const TypeBase = require('./TypeBase');
/**
 * Класс для типа число
 * @extends TypeBase
 */
class TypeNumber extends TypeBase {
    /**
     * Конструктор
     * @param {Number} value - значение
     */
    constructor(value = 0) {
        super(parseInt(value));
    };
};
module.exports = TypeNumber;