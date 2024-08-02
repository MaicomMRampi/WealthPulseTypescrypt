function cpfMask(cpf: string) {
    if (cpf) {
        cpf = cpf.replace(/\D/g, '') // remove caracteres não numéricos
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2') // adiciona ponto após o terceiro dígito
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2') // adiciona ponto após o terceiro dígito
        cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2') // adiciona ponto após o terceiro dígito
    }

    return cpf
}

function valorMask(valor: string) {
    if (valor) {
        valor = valor.replace(/\D/g, ''); // remove caracteres não numéricos
        valor = (parseInt(valor) / 100).toFixed(2); // divide por 100 e fixa duas casas decimais
        valor = valor.replace('.', ','); // substitui o ponto pela vírgula
        valor = valor.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'); // adiciona ponto a cada três dígitos
    }

    return valor;
}



function formatarNumero(numeroStr: any) {
    // Remove caracteres não numéricos
    numeroStr = numeroStr.replace(/\D/g, '');

    // Inverte a string para facilitar a formatação
    let numeroInvertido = numeroStr.split('').reverse().join('');

    // Insere os pontos a cada 3 caracteres
    let numeroFormatado = numeroInvertido.match(/.{1,3}/g).join('.');

    // Inverte novamente para a forma correta
    return numeroFormatado.split('').reverse().join('');
}






export { cpfMask, valorMask, formatarNumero }