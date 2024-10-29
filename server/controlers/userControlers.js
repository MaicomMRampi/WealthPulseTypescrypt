const prisma = require('../config/db');
const { crypto } = require('../utils/password')


const createUser = async (req, res) => {
    console.log("chegou no post")
    const dadosCadastro = req.body
    console.log("🚀 ~ createUser ~ dadosCadastro", dadosCadastro)
    try {


        const avaliacaoGratuita = new Date();
        avaliacaoGratuita.setDate(avaliacaoGratuita.getDate() + 15);
        const firstPay = new Date();
        firstPay.setMonth(firstPay.getMonth() + 1);

        // INSERE DADOS NA TABELA DE PAGAMENTO USUARIOS//

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
        const novoUsuario = await prisma.Usuario.create({
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
                valorPago: 10,
                status: 0,
            }
        })
        res.status(200).json({ message: 'Usuário Salvo com Sucesso !' });
    } catch (error) {
        console.error("Erro ao criar produto:", error);

    }

}

module.exports = {
    createUser
}