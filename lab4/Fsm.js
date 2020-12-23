const StateMachine = require('../StateMachine');
class FoldableStateMachine extends StateMachine {
    /**
     * конструктор
     * @param {Array} alphabet - алфавит
     * @param {number} initStateId - идентификатор начального состояния 
     * @param {number} endStateId - идентификатор конечного состояния
     * @param {Array} states - состояния 
     * @param {Function} endRule - заключительное правило
     */
    constructor(alphabet = [], initStateId = 0, endStateId = 0, states = [], endRule = function () {}) {
        super(alphabet, initStateId, endStateId, states);
        this.currentStateId = initStateId;
        this.memory = [];
        this.tree = [];
        this.endRule = endRule;
    };
    /**
     * Установить начальное состояние
     * @param {number} initStateId - идентификатор начального состояния
     */
    setInitStateId(initStateId = 0) {
        super.setInitStateId(initStateId);
        this.currentStateId = initStateId;
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
        this.tree = [];
    };
    /**
     * Запустить автомат
     * @param {string} str - строка
     * @returns {boolean|string}
     */
    run(str = '') {
        this.currentStateId = this.initStateId;
        const isCorrectString = this.checkString(str);
        if (isCorrectString) {
            const strArr = str.split('');
            strArr.forEach((ch) => {
                let state = this.states.find(state => state.stateId === this.currentStateId) || {};
                let {rule = function () {}} = state;
                let {stateId = -1, memory = [], tree = []} = rule(ch, this.memory, this.tree);
                this.currentStateId = stateId;
                this.memory = memory;
                this.tree = tree;
            });
            let {stateId = -1, memory = []} = this.endRule(this.currentStateId, this.memory);
            this.currentStateId = stateId;
            this.memory = memory;
            let result = this.currentStateId === this.endStateId ? true : false;
            let tree = this.tree;
            this.clear();
            return {result, tree};
        }
        else {
            return 'invalid string';
        }
    };
};

module.exports = FoldableStateMachine;