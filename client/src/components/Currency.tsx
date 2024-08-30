const currency = (value: any) => {
    if (value) {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    } else return 'RS 0.00'
}

export default currency