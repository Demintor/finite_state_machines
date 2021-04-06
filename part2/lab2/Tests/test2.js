/**
 * Задание 3: Реализовать алгоритм семантики мелких шагов для вычисления алгебраических
 * выражений
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
const exp = new OperationOr (
    new OperationAnd(
        new OperationLess(
            new OperationMultiply(
                new OperationAdd(
                    new OperationSubtraction(
                        new TypeNumber(3), 
                        new TypeNumber(4)
                    ), 
                    new TypeNumber(2)
                ),
                new OperationDivision(new TypeNumber(6), new TypeNumber(2))
            ), 
            new TypeNumber(4)
        ),
        new OperationNot(
            new OperationMore(
                new UnitVariable('x'),
                new UnitVariable('y')
            )
        )
    ),
    new TypeBoolean(true)
);
// задаем окружение
const env = {x: new TypeNumber(11), y: new TypeNumber(2)};
// создаем экземпляр виртуальной машины
const sm = new SimpleMachine(exp, env);
// запускаем виртуальную машину
sm.run();
console.log(sm.history);