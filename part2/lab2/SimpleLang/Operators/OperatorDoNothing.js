/**
 * Класс пустого оператора
 */
class OperatorDoNothing {
    /**
     * Конструктор
     */
    constructor() {
        this.reducible = false;
    };
    /**
     * Получить строковое представление значения
     * @returns {String}
     */
    getStr() {
        return 'do-nothing';
    };
};
module.exports = OperatorDoNothing;