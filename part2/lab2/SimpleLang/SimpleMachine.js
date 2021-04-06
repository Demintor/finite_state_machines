/**
 * Класс для виртуальной машины языка Simple
 */
class SimpleMachine {
    /**
     * Конструктор
     * @param {Object} statement - выражение
     * @param {Object} environment - окружение
     */
    constructor(statement = {}, environment = {}) {
        this.statement = statement;
        this.environment = environment;
        this.history = [];
    };
    /**
     * Обновить история вычислений
     */
    updateHistory() {
        this.history.push(this.statement.getStr());
    };
    /**
     * Шаг
     */
    step() {
        const resultStep = this.statement.reduce(this.environment);
        const {statement = null, environment = null} = resultStep;
        if (statement === null && environment === null)
            this.statement = resultStep;
        else {
            this.statement = statement;
            this.environment = environment;
        }
    };
    /**
     * Запустить машину
     */
    run() {
        while(this.statement.reducible) {
            this.updateHistory();
            this.step();
        }
        this.updateHistory();
    };
};
module.exports = SimpleMachine;