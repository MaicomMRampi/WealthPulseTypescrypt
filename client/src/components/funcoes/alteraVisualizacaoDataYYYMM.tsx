import React from 'react'

export default function AlteraVisualizacaoDataYYYYMM(data: string) {
    const [year, month] = data.split('-');
    return `${month}/${year}`;
}
