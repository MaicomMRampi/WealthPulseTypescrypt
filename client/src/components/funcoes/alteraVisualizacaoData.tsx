import React from 'react'

export default function AlteraVisualizacaoData(data: string) {
    const [year, month, day] = data.split('/');
    return `${day}/${month}/${year}`;
}
