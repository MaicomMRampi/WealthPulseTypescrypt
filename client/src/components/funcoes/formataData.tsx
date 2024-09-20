function formatarData(dataBanco: any) {
    const data = new Date(dataBanco);  // Converte a string em um objeto Date

    const dia = String(data.getDate()).padStart(2, '0'); // Pega o dia e adiciona 0 à esquerda, se necessário
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Os meses são de 0 a 11, então adicionamos 1
    const ano = data.getFullYear(); // Pega o ano completo

    return `${dia}/${mes}/${ano}`; // Retorna no formato desejado
}

export default formatarData