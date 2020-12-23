const Fsm = require('../Fsm');
fsm = new Fsm(['(', ')', '{', '}', '[', ']']); // создаем автомат, в конструктор передаем алфавит
fsm.setInitStateId(0); // добавлям идентификатор начального состояния
fsm.setEndStateId(3); // добавлям идентификатор конечного состояния
// добавляем массив объектов состояний, 
// stateId - идентификатор, rule - правило по которому осуществляется переход в другой состояния
fsm.addState({
    stateId: 0,
    rule: (ch = '', memory = [], tree = []) => {
        if (ch === '(' || ch === '{') {
            memory.push(ch)
            return {stateId: 1, memory, tree};
        }
        else
            return {stateId: 0, memory, tree};
    }
});
fsm.addState({
    stateId: 1,
    rule: (ch = '', memory = [], tree = []) => {
        if (ch === '(' || ch === '{' || ch === '[') {
            memory.push(ch);
            return {stateId: 1, memory, tree};
        }
        else if (memory.length !== 0) {
            let memoryItemTop = memory[memory.length - 1];
            if (memoryItemTop === '{' && ch === '}') {
                memory.pop();
                tree.push('{}');
                return {stateId: 1, memory, tree};
            }
            else if (memoryItemTop === '(' && ch === ')') {
                memory.pop();
                tree.push('()');
                return {stateId: 1, memory, tree};
            }
            else if (memoryItemTop === '[' && ch === ']') {
                memory.pop();
                tree.push('[]');
                return {stateId: 1, memory, tree};
            }
            else
                return {stateId: 1, memory, tree};
        }
        else if (ch === ')' || ch === '}' || ch === ']')
            return {stateId: 2, memory, tree};
    }
});
fsm.addState({
    stateId: 2,
    rule: (ch = '', memory = [], tree = []) => {
        return {stateId: 2, memory, tree};
    }
});
// устанавливаем правило, которое сработает после того, как вся цепочка символов разобрана
fsm.setEndRule((stateId = -1, memory = []) => {
    if (stateId === 1 && memory.length === 0)
        return {stateId: 3, memory};
    else
        return {stateId, memory};
});


console.log('({[}): ', fsm.run('({[})'));
console.log('({[]}): ', fsm.run('({[]})'));
console.log('({}): ', fsm.run('({})'));
console.log('({[()]}): ', fsm.run('({[()]})'));