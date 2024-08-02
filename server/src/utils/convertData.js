function formatDate(data) {
    const year = data.year;
    const month = String(data.month).padStart(2, '0'); // adiciona zero à esquerda se necessário
    const day = String(data.day).padStart(2, '0'); // adiciona zero à esquerda se necessário


    return `${year}/${month}/${day}`
}
module.exports = formatDate

