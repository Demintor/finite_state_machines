/**
 * Класс для структурной единицы - переменная
 */
class UnitVariable {
    /**
     * Конструктор
     * @param {String} name - название
     */
    constructor(name = '') {
        this.name = String(name);
        this.reducible = true;
    };
    /**
     * Получить название переменной
     * @returns {String}
     */
    getStr() {
        return String(this.name);
    };
    /**
     * Свертка
     * @param {Object} environment - окружение
     * @returns {Object}
     */
    reduce(environment = {}) {
        if (Object.keys(environment).includes(String(this.name)))
            return environment[this.name];
        else
            throw 'Not value variable';
    };
};
module.exports = UnitVariable;