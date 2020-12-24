// регулярное выражение, соответствующее /(\+7)|(8)[0-9]{10}$ - детектирует номера телефонов в форматах +7... и 8.....
const Fsm = require('../../lab4/Fsm');
const alphabetFsm = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+'];
fsm = new Fsm(alphabetFsm); // создаем автомат, в конструктор передаем алфавит
fsm.setInitStateId(0); // добавлям идентификатор начального состояния
fsm.setEndStateId(4); // добавлям идентификатор конечного состояния
// добавляем массив объектов состояний, 
// stateId - идентификатор, rule - правило по которому осуществляется переход в другой состояния
fsm.addState({
    stateId: 0,
    rule: (ch = '', memory = [], tree = []) => {
        if (ch === '8') {
            memory.push(ch)
            return {stateId: 1, memory, tree};
        }
        else if (ch === '+') {
            memory.push(ch)
            return {stateId: 2, memory, tree};
        }
        else
            return {stateId: 5, memory, tree};
    }
});
fsm.addState({
    stateId: 1,
    rule: (ch = '', memory = [], tree = []) => {
        if (ch !== '+') {
            memory.push(ch)
            return {stateId: 1, memory, tree};
        }
        else
            return {stateId: 5, memory, tree};
    }
});
fsm.addState({
    stateId: 2,
    rule: (ch = '', memory = [], tree = []) => {
        if (ch === '7') {
            memory.push(ch)
            return {stateId: 3, memory, tree};
        }
        else
            return {stateId: 5, memory, tree};
    }
});
fsm.addState({
    stateId: 3,
    rule: (ch = '', memory = [], tree = []) => {
        if (ch !== '+') {
            memory.push(ch)
            return {stateId: 3, memory, tree};
        }
        else
            return {stateId: 5, memory, tree};
    }
});
fsm.addState({
    stateId: 5,
    rule: (ch = '', memory = [], tree = []) => {
        return {stateId: 5, memory, tree};
    }
});
// устанавливаем правило, которое сработает после того, как вся цепочка символов разобрана
fsm.setEndRule((stateId = -1, memory = []) => {
    if (stateId === 1 && memory.length === 11)
        return {stateId: 4, memory};
    else if (stateId === 3 && memory.length === 12) {
        return {stateId: 4, memory};
    }
    else
        return {stateId, memory};
});

console.log('89616214470: ', fsm.run('89616214470').result);
console.log('+79616215349: ', fsm.run('+79616215349').result);
console.log('79616215349: ', fsm.run('79616215349').result);
console.log('adaf: ', fsm.run('adaf').result);

