const StateMachine = require('../StateMachine');
class Ndsm extends StateMachine {
    /**
     * конструктор
     * @param {Array} alphabet - алфавит
     * @param {number} initStateId - идентификатор начального состояния 
     * @param {number} endStateId - идентификатор конечного состояния
     * @param {Array} states - состояния 
     */
    constructor(alphabet = [], initStateId = 0, endStateId = 0, states = []) {
        super(alphabet, initStateId, endStateId, states);
        this.currentStateIds = [initStateId];
    };
    /**
     * Установить начальное состояние
     * @param {number} initStateId - идентификатор начального состояния
     */
    setInitStateId(initStateId = 0) {
        super.setInitStateId(initStateId);
        this.currentStateIds = [initStateId];
    };
    /**
     * Запустить автомат
     * @param {string} str - строка
     * @returns {boolean|string}
     */
    run(str = '') {
        this.currentStateIds = [this.initStateId];
        const isCorrectString = this.checkString(str);
        if (isCorrectString) {
            const strArr = str.split('');
            strArr.forEach((ch) => {
                let currentStateIds = this.currentStateIds.slice();
                currentStateIds.forEach((currentStateId, index) => {
                    let state = this.states.find(state => state.stateId === currentStateId) || {};
                    let {rule = function () {}} = state;
                    let newStateIds = rule(ch);
                    if (newStateIds.length === 1) {
                        this.currentStateIds.splice(index, 1, newStateIds[0])
                    }
                    else {
                        this.currentStateIds = [...this.currentStateIds, ...newStateIds];
                    }
                });
            });
            return this.currentStateIds.includes(this.endStateId);
        }
        else {
            return 'invalid string';
        }
    };
};

module.exports = Ndsm;