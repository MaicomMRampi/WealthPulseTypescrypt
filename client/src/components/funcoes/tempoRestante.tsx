function calculaTempoRestante(dataFutura: string) {
    const dataAtual = new Date(); // Pega a data e hora atual
    const dataDestino = new Date(dataFutura); // Converte a string da data futura em um objeto Date

    const diferencaTempo = dataDestino.getTime() - dataAtual.getTime(); // Calcula a diferença em milissegundos

    // Calcula dias, horas, minutos e segundos
    const dias = Math.floor(diferencaTempo / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencaTempo % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencaTempo % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencaTempo % (1000 * 60)) / 1000);

    // Retorna a diferença de tempo formatada
    return {
        dias,
        horas,
        minutos,
        segundos,
    };
}

export default calculaTempoRestante;