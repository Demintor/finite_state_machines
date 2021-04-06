/**
 * Класс для структурной единицы - последовательность
 */
class UnitSequence {
    /**
     * Конструктор
     * @param {Object} first - первое предложение
     * @param {Object} second - второе предложение
     */
    constructor(first = {}, second = {}) {
        this.first = first;
        this.second = second;
        this.reducible = true;
    };
    /**
     * Получить строковое представление значения
     * @returns {String}
     */
    getStr() {
        return `${this.first.getStr()}; ${this.second.getStr()};`;
    };
    /**
     * Свертка
     * @param {Object} environment - окружение
     * @returns {Object}
     */
    reduce(environment = {}) {
        if (this.first.getStr() === 'do-nothing')
            return {statement: this.second, environment};
        else {
            const {statement: reducedStatement = {}, environment: reducedEnvironment = {}} = this.first.reduce(environment);
            return {statement: new UnitSequence(reducedStatement, this.second), environment: reducedEnvironment};
        }
    };
};
module.exports = UnitSequence;