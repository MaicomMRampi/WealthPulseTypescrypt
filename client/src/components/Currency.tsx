const currency = (value: any) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default currency