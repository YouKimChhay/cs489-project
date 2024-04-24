const format_money = (money) => {
    if (!money) return 0;
    return money.toLocaleString("en-US", {style: "currency", currency: "USD"});
}

const Utils = {
    format_money
}

export default Utils;