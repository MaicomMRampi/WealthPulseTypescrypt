const router = require('express').Router()
const dbConnect = require('../utils/dbConnect')
const UsuariosSchema = require('../models/usuarios  OK')
const InvestimentosFiiSchema = require('../models/investimentosfii OK')
const ControleContasSchema = require('../models/controleContas OK')
const DividendosSchema = require('../models/dividendos OK')
const { crypto } = require('../utils/password')
const { converteString } = require('../utils/converteString')
const bcrypt = require('bcryptjs')
const formatDate = require('../utils/convertData')
const prisma = require('../utils/dbConnect')
const jwt = require('jsonwebtoken');
const ex = require('express')
const multer = require('multer')
const path = require('path')



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Define o diretório de destino
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // Obtém o nome original do arquivo e sua extensão
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext);

        // Define o nome do arquivo a ser salvo (somente nome e extensão)
        cb(null, `${name}${ext}`);
    }
});

const upload = multer({ storage: storage });


//=====================MERCADO PAGO API=====================
const createCharge = async ({ accessToken, paymentData }) => {
    const axios = require('axios');

    try {
        const paymentConfig = {
            transaction_amount: 0.01, // Valor total da compra
            payment_method_id: 'pix',
            payer: {
                first_name: paymentData.name,
                email: paymentData.email,
            },
        };

        const data = JSON.stringify(paymentConfig);


        const config = {
            method: 'post',
            url: 'https://api.mercadopago.com/v1/payments',
            headers: {
                'Content-Type': 'application/json',
                'X-Idempotency-Key': paymentData.id, // Controle para não repetir 2x a mesma cobrança
                Authorization: `Bearer ${accessToken}`,
            },
            data: data,
        };

        const response = await axios(config);

        return response.data;
    } catch (err) {
        console.error(err);
        return null;
    }
};

const verifyPaymentStatus = async ({ idPagamento, accessToken }) => {
    const axios = require('axios')
    const id = idPagamento
    const tokenMercadoPago = accessToken

    try {
        if (!id) throw new Error('Id da cobrança vazio')
        if (!tokenMercadoPago) {
            throw new Error('Erro ao verificar o status do pagamento')
        }
        const response = await axios.get(`https://api.mercadopago.com/v1/payments/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenMercadoPago}`
                }
            })

        return response.data
    } catch (err) {
        console.error(err);
        return null;
    }
}

router.get('/api/verificapagamento', async (req, res) => {
    const accessToken = req.query.accessToken
    const idPagamento = req.query.idPagamento
    try {
        if (!accessToken || !idPagamento) {
            return res.status(400).json({ error: 'Dados inválidos.' });
        }
        const paymentResponse = await verifyPaymentStatus({ idPagamento, accessToken });
        if (!paymentResponse) {
            return res.status(500).json({ error: 'Erro ao Verificar pagamento.' });
        }
        res.status(200).json(paymentResponse);
    } catch (err) {
        console.error("Erro na rota /api/verificar pagamento:", err);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }

});





router.put('/api/alterapagamento', async (req, res) => {
    const id = req.body.id
    console.log("🚀 ~ router.put ~ id", id)
    try {
        const alteraStatusFinanceiro = await prisma.Usuario.update({
            where: {
                id: id
            },
            data: {
                statusFinanceiro: 0
            }
        })
    } catch (err) {
        console.error("Erro em alterar status financeiro", err);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});
router.post('/api/geracobranca', async (req, res) => {
    const { accessToken, paymentData } = req.body

    try {
        if (!accessToken || !paymentData) {
            return res.status(400).json({ error: 'Dados inválidos.' });
        }
        const paymentResponse = await createCharge({ accessToken, paymentData });
        if (!paymentResponse) {
            return res.status(500).json({ error: 'Erro ao gerar a cobrança.' });
        }
        res.status(200).json(paymentResponse);
    } catch (err) {
        console.error("Erro na rota /api/geracobranca:", err);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});

router.get('/api/buscaultimapagamento', async (req, res) => {
    try {
        const iDUsuario = req.query.id
        console.log("🚀 ~ router.get ~ iDUsuario", iDUsuario)
        const buscaPagamento = await prisma.UsuarioPagamento.findFirst({
            where: {
                idUser: parseInt(iDUsuario), // Buscar pelo siDUsuario
            },
            orderBy: {
                id: 'desc',  // Ordena pelo ID em ordem decrescente para pegar o último registro
            }
        })

        res.json(buscaPagamento)
    } catch (error) {
        res.json(error)
    }
});


// =============================================

router.post('/api/criapagamento', async (req, res) => {
    try {
        const idUsuario = req.body

        const pagamentoCreate = await prisma.UsuarioPagamento.create({
            data: {
                idUser: idUsuario,
                metodoPagamento: 'Pix',
                dataCadastroUsuario: new Date(),
                dataExpiracao: firstPay,
                dataExpiracaoFree: avaliacaoGratuita,
                testeFree: 1,
            }
        })

        res.status(200).json({ message: 'Pagamento Executado' })

    } catch (error) {

    }
});
router.post('/api/postpagamento', async (req, res) => {

    const chamaFuncao = (data) => {
        const dataAtual = new Date();
        const dataVenci = new Date(data);
        // Se a data atual for maior que a data de vencimento
        if (dataAtual.getTime() > dataVenci.getTime()) {
            // Adiciona 30 dias à data atual
            dataAtual.setDate(dataAtual.getDate() + 30);
            return dataAtual;
        } else {
            // Adiciona 1 mês à data de vencimento
            dataVenci.setMonth(dataVenci.getMonth() + 1);
            return dataVenci;
        }
    }

    try {
        const dadosPagamento = req.body;
        console.log("🚀 ~ router.post ~ idUsuario", dadosPagamento);
        // ATUALIZA O PAGAMENTO QUE ESTAVA VENCIDO ============
        const buscaPagamentoPendente = await prisma.UsuarioPagamento.update({
            where: {
                id: dadosPagamento.idPagamento.id
            },
            data: {
                valorPago: 0.01,
                dataPagamento: new Date(),
                status: 1,
                idUser: dadosPagamento.idPagamento.idUser

            }
        });
        // CRIA UM NOVO PAGAMENTO ============
        const tipo = typeof dadosPagamento.idPagamento.idUser
        console.log("🚀 ~ router.post ~ tipo", tipo)

        const criaNovoPagamento = await prisma.UsuarioPagamento.create({
            data: {
                valorPago: 0.00,
                dataPagamento: new Date(),
                dataExpiracao: chamaFuncao(dadosPagamento.idPagamento.dataExpiracao),
                status: 0,
                idUser: dadosPagamento.idPagamento.idUser,
                metodoPagamento: 'Pix'
            }
        });

        // ALTERA DADOS NA TABELA DO USUARIO

        const alteraDadosUsuario = await prisma.Usuario.update({
            where: {
                id: dadosPagamento.idPagamento.idUser
            },
            data: {
                dataExpiracao: chamaFuncao(dadosPagamento.idPagamento.dataExpiracao),
                statusFinanceiro: 1
            }
        })

        res.status(200).json({ message: 'Pagamento Executado' });

    } catch (error) {
        console.log("🚀 ~ router.post ~ error", error);
        res.status(500).json({ message: 'Erro no processamento do pagamento' });
    }
});



// =====================Login ============

router.post('/api/login', async (req, res) => {
    const data = req.body.values; // Ajuste para acessar corretamente os dados do corpo da requisição

    try {
        const user = await prisma.usuario.findUnique({
            where: {
                cpf: data.cpf, // Buscar pelo CPF fornecido na requisição
            },
        });

        if (!user) {
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        }
        const comparaSenha = await bcrypt.compareSync(data.senha, user.senha)

        if (!comparaSenha) {
            return res.status(401).json({ erro: 'Senha incorreta' });
        }
        const token = jwt.sign(
            { userId: user },   // Dados que você deseja incluir no token
            'secreto',           // Chave secreta para assinar o token (deve ser mantida segura)
            { expiresIn: '1h' }  // Opções do token, como tempo de expiração
        );

        // Enviar o token JWT como parte da resposta
        res.status(200).json({
            mensagem: 'Login bem-sucedido',
            token: token,
            usuario: {
                nome: user.nome,
                email: user.email,
                id: user.id,
                openModal: user.openModal,


            },
            expirarEm: token.expiresIn
        });
    } catch (error) {
        console.error('Erro ao processar o login:', error);
        res.status(500).json({ erro: 'Erro interno ao processar o login' });
    }

});

// +++++++++++++++++API DO USUARIO+++++++++++++++++++++++++++++++
router.post('/api/postusers', async (req, res) => {

    const dadosCadastro = req.body


    const avaliacaoGratuita = new Date();
    avaliacaoGratuita.setDate(avaliacaoGratuita.getDate() + 15);
    const firstPay = new Date();
    firstPay.setMonth(firstPay.getMonth() + 1);

    // INSERE DADOS NA TABELA DE PAGAMENTO USUARIOS//

    try {
        const { nome, cpf, email, senha } = req.body
        const nomeFormatado = nome.toUpperCase().trim()
        const emailFormatado = email.trim()
        const senhaCripto = await crypto(senha)
        const emailExists = await prisma.usuario.findUnique({ where: { email: emailFormatado } });
        const cpfExists = await prisma.usuario.findUnique({ where: { cpf } });
        if (emailExists) {
            return res.status(401).json({ message: 'E-mail Já Cadastrado' })
        }
        if (cpfExists) {
            return res.status(401).json({ message: 'CPF Já Cadastrado' })
        }
        const novoUsuario = await prisma.usuario.create({
            data: {
                nome: nomeFormatado,
                cpf,
                email: emailFormatado,
                senha: senhaCripto.toString('hex'),
                openModal: 1,
                dataExpiracao: avaliacaoGratuita,
                datacadastro: new Date(),
                statusFinanceiro: 1,
            },
        });


        const pagamentoCreate = await prisma.UsuarioPagamento.create({
            data: {
                idUser: novoUsuario.id,
                metodoPagamento: 'Pix',
                dataExpiracao: avaliacaoGratuita,
                status: 1,
            }
        })
        res.status(200).json({ message: 'Usuário Salvo com Sucesso !' });
    } catch (error) {
        console.error("Erro ao criar produto:", error);

    }
})
router.post('/api/atualizacadastro', async (req, res) => {
    const dados = req.body

    try {
        const response = await prisma.usuario.update({
            where: {
                id: parseInt(dados.id)
            },
            data: {
                nome: dados.values.nome,
                email: dados.values.email,
                valorOrcamentoMensal: converteString(dados.values.valorOrcamentoMensal)
            }
        })
        res.status(200).json({ message: 'Atualizado com sucesso!' });
    } catch (error) {

    }
});
router.post('/api/upload', upload.single('image'), async (req, res) => {
    const file = req.file;
    const userId = req.body.id;
    if (!file) {
        return res.status(400).send('Nenhum arquivo enviado.');
    }

    // Nome do arquivo e extensão
    const fileName = file.filename;

    const fileExtension = path.extname(file.originalname).slice(1);

    const salvaUrlImagen = await prisma.usuario.update({
        where: {
            id: parseInt(userId)
        },
        data: {
            imageUrl: `${fileName}`
        }
    })

    res.status(200).json({
        message: 'Upload realizado com sucesso!',
        fileName: fileName, // Nome do arquivo salvo
        fileExtension: fileExtension // Extensão do arquivo
    });
});
router.put('/api/fechamodalboasvindas', async (req, res) => {
    const id = req.body.id
    const atualizaValorModal = await prisma.Usuario.update({
        where: {
            id: id
        },
        data: {
            openModal: 0
        }
    })

});



// === patrimônio============

router.post('/api/postpatrimonio', async (req, res) => {
    const dados = req.body;

    try {
        const nomeUper = dados.dados.nome.toUpperCase()


        const valorPatr = converteString(dados.dados.valor)
        const patrimonio = await prisma.patrimonio.create({
            data: {
                nomePatrimonio: nomeUper,
                tipoPatrimonio: dados.dados.tipopatrimonio,
                valorPatrimonio: valorPatr,
                dataAquisicao: formatDate(dados.dados.dataaquisicao),
                idUser: dados.token
            }
        })

        return res.status(200).json({ message: 'Patrimonio Cadastrado com Sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao Cadastrar Patrimonio', error });
    }
})
router.get('/api/buscabem', async (req, res) => {
    try {
        const dados = req.query.id;


        const buscaPatrimonio = await prisma.patrimonio.findMany({ where: { idUser: parseInt(dados) } })
        res.status(200).json(buscaPatrimonio);
    } catch (error) {
        console.error("🚀 ~ router.get ~ error", error); // Loga o erro no console
        res.status(500).json({ message: 'Erro ao buscar patrimônio.' }); // Retorna uma resposta de erro
    }
});

router.post('/api/despesadeconsumo', async (req, res) => {

    try {

        const dados = req.body;


        const novaDespesaDeBem = await prisma.despesaDeBens.create({
            data: {
                idPatrimonio: parseInt(dados.values.nomepatrimonio),
                observacao: dados.values.observacao,
                kmAntigo: dados.values.kmAntigo,
                kmAtual: dados.values.kmAtual,
                tipoDespesaId: parseInt(dados.values.tipodespesa),
                valor: converteString(dados.values.valorgasto),
                responsavel: dados.values.responsavel,
                dataAquisicao: formatDate(dados.values.dataaquisicao),
                compradorPagador: dados.values.compradorPagador,
                idUser: parseInt(dados.id),
                observacaoInativacao: '',
                inativo: 0
            },
        });


        return res.status(200).json({ message: 'Despesa de Bem Cadastrada com Sucesso' });
    } catch (error) {
        console.error('Erro ao Cadastrar Despesa de Bem:', error);
        return res.status(500).json({ message: 'Erro ao Cadastrar Despesa de Bem', error });
    }
});

router.put('/api/inativarpatrimonio', async (req, res) => {
    const dados = req.body;
    try {
        const novaDespesaDeBem = await prisma.DespesaDeBens.update({
            where: {
                id: dados.dados
            },
            data: {
                observacaoInativacao: dados.observacao,
                inativo: 1
            },
        });
        return res.status(200).json({ message: 'Despesa de Bem Cadastrada com Sucesso' });
    } catch (error) {
        console.error('Erro ao Cadastrar Despesa de Bem:', error);
        return res.status(500).json({ message: 'Erro ao Cadastrar Despesa de Bem', error });
    }
});

router.get('/api/detalhespatrimonio', async (req, res) => {
    try {
        const dados = req.query.id;

        const despesasPatrimonio = await prisma.DespesaDeBens.findMany({
            where: {
                idPatrimonio: parseInt(dados),
            },
            include: {
                TipoDespesa: true,
                Patrimonio: true
            }
        });

        res.status(200).json(despesasPatrimonio);
    } catch (error) {
        console.error('Erro ao buscar despesas do patrimônio:', error);
        res.status(500).json({ message: 'Despesas não encontradas' });
    }
});
router.get('/api/detalhespatrimoniohome', async (req, res) => {
    try {
        const dados = req.query.id;

        const despesasPatrimonio = await prisma.Patrimonio.findMany({
            where: {
                idUser: parseInt(dados),
            }
        });
        res.status(200).json(despesasPatrimonio);
    } catch (error) {
        console.error('Erro ao buscar despesas do patrimônio:', error);
        res.status(500).json({ message: 'Despesas não encontradas' });
    }
});

router.get('/api/buscadespesasdetalhesnome', async (req, res) => {
    try {
        const dados = req.query.id;

        const despesasPatrimonio = await prisma.patrimonio.findMany({ where: { id: parseInt(dados) } })

        res.status(200).json(despesasPatrimonio);
    }
    catch (error) {
        console.error('Erro ao Cadastrar Despesa de Bem:', error);
        res.status(500).json({ message: 'Despesas não encontradas' })
    }
});

router.delete('/api/deletapatrimonio', async (req, res) => {
    try {
        const dados = req.query.id;


        const deletaDespesa = await prisma.Patrimonio.delete({
            where: {
                id: parseInt(dados)
            }
        });


        res.status(200).json({ message: 'Despesa deletada com sucesso!', deletaDespesa });
    } catch (error) {
        if (error.code === 'P2003') {
            res.status(500).json({ error: 'Patrimônio possui despesas associadas' });
        } else {
            res.status(500).json({ error: 'Erro ao deletar patrimônio.' });
        }
    }
});
router.delete('/api/deletadespesapatrimonio', async (req, res) => {
    try {
        const dados = req.query.id;


        const deletaDespesa = await prisma.DespesaDeBens.delete({
            where: {
                id: parseInt(dados)
            }
        });

        res.status(200).json({ message: 'Despesa deletada com sucesso!', deletaDespesa });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar despesa.' });
    }
});




// ===========================

// ============Tipo Despesa ======
router.post('/api/novotipodespesa', async (req, res) => {
    const value = req.body

    try {//     
        const novoTipoDespesa = await prisma.TipoDespesa.create({
            data: {
                nomeDespesa: value.value.toUpperCase(),
                idUser: parseInt(value.id),
            }
        })
        return res.status(200).json({ message: 'Tipo de Despesa Cadastrado com Sucesso' });
    } catch (error) {
        console.error('Erro ao Cadastrar Tipo de Despesa:', error);
        return res.status(500).json({ message: 'Erro ao Cadastrar Tipo de Despesa' });
    }
})
router.get('/api/buscatipodespesa', async (req, res) => {
    try {
        const dados = req.query.id;
        const buscaTipoDespesa = await prisma.TipoDespesa.findMany({ where: { idUser: parseInt(dados) } })

        res.status(200).json(buscaTipoDespesa);
    } catch (error) {
        console.error("🚀 ~ router.get ~ error", error); // Loga o erro no console
        res.status(500).json({ message: 'Erro ao buscar patrimônio.' }); // Retorna uma resposta de erro
    }
})
router.delete('/api/deletatipodespesa', async (req, res) => {
    const data = req.body;


    try {
        const deletaBanco = await prisma.TipoDespesa.delete({
            where: {
                idUser: parseInt(data.id),
                id: parseInt(data.idBanco)
            }
        });
        res.status(200).json({ message: 'Tipo Despesa Deletado ' });
    } catch (error) {

        res.status(400).json({ message: 'Tipo despesa sendo usada' });
    }
});




// ============================






// ==============  FUNDOS IMOBILIARIOS ==========

router.post('/api/novonome', async (req, res) => {
    const dados = req.body;
    try {
        const nome = dados.nomefundo.toUpperCase().trim();
        const idUser = parseInt(dados.id); // Obtenha o ID do usuário da requisição
        const buscaNome = await prisma.NomeFundoImobiliario.findMany({
            where: {
                nomeFundo: nome,
                idUser: idUser // Inclua o ID do usuário na consulta
            },
            take: 1
        });

        // Verifica se já existe um registro com o mesmo nome e idUser
        if (buscaNome.length > 0 && buscaNome[0].idUser === idUser) {
            return res.status(400).json({ message: 'Nome Já Cadastrado' });
        }

        // Se não existir, insere o novo registro
        const insereNome = await prisma.NomeFundoImobiliario.create({
            data: {
                nomeFundo: nome,
                idUser: idUser
            }
        });

        res.status(200).json({ message: 'Nome Cadastrado com Sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao Cadastrar Nome' });
        console.error("Erro ao salvar nome:", error);
    }
});

router.get('/api/buscanomefundonovo', async (req, res) => {
    const id = req.query.id

    const nome = await prisma.NomeFundoImobiliario.findMany({
        where: { idUser: parseInt(id) },
    });
    res.json(nome);
});
router.delete('/api/deletanomefundonovo', async (req, res) => {
    const data = req.body


    try {
        const deletaBanco = await prisma.NomeFundoImobiliario.delete({
            where: {
                idUser: parseInt(data.id),
                id: parseInt(data.idBanco)

            }
        })
        res.status(200).json({ message: 'Banco Deletado ' })
    } catch (error) {

        res.status(400).json({ message: 'Erro ao Cadastrar' })
    }
});


// ============== NOME ACÃO ==========

router.post('/api/novonomeacao', async (req, res) => {
    const dados = req.body;
    try {
        const buscaNome = await prisma.Nomeacao.findUnique({
            where:
                { nomeAcao: dados.values.acao.toUpperCase().trim() }
        });
        if (buscaNome) {
            return res.status(400).json({ message: 'Nome Ja Cadastrado' });
        }
        const insereNome = await prisma.Nomeacao.create({
            data: {
                nomeAcao: dados.values.acao.toUpperCase().trim(),
                idUser: parseInt(dados.token),
            }
        });
        res.status(200).json({ message: 'Nome Cadastrado com Sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao Cadastrar Nome' });
        console.error("Erro ao salvar nome:", error);
    }
});
router.get('/api/buscanomeacao', async (req, res) => {
    const id = req.query.id

    const nome = await prisma.nomeacao.findMany({
        where: { idUser: parseInt(id) },
    });
    res.json(nome);
});
router.delete('/api/deletanomeacao', async (req, res) => {
    const data = req.body


    try {
        const deletaBanco = await prisma.nomeacao.delete({
            where: {
                idUser: parseInt(data.id),
                id: parseInt(data.idBanco)

            }
        })
        res.status(200).json({ message: 'Banco Deletado ' })
    } catch (error) {

        res.status(400).json({ message: 'Erro ao Cadastrar' })
    }
});


// ================== PROVENTOS ===============

router.get('/api/proventos', async (req, res) => {
    const email = req.query.emailUser;
    try {
        const id = await prisma.usuario.findUnique({ where: { email: email } });

        if (!id) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        const proventos = await prisma.proventos.findMany({ where: { iduser: id.id } });
        res.json(proventos);
    } catch (error) {
        console.error('Erro ao buscar proventos:', error);
        res.status(500).json({ error: 'Erro ao buscar proventos' });
    }
});
router.post('/api/proventos', async (req, res) => {
    const dados = req.body;
    try {
        const novoProvento = await prisma.proventos.create({
            data: {
                datainserido: new Date(),
                valorprovento: converteString(dados.valorProvento),
                idinvestimento: '',
                nomeinvestimento: dados.investimento.nomeinvestimento,
                iduser: dados.investimento.iduser,
                idnomeinvestimento: dados.investimento.idnomeinvestimento
            }
        });
        res.status(200).json({ message: 'Provento Salvo com Sucesso !' });
    } catch {
        res.status(400).json({ message: 'Erro ao Salvar Provento.' });
    }
});


// ================== DIVIDENDOS ===============

router.get('/api/dividendos', async (req, res) => {
    try {
        const email = req.query.emailUser

        const id = await prisma.usuario.findUnique({ where: { email: email } });
        const dividendosAcoes = await prisma.dividendo.findMany({ where: { idUser: id.id } });

        res.json(dividendosAcoes);
    } catch (error) {
        console.error('Erro ao buscar proventos:', error);
        res.status(500).json({ error: 'Erro ao buscar proventos' });
    }
});
router.post('/api/dividendos', async (req, res) => {
    const dados = req.body

    await dbConnect()
    try {
        const novoDividendo = new DividendosSchema({
            datainserido: new Date(),
            valordividendo: converteString(dados.valorProvento),
            idinvestimento: '',
            nomeinvestimento: dados.investimento.nomeinvestimento,
            iduser: dados.investimento.iduser,
            idnomeinvestimento: dados.investimento.idnomeinvestimento
        })
        const salvaProvento = await novoDividendo.save();
        res.status(200).json({ message: 'Provento Salvo com Sucesso !' });
    } catch {
        res.status(400).json({ message: 'Erro ao Salvar Provento.' })
    }


})

// ================INVESTIMENTOS======================
router.post('/api/novoinvestimento', async (req, res) => {
    const dados = req.body;
    const dataATual = new Date()
    const ano = dataATual.getFullYear()
    const mes = dataATual.getMonth() + 1
    const dia = dataATual.getDate()
    const dataAtualFormatada = `${ano}/${mes < 10 ? `0${mes}` : mes}/${dia < 10 ? `0${dia}` : dia}`


    switch (dados.dados.tipoInvestimento) {
        case 'acao': {
            try {
                const precoCompraFormatado = converteString(dados.dados.precoCompra);
                const novaAcao = await prisma.Investimento.create({
                    data: {
                        nome: dados.dados.nome.toUpperCase().trim(),
                        instituicao: dados.dados.instituicao,
                        quantidade: dados.dados.quantidade,
                        valorPago: precoCompraFormatado,
                        dataCompra: formatDate(dados.dados.dataCompra),
                        valorInvestido: precoCompraFormatado * dados.dados.quantidade,
                        idUser: parseInt(dados.token),
                        tipo: dados.dados.tipoInvestimento // Adicionei o campo 'tipo' aqui
                    }
                });
                const criaValorTabelaGanhosInvestimentos = await prisma.GanhosInvestimentos.create({
                    data: {
                        idUser: parseInt(dados.token),
                        nomeInvestimento: dados.dados.nome.toUpperCase().trim(),
                        dataDoRendimento: dataAtualFormatada,
                        valor: 0.00,
                        tipoDeInvestimento: dados.dados.tipoInvestimento
                    }
                })

                res.status(200).json({ message: 'Ação Cadastrada com Sucesso!' });
            } catch (error) {
                console.error('Erro ao Cadastrar Investimento:', error);
                res.status(500).json({ message: 'Erro ao Cadastrar Investimento.' });
            }
            break; // Adicione um break aqui para sair do case após a execução.
        }

        case 'fii': {
            try {
                const valorPagoFormatado = converteString(dados.dados.valorPago);
                const novaFii = await prisma.Investimento.create({
                    data: {
                        nome: dados.dados.nome.toUpperCase().trim(),
                        instituicao: dados.dados.instituicao,
                        quantidade: dados.dados.quantidade,
                        valorPago: valorPagoFormatado,
                        dataCompra: formatDate(dados.dados.dataCompra),
                        valorInvestido: valorPagoFormatado * dados.dados.quantidade,
                        idUser: parseInt(dados.token),
                        tipo: dados.dados.tipoInvestimento // Adicionando o tipo de investimento
                    }
                });


                const criaValorTabelaGanhosInvestimentos = await prisma.GanhosInvestimentos.create({
                    data: {
                        idUser: parseInt(dados.token),
                        nomeInvestimento: dados.dados.nome.toUpperCase().trim(),
                        dataDoRendimento: dataAtualFormatada,
                        valor: 0.00,
                        tipoDeInvestimento: dados.dados.tipoInvestimento

                    }
                })

                res.status(200).json({ message: 'FII Cadastrado com Sucesso!' });
            } catch (error) {
                console.error('Erro ao Cadastrar FII:', error);
                res.status(500).json({ message: 'Erro ao Cadastrar FII.' });
            }
            break;
        }

        case 'rendaFixa': {
            try {
                const valorInvestidoFormatado = converteString(dados.dados.valorInvestido);
                const novaRendaFixa = await prisma.Investimento.create({
                    data: {
                        idUser: parseInt(dados.token), // ID do usuário
                        tipo: dados.dados.tipoInvestimento, // Tipo de investimento, ex: "rendaFixa"
                        nome: dados.dados.nome.toUpperCase().trim(), // Nome do título de renda fixa
                        tipoTitulo: dados.dados.tipoTitulo, // Tipo de tiútulo, ex: "rendaFixa"
                        valorInvestido: valorInvestidoFormatado, // Valor investido formatado
                        taxaJuros: parseFloat(dados.dados.taxaJuros), // Taxa de juros
                        dataCompra: formatDate(dados.dados.dataCompra), // Data de compra formatada
                        dataVencimento: formatDate(dados.dados.dataVencimento), // Data de vencimento formatada
                        instituicao: dados.dados.instituicao, // Instituição financeira
                        tipo: dados.dados.tipoInvestimento
                    }
                });

                res.status(200).json({ message: 'Investimento de Renda Fixa Cadastrado com Sucesso!' });
            } catch (error) {
                console.error('Erro ao Cadastrar Renda Fixa:', error);
                res.status(500).json({ message: 'Erro ao Cadastrar Investimento de Renda Fixa.' });
            }
            break;
        }

        case 'cripto': {
            try {
                const valorPagoFormatado = converteString(dados.dados.valorPago);
                const novaCripto = await prisma.Investimento.create({
                    data: {
                        nome: dados.dados.nome.toUpperCase().trim(), // Nome da Criptomoeda
                        instituicao: dados.dados.instituicao || 'Exchange', // Caso a instituição não seja fornecida, defina como 'Exchange'
                        quantidade: parseInt(dados.dados.quantidade),
                        valorPago: valorPagoFormatado,
                        valorInvestido: converteString(dados.dados.valorPago),
                        dataCompra: formatDate(dados.dados.dataCompra),
                        idUser: parseInt(dados.token),
                        tipo: dados.dados.tipoInvestimento // Adicionando o tipo de investimento 'cripto'
                    }
                });

                res.status(200).json({ message: 'Criptomoeda Cadastrada com Sucesso!' });
            } catch (error) {
                console.error('Erro ao Cadastrar Criptomoeda:', error);
                res.status(500).json({ message: 'Erro ao Cadastrar Criptomoeda.' });
            }
            break;
        }


        case 'fundo': {
            try {
                const valorInvestidoFormatado = converteString(dados.dados.valorInvestido);
                const novoFundo = await prisma.Investimento.create({
                    data: {
                        nome: dados.dados.nome.toUpperCase().trim(), // Nome do fundo de investimento
                        tipoFundo: dados.dados.tipoFundo || '', // Tipo de fundo de investimento (ex: Fundo Imobiliário, Fundo Multimercado, etc.)
                        valorInvestido: valorInvestidoFormatado,
                        dataCompra: formatDate(dados.dados.dataCompra),
                        idUser: parseInt(dados.token),
                        tipo: dados.dados.tipoInvestimento // Adicionando o tipo de investimento 'fundo'
                    }
                });

                res.status(200).json({ message: 'Fundo de Investimento Cadastrado com Sucesso!' });
            } catch (error) {
                console.error('Erro ao Cadastrar Fundo de Investimento:', error);
                res.status(500).json({ message: 'Erro ao Cadastrar Fundo de Investimento.' });
            }
            break;
        }

        case 'previdencia': {
            try {
                const valorInvestidoFormatado = converteString(dados.dados.valorInvestido);
                const novaPrevidencia = await prisma.Investimento.create({
                    data: {
                        nome: dados.dados.nome.toUpperCase().trim(), // Nome do plano de previdência
                        tipoPlano: dados.dados.tipoPlano, // Tipo do plano (PGBL ou VGBL)
                        valorInvestido: valorInvestidoFormatado, // Valor investido no plano
                        instituicao: dados.dados.instituicao.toUpperCase().trim(), // Nome da instituição financeira
                        dataCompra: formatDate(dados.dados.dataCompra), // Data de contratação do plano
                        idUser: parseInt(dados.token), // Identificador do usuário
                        tipo: dados.dados.tipoInvestimento // Tipo de investimento 'previdencia'
                    }
                });

                res.status(200).json({ message: 'Plano de Previdência Cadastrado com Sucesso!' });
            } catch (error) {
                console.error('Erro ao Cadastrar Plano de Previdência:', error);
                res.status(500).json({ message: 'Erro ao Cadastrar Plano de Previdência.' });
            }
            break;
        }
        case 'debentures': {
            try {
                const valorInvestidoFormatado = converteString(dados.dados.valorInvestido); // Função para converter string em valor numérico
                const novaDebenture = await prisma.Investimento.create({
                    data: {
                        nome: dados.dados.nome.toUpperCase().trim(), // Nome da debênture
                        instituicao: dados.dados.instituicao.toUpperCase().trim(), // Nome da instituição financeira
                        valorInvestido: valorInvestidoFormatado, // Valor investido na debênture
                        taxaJuros: parseFloat(dados.dados.taxaJuros), // Taxa de juros aplicada
                        dataCompra: formatDate(dados.dados.dataCompra), // Data de compra da debênture
                        dataVencimento: formatDate(dados.dados.dataVencimento), // Data de vencimento da debênture
                        idUser: parseInt(dados.token), // Identificador do usuário
                        tipo: dados.dados.tipoInvestimento // Tipo de investimento 'debentures'
                    }
                });

                res.status(200).json({ message: 'Debênture Cadastrada com Sucesso!' });
            } catch (error) {
                console.error('Erro ao Cadastrar Debênture:', error);
                res.status(500).json({ message: 'Erro ao Cadastrar Debênture.' });
            }
            break;
        }


        default: {
            res.status(400).json({ message: 'Tipo de investimento não reconhecido.' });
            break;
        }
    }
});

router.get('/api/meusinvestimentos', async (req, res) => {
    const id = req.query.id
    try {
        const buscaInvestimentos = await prisma.Investimento.findMany({ where: { idUser: parseInt(id) } })
        res.json(buscaInvestimentos);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao Cadastrar Investimento.' });
    }
})

router.put('/api/atualizavalor', async (req, res) => {
    const novoValor = req.body.values.novovalorinvestimento;
    const idInvestimento = req.body.data.id;
    try {
        const updatedInvestimento = await prisma.investimento.update({
            where: { id: parseInt(idInvestimento) },
            data: { valorAtualinvestimento: novoValor }
        });

        if (!updatedInvestimento) {
            res.status(400).json({ message: 'Erro ao atualizar investimento' });
        }

        const insereNovoValorTabela = await prisma.valorAtual.create({
            data: {
                idInvestimento: parseInt(idInvestimento),
                valor: novoValor
            }
        });

        res.status(200).json({ message: 'Valor Atualizado com Sucesso' });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao Atualizar Valor' });
    }
});
router.put('/api/atualizavalorfii', async (req, res) => {
    const novoValor = req.body.values.novovalorinvestimento
    const idInvestimento = req.body.data._id

    try {
        await dbConnect()
        // ==============Atualiza o Valor do investimento 
        const updatedInvestimento = await InvestimentosFiiSchema.findOneAndUpdate({ _id: idInvestimento }, { valoratualfii: novoValor }, { new: true })


        if (!updatedInvestimento) {
            res.status(400).json({ message: 'Erro ao atualizar investimento' })
        }


        res.status(200).json({ message: 'Valor Atualizado com Sucesso' })
    } catch (error) {
        res.status(400).json({ message: 'Erro ao Atualizar Valor' })
    }


})

router.put('/api/vendacotasfii', async (req, res) => {
    await dbConnect();
    const nome = req.body.nomefii;
    const qtdCotas = req.body.values.qtdvenda;

    const buscaFundos = await InvestimentosFiiSchema.find({ nomefii: nome });

    const totalCotasArmazenadas = buscaFundos.reduce((total, item) => {
        return total + item.quantidade;
    }, 0);

    if (qtdCotas > totalCotasArmazenadas) {
        return res.status(400).json({ message: 'Quantidade maior que o disponível' })
    }


    let cotasRestantes = qtdCotas;

    for (let i = 0; i < buscaFundos.length; i++) {
        const investimento = buscaFundos[i];
        const cotasDisponiveis = investimento.quantidade;

        if (cotasRestantes <= 0) {
            break;
        }

        const cotasVendidas = Math.min(cotasDisponiveis, cotasRestantes); // Calcula quantas cotas serão vendidas deste investimento

        const updatedInvestimento = await InvestimentosFiiSchema.findOneAndUpdate(
            { _id: investimento._id, quantidade: { $gte: cotasVendidas } }, // Garante que a quantidade seja maior ou igual às cotas vendidas
            { $inc: { quantidade: -cotasVendidas } },
            { new: true }
        );

        if (!updatedInvestimento) {
            // Se a quantidade for menor que as cotas vendidas, continue para o próximo investimento
            continue;
        }

        cotasRestantes -= cotasVendidas;

        if (updatedInvestimento.quantidade === 0) {
            // Se a quantidade for zero, remove o investimento    
            await InvestimentosFiiSchema.findOneAndDelete({ _id: investimento._id });
        }
    }

    // Envie uma resposta adequada
    res.status(200).json({ message: 'Venda de cotas concluída com sucesso.' });
});

router.delete('/api/deletaInvestimento', async (req, res) => {
    try {

        const dados = req.query.id
        const deletaInvestimento = await prisma.investimento.delete({
            where: {
                id: parseInt(dados)
            }
        })
        const nome = deletaInvestimento.nome


        const buscaLucratividade = await prisma.investimento.findMany({
            where: {
                nome: nome
            }
        })
        const arrayMovimentacao = buscaLucratividade.length

        if (arrayMovimentacao === 0) {
            const deletaLucratividade = await prisma.GanhosInvestimentos.deleteMany({
                where: {
                    nomeInvestimento: nome
                }
            })
        }
        res.status(200).json({ message: 'Investimento deletado com sucesso' })
    } catch (error) {

    }
});




// ==================================================

//====================JUROS FINANCEIROS=====================

router.get('/api/lucratividade', async (req, res) => {
    const id = req.query.id

    const buscaLucratividade = await prisma.GanhosInvestimentos.findMany({
        where: { idUser: parseInt(id) }

    })
    res.status(200).json(buscaLucratividade)
})
router.post('/api/addjuros', async (req, res) => {
    try {
        const dados = req.body

        const convertData = formatDate(dados.values.datapagamento)
        const valorConvertido = converteString(dados.values.valorjuros)
        const criaValorTabelaGanhosInvestimentos = await prisma.GanhosInvestimentos.create({
            data: {
                idUser: parseInt(dados.dadosInvestimento.idUser),
                nomeInvestimento: dados.dadosInvestimento.nomeInvestimento.toUpperCase().trim(),
                dataDoRendimento: convertData,
                valor: valorConvertido,
                tipoDeInvestimento: dados.dadosInvestimento.tipoDeInvestimento

            }
        })
        res.status(200).json({ message: 'Cadastrado com sucesso!' })
    } catch (error) {

        console.error(error)
        res.status(400).json({ message: 'Erro ao salvar provento' })

    }

})



//=====================================================

//===================ALTERAÇÃO DE SENHA=============================

router.put('/api/esqueceusenha', async (req, res) => {
    try {
        const cpf = req.body

        const buscaUsuario = await prisma.Usuario.findUnique({
            where: {
                cpf: cpf.cpf
            }
        })
        if (!buscaUsuario) {
            return res.status(400).json({ message: 'CPF Invalido' })
        }
        const senhaSemCripto = Math.floor(1000 + Math.random() * 9000);
        const senhaCriptografada = await crypto(senhaSemCripto.toString())



        const updateSenha = await prisma.Usuario.update({
            where: {
                id: buscaUsuario.id
            },
            data: {
                senha: senhaCriptografada.toString()
            }
        })

        res.json({
            email: buscaUsuario.email,
            nome: buscaUsuario.nome,
            senhaNova: senhaSemCripto
        })

    } catch (error) {
        res.status(400).json({ message: 'Erro ao processar a alteração de senha' })
    }
})
//


// +++++++++++++++++++++++++Categoria+++++++++++++++++++++++++++++++++++++++++
router.post('/api/novacategoria', async (req, res) => {
    const nome = req.body


    try {
        const nomeUppercase = nome.categoria.categoria.toUpperCase().trim();
        // Verifica se a categoria já existe
        const verificaNome = await prisma.categoria.findUnique({ where: { nomeCategoria: nomeUppercase } });
        if (verificaNome) {
            return res.status(400).json({ message: 'Categoria Já Cadastrada' });
        }
        const novaCategoria = await prisma.categoria.create({
            data: {
                nomeCategoria: nomeUppercase,
                idUser: parseInt(nome.idUser)
            }
        });
        res.status(200).json({ message: 'Categoria cadastrada com sucesso' });
    } catch (error) {
        console.error('Erro ao processar a nova categoria:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});
router.get('/api/buscacategoria', async (req, res) => {
    const id = req.query.idUser


    const buscaCategoria = await prisma.categoria.findMany({
        where: {
            idUser: parseInt(id)
        }
    })
    res.json(buscaCategoria)
});
router.delete('/api/deletacategoria', async (req, res) => {
    const data = req.body


    try {
        const deletaBanco = await prisma.categoria.delete({
            where: {
                idUser: parseInt(data.id),
                id: parseInt(data.idBanco)

            }
        })
        res.status(200).json({ message: 'Banco Deletado ' })
    } catch (error) {

        res.status(400).json({ message: 'Erro ao Cadastrar' })
    }
});
//=========================================================


// +++++++++++++++++++++++++Forma Pagamento+++++++++++++++++++++++++++++++++++++++++
router.post('/api/novaformapagamento', async (req, res) => {
    const dados = req.body

    const nomeUppercase = dados.nome.formapagamento.toUpperCase().trim();
    try {
        // Verifica se a categoria já existe
        const verificaNome = await prisma.FormaPagamento.findUnique({ where: { nomeFormaPagamento: nomeUppercase } });

        if (verificaNome) {
            return res.status(400).json({ message: 'Categoria Já Cadastrada' });
        }

        // Se a categoria não existir, cria uma nova e salva
        const novaForma = await prisma.FormaPagamento.create({
            data: {
                nomeFormaPagamento: nomeUppercase,
                idUser: dados.idUser
            }
        });
        res.status(200).json({ message: 'Forma de Pagamento cadastrada com sucesso' });
    } catch (error) {
        console.error('Erro ao processar a forma de pagamento:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});
router.get('/api/buscaformapagamento', async (req, res) => {
    const idUser = req.query.idUser


    const buscaFormapagamento = await prisma.FormaPagamento.findMany({
        where: { idUser: parseInt(idUser) },
    })
    res.json(buscaFormapagamento)
});
router.delete('/api/deletaformapagamento', async (req, res) => {
    const data = req.body


    try {
        const deletaBanco = await prisma.FormaPagamento.delete({
            where: {
                idUser: parseInt(data.id),
                id: parseInt(data.idBanco)

            }
        })
        res.status(200).json({ message: 'Banco Deletado ' })
    } catch (error) {

        res.status(400).json({ message: 'Erro ao Cadastrar' })
    }
});
//=========================================================





//======================Despesa===================================
router.post('/api/novadespesa', async (req, res) => {
    const idUser = req.body.id;
    const { datagasto, local, valorgasto, formadepagamento, responsavel, categoria, pagante, observacao, mescorrespondente } = req.body.values;
    const dados = req.body


    try {

        const valorNumber = converteString(valorgasto);
        const nomeUppercase = responsavel ? responsavel.toUpperCase().trim() : "";
        const paganteUpercase = pagante ? pagante.toUpperCase().trim() : "";
        const novaDespesa = await prisma.Despesas.create({
            data: {
                idUser: parseInt(idUser),
                dataGasto: datagasto,
                local,
                valorGasto: valorNumber,
                formaDePagamentoId: parseInt(formadepagamento),
                responsavel: nomeUppercase,
                categoriaId: parseInt(categoria),
                pagante: paganteUpercase,
                observacao,
                mesCorrespondente: mescorrespondente,
                dataAquisicao: formatDate(dados.values.dataaquisicao)
            },
        });

        res.status(200).json({ message: 'Despesa Salva com sucesso' });
    } catch (error) {
        console.error('Erro ao processar a despesa:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

router.get('/api/buscadespesa', async (req, res) => {
    try {
        const idUser = req.query.email
        const buscaDespesa = await prisma.Despesas.findMany({
            where: {
                idUser: parseInt(idUser),

            },
            include: {
                categoria: true,
                FormaPagamento: true

            }
        });
        res.json(buscaDespesa);
    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});

router.get('/api/buscadespesamesatual', async (req, res) => {
    try {
        const idUser = req.query.email;
        const mesAtual = new Date();
        let mes = mesAtual.getMonth() + 1;
        const ano = mesAtual.getFullYear();
        mes = mes < 10 ? `0${mes}` : mes;
        const iniciaPadraoData = `${ano}-${mes}`;


        const buscaDespesa = await prisma.Despesas.findMany({
            where: { mesCorrespondente: iniciaPadraoData, idUser: parseInt(idUser) },
            include: {
                categoria: true,
                FormaPagamento: true
            }
        });

        res.json(buscaDespesa);
    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});

router.post('/api/buscadespesadata', async (req, res) => {
    try {
        const { data } = req.body;

        const idUser = req.body.emailUser;



        const buscaDespesa = await prisma.despesas.findMany({
            where: {
                mesCorrespondente: data,
                idUser: idUser,
            },
            include: {
                categoria: true,
                FormaPagamento: true
            }
        });

        res.json(buscaDespesa);
    } catch (error) {
        console.error('Erro ao buscar despesas por data:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

router.delete('/api/deletadespesa', async (req, res) => {
    try {
        const id = req.query.id
        console.log("🚀 ~ router.delete ~ id", id)

        await prisma.despesas.delete({
            where: { id: parseInt(id) },
        });

        res.status(200).json({ message: 'Despesa deletada' });
    } catch (error) {
        console.error('Erro ao deletar despesa:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

router.post('/api/buscadespesahome', async (req, res) => {
    try {
        const email = req.body.emailUser;
        const anoAtual = new Date().getFullYear().toString();

        const user = await prisma.usuario.findUnique({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        const periodoInicial = `1/${anoAtual}`;
        const periodoFinal = `12/${anoAtual}`;

        const buscaDespesa = await prisma.despesas.findMany({
            where: {
                idUser: user.id.toString(),
                mesAno: {
                    gte: periodoInicial,
                    lte: periodoFinal,
                },
            },
        });

        res.json(buscaDespesa);
    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});

router.put('/api/updatepagante', async (req, res) => {
    try {
        const id = req.body.id;
        const nome = req.body.nome;
        const nomeUpercase = nome.toUpperCase().trim();

        const buscaDespesa = await prisma.despesas.update({
            where: { id: parseInt(id) },
            data: { pagante: nomeUpercase },
        });

        res.status(200).json({ message: "Pagante Atualizado" });
    } catch (error) {
        console.error("Erro ao atualizar pagante:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});


// =====================Fatura ============

router.post('/api/fecharfatura', async (req, res) => {
    const dados = req.body
    try {

        const atualizaDespesa = await prisma.despesas.updateMany({
            where: {
                idUser: dados.idUsuario,
                mesCorrespondente: dados.fatura
            },
            data: {
                fechada: 1
            }
        })
        res.status(200).json({ message: 'Fatura Fechada com Sucesso' })
    } catch (error) {
        res.status(500).json({ error: "Erro ao fechar fatura" })
    }
})

//======================Controle de Contas===================================
router.post('/api/novaconta', async (req, res) => {

    const nome = req.body
    const dataFormata = formatDate(nome.dados.datavencimento)

    let dataVencimento = new Date(dataFormata); // Inicia com a data de vencimento original
    const diaVenc = dataVencimento.getDate();
    const mesVenc = dataVencimento.getMonth() + 1;
    const anoVenc = dataVencimento.getFullYear();
    const dataVencimentoFormatada = `${anoVenc}/${mesVenc < 10 ? `0${mesVenc}` : mesVenc}/${diaVenc}`;
    const mes_ano = `${anoVenc}-${mesVenc < 10 ? `0${mesVenc}` : mesVenc}`;

    try {

        if (nome.dados.qtdparcelas < 2 || nome.dados.qtdparcelas === undefined) {

            const novaConta = await prisma.Contas.create({
                data: {
                    idUser: parseInt(nome.idUsuario),
                    estabelecimento: nome.dados.estabelecimento.toUpperCase().trim(),
                    comprador: nome.dados.comprador,
                    pagador: nome.dados.pagador,
                    valor: converteString(nome.dados.valor),
                    dataVencimento: dataFormata,
                    qtdParcelas: nome.dados.qtdparcelas ? parseInt(nome.dados.qtdparcelas) : null,
                    mesCorrespondente: mes_ano
                }
            })
        } else {

            for (let i = 0; i < nome.dados.qtdparcelas; i++) {
                const diaVenc = dataVencimento.getDate();
                const mesVenc = dataVencimento.getMonth() + 1;
                const anoVenc = dataVencimento.getFullYear();
                const dataVencimentoFormatada = `${anoVenc}/${mesVenc < 10 ? `0${mesVenc}` : mesVenc}/${diaVenc}`;
                const mes_ano = `${anoVenc}-${mesVenc < 10 ? `0${mesVenc}` : mesVenc}`;


                const valor = nome.dados.valor

                const parcelas = nome.dados.qtdparcelas


                const novaConta = await prisma.Contas.create({
                    data: {
                        idUser: parseInt(nome.idUsuario),
                        estabelecimento: nome.dados.estabelecimento.toUpperCase().trim(),
                        comprador: nome.dados.comprador,
                        pagador: nome.dados.pagador,
                        valor: converteString(nome.dados.valor) / nome.dados.qtdparcelas,
                        dataVencimento: dataVencimentoFormatada,
                        qtdParcelas: nome.dados.qtdparcelas ? parseInt(nome.dados.qtdparcelas) : null,
                        mesCorrespondente: mes_ano
                    }
                })
                // Incrementa para o próximo mês de vencimento
                dataVencimento.setMonth(dataVencimento.getMonth() + 1);

                // Se for o último mês do ano, avança para o próximo ano e mês 1 (janeiro)
                if (mesVenc === 12) {
                    dataVencimento.setFullYear(anoVenc + 1);
                    dataVencimento.setMonth(0); // Janeiro é representado pelo mês 0
                }
            }
        }

        res.status(200).json({ message: 'Conta(s) salva(s) com sucesso' });
    } catch (error) {
        console.error('Erro ao processar a despesa:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }

});
router.get('/api/buscacontaproximavencer', async (req, res) => {
    const id = req.query.id;
    const dataAtual = new Date();
    const anoAtual = dataAtual.getFullYear();
    const mesAtual = dataAtual.getMonth() + 1;
    const diaAtual = dataAtual.getDate();
    const dataAtualFormatada = `${anoAtual}/${mesAtual < 10 ? `0${mesAtual}` : mesAtual}/${diaAtual < 10 ? `0${diaAtual}` : diaAtual}`;


    // Adiciona 10 dias à data atual
    dataAtual.setDate(dataAtual.getDate() + 10);
    const anoFim = dataAtual.getFullYear();
    const mesFim = dataAtual.getMonth() + 1;
    const diaFim = dataAtual.getDate();
    const dataFimFormatada = `${anoFim}/${mesFim < 10 ? `0${mesFim}` : mesFim}/${diaFim < 10 ? `0${diaFim}` : diaFim}`;


    try {
        const buscaConta = await prisma.Contas.findMany({
            where: {
                idUser: parseInt(id),
                dataVencimento: {
                    gte: dataAtualFormatada,  // Data atual formatada
                    lte: dataFimFormatada     // Data limite (10 dias após)
                },
                pago: 0
            }
        });

        res.json(buscaConta);
    } catch (error) {
        console.error('Erro ao buscar contas:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

router.get('/api/buscaconta', async (req, res) => {
    const id = req.query.id
    try {
        const buscaConta = await prisma.Contas.findMany({
            where: {
                idUser: parseInt(id)
            }
        })
        res.json(buscaConta)
    } catch (error) {
        console.error('Erro ao buscar despesas:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});
router.get('/api/buscacontamesatual', async (req, res) => {
    const id = req.query.id
    try {
        const mesAtual = new Date();
        const mes = mesAtual.getMonth() + 1;
        const ano = mesAtual.getFullYear();
        const iniciaPadraoData = `${ano}-${mes < 10 ? `0${mes}` : mes}`;

        const buscaConta = await prisma.Contas.findMany({
            where: {
                idUser: parseInt(id),
                mesCorrespondente: iniciaPadraoData
            }
        })

        res.json(buscaConta);
    } catch (error) {
        console.error('Erro ao buscar despesas:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

router.post('/api/buscacontadata', async (req, res) => {
    const dados = req.body
    try {
        const buscaConta = await prisma.Contas.findMany({
            where: {
                idUser: parseInt(dados.id),
                mesCorrespondente: dados.data
            }
        })

        res.json(buscaConta);
    } catch (error) {
        console.error('Erro ao buscar despesas:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});





router.put('/api/pagaconta', async (req, res) => {
    try {
        const idConta = req.body
        const buscaConta = await prisma.Contas.findUnique({
            where: {
                id: parseInt(idConta.id)
            }
        })

        const atualizaPagamento = await prisma.Contas.update({
            where: {
                id: parseInt(idConta.id)
            },
            data: {
                pago: buscaConta.pago === 0 ? 1 : buscaConta.pago === 1 ? 0 : null
            }
        })
        res.status(200).json("pago")
    } catch (error) {
        console.lof(error)
    }


});
router.delete('/api/deletaConta', async (req, res) => {
    try {
        const { idConta } = req.body;
        await dbConnect();
        const buscaDespesa = await ControleContasSchema.findByIdAndDelete({ _id: idConta });
        res.status(200).json("deletado")
    } catch (error) {
        console.error('Erro ao buscar despesas por data:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});
//=========================================================


// controle de orçamento mensal 
router.post('/api/controleorcamento', async (req, res) => {
    const dados = req.body;
    console.log("🚀 ~ router.post ~ dados", dados)

    try {
        const buscaContas = await prisma.Contas.findMany({
            where: {
                idUser: parseInt(dados.id),
                mesCorrespondente: dados.data
            },
            select: {
                valor: true
            }
        });


        const buscaDespesas = await prisma.Despesas.findMany({
            where: {
                idUser: parseInt(dados.id),
                mesCorrespondente: dados.data
            },
            select: {
                valorGasto: true
            }
        });


        const buscaControleUsuario = await prisma.Usuario.findUnique({
            where: {
                id: parseInt(dados.id)
            },
            select: {
                valorOrcamentoMensal: true
            }
        });

        // Função de soma ajustada
        const sumValues = (array, key) => array.reduce((acc, item) => acc + item[key], 0);

        const totalDespesa = sumValues(buscaDespesas, 'valorGasto');
        console.log("🚀 ~ router.post ~ totalDespesa", totalDespesa)
        const totalContas = sumValues(buscaContas, 'valor');
        console.log("🚀 ~ router.post ~ totalContas", totalContas)
        const orcamentoUsuario = buscaControleUsuario?.valorOrcamentoMensal;
        const porcentagem = orcamentoUsuario ? Math.round(((totalDespesa + totalContas) / orcamentoUsuario) * 100) : 0;
        const total = totalDespesa + totalContas;
        res.json({
            porcentagem: porcentagem,
            total: total,
            orcamentoUsuario
        });

    } catch (error) {
        console.error(error);
    }

});


//==========================================

// =====================Banco ============

router.post('/api/banco', async (req, res) => {
    const dados = req.body
    try {

        const nomeUppercase = dados.values.instituicao.toUpperCase().trim();
        const verificaNome = await prisma.banco.findMany({ where: { nomeBanco: nomeUppercase, idUser: parseInt(dados.token) }, take: 1 });



        if (verificaNome.length > 0 && verificaNome[0].idUser === dados.token) {
            return res.status(400).json({ message: 'Banco Já Cadastrado ' })
        }
        const novoBanco = await prisma.banco.create({
            data: {
                nomeBanco: nomeUppercase,
                idUser: parseInt(dados.token)
            }
        })
        res.status(200).json({ message: 'Banco Cadastrado ' })
    } catch (error) {
        res.status(400).json({ message: 'Erro ao Cadastrar' })
    }
});
router.get('/api/buscabanco', async (req, res) => {
    const data = req.query.id
    try {
        const buscaBanco = await prisma.banco.findMany({
            where: {
                idUser: parseInt(data)
            }
        })
        res.json(buscaBanco)
    } catch (error) {
        res.status(400).json({ message: 'Erro ao Cadastrar' })
    }
});
router.delete('/api/deletabanco', async (req, res) => {
    const data = req.body

    try {
        const deletaBanco = await prisma.banco.delete({
            where: {
                idUser: parseInt(data.id),
                id: parseInt(data.idBanco)

            }
        })
        res.status(200).json({ message: 'Banco Deletado ' })
    } catch (error) {
        res.status(400).json({ message: 'Erro ao Cadastrar' })
    }
});

// router.post('/api/anotacoes', async (req, res) => {
//     await dbConnect
//     try {
//         const data = req.body.anotacao
//         const novoAnotacao = new AnotacoesSchema({
//             anotacao: data
//         })
//         const salvaAnotacao = novoAnotacao.save()

//         // const updateAnotacao = await AnotacoesSchema.updateOne({ _id: salvaAnotacao._id }, { $set: { anotacoes: data.anotacoes } })

//         res.status(200).json({ message: 'Anotacao Cadastrada ' })
//     } catch (error) {
//         res.status(400).json({ message: 'Erro ao Cadastrar' })
//     }
// })


//==========================================

module.exports = router