class Dsm {
    /**
     * конструктор
     * @param {Array} alphabet - алфавит
     * @param {number} initStateId - идентификатор начального состояния 
     * @param {number} endStateId - идентификатор конечного состояния
     * @param {Array} states - состояния 
     */
    constructor(alphabet = [], initStateId = 0, endStateId = 0, states = []) {
        this.alphabet = alphabet;
        this.initStateId = initStateId;
        this.currentStateId = initStateId;
        this.endStateId = endStateId;
        this.states = states;
    };
    /**
     * Добавить состояние
     * @param {Object} state - состояние 
     */
    addState(state = {}) {
        this.states.push(state);
    };
    /**
     * Удалить состояние
     * @param {Number} stateId - идентификатор состояния
     */
    removeState(stateId = 0) {
        this.states.splice(this.states.findIndex(state => state.stateId === stateId), 1);
    };
    /**
     * Установить начальное состояние
     * @param {number} initStateId - идентификатор начального состояния
     */
    setInitStateId(initStateId = 0) {
        this.initStateId = initStateId;
        this.currentStateId = initStateId;
    };
    /**
     * Установить конечное состояние
     * @param {number} endStateId - идентификатор конечного состояния
     */
    setEndStateId(endStateId = 0) {
        this.endStateId = endStateId;
    };
    /**
     * Получить информацию об автомате
     * @returns {Object}
     */
    getInfo() {
        return this;
    };
    /**
     * Проверить валидность строки
     * @param {string} str - строка
     * @returns {boolean}
     */
    checkString(str = '') {
        const strArr = str.split('');
        for (let index in strArr) {
            if (!this.alphabet.includes(strArr[index]))
                return false;
        }
        return true;
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
                this.currentStateId = rule(ch);
            });
            return this.currentStateId === this.endStateId ? true : false;
        }
        else {
            return 'invalid string';
        }
    };
};

module.exports = Dsm;