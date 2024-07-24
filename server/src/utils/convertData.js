function formatDate(data) {
    const year = data.year;
    const month = String(data.month).padStart(2, '0'); // adiciona zero à esquerda se necessário
    const day = String(data.day).padStart(2, '0'); // adiciona zero à esquerda se necessário

    return `${day}-${month}-${year}`;
}
module.exports = formatDate

