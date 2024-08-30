function calcularTempo(dataAquisicao: string) {

    if (!dataAquisicao) return null;

    const agora = new Date();
    const data = new Date(dataAquisicao);
    const anos = agora.getFullYear() - data.getFullYear();
    const meses = agora.getMonth() - data.getMonth();
    const dias = agora.getDate() - data.getDate();

    let tempo = {
        anos: anos,
        meses: meses < 0 ? meses + 12 : meses,
        dias: dias < 0 ? dias + 30 : dias
    };

    if (dias < 0) {
        tempo.meses--;
    }
    if (meses < 0) {
        tempo.anos--;
    }

    return `${tempo.anos} anos, ${tempo.meses} meses e ${tempo.dias} dias`;
}

export default calcularTempo