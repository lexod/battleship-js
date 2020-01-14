const battleship = (fieldSize, shipsString, shotsString) =>
    finishGame(shoot(initShips(shipsString, fieldSize), initShots(shotsString, fieldSize)));

const initShips = (shipsString) => shipsString.split(',').map(initShip);

//todo: validate shots against the field
const initShots = (shotsString, fieldSize) => shotsString.trim().split(' ');

const initShip = (shipString, fieldSize) => {
    //todo: validate ships against field and each other
    const result = {};
    const shipCoordinates = shipString.trim().split(' ');
    if (!shipCoordinates.length) {
        return result;
    }

    if (shipCoordinates.length === 1) {
        result[shipCoordinates[0]] = false;
        return result;
    }

    let i = +shipCoordinates[0].slice(0, shipCoordinates[0].length - 1),
        j = shipCoordinates[0].charCodeAt(shipCoordinates[0].length - 1),
        colBorder = +shipCoordinates[1].slice(0, shipCoordinates[0].length - 1),
        rowBorder = shipCoordinates[1].charCodeAt(shipCoordinates[0].length - 1);

    for (i; i <= colBorder; i++) {
        for (j; j <= rowBorder; j++) {
            result[`${i}${String.fromCharCode(j)}`] = false;
        }
    }

    return result;
};

const shoot = (ships, shots) => {
    while(shots.length) {
        const shot = shots[0];
        ships = ships.map(ship => {
            if (ship[shot] !== undefined) {
                ship[shot] = !ship[shot];
            }
            return ship;
        });
        shots.shift();
    }
    return ships;
};

const finishGame = (ships) => {
    let alive = 0, dead = 0;

    ships.forEach(ship => {
        Object.values(ship).includes(false) ? alive++ : '';
        !Object.values(ship).includes(false) ? dead++ : '';
    });

    return `${alive},${dead}`;
};

const assertions = [
    {size: 4, ships: '1A 1C,2C 3D', shots: '1A 1B 1C 2C 1D', expected: '1,1'},
    {size: 3, ships: '1A 1B,2C', shots: '1B', expected: '2,0'},
    {size: 12, ships: '12A 12C,3C,9G 10H', shots: '1B 12A 12B 9G 9H 10G 10H', expected: '2,1'},
];

const runTests = () => assertions.forEach(assertion =>
    console.log(`Asserting (${assertion.size}, ${assertion.ships}, ${assertion.shots}) equals ${assertion.expected}:`, assertion.expected === battleship(assertion.size, assertion.ships, assertion.shots))
);

module.exports = {
    runTests: runTests,
    battleship: battleship
};
