//Dados base de configuração do sistema 
const express = require('express');

const app = express();
const PORT = 3011;
app.use(express.json());

// Dados armazenados para representação
let transacoes = [];
let calendarioEconomico = [
    { data: '2024-10-25', evento: 'Decisão de taxa de juros', impacto: 'Alto' },
    { data: '2024-10-30', evento: 'Relatório de empregos', impacto: 'Médio' },
    { data: '2024-11-05', evento: 'Relatório de PIB', impacto: 'Alto' },
];
let noticias = [];
let relatorios = [];

//Cadastro de Transação
app.post('/cadastrar-transacao', (req, res) => {
    const { tipo, ativo, quantidade, preco } = req.body;

    if (!tipo || !ativo || quantidade === undefined || preco === undefined) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
    }

    const novaTransacao = {
        id: Date.now(),
        tipo,
        ativo,
        quantidade,
        preco,
        data: new Date()
    };

    transacoes.push(novaTransacao);
    console.log('Transação cadastrada:', novaTransacao);
    res.status(201).json({ mensagem: 'Transação cadastrada com sucesso.', transacao: novaTransacao });
});

//Calcular o saldo
app.get('/calcular-saldo', (req, res) => {
    let saldo = 0;

    transacoes.forEach(transacao => {
        if (transacao.tipo === 'compra') {
            saldo -= transacao.quantidade * transacao.preco;
        } else if (transacao.tipo === 'venda') {
            saldo += transacao.quantidade * transacao.preco;
        }
    });

    const resultado = {
        mensagem: 'Saldo calculado com sucesso.',
        saldo: saldo,
        totalTransacoes: transacoes.length,
        transacoes: transacoes
    };

    console.log('Resultado do cálculo do saldo:', resultado);
    res.json(resultado);
});

//Acessar o calendário econômico
app.get('/calendario-economico', (req, res) => {
    res.json({
        mensagem: 'Calendário econômico acessado com sucesso.',
        eventos: calendarioEconomico
    });
});

//Acessar notícias
app.get('/noticias', (req, res) => {
    res.json({
        mensagem: 'Notícias acessadas com sucesso.',
        noticias: noticias
    });
});

//Cdastrar notícias (serão importadas)
app.post('/cadastrar-noticia', (req, res) => {
    const { titulo, descricao, data, fonte } = req.body;

    if (!titulo || !descricao || !data || !fonte) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
    }

    const novaNoticia = {
        id: Date.now(),
        titulo,
        descricao,
        data,
        fonte
    };

    noticias.push(novaNoticia);
    console.log('Notícia cadastrada:', novaNoticia);
    res.status(201).json({ mensagem: 'Notícia cadastrada com sucesso.', noticia: novaNoticia });
});

//Acessar relatórios
app.get('/relatorios', (req, res) => {
    res.json({
        mensagem: 'Relatórios acessados com sucesso.',
        relatorios: relatorios
    });
});

//Cadastrar relatórios
app.post('/cadastrar-relatorio', (req, res) => {
    const { titulo, conteudo, data } = req.body;

    if (!titulo || !conteudo || !data) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
    }

    const novoRelatorio = {
        id: Date.now(), 
        titulo,
        conteudo,
        data
    };

    relatorios.push(novoRelatorio); 
    console.log('Relatório cadastrado:', novoRelatorio);
    res.status(201).json({ mensagem: 'Relatório cadastrado com sucesso.', relatorio: novoRelatorio });
});

//Iniciando servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
