/**
 * Задание 4: Реализовать алгоритм семантики мелких шагов для операторов языка программирования:
 * присваивание, условный оператор, оператор цикла
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
const UnitSequence = require('../SimpleLang/Units/UnitSequence');
const OperatorDoNothing = require('../SimpleLang/Operators/OperatorDoNothing')
const OperatorAssign = require('../SimpleLang/Operators/OperatorAssign');
const OperatorIf = require('../SimpleLang/Operators/OperatorIf');
const OperatorWhile = require('../SimpleLang/Operators/OperatorWhile');

const SimpleMachine = require('../SimpleLang/SimpleMachine');

// создаем выражение
const stat = new OperatorIf (
    new OperationLess(
        new TypeNumber(4),
        new OperationAdd(
            new TypeNumber(4),
            new TypeNumber(1),
        )
    ),
    new OperatorWhile(
        new OperationLess(
            new UnitVariable('x'),
            new TypeNumber(5)
        ),
        new OperatorAssign (
            'x',
            new OperationMultiply(
                new UnitVariable('x'),
                new TypeNumber(3)
            )
        )
    ),
    new UnitSequence(
        new OperatorAssign (
            'x', 
            new OperationAdd(
                new TypeNumber(1), 
                new TypeNumber(5)
            )
        ),
        new OperatorAssign (
            'y', 
            new OperationAdd(
                new UnitVariable('x'), 
                new TypeNumber(3)
            )
        )
    )
);
// задаем окружение
const env = {x: new TypeNumber(1)};
// создаем экземпляр виртуальной машины
const sm = new SimpleMachine(stat, env);
// запускаем виртуальную машину
sm.run();
console.log(sm.history);