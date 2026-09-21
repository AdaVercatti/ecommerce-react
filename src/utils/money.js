    const moneyFormat = (moneyPriceCents) =>{
        return (`${(moneyPriceCents /100).toFixed(2)}`)
    }

    export default moneyFormat