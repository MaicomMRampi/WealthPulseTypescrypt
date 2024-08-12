import React from 'react'

export default function MeusFundosImobiliarios() {
    const [rendaFii, setRendaFii] = useState([]);
    const buscaFii = async () => {
        if (emailUser) {
            const response = await api.post(`/getfiihome`, {
                emailUser
            })

            setRendaFii(response.data)
        }
    }
    useEffect(() => {
        if (emailUser) {
            buscaFii()
        }

    }, [emailUser])

    const dadosAgrupados = rendaFii && rendaFii.reduce((acc, item) => {
        const { nomefii, quantidade } = item;

        // Se o grupo ainda não existir, crie-o
        if (!acc[nomefii]) {
            acc[nomefii] = {
                nomefii,
                totalQuantidade: quantidade,
            };
        } else {
            // Se o grupo já existir, atualize o totalQuantidade
            acc[nomefii].totalQuantidade += quantidade;
        }

        return acc;
    }, {});

    // Converta o objeto de dados agrupados de volta para um array
    const arrayAgrupado = Object.values(dadosAgrupados);

    const data = arrayAgrupado && arrayAgrupado.map(item => ({
        name: item.nomefii,  // Agora usa o nomefii no eixo X
        value: item.totalQuantidade,  // Usa a quantidade no eixo Y
    }));




    return (
        // {/* <PieChart>
        //                     <Pie
        //                         data={data}
        //                         cx="50%"
        //                         cy="50%"
        //                         labelLine={false}
        //                         label={renderCustomizedLabel}
        //                         outerRadius={60}
        //                         fill="#fffffa"
        //                         dataKey="value"
        //                     >
        //                         {data.map((entry, index) => (
        //                             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        //                         ))}
        //                     </Pie>
        //                     <Legend arabicForm='terminal' display="flex" layout="vertical" align="right" verticalAlign="middle" />
        //                 </PieChart> */}
    )
}
