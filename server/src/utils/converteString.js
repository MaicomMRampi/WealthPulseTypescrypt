const converteString = (string) => {
    // Remover pontos dos milhares e substituir vírgulas por pontos
    const valorFormatado = string.replace(/\./g, '').replace(',', '.');
    // Converter para número mantendo todos os decimais
    const valorNumber = parseFloat(valorFormatado);
    return valorNumber;
}

module.exports = {
    converteString
}
