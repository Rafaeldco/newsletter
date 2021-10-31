const knex = require('../conexao');
const nodemailer = require('../nodemailer');

const cadastrarAssinante = async (req, res) => {
    const { nome, email } = req.body;

    if (!nome || !email) {
        return res.status(400).json({ mensagem: "Por favor, insira o seu nome e e-mail!" });
    }

    try {
        const verificarEmail = await knex('assinantes').where({ email });
        if (verificarEmail.length > 0) {
            return res.status(400).json({ mensagem: "O e-mail já está cadastrado em nossa Newsletter!" });
        }

        const query = await knex('assinantes').insert({ nome, email });

        if (query.rowCount === 0) {
            return res.status(400).json("Não conseguimos cadastrá-lo em nossa Newsletter, por favor, tente novamente.");
        }

        return res.status(200).json({ mensagem: "Parabéns, a sua assinatura em nossa Newsletter foi concluída com sucesso!" });

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const enviarEmail = async (req, res) => {
    const { texto } = req.body;

    if (!texto) {
        return res.status(400).json({ mensagem: "Insira o texto para ser enviado no e-mail!" });
    }

    try {
        const dados = await knex('assinantes').select('email', 'nome').debug();
        for (let i = 0; i < dados.length; i++) {
            nodemailer.sendMail({
                from: 'Newsletter <newsletter@example.com>', // sender address
                to: dados[i].email, // list of receivers
                subject: "Newsletter", // Subject line
                // text: `Olá, ${listarEmails[i].nome}! ${texto}`, // plain text body
                template: 'newsletter',
                context: {
                    nome: dados[i].nome,
                    texto: texto
                }
            });
        }
        return res.status(200).json({ mensagem: "E-mails enviados com sucesso!" });


    } catch (error) {
        return res.status(400).json(error.message);
    }


}

module.exports = {
    cadastrarAssinante,
    enviarEmail
}