const TuringMachine = require('../TuringMachine');
const tm = new TuringMachine([]);
tm.setInitStateId(0); // добавлям идентификатор начального состояния
tm.setNewIterationState(3) // добавляем индетификатор состояния, из которого разрешена новая итерация
tm.setEndStateId(4); // добавлям идентификатор конечного состояния
// добавляем массив объектов состояний, 
// stateId - идентификатор, rule - правило по которому осуществляется переход в другой состояния
tm.addState({
    stateId: 0,
    rule: (ch = '', index = -1, memory = []) => {
        if (ch === 'a') {
            memory.splice(index, 1, 'X');
            return {stateId: 1, memory};
        }
        else 
            return {stateId: 0, memory}; 
    }
});
tm.addState({
    stateId: 1,
    rule: (ch = '', index = -1, memory = []) => {
        if (ch === 'b') {
            memory.splice(index, 1, 'X');
            return {stateId: 2, memory};
        }
        else 
            return {stateId: 1, memory}; 
    }
});
tm.addState({
    stateId: 2,
    rule: (ch = '', index = -1, memory = []) => {
        if (ch === 'c') {
            memory.splice(index, 1, 'X');
            return {stateId: 3, memory};
        }
        else 
            return {stateId: 2, memory}; 
    }
});
tm.addState({
    stateId: 3,
    rule: (ch = '', index = -1, memory = []) => {
        return {stateId: 3, memory}; 
    }
});
// устанавливаем правило, которое сработает после того, как вся цепочка символов разобрана
tm.setEndRule((stateId = -1, memory = []) => {
    if (stateId === 0 && memory.every(item => item === 'X'))
        return {stateId: 4, memory};
    else
        return {stateId, memory};
});

console.log('a', tm.run('a'));
console.log('ab', tm.run('ab'));
console.log('abc', tm.run('abc'));
console.log('aabbcc', tm.run('aabbcc'));
console.log('aabbcec', tm.run('aabbcec'));