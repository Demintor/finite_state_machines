const Ndsm = require('../Ndsm');
ndsm = new Ndsm(['a', 'b']); // создаем автомат, в конструктор передаем алфавит
ndsm.setInitStateId(0); // добавлям идентификатор начального состояния
ndsm.setEndStateId(3); // добавлям идентификатор конечного состояния
// добавляем массив объектов состояний, 
// stateId - идентификатор, rule - правило по которому осуществляется переход в другой состояния
ndsm.addState({
    stateId: 0,
    rule: (ch) => {
        let newStateIds = []
        switch(ch) {
            case 'a':
                newStateIds = [0];
                break;
            case 'b':
                newStateIds = [0, 1];
                break;
            default:
                break;
        }
        return newStateIds;
    }
});
ndsm.addState({
    stateId: 1,
    rule: (ch) => {
        let newStateIds = []
        if (ch === 'a' || ch === 'b')
            return [2];
        else
            return [1];
    }
});
ndsm.addState({
    stateId: 2,
    rule: (ch) => {
        let newStateIds = []
        if (ch === 'a' || ch === 'b')
            return [3];
        else
            return [2];
    }
});
ndsm.addState({
    stateId: 3,
    rule: (ch) => {
        return [0];
    }
});

console.log(ndsm.run('baaa'));