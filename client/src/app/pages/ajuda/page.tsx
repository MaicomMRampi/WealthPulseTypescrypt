"use client";
import { Listbox, ListboxItem } from '@nextui-org/react';
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import React, { useState } from 'react';
import TituloBloco from '@/components/tituloAjuda'
export default function Ajuda() {
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    return (
        <div className='w-[95%] mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-12 pt-4 gap-5'>
                <div className='col-span-2 xs:justify-center items-center w-full'>
                    <Listbox aria-label="Example with disabled actions">
                        <ListboxItem
                            key={0}
                            className={`text-center border-b-orange-100 cursor-pointer flex gap-5 ${selectedIndex === 0 ? 'bg-primaryTableText' : ''}`}
                            onClick={() => setSelectedIndex(0)}
                        >
                            Primeiros passos
                        </ListboxItem>
                        <ListboxItem
                            key={1}
                            className={`text-center border-b-orange-100 cursor-pointer flex gap-5 ${selectedIndex === 1 ? 'bg-primaryTableText' : ''}`}
                            onClick={() => setSelectedIndex(1)}
                        >
                            Módulo de despesas
                        </ListboxItem>
                        <ListboxItem
                            key={2}
                            className={`text-center border-b-orange-100 cursor-pointer flex gap-5 ${selectedIndex === 2 ? 'bg-primaryTableText' : ''}`}
                            onClick={() => setSelectedIndex(2)}
                        >
                            Módulo de patrimônio
                        </ListboxItem>
                        <ListboxItem
                            key={3}
                            className={`text-center border-b-orange-100 cursor-pointer flex gap-5 ${selectedIndex === 3 ? 'bg-primaryTableText' : ''}`}
                            onClick={() => setSelectedIndex(3)}
                        >
                            Módulo de contas
                        </ListboxItem>
                        <ListboxItem
                            key={4}
                            className={`text-center border-b-orange-100 cursor-pointer flex gap-5 ${selectedIndex === 4 ? 'bg-primaryTableText' : ''}`}
                            onClick={() => setSelectedIndex(4)}
                        >
                            Módulo de investimento
                        </ListboxItem>
                    </Listbox>
                </div>
                <div className="col-span-10">
                    <div className="">
                        {selectedIndex === 0 && (
                            <div>
                                <div className="w-full grid grid-cols-1 md:grid-cols-2 pt-4 gap-5 ">
                                    <Card>
                                        <TituloBloco
                                            title="Primeiros Passos"
                                        />
                                        <CardBody className="text-justify flex flex-col gap-7 text-default-600">
                                            <p>Para começar a aproveitar ao máximo o nosso sistema, recomendamos que você siga estes dois passos simples:</p>
                                            <p>Adicionar seu orçamento mensal: Defina seu orçamento mensal para que o sistema possa ajudar a monitorar e gerenciar suas finanças de forma mais eficaz. Com essa informação, você poderá acompanhar seus gastos e economias com maior precisão.</p>
                                            <p>Inserir sua foto de perfil: Personalize sua conta adicionando uma foto de perfil. Isso facilita sua identificação no sistema e melhora a experiência de navegação, tornando-a mais pessoal e intuitiva.</p>
                                        </CardBody>
                                    </Card>
                                    <Card>
                                        <iframe
                                            width="100%"
                                            height="315"
                                            src="https://www.youtube.com/embed/oTp8fW4XOLc?si=0lf95zdrgo2gw8GQ"
                                            title="YouTube video player"
                                            // frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen
                                        ></iframe>
                                    </Card>
                                </div>
                            </div>
                        )}
                        {selectedIndex === 1 && (
                            <div>
                                <div className="w-full grid grid-cols-1 md:grid-cols-2 pt-4 gap-5 ">
                                    <Card>
                                        <TituloBloco
                                            title="Inserindo uma Nova Despesa"
                                        />
                                        <CardBody className="text-justify flex flex-col gap-7 text-default-600">
                                            <p>O módulo de despesas foi desenvolvido para oferecer um controle detalhado dos seus gastos, organizando-os por período específico (mensal). Com ele, você poderá monitorar seus gastos em cada categoria e ajustar seu orçamento conforme necessário.</p>
                                            <p>Além disso, o sistema oferece uma funcionalidade prática para impressão dos dados. Isso facilita a geração de relatórios físicos ou digitais para revisões.</p>
                                        </CardBody>
                                    </Card>
                                    <Card>
                                        <iframe
                                            width="100%"
                                            height="315"
                                            src="https://www.youtube.com/embed/3q1G3K04jnU?si=IgNESlU0r0hdHbGG"
                                            title="YouTube video player"
                                            // frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen
                                        ></iframe>
                                    </Card>
                                </div>
                                <div className="w-full grid grid-cols-1 md:grid-cols-2 pt-4 gap-5 ">
                                    <Card>
                                        <TituloBloco
                                            title="Listando as despesas"
                                        />
                                        <CardBody className="text-justify flex flex-col gap-7 text-default-600">
                                            <p>Nesta tela, você poderá acessar todas as despesas do mês selecionado, obtendo informações detalhadas como o local da despesa, quem realizou a compra e quem efetuou o pagamento. Além disso, o sistema permite que você acompanhe essas despesas em relação ao orçamento mensal definido no módulo de controle de orçamento, conforme explicado no vídeo dos primeiros passos.</p>
                                            <p>Com esse recurso, você terá um controle mais preciso sobre suas finanças mensais, garantindo que suas despesas estejam dentro dos limites estabelecidos e que o planejamento financeiro seja cumprido de forma eficiente.</p>
                                        </CardBody>
                                    </Card>
                                    <Card>
                                        <iframe
                                            width="100%"
                                            height="315"
                                            src="https://www.youtube.com/embed/RVmPEBJi7e4?si=JAIx6I4ICuf-HsxW"
                                            title="YouTube video player"
                                            // frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen
                                        ></iframe>
                                    </Card>
                                </div>
                            </div>
                        )}
                        {selectedIndex === 2 && (
                            <div>
                                <div className="w-full grid grid-cols-1 md:grid-cols-2 pt-4 gap-5 ">
                                    <Card>
                                        <TituloBloco
                                            title="Inserindo um novo patrimônio"
                                        />
                                        <CardBody className="text-justify flex flex-col gap-7 text-default-600">
                                            <p>O módulo de patrimônio oferece um controle completo de seus bens e investimentos, permitindo gerenciar cada item de forma individualizada. Você pode adicionar despesas associadas a cada patrimônio, como manutenção, taxas e outros custos, o que proporciona uma visão detalhada dos gastos relacionados ao seu patrimônio ao longo do tempo.</p>
                                            <p>Além disso, o sistema calcula e exibe o tempo de posse de cada bem, ajudando a monitorar sua evolução e a tomar decisões estratégicas sobre venda, manutenção ou investimentos adicionais. Isso facilita o planejamento financeiro a longo prazo e o acompanhamento preciso dos seus ativos.</p>
                                        </CardBody>
                                    </Card>
                                    <Card>
                                        <iframe
                                            width="100%"
                                            height="315"
                                            src="https://www.youtube.com/embed/FuS-igSC4EU?si=C1t1E45Ji7lWs6S6"
                                            title="YouTube video player"
                                            // frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen
                                        ></iframe>
                                    </Card>
                                </div>
                                <div className="w-full grid grid-cols-1 md:grid-cols-2 pt-4 gap-5 ">
                                    <Card>
                                        <TituloBloco
                                            title="Listando patrimônios"
                                        />
                                        <CardBody className="text-justify flex flex-col gap-7 text-default-600">
                                            <p>Nesta tela, você terá uma visão geral de todos os patrimônios que foram inseridos no sistema, juntamente com o valor atual de cada um deles. Isso facilita o monitoramento de seus ativos de forma rápida e organizada. Além de visualizar o valor de cada patrimônio, você poderá acessar informações detalhadas sobre as despesas associadas e o tempo de posse de cada item, proporcionando um controle mais eficaz sobre seus bens.</p>
                                        </CardBody>
                                    </Card>
                                    <Card>
                                        <iframe
                                            width="100%"
                                            height="315"
                                            src="https://www.youtube.com/embed/h_M3r3K_vRc?si=itSO62_943-5X9ws"
                                            title="YouTube video player"
                                            // frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen
                                        ></iframe>
                                    </Card>
                                </div>
                                <div className="w-full grid grid-cols-1 md:grid-cols-2 pt-4 gap-5 ">
                                    <Card>
                                        <TituloBloco
                                            title="Inserindo uma despesa no patrimônio"
                                        />
                                        <CardBody className="text-justify flex flex-col gap-7 text-default-600">
                                            <p>Nos patrimônios, é possível adicionar despesas relacionadas, permitindo um acompanhamento detalhado dos custos associados a cada bem.</p>
                                        </CardBody>
                                    </Card>
                                    <Card>
                                        <iframe
                                            width="100%"
                                            height="315"
                                            src="https://www.youtube.com/embed/VOANEmS7apQ?si=vydqx32m4l0k9DEX"
                                            title="YouTube video player"
                                            // frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen
                                        ></iframe>
                                    </Card>
                                </div>
                                <div className="w-full grid grid-cols-1 md:grid-cols-2 pt-4 gap-5 ">
                                    <Card>
                                        <TituloBloco
                                            title="Acessando as despesas do patrimônio"
                                        />
                                        <CardBody className="text-justify flex flex-col gap-7 text-default-600">
                                            <p>Na tela de despesas, você poderá verificar todas as despesas ou investimentos que foram alocados para o patrimônio correspondente. Isso permite um acompanhamento detalhado dos custos associados a cada bem, como manutenções, taxas, melhorias e outros gastos. Com essa visão centralizada, fica mais fácil analisar o impacto financeiro de cada patrimônio e tomar decisões mais informadas sobre a gestão dos seus ativos.</p>
                                        </CardBody>
                                    </Card>
                                    <Card>
                                        <iframe
                                            width="100%"
                                            height="315"
                                            src="https://www.youtube.com/embed/twcEpUZWp78?si=NbQl9pqTZWM-dXBO"
                                            title="YouTube video player"
                                            // frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen
                                        ></iframe>
                                    </Card>
                                </div>
                            </div>
                        )}
                        {selectedIndex === 3 && (
                            <div>
                                <div className="w-full grid grid-cols-1 md:grid-cols-2 pt-4 gap-5 ">
                                    <Card>
                                        <TituloBloco
                                            title="Inserindo uma nova conta"
                                        />
                                        <CardBody className="text-justify flex flex-col gap-7 text-default-600">
                                            <p>
                                                No módulo de contas, você pode inserir contas parceladas ou que estão próximas ao vencimento, oferecendo um controle eficiente das suas obrigações financeiras. O sistema conta com uma função de aviso, que exibe lembretes de contas próximas ao vencimento diretamente na tela inicial, ajudando você a evitar atrasos.
                                            </p>
                                            <p>
                                                Além disso, o parcelamento de contas é feito automaticamente, garantindo que cada parcela seja gerenciada corretamente no sistema, sem a necessidade de intervenção manual. Isso facilita a organização de suas finanças, especialmente em situações que envolvem pagamentos recorrentes.
                                            </p>
                                        </CardBody>
                                    </Card>
                                    <Card>
                                        <iframe
                                            width="100%"
                                            height="315"
                                            src="https://www.youtube.com/embed/58_GRE2qvCg?si=wF9oJkgOB4JY6YvK"
                                            title="YouTube video player"
                                            // frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen
                                        ></iframe>
                                    </Card>
                                </div>
                                <div className="w-full grid grid-cols-1 md:grid-cols-2 pt-4 gap-5 ">
                                    <Card>
                                        <TituloBloco
                                            title="Listando as contas"
                                        />
                                        <CardBody className="text-justify flex flex-col gap-7 text-default-600">
                                            <p>
                                                Na tela de listagem de contas, você pode selecionar o mês desejado para visualizar tanto as contas atuais quanto as dos meses anteriores. Isso facilita o acompanhamento de seus pagamentos ao longo do tempo, permitindo uma visão clara das despesas passadas e futuras. Além disso, o sistema oferece a opção de imprimir as contas listadas, proporcionando praticidade para gerar relatórios físicos ou digitais conforme necessário.
                                            </p>
                                        </CardBody>
                                    </Card>
                                    <Card>
                                        <iframe
                                            width="100%"
                                            height="315"
                                            src="https://www.youtube.com/embed/8BSu_-Et7gw?si=3ZyJyU06WPMH86im"
                                            title="YouTube video player"
                                            // frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen
                                        ></iframe>
                                    </Card>
                                </div>
                            </div>
                        )}
                        {selectedIndex === 4 && (
                            <div className="w-full grid grid-cols-1 md:grid-cols-2 pt-4 gap-5 ">
                                <Card>
                                    <TituloBloco
                                        title="Inserindo um novo investimento"
                                    />
                                    <CardBody className="text-justify flex flex-col gap-7 text-default-600">
                                        <p>
                                            O módulo de investimento permite que você gerencie e acompanhe seus investimentos, incluindo ações, fundos imobiliários, renda fixa, criptomoedas e outros ativos financeiros.
                                        </p>
                                        <p>
                                            Além disso, o sistema oferece a funcionalidade de armazenar os lucros obtidos, especificamente de fundos imobiliários e ações, facilitando o controle dos ganhos e proporcionando uma visão clara sobre os rendimentos acumulados ao longo do tempo.
                                        </p>
                                    </CardBody>
                                </Card>
                                <Card>
                                    <iframe
                                        width="100%"
                                        height="315"
                                        src="https://www.youtube.com/embed/yjlB5hyjqXQ?si=sS7TFOzwRcxOwakM"
                                        title="YouTube video player"
                                        // frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        allowFullScreen
                                    ></iframe>
                                </Card>
                                <Card>
                                    <TituloBloco
                                        title="Listando os investimentos"
                                    />
                                    <CardBody className="text-justify flex flex-col gap-7 text-default-600">
                                        <p>
                                            A listagem de investimentos no sistema é projetada para proporcionar uma experiência intuitiva e eficiente para o usuário. Cada linha da tabela exibe os investimentos cadastrados, permitindo uma visualização clara e acessível das opções disponíveis. Os usuários podem filtrar os investimentos por tipo, facilitando a localização de categorias específicas que atendem às suas necessidades.
                                        </p>
                                        <p>
                                            Para cada investimento listado, existem botões que possibilitam ações relevantes, como a opção de Sacar/Vencido e Vender Cotas. A escolha de Sacar/Vencido permite que o usuário retire o valor do investimento, seja pelo vencimento ou pela opção de saque antecipado, o que resulta na remoção do investimento da lista, enquanto um histórico da transação é mantido.
                                        </p>
                                    </CardBody>
                                </Card>
                                <Card>
                                    <iframe
                                        width="100%"
                                        height="315"
                                        src="https://www.youtube.com/embed/RH5CgJxHJCU?si=e-W7Dnt3Zp9ebQck"
                                        title="YouTube video player"
                                        // frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        allowFullScreen
                                    ></iframe>
                                </Card>
                                <Card>
                                    <TituloBloco
                                        title="Histórico de transação"
                                    />
                                    <CardBody className="text-justify flex flex-col gap-7 text-default-600">
                                        <p>
                                            O histórico de transações, oferece uma visão abrangente e detalhada de todas as operações realizadas pelo usuário ao longo do tempo. Essa ferramenta é projetada para garantir a transparência e a eficiência na gestão de investimentos.
                                        </p>
                                    </CardBody>
                                </Card>
                                <Card>
                                    <iframe
                                        width="100%"
                                        height="315"
                                        src="https://www.youtube.com/embed/DE7f-_2E6tk?si=gEHKrzDRxRwIswQL"
                                        title="YouTube video player"
                                        // frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        allowFullScreen
                                    ></iframe>
                                </Card>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
