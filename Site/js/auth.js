// Simula um banco de dados de usuários
const usuarios = {
    'professor@fatec': {
        senha: '1234',
        tipo: 'professor',
        nome: 'Professor'
    },
    'diretor@fatec': {
        senha: '1234',
        tipo: 'diretor',
        nome: 'Diretor'
    },
    'secretaria@fatec': {
        senha: '1234',
        tipo: 'secretaria',
        nome: 'Secretária Exemplo'
    }
};

// Função para fazer login
function fazerLogin(email, senha) {
    const usuario = usuarios[email];
    
    // Debug para ver o que está chegando
    console.log('Tentativa de login:', email, senha);
    console.log('Usuário encontrado:', usuario);
    
    if (!usuario || usuario.senha !== senha) {
        return false;
    }

    // Cria a sessão do usuário
    const sessao = {
        email: email,
        tipo: usuario.tipo,
        nome: usuario.nome,
        timestamp: new Date().getTime()
    };

    // Salva a sessão no localStorage
    localStorage.setItem('sessaoUsuario', JSON.stringify(sessao));
    
    // Redireciona para o dashboard
    window.location.href = `dashboard.html?tipo=${usuario.tipo}`;
    return true;
}

// Função para verificar se usuário está logado
function verificarAutenticacao() {
    const sessao = localStorage.getItem('sessaoUsuario');
    if (!sessao) {
        return false;
    }

    const sessaoObj = JSON.parse(sessao);
    // Verifica se a sessão expirou (24 horas)
    if (new Date().getTime() - sessaoObj.timestamp > 24 * 60 * 60 * 1000) {
        fazerLogout();
        return false;
    }

    return sessaoObj;
}

// Função para fazer logout
function fazerLogout() {
    localStorage.removeItem('sessaoUsuario');
    window.location.href = 'login.html';
} 