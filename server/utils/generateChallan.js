const generateChallan = async () => {
    const Case = require("../models/Case");

    let challanNumber;
    let exists = true;

    while (exists) {
        challanNumber = `CH-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;

        exists = await Case.exists({ challanNumber });
    }

    return challanNumber;
};

module.exports = generateChallan;