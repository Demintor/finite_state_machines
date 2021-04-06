const StateMachine = require('../../StateMachine');
class TuringMachine extends StateMachine {
    /**
     * конструктор
     * @param {Array} alphabet - алфавит
     * @param {Number} initStateId - идентификатор начального состояния 
     * @param {Number} endStateId - идентификатор конечного состояния
     * @param {Number} newIterationState - состояние, из которого разрешена новая итерация
     * @param {Array} states - состояния
     * @param {Array} memory - память 
     * @param {Function} endRule - заключительное правило
     */
    constructor(alphabet = [], initStateId = 0, endStateId = 0, newIterationState = 0, states = [], endRule = function () {}) {
        super(alphabet, initStateId, endStateId, states);
        this.newIterationState = newIterationState;
        this.currentStateId = initStateId;
        this.memory = [];
        this.endRule = endRule;
    };
    /**
     * Установить начальное состояние
     * @param {Number} initStateId - идентификатор начального состояния
     */
    setInitStateId(initStateId = 0) {
        super.setInitStateId(initStateId);
        this.currentStateId = initStateId;
    };
    setNewIterationState(newIterationState = 0) {
        this.newIterationState = newIterationState;
    };
    /**
     * Установить заключительно правило
     * @param {Function} endRule - заключительное правило 
     */
    setEndRule(endRule = function () {}) {
        this.endRule = endRule;
    };
    /**
     * Очистить данные
     */
    clear() {
        this.currentStateId = this.initStateId;
        this.memory = [];
    };
    /**
     * Итерация машины Тьюринга
     */
    iteration() {
        this.currentStateId = 0;
        this.memory.forEach((ch, index) => {
            const state = this.states.find(state => state.stateId === this.currentStateId) || {};
            const {rule = function () {}} = state;
            const {stateId = -1, memory = ''} = rule(ch, index, this.memory);
            this.currentStateId = stateId;
            this.memory = memory;
        });
    };
    /**
     * Запустить машину Тьюринга
     * @param {String} str - строка
     * @returns {Boolean}
     */
    run(str = '') {
        this.memory = str.split('');
        do {
            this.iteration();
        } while(this.currentStateId === this.newIterationState);
        
        let {stateId = -1, memory = []} = this.endRule(this.currentStateId, this.memory);
        this.currentStateId = stateId;
        this.memory = memory;
        const result = this.currentStateId === this.endStateId ? true : false;
        this.clear();
        return result;
    };
};
module.exports = TuringMachine;