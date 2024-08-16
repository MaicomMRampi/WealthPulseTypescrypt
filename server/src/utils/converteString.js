const converteString = (string) => {
    // Certifica que estamos lidando com uma string
    if (typeof string !== 'string') {
        return NaN; // Retorna NaN se o valor não for uma string
    }

    console.log("🚀 ~ converteString ~ string", string);

    // Remove espaços extras (se houver)
    string = string.trim();

    // Remover pontos dos milhares e substituir vírgulas por pontos
    const valorFormatado = string.replace(/\./g, '').replace(',', '.');

    // Converter para número mantendo todos os decimais
    const valorNumber = parseFloat(valorFormatado);

    console.log("🚀 ~ Valor convertido:", valorNumber);
    return valorNumber;
}


module.exports = {
    converteString
}
