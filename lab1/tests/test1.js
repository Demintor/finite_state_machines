// детерминированный конечный автомат, детектирующий строки, которые содержат в себе подстроку 'ab'

const Dsm = require('../Dsm');
dsm = new Dsm(['a', 'b']); // создаем автомат, в конструктор передаем алфавит
dsm.setInitStateId(0); // добавлям идентификатор начального состояния
dsm.setEndStateId(2); // добавлям идентификатор конечного состояния
// добавляем массив объектов состояний, 
// stateId - идентификатор, rule - правило по которому осуществляется переход в другой состояния
dsm.addState({
    stateId: 0,
    rule: (ch) => {
        if (ch === 'a')
            return 1;
        else
            return 0;
    }
});
dsm.addState({
    stateId: 1,
    rule: (ch) => {
        if (ch === 'b')
            return 2;
        else
            return 1;
    }
});
dsm.addState({
    stateId: 2,
    rule: (ch) => {
        return 2;
    }
}); 

console.log('a: ', dsm.run('a'));
console.log('ab: ', dsm.run('ab'));
console.log('aaaaaaaab: ', dsm.run('aaaaaaaab'));
console.log('baaaaaaaaa: ', dsm.run('baaaaaaaaa'));