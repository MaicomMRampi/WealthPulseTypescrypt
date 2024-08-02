import React from 'react';

interface TitlePageProps {
    title: string;
}

const TitlePage: React.FC<TitlePageProps> = ({ title }) => {
    return (
        <h1 className="text-2xl font-bold text-center py-4 text-buttonAzulClaro">
            {title}
        </h1>
    );
}

export default TitlePage;
