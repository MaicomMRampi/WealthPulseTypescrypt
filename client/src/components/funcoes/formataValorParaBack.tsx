function formatarParaBackend(valor: string) {
    if (valor) {
        valor = valor.replace(/\./g, ''); // remove pontos
        valor = valor.replace(',', '.'); // substitui a vírgula pelo ponto
    }

    return parseFloat(valor);
}

export default formatarParaBackend