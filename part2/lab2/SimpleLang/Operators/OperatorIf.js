/**
 * Класс для условного оператора
 */
class OperatorIf {
    /**
     * Конструктор
     * @param {Object} condition - условие
     * @param {Object} consequence - блок if
     * @param {Object} alternative - блок esle
     */
    constructor(condition = {}, consequence = {}, alternative = {}){
        this.condition = condition;
        this.consequence = consequence;
        this.alternative = alternative;
        this.reducible = true;
    };
    /**
     * Получить строковое представление значения
     * @returns {String}
     */
    getStr() {
        return `if (${this.condition.getStr()}) { ${this.consequence.getStr()} } else { ${this.alternative.getStr()} }`;
    };
    /**
     * Свертка
     * @param {Object} environment - окружение
     * @returns {Object}
     */
    reduce(environment = {}) {
        const {reducible = false} = this.condition;
        if (reducible) {
            return {statement: new OperatorIf(this.condition.reduce(environment), this.consequence, this.alternative), environment};
        }
        else {
            const {value = false} = this.condition;
            if (Boolean(value))
                return {statement: this.consequence, environment};
            else
                return {statement: this.alternative, environment};
        }
    };
};
module.exports = OperatorIf;