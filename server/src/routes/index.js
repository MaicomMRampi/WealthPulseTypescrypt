const router = require('express').Router()
const dbConnect = require('../utils/dbConnect')
const UsuariosSchema = require('../models/usuarios  OK')
const InvestimentosFiiSchema = require('../models/investimentosfii OK')
const DespesaSchema = require('../models/despesas OK')
const ControleContasSchema = require('../models/controleContas OK')
const DividendosSchema = require('../models/dividendos OK')
const { crypto } = require('../utils/password')
const { converteString } = require('../utils/converteString')
const bcrypt = require('bcryptjs')
const prisma = require('../utils/dbConnect')
const jwt = require('jsonwebtoken');
const e = require('express')

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

        // Verificar se a senha está correta
        if (user.senha !== data.senha) {
            return res.status(401).json({ erro: 'Senha incorreta' });
        }

        const token = jwt.sign(
            { userId: user }, // Dados que você deseja incluir no token
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
                id: user.id
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


    try {
        const { nome, cpf, email, senha } = req.body

        const nomeFormatado = nome.toUpperCase().trim()
        const emailFormatado = email.toUpperCase().trim()
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
            },
        });


        res.status(200).json({ message: 'Usuário Salvo com Sucesso !' });
    } catch (error) {
        console.error("Erro ao criar produto:", error);

    }

})



router.get('/api/buscanome', async (req, res) => {
    const email = req.query.email
    console.log("🚀 ~ router.get ~ email", email)
    const buscaNome = await prisma.usuario.findUnique({ where: { email } })
    res.status(200).json({
        nome: buscaNome.nome,
        email: buscaNome.email
    })
})
router.get('/api/usuarioedicao', async (req, res) => {
    const email = req.query.email
    console.log("🚀 ~ router.get ~ email", email)
    const buscaNome = await prisma.usuario.findUnique({ where: { email: email } })
    res.status(200).json(buscaNome)
})




router.post('api/upload', async (req, res) => {
    const dados = req.body
    console.log("🚀 ~ router.post ~ dados", dados)
})

// === patrimônio============

router.post('/api/postpatrimonio', async (req, res) => {
    const dados = req.body;
    const tipo = typeof req.body.dados.dataaquisicao
    console.log("🚀 ~ router.post ~ tipo", tipo)
    try {
        console.log("🚀 ~ router.post ~ dados", dados)
        const nomeUper = dados.dados.nome.toUpperCase()
        console.log("🚀 ~ router.post ~ nomeUper", nomeUper)

        const valorPatr = converteString(dados.dados.valor)
        const patrimonio = await prisma.patrimonio.create({
            data: {
                nomePatrimonio: nomeUper,
                tipoPatrimonio: dados.dados.tipopatrimonio,
                valorPatrimonio: valorPatr,
                dataAquisicao: dados.dados.dataaquisicao,
                idUser: dados.token
            }
        })
        console.log("🚀 ~ router.post ~ patrimonio", patrimonio)
        return res.status(200).json({ message: 'Patrimonio Cadastrado com Sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao Cadastrar Patrimonio', error });
    }
})
router.get('/api/buscabem', async (req, res) => {
    try {
        const dados = req.query.email;
        const buscaId = await prisma.usuario.findUnique({ where: { email: dados } })
        if (!buscaId) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        const buscaPatrimonio = await prisma.patrimonio.findMany({ where: { idUser: buscaId.id } })
        console.log("🚀 ~ router.get ~ buscaPatrimonio", buscaPatrimonio);
        res.status(200).json(buscaPatrimonio);
    } catch (error) {
        console.error("🚀 ~ router.get ~ error", error); // Loga o erro no console
        res.status(500).json({ message: 'Erro ao buscar patrimônio.' }); // Retorna uma resposta de erro
    }
});

router.post('/api/despesadeconsumo', async (req, res) => {
    const dados = req.body;
    console.log("🚀 ~ router.post ~ dados", dados);

    try {
        const buscaId = await prisma.usuario.findUnique({ where: { email: dados.email } });

        if (!buscaId) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        const converteString = (valor) => {
            // Remove caracteres não numéricos e converte para número
            return parseFloat(valor.replace(/[^0-9,-]/g, '').replace(',', '.'));
        };

        const novaDespesaDeBem = await prisma.despesaDeBens.create({
            data: {
                idPatrimonio: dados.values.nomepatrimonio.id, // Garantido que é um Int
                nomePatrimonio: dados.values.nomepatrimonio.nomePatrimonio,
                tipoPatrimonio: dados.values.nomepatrimonio.tipoPatrimonio,
                kmAntigo: dados.values.kmantigo === '' ? 0 : converteString(dados.values.kmantigo),
                kmAtual: dados.values.kmatual === '' ? 0 : converteString(dados.values.kmatual),
                nomeDespesa: dados.values.tipodespesa.toUpperCase(),
                valor: converteString(dados.values.valorgasto),
                responsavel: dados.values.responsavel,
                dataAquisicao: new Date(dados.values.dataaquisicao),
                compradorPagador: dados.values.compradorpagador,
                tipoDespesa: dados.values.nomepatrimonio.tipoPatrimonio,
                observacao: dados.values.observacao,
                idUser: buscaId.id, // Certifique-se de que é buscaId.id
                litros: dados.values.litros === '' ? 0.00 : dados.values.litros,
                inativo: 0,
                observacaoInativacao: ''
            },
        });

        console.log("🚀 ~ router.post ~ novaDespesaDeBem", novaDespesaDeBem);
        return res.status(200).json({ message: 'Despesa de Bem Cadastrada com Sucesso' });
    } catch (error) {
        console.error('Erro ao Cadastrar Despesa de Bem:', error);
        return res.status(500).json({ message: 'Erro ao Cadastrar Despesa de Bem', error });
    }
});

router.put('/api/inativarpatrimonio', async (req, res) => {
    const dados = req.body;
    console.log("🚀 ~ router.post ~ dados", dados);

    try {
        const buscaId = await prisma.usuario.findUnique({ where: { id: dados.dados.idUser } });

        if (!buscaId) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        const novaDespesaDeBem = await prisma.DespesaDeBens.update({
            where: {
                id: dados.dados.id
            },
            data: {
                observacaoInativacao: 'teste',
                inativo: 1
            },
        });


        console.log("🚀 ~ router.post ~ novaDespesaDeBem", novaDespesaDeBem);
        return res.status(200).json({ message: 'Despesa de Bem Cadastrada com Sucesso' });
    } catch (error) {
        console.error('Erro ao Cadastrar Despesa de Bem:', error);
        return res.status(500).json({ message: 'Erro ao Cadastrar Despesa de Bem', error });
    }
});




router.get('/api/buscadespesasdetalhes', async (req, res) => {
    try {
        const dados = req.query.id;

        const despesasPatrimonio = await prisma.DespesaDeBens.findMany({ where: { idPatrimonio: parseInt(dados) } })

        res.status(200).json(despesasPatrimonio);
    }
    catch (error) {
        console.error('Erro ao Cadastrar Despesa de Bem:', error);
        res.status(500).json({ message: 'Despesas não encontradas' })
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




// ===========================

// ============Tipo Despesa ======
router.post('/api/novotipodespesa', async (req, res) => {
    try {
        const value = req.body
        console.log("🚀 ~ router.post ~ value", value)
        const buscaId = await prisma.usuario.findUnique({ where: { email: value.email } })
        console.log("🚀 ~ router.post ~ buscaId", buscaId)
        const novoTipoDespesa = await prisma.TipoDespesa.create({
            data: {
                nomeDespesa: value.value.toUpperCase(),
                idUser: buscaId.id,
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
        const dados = req.query.email;
        const buscaId = await prisma.usuario.findUnique({ where: { email: dados } })
        if (!buscaId) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        const buscaTipoDespesa = await prisma.TipoDespesa.findMany({ where: { idUser: buscaId.id } })
        console.log("tipo despesas", buscaTipoDespesa);
        res.status(200).json(buscaTipoDespesa);
    } catch (error) {
        console.error("🚀 ~ router.get ~ error", error); // Loga o erro no console
        res.status(500).json({ message: 'Erro ao buscar patrimônio.' }); // Retorna uma resposta de erro
    }
})



// ============================





// =============Trocar Senha ==========

router.post('/api/trocarsenha', async (req, res) => {
    const dados = req.body;
    try {
        await dbConnect();

        const buscaUsuario = await UsuariosSchema.findOne({ email: dados.usuario.email });
        if (!buscaUsuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        const confereSenha = await bcrypt.compare(dados.values.senhaatual, buscaUsuario.senha);
        if (confereSenha) {

            const novaSenhaCriptografada = await crypto(dados.values.novasenha);

            await UsuariosSchema.updateOne({ _id: buscaUsuario._id }, { $set: { senha: novaSenhaCriptografada } });
            return res.status(200).json({ message: 'Senha Alterada com Sucesso' });
        } else {
            return res.status(400).json({ message: 'Senha Incorreta' });
        }
    } catch (error) {
        console.error('Erro ao Trocar Senha:', error);
        return res.status(500).json({ message: 'Erro ao Trocar Senha' });
    }
});

// ==============  FUNDOS IMOBILIARIOS ==========

router.post('/api/novonome', async (req, res) => {
    try {
        const nome = req.body.nomefundo;
        console.log("🚀 ~ router.post ~ nome", nome)
        const buscaNome = await prisma.nomeFundoImobiliario.findUnique({ where: { nomefundo: nome.toUpperCase().trim() } });
        console.log("🚀 ~ router.post ~ buscaNome", buscaNome)

        if (buscaNome) {
            return res.status(400).json({ message: 'Nome Ja Cadastrado' });
        }

        const insereNome = await prisma.nomeFundoImobiliario.create({
            data: {
                nomefundo: nome.toUpperCase().trim(),
            }
        });

        res.status(200).json({ message: 'Nome Cadastrado com Sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao Cadastrar Nome' });
        console.error("Erro ao salvar nome:", error);
    }
});
router.get('/api/buscanomefundonovo', async (req, res) => {
    const nome = await prisma.nomeFundoImobiliario.findMany();
    res.json(nome);
});


// ============== NOME ACÃO ==========

router.post('/api/novonomeacao', async (req, res) => {
    const dados = req.body;
    try {
        const buscaid = await prisma.usuario.findUnique({ where: { email: dados.emailUser } });

        if (!buscaid) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        const buscaNome = await prisma.nomeacao.findUnique({ where: { nomeacao: dados.nomefundo.toUpperCase().trim() } });

        if (buscaNome) {
            return res.status(400).json({ message: 'Nome Ja Cadastrado' });
        }

        const insereNome = await prisma.nomeacao.create({
            data: {
                nomeacao: dados.nomefundo.toUpperCase().trim(),
                iduser: buscaid.id,
            }
        });

        res.status(200).json({ message: 'Nome Cadastrado com Sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao Cadastrar Nome' });
        console.error("Erro ao salvar nome:", error);
    }
});
router.get('/api/buscanomeacao', async (req, res) => {
    const nome = await prisma.nomeacao.findMany();
    res.json(nome);
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
    console.log("🚀 ~ router.post ~ dados", dados)
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



// =================================================

// ================API DA RENDA Variavel / AÇÕES
router.post('/api/postinvestimentacoes', async (req, res) => {
    try {
        const { nomeinvestimento, datacompra, valorinvestido, banco, tiporenda } = req.body.values;
        const data = req.body.values;
        console.log("🚀 ~ router.post ~ data", data)
        const emailUser = req.body.emailUser;
        const retornaId = await prisma.usuario.findUnique({ where: { email: emailUser } });

        if (!retornaId) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        const idUser = retornaId.id;
        const tiporendaformatada = tiporenda.toUpperCase();
        const nomeinvestimentoformatada = nomeinvestimento.toUpperCase();
        const dataCompra = new Date(datacompra);
        const dia = dataCompra.getDate();
        const mes = dataCompra.getMonth() + 1;
        const ano = dataCompra.getFullYear();
        const dataCompraFormatada = `${dia}/${mes}/${ano}`;

        const valorConvertido = converteString(valorinvestido);

        const buscaIdNomeFundo = await prisma.nomeacao.findUnique({ where: { nomeacao: nomeinvestimentoformatada } });

        if (!buscaIdNomeFundo) {
            return res.status(404).json({ message: 'Nome do fundo não encontrado.' });
        }

        const newInvestimentoAcao = await prisma.acao.create({
            data: {
                idUser: idUser,
                nomeInvestimento: nomeinvestimentoformatada,
                dataCompra: dataCompraFormatada,
                valorInvestido: valorConvertido,
                emailUser: emailUser,
                banco: banco,
                tipoRenda: tiporendaformatada
            }
        });

        // Insere na tabela dividendos o valor inicial como 0
        const insereDvividendo = await prisma.dividendo.create({
            data: {
                dataInserido: new Date(),
                valorDividendo: 0,
                idInvestimento: newInvestimentoAcao.id,
                nomeInvestimento: nomeinvestimentoformatada,
                idUser: idUser,
                idNomeInvestimento: buscaIdNomeFundo.id
            }
        });

        res.status(200).json({ message: 'Investimento Salvo com Sucesso !' });
    } catch (error) {
        console.error("Erro ao criar Investimento:", error);
    }
});
router.get('/api/buscainvestimentoacao', async (req, res) => {

    const email = req.query.email
    const user = await prisma.usuario.findUnique({ where: { email: email } });
    try {
        const buscaInvestimentos = await prisma.acao.findMany({ where: { idUser: user.id } });
        console.log("🚀 ~ router.get ~ buscaInvestimentos", buscaInvestimentos)
        res.json(buscaInvestimentos);
    } catch (error) {
        console.error("Erro ao criar buscar investimentos:", error);

    }
})
router.delete('/api/deletainvestimentoacao', async (req, res) => {
    const idDeleta = req.query.id
    console.log("🚀 ~ router.delete ~ idDeleta", idDeleta)
    try {
        const deleta = await prisma.acao.delete({ where: { id: parseInt(idDeleta) } });
        res.status(200).json("Investimento deletado com sucesso !")
    }
    catch (error) {
        console.error("Erro ao deletar Investimento:", error);
    }

})


// ================API DA RENDA FIXA
router.post('/api/postinvestiment', async (req, res) => {
    try {
        const data = req.body.values;
        const emailUser = req.body.emailUser;
        const retornaId = await prisma.usuario.findUnique({ where: { email: emailUser } });

        if (!retornaId) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        const idUser = retornaId.id;
        const { nomeinvestimento, datacompra, valorinvestido, vencimentoativo, banco, tiporenda } = req.body.values;
        console.log("🚀 ~ router.post ~ banco", banco)
        const valorInvestidoAjustado = converteString(valorinvestido);
        const dataCompra = new Date(datacompra);
        const dia = dataCompra.getDate();
        const mes = dataCompra.getMonth() + 1;
        const ano = dataCompra.getFullYear();
        const dataCompraFormatada = `${dia}/${mes}/${ano}`;
        const dataVencimento = new Date(data.vencimentoativo);
        const diaVenc = dataVencimento.getDate();
        const mesVenc = dataVencimento.getMonth() + 1;
        const anoVenc = dataVencimento.getFullYear();
        const dataVenciFormatada = `${diaVenc}/${mesVenc}/${anoVenc}`;
        const tiporendaformatada = tiporenda.toUpperCase();
        const nomeinvestimentoformatada = data.nomeinvestimento.toUpperCase();
        const diasParaVencimento = Math.floor((dataVencimento - dataCompra) / (1000 * 60 * 60 * 24));

        const newInvestimento = await prisma.investimento.create({
            data: {
                idUser: idUser,
                nomeInvestimento: nomeinvestimentoformatada,
                dataCompra: dataCompraFormatada,
                valorInvestido: valorInvestidoAjustado,
                vencimentoAtivo: dataVenciFormatada,
                diasParaVencimento: diasParaVencimento,
                valorAtualinvestimento: 0,
                emailUser: emailUser,
                banco: banco,
                dataSemFormatacao: vencimentoativo,
                tipoRenda: tiporendaformatada
            }
        });
        const valorAtual = await prisma.valorAtual.create({
            data: {
                idInvestimento: newInvestimento.id,
                valor: 0,
                data: new Date()
            }
        });

        res.status(200).json({ message: 'Investimento Salvo com Sucesso !' });
    } catch (error) {
        console.error("Erro ao criar Investimento:", error);
    }
});
router.get('/api/getinvestiment', async (req, res) => {
    const email = req.query.email;
    const user = await prisma.usuario.findUnique({ where: { email: email } });

    if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    try {
        const buscaInvestimentos = await prisma.investimento.findMany({ where: { idUser: user.id } });
        res.json(buscaInvestimentos);
    } catch (error) {
        console.error("Erro ao criar buscar investimentos:", error);
    }
});
router.post('/api/buscavalor', async (req, res) => {
    const data = req.body.id;
    try {
        const buscaInvestimentos = await prisma.investimento.findUnique({ where: { id: parseInt(data) } });
        res.json(buscaInvestimentos);
    } catch (error) {
        console.error("Erro ao criar buscar investimentos:", error);
    }
});
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
router.post('/api/investiment', async (req, res) => {
    const { id } = req.body;

    try {
        const response = await prisma.valorAtual.findMany({ where: { idInvestimento: parseInt(id) } });
        res.json(response);
    } catch (error) {
        console.error('Erro ao buscar valor atual:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});
router.delete('/api/deletarendafixaUnico', async (req, res) => {
    const data = req.body.id;
    console.log("🚀 ~ router.delete ~ data", data)
    try {
        const deletaValorAtual = await prisma.valorAtual.deleteMany({ where: { idInvestimento: parseInt(data) } });
        console.log("🚀 ~ router.delete ~ deletaValorAtual", deletaValorAtual)
        const deleteInvest = await prisma.investimento.delete({ where: { id: parseInt(data) } });
        console.log("🚀 ~ router.delete ~ deleteInvest", deleteInvest)
        res.status(200).json({ message: "Investimento Excluído com Sucesso " });
    } catch (error) {
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});
router.post('/api/getinvestimenthome', async (req, res) => {
    const emailUser = req.body.emailUser;
    try {
        const usuario = await prisma.usuario.findUnique({ where: { email: emailUser } });

        if (!usuario) {
            return res.json({ message: 'Nenhum investimento encontrado para este usuário.' });
        }

        const buscaInvestimentos = await prisma.investimento.findUnique({ where: { idUser: usuario.id } });

        if (!buscaInvestimentos) {
            return res.json({ message: 'Nenhum investimento encontrado para este usuário.' });
        }

        const idInvestimento = buscaInvestimentos.id.toString();
        const buscaRendimento = await prisma.valorAtual.findMany({ where: { idInvestimento: parseInt(idInvestimento) } });

        const investimentoComRendimento = {
            ...buscaInvestimentos,
            rendimento: buscaRendimento
        };

        res.json(investimentoComRendimento);
    } catch (error) {
        console.error("Erro ao buscar investimentos:", error);
        res.status(500).json({ message: 'Erro interno do servidor ao buscar investimentos.' });
    }
});
router.post('/api/getinvestimenthomevalor', async (req, res) => {
    const emailUser = req.body.emailUser;
    try {
        const usuario = await prisma.usuario.findUnique({ where: { email: emailUser } });

        if (!usuario) {
            return res.json({ message: 'Nenhum investimento encontrado para este usuário.' });
        }

        const buscaInvestimentos = await prisma.investimento.findMany({ where: { idUser: usuario.id } });

        res.json(buscaInvestimentos);
    } catch (error) {
        console.error("Erro ao buscar investimentos:", error);
        res.status(500).json({ message: 'Erro interno do servidor ao buscar investimentos.' });
    }
});

// ===================================================


// ===================================================



// =====================Fundos de Investimentos ============
router.post('/api/postfundo', async (req, res) => {
    try {
        const data = req.body.values;
        const emailUser = req.body.emailUser;
        const retornaId = await prisma.usuario.findUnique({ where: { email: emailUser } });

        if (!retornaId) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        const idUser = retornaId.id;
        const tiraespaço = data.nomefii.toUpperCase().trim();
        const { datacompra, quantidade, valorpago } = req.body.values;
        const valorPagoConvertido = converteString(valorpago);
        const dataComprafii = new Date(datacompra);
        const diaVenc = dataComprafii.getDate();
        const mesVenc = dataComprafii.getMonth() + 1;
        const anoVenc = dataComprafii.getFullYear();
        const dataCompraFormatada = `${diaVenc}/${mesVenc}/${anoVenc}`;

        const valorTotal = quantidade * valorPagoConvertido;

        const buscaIdNomeFundo = await prisma.nomeFundoImobiliario.findUnique({ where: { nomefundo: tiraespaço } });

        if (!buscaIdNomeFundo) {
            return res.status(404).json({ message: 'Nome do fundo não encontrado.' });
        }

        const novoInvestimentoFii = await prisma.investimentoFundo.create({
            data: {
                iduser: idUser,
                emailuser: emailUser,
                nomefii: tiraespaço,
                datacompra: dataCompraFormatada,
                quantidade,
                valorpago: valorPagoConvertido,
                valorgasto: valorTotal,
                valoratualfii: valorPagoConvertido,
                idnomefundo: buscaIdNomeFundo.id,
                banco: data.banco,
            }
        });

        const adicionanatabelaproventos = await prisma.proventos.create({
            data: {
                datainserido: new Date(),
                valorprovento: 0,
                idinvestimento: novoInvestimentoFii.id,
                nomeinvestimento: tiraespaço,
                iduser: idUser,
                idnomeinvestimento: buscaIdNomeFundo.id
            }
        });

        res.status(200).json({ message: 'Investimento Salvo com Sucesso !' });
    } catch (error) {
        console.error("Erro ao criar Investimento:", error);
    }
});
router.get('/api/getinvestimentfii', async (req, res) => {
    const emailUser = req.query.email;
    const user = await prisma.usuario.findUnique({ where: { email: emailUser } });

    if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    try {
        const buscaInvestimentos = await prisma.investimentoFundo.findMany({ where: { iduser: user.id } });
        res.json(buscaInvestimentos);
    } catch (error) {
        console.error("Erro ao criar buscar investimentos:", error);
    }
});
router.post('/api/buscavalorfii', async (req, res) => {
    const data = req.body;
    try {
        const dataBank = await prisma.investimentoFundo.findUnique({ where: { id: parseInt(data.id) } });
        res.json(dataBank);
    } catch (error) {
        console.error("Erro ao criar Investimento:", error);
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
router.put('/api/atualizafiiselect', async (req, res) => {
    const data = req.body.data
    const novoValor = req.body.values.novovalorinvestimento;
    try {
        for (let i = 0; i < data.length; i++) {  // Corrigindo a condição de inicialização do loop
            const updatedInvestimento = await InvestimentosFiiSchema.findOneAndUpdate(
                { _id: data[i] },
                { valoratualfii: novoValor },
                { new: true }
            );
        }
        res.status(200).json({ message: "Investimento Atualizado com Sucesso " });
    } catch (error) {
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});
router.post('/api/buscanomesfii', async (req, res) => {
    const IDs = req.body.ids;
    const fundos = [];
    for (let i = 0; i < IDs.length; i++) {
        try {
            await dbConnect();
            const fundo = await InvestimentosFiiSchema.findOne({ _id: IDs[i] });
            if (fundo) {
                fundos.push(fundo);
            }
        } catch (error) {
        }
    }
    res.json(fundos);
});
router.post('/api/investimentfii', async (req, res) => {
    const { id } = req.body

    try {
        await dbConnect()
        const response = await InvestimentosFiiSchema.find({ _id: id })

        res.json(response)

    } catch (error) {

    }

})
router.delete('/api/deletafii', async (req, res) => {
    const data = req.query.id;
    try {
        const deleteInvest = await prisma.investimentoFundo.delete({ where: { id: parseInt(data) } });
        res.status(200).json({ message: "Investimento Excluido com Sucesso " });
    } catch (error) {
        res.status(500).json({ message: "Erro ao excluir investimento" });
    }
});
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


router.post('/api/getfiihome', async (req, res) => {


    const emailUser = req.body.emailUser;

    try {
        await dbConnect();
        const usuario = await UsuariosSchema.findOne({ email: emailUser });
        const buscaInvestimentos = await InvestimentosFiiSchema.find({ iduser: usuario._id }).limit(5);

        if (!buscaInvestimentos) {
            return res.json({ message: 'Nenhum investimento encontrado para este usuário.' });
        }




        res.json(buscaInvestimentos);
    } catch (error) {
        console.error("Erro ao buscar investimentos:", error);
        res.status(500).json({ message: 'Erro interno do servidor ao buscar investimentos.' });
    }

})
//=========================================================


// +++++++++++++++++++++++++Categoria+++++++++++++++++++++++++++++++++++++++++
router.post('/api/novacategoria', async (req, res) => {
    const nome = req.body.categoria.categoria
    const nomeUppercase = nome.toUpperCase().trim();
    try {
        // Verifica se a categoria já existe
        const verificaNome = await prisma.categoria.findUnique({ where: { nomeCategoria: nomeUppercase } });
        if (verificaNome) {
            return res.status(400).json({ message: 'Categoria Já Cadastrada' });
        }
        const novaCategoria = await prisma.categoria.create({
            data: {
                nomeCategoria: nomeUppercase,
            }
        });
        res.status(200).json({ message: 'Categoria cadastrada com sucesso' });
    } catch (error) {
        console.error('Erro ao processar a nova categoria:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});
router.get('/api/buscacategoria', async (req, res) => {
    const buscaCategoria = await prisma.categoria.findMany()
    res.json(buscaCategoria)
});
router.delete('/api/deletacategoria', async (req, res) => {
    const id = req.body.id
    const deletaCategoria = await prisma.formapagamento.delete({ where: { id: id } })

    res.status(200).json("deletado")
});
//=========================================================


// +++++++++++++++++++++++++Forma Pagamento+++++++++++++++++++++++++++++++++++++++++
router.post('/api/novaformapagamento', async (req, res) => {
    const nome = req.body.nome.formapagamento;

    const nomeUppercase = nome.toUpperCase().trim();

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
            }
        });
        res.status(200).json({ message: 'Forma de Pagamento cadastrada com sucesso' });
    } catch (error) {
        console.error('Erro ao processar a forma de pagamento:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});
router.get('/api/buscaformapagamento', async (req, res) => {
    const buscaFormapagamento = await prisma.FormaPagamento.findMany()
    res.json(buscaFormapagamento)
});
router.delete('/api/deletaformapagamento', async (req, res) => {
    const id = req.body.id
    const deletaCategoria = await prisma.formapagamento.delete({ where: { id: id } })
    res.status(200).json("deletado")
});
//=========================================================





//======================Despesa===================================
router.post('/api/novadespesa', async (req, res) => {
    try {
        const { datagasto, local, valorgasto, formadepagamento, responsavel, categoria, pagante, observacao, mescorrespondente } = req.body.values;
        console.log("🚀 ~ router.post ~ categoria", categoria)
        const emailUser = req.body.emailUser;

        const valorNumber = converteString(valorgasto);
        const nomeUppercase = responsavel ? responsavel.toUpperCase().trim() : "";
        const paganteUpercase = pagante ? pagante.toUpperCase().trim() : "";

        // Buscar o ID do usuário pelo email
        const user = await prisma.usuario.findUnique({ where: { email: emailUser } });

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        const novaDespesa = await prisma.Despesas.create({
            data: {
                idUser: user.id,
                dataGasto: datagasto,
                local,
                valorGasto: valorNumber,
                formaDePagamentoId: parseInt(formadepagamento),
                responsavel: nomeUppercase,
                categoriaId: parseInt(categoria),
                emailUser,
                pagante: paganteUpercase,
                observacao,
                mesCorrespondente: mescorrespondente
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
                idUser: idUser
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
            where: { mesCorrespondente: iniciaPadraoData, idUser: idUser },
            include: {
                categoria: true,
                FormaPagamento: true
            }
        });
        console.log("🚀 ~ router.get ~ buscaDespesa", buscaDespesa)

        res.json(buscaDespesa);
    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});

// router.get('/api/buscadespesamesatualhome', async (req, res) => {
//     try {
//         const email = req.query.email.email;

//         const user = await prisma.usuario.findUnique({ where: { email: email } });

//         if (!user) {
//             return res.status(404).json({ message: 'Usuário não encontrado' });
//         }

//         const mesAtual = new Date();
//         const mes = mesAtual.getMonth() + 1;
//         const ano = mesAtual.getFullYear();
//         const iniciaPadraoData = `${mes}/${ano}`;

//         const buscaDespesa = await prisma.despesas.findMany({
//             where: { mesAno: iniciaPadraoData, idUser: user.id.toString() },
//         });

//         res.json(buscaDespesa);
//     } catch (error) {
//         console.error("Erro ao buscar usuário:", error);
//         res.status(500).json({ error: "Erro interno do servidor" });
//     }
// });

router.post('/api/buscadespesadata', async (req, res) => {
    try {
        const { data } = req.body;
        console.log("🚀 ~ router.post ~ data", data)
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
        const { idDespesa } = req.body;

        await prisma.despesas.delete({
            where: { id: parseInt(idDespesa) },
        });

        res.status(200).json("deletado");
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
    try {
        await dbConnect();
        const data = req.body.data.mes
        const email = req.body.data.emailUser.email
        const usuario = await UsuarioSchema.findOne({ email: email });
        console.log("🚀 ~ router.post ~ buscaUser", usuario)
        const buscaDespesa = await DespesaSchema.find({ idUser: usuario._id.toString(), mesano: data });
        console.log("🚀 ~ router.post ~ buscaFatura", buscaDespesa)
        for (let i = 0; i < buscaDespesa.length; i++) {
            const fechaFatura = await DespesaSchema.findOneAndUpdate({ _id: buscaDespesa[i]._id }, { fechada: 1 }, { new: true });
        }
        res.status(200).json({ message: 'Fatura Fechada com Sucesso' })
    } catch (error) {
        res.status(500).json({ error: "Erro ao fechar fatura" })
    }
})

//======================Controle de Contas===================================
router.post('/api/novaconta', async (req, res) => {
    await dbConnect()
    const nome = req.body
    const { empresa, datagasto, parcelamento, valorconta, vencimento, formadepagamento } = req.body.values
    const valorContaConvertido = converteString(valorconta)
    const emailUser = req.body.emailUser
    const retornaId = await UsuariosSchema.findOne({ email: emailUser })
    const idUser = retornaId._id
    const nomeUppercase = empresa.toUpperCase().trim()


    const dataConta = new Date(datagasto);
    const dia = dataConta.getDate();
    const mes = dataConta.getMonth() + 1;
    const ano = dataConta.getFullYear();
    const dataContaFormatada = `${dia}/${mes}/${ano}`;

    try {
        let dataVencimento = new Date(vencimento); // Inicia com a data de vencimento original
        for (let i = 0; i < parcelamento; i++) {
            const diaVenc = dataVencimento.getDate();
            const mesVenc = dataVencimento.getMonth() + 1;
            const anoVenc = dataVencimento.getFullYear();
            const dataVencimentoFormatada = `${diaVenc}/${mesVenc}/${anoVenc}`;
            const mes_ano = `${mesVenc}/${anoVenc}`;

            const novaConta = new ControleContasSchema({
                idUser,
                empresa: nomeUppercase,
                datagasto: dataContaFormatada,
                vencimento: dataVencimentoFormatada,
                parcelamento,
                valorconta: valorContaConvertido,
                formadepagamento,
                mesano: mes_ano,
                pago: false,
                emailuser: emailUser
            });

            const salvaForma = await novaConta.save();

            // Incrementa para o próximo mês de vencimento
            dataVencimento.setMonth(dataVencimento.getMonth() + 1);

            // Se for o último mês do ano, avança para o próximo ano e mês 1 (janeiro)
            if (mesVenc === 12) {
                dataVencimento.setFullYear(anoVenc + 1);
                dataVencimento.setMonth(0); // Janeiro é representado pelo mês 0
            }
        }

        res.status(200).json({ message: 'Conta(s) salva(s) com sucesso' });
    } catch (error) {
        console.error('Erro ao processar a despesa:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }

});
router.get('/api/buscaconta', async (req, res) => {
    await dbConnect();
    const { email } = req.query; // Use req.query para obter parâmetros da URL

    try {
        // Verifique se o email é fornecido
        if (!email) {
            return res.status(400).json({ message: 'O parâmetro "email" é obrigatório' });
        }

        // Busque o usuário pelo email
        const usuario = await UsuariosSchema.findOne({ email: email.email });


        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        const buscaDespesa = await ControleContasSchema.find({ idUser: usuario._id }).sort(({ mesano: 1 }))

        res.json(buscaDespesa)

    } catch (error) {
        console.error('Erro ao buscar despesas:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }






});
router.get('/api/buscacontamesatual', async (req, res) => {
    await dbConnect();
    const { email } = req.query; // Use req.query para obter parâmetros da URL
    try {
        // Verifique se o email é fornecido
        if (!email) {
            return res.status(400).json({ message: 'O parâmetro "email" é obrigatório' });
        }

        // Busque o usuário pelo email
        const usuario = await UsuariosSchema.findOne({ email: email.email });

        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        const mesAtual = new Date();
        const mes = mesAtual.getMonth() + 1;
        const ano = mesAtual.getFullYear();
        const iniciaPadraoData = `${mes}/${ano}`;

        // Busque as despesas do usuário para o mês atual
        const buscaDespesa = await ControleContasSchema.find({ mesano: iniciaPadraoData, usuarioId: usuario._id });
        res.json(buscaDespesa);
    } catch (error) {
        console.error('Erro ao buscar despesas:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});
router.get('/api/buscacontamesatualhome', async (req, res) => {
    await dbConnect();
    const email = req.query.email // Use req.query para obter parâmetros da URL    
    try {
        // Verifique se o email é fornecido
        if (!email) {
            return res.status(400).json({ message: 'O parâmetro "email" é obrigatório' });
        }

        // Busque o usuário pelo email
        const usuario = await UsuariosSchema.findOne({ email: email });

        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        const mesAtual = new Date();
        const mes = mesAtual.getMonth() + 1;
        const ano = mesAtual.getFullYear();
        const iniciaPadraoData = `${mes}/${ano}`;

        // Busque as despesas do usuário para o mês atual
        const buscaDespesa = await ControleContasSchema.find({ mesano: iniciaPadraoData, idUser: usuario._id });
        console.log("🚀 ~ router.get ~ buscaDespesa:", buscaDespesa)
        res.json(buscaDespesa);
    } catch (error) {
        console.error('Erro ao buscar despesas:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});
router.post('/api/buscacontadata', async (req, res) => {
    await dbConnect();

    try {

        const { data } = req.body;
        const emailUser = req.body.emailUser.email

        // Busque o usuário pelo email
        const usuario = await UsuariosSchema.findOne({ email: emailUser });

        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }



        const buscaDespesa = await ControleContasSchema.find({ mesano: data, idUser: usuario._id });
        res.json(buscaDespesa);
    } catch (error) {
        console.error('Erro ao buscar despesas por data:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});
router.put('/api/pagaconta', async (req, res) => {
    const { data } = req.body;

    try {
        await dbConnect();

        // Buscar a conta atual no banco de dados
        const contaAtual = await ControleContasSchema.findById(data);

        // Verificar se a conta existe
        if (!contaAtual) {
            return res.status(404).json({ message: 'Conta não encontrada' });
        }

        // Inverter o valor de 'pago' (true para false e vice-versa)
        const novoValorPago = !contaAtual.pago;

        // Atualizar o campo 'pago' no banco de dados
        const buscaConta = await ControleContasSchema.findByIdAndUpdate(
            data,
            { pago: novoValorPago },
            { new: true }
        );

        res.status(200).json({ message: 'Pagamento realizado com sucesso' });
    } catch (error) {
        console.error('Erro ao buscar despesas por data:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
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



//==========================================

// =====================Banco ============

router.post('/api/banco', async (req, res) => {
    try {
        const data = req.body.banco
        console.log("🚀 ~ router.post ~ data", data)
        const nomeUppercase = data.toUpperCase().trim();
        const verificaNome = await prisma.banco.findUnique({ where: { nomeBanco: nomeUppercase } });
        console.log("🚀 ~ router.post ~ verificaNome", verificaNome)
        if (verificaNome) {
            return res.status(400).json({ message: 'Banco Já Cadastrado ' })
        }
        const novoBanco = await prisma.banco.create({
            data: {
                nomeBanco: nomeUppercase,
            }
        })
        console.log("🚀 ~ router.post ~ novoBanco", novoBanco)
        res.status(200).json({ message: 'Banco Cadastrado ' })
    } catch (error) {
        res.status(400).json({ message: 'Erro ao Cadastrar' })
    }
});
router.get('/api/buscabanco', async (req, res) => {
    await dbConnect
    try {

        const buscaBanco = await prisma.banco.findMany()
        res.json(buscaBanco)
    } catch (error) {
        res.status(400).json({ message: 'Erro ao Cadastrar' })
    }
});

// router.post('/api/anotacoes', async (req, res) => {
//     await dbConnect
//     try {
//         const data = req.body.anotacao
//         console.log("🚀 ~ router.post ~ data", data)
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