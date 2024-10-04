import React from 'react';

interface TituloBlocoProps {
    title: string;
}

const TituloBloco = ({ title }: TituloBlocoProps) => {
    return (
        <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500 text-center">
            {title}
        </p>
    );
};

export default TituloBloco;
