/** Задание 2: Реализовать алгоритм мелких шагов сворачивания для синтаксического дерева,
представленного одним объектом на примере простых арифметических выражений. 
(см.книгу Тома Стюарта)
 */
const TypeNumber = require('../SimpleLang/Types/TypeNumber');
const TypeBoolean = require('../SimpleLang/Types/TypeBoolean');
const OperationAdd = require('../SimpleLang/Operations/OperationAdd');
const OperationMultiply = require('../SimpleLang/Operations/OperationMultiply');
const OperationSubtraction = require('../SimpleLang/Operations/OperationSubtraction');
const OperationDivision = require('../SimpleLang/Operations/OperationDivision');
const OperationLess = require('../SimpleLang/Operations/OperationLess');
const OperationMore = require('../SimpleLang/Operations/OperationMore');
const OperationAnd = require('../SimpleLang/Operations/OperationAnd');
const OperationOr = require('../SimpleLang/Operations/OperationOr');
const OperationNot = require('../SimpleLang/Operations/OperationNot');
const UnitVariable = require('../SimpleLang/Units/UnitVariable');

const SimpleMachine = require('../SimpleLang/SimpleMachine');

// создаем выражение
const exp = new OperationMultiply(
    new OperationAdd(
        new OperationSubtraction(
            new TypeNumber(3), 
            new TypeNumber(4)
        ), 
        new TypeNumber(2)
    ),
    new OperationDivision(new TypeNumber(6), new TypeNumber(2))
)
// создаем экземпляр виртуальной машины
const sm = new SimpleMachine(exp);
// запускаем виртуальную машину
sm.run();
console.log(sm.history);