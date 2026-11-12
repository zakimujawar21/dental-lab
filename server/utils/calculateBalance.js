const calculateBalance = ({
    previousBalance = 0,
    newWorkAmount = 0,
    paymentsReceived = 0,
}) => {
    const totalAmount = previousBalance + newWorkAmount;

    const remainingBalance = totalAmount - paymentsReceived;

    return {
        previousBalance,
        newWorkAmount,
        totalAmount,
        paymentsReceived,
        remainingBalance,
    };
};

module.exports = calculateBalance;