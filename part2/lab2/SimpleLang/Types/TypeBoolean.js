const TypeBase = require('./TypeBase');
/**
 * Класс для логического типа
 * @extends TypeBase
 */
class TypeBoolean extends TypeBase {
    /**
     * Конструктор
     * @param {Boolean} value - значение (true|false)
     */
    constructor(value = false) {
        super(Boolean(value));
    };
};
module.exports = TypeBoolean;