// детерминированный конечный автомат, детектирующий строки состоящие из нечетного колличества символов 'a'

const Dsm = require('../Dsm');
dsm = new Dsm(['a']); // создаем автомат, в конструктор передаем алфавит
dsm.setInitStateId(0); // добавлям идентификатор начального состояния
dsm.setEndStateId(1); // добавлям идентификатор конечного состояния
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
        if (ch === 'a')
            return 0;
        else
            return 1;
    }
});

console.log('a: ', dsm.run('a'));
console.log('aa: ', dsm.run('aa'));
console.log('aaa: ', dsm.run('aaa'));
console.log('aaaa: ', dsm.run('aaaa'));