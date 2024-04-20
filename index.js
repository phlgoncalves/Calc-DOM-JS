// selecionar os elementos na tela
const main = document.querySelector('main')
const root = document.querySelector(':root') //elemento :root do CSS
const input = document.getElementById('input') //input que aparecerão os números digitados
const resultInput = document.getElementById('result') //input que irá aparecer o resultado

// criei um array com todas as teclas que eu queria que sejam permitidas ser digitadas na calculadora
const allowedKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "]

// função para retornar os valores ao clicar nos botões da calculadora com o mouse
document.querySelectorAll('.charKey').forEach(function(charKeyBtn){ //pegamos os valores pela query de classes (.charKey) e criei uma função para criar o evento
    charKeyBtn.addEventListener('click', function () { //adicionei um evento click e uma função anônima para adicionar propriedades a esse evento
        const value = charKeyBtn.dataset.value //variavel value, receberá o valor dos botões pelo data-value do HTML (dataset.value)
        input.value += value //input recebera o valor do botão clicado
        input.focus()
    })
})

// atibuindo o evento de limpar ao botão "C" 
document.getElementById('clear').addEventListener('click', function(){
    input.value = ''
    input.focus()
})

// evento para permiti digitar no teclado apenas os caracteres do array acima
input.addEventListener('keydown', function (ev) {
    // tirando o comportamento padrão,ou seja, tirei a permissão do usuário de digitar qualquer valor do teclado para poder controlar apenas os que eu quero que sejam permitidos 
    ev.preventDefault() 
    if(allowedKeys.includes(ev.key)){ 
        input.value += ev.key
        return
        //se o nosso array inclui o ev.key (a tecla que o usuário digitou), SE ela estiver incluída no array acrescentamos no input
    }
    // permitindo o Backspace para apagar
    if(ev.key === 'Backspace'){
        input.value = input.value.slice(0, -1) 
        //se a tecla digitada (ev.key) for o Backspace, ele irá pegar a partir do carcater inicial até a -1 (penultimo caracter), ou seja, excluirá o ultimo
    }
    // permitindo o Enter - Se a tecla for enter, executa a função calcular
    if(ev.key === 'Enter'){
        calculate()
    }
})

// atribui ao botão de "=" a função de calcular os valores do input - ao clicar no botão de =, executa a função calcular
document.getElementById('equal').addEventListener('click', calculate)

// Função para calcular!
function calculate(){
    // criaremos um tratamento de ERROS (se os números digitados não forem válidos)
    resultInput.value = 'ERROR'
    resultInput.classList.add('error') //pinta o input de resultado de vermelho!

    // SE estiver errado ele para aqui! se estiver válido ele continuará e removerá a cor e a frase! 

    const result = eval(input.value)
    // eval ele calcula as strings do JS se for um código válido, porem cuidado, qualquer código válido de JS ele irá rodar
    // neste caso ele é válido porque os botões da calculadora estão limitadas então o usuáruo não conseguirá digitar códigos JS no input
    resultInput.value = result

    resultInput.classList.remove('error') //SE não estiver inválido ele removerá a cor vermelha do input
}

// atribuir evento para o botão de copiar para a área de transferência
document.getElementById('copyToClipboard').addEventListener('click', function(ev){ //pegamos o evento com o parâmetro evento porque iremos modificar o botão quando acontecer o evento de copiar
    const button = ev.currentTarget //variavel para usar ao botão ser clicado, currentTarget é quando o alvo é acionado (alvo = botão de copiar)
    if(button.innerText === 'Copiar'){  //se o texto estiver Copiar...
        button.innerText = 'Copiado!'
        button.classList.add('success') //muda a cor do botão para uma classe definida no CSS com a cor primária
        navigator.clipboard.writeText(resultInput.value)
        // navigator é uma propriedade global disponivel no window com várias funcionalidades entre elas a clipBoard (area de transferencia) que copia para a área de transferência
    } else {
        button.innerText = 'Copiar'
        button.classList.remove('success')
    }
})

// trocar o tema de claro para escuro
document.getElementById('themeSwitcher').addEventListener('click', function () {
    if(main.dataset.theme === 'dark'){
        root.style.setProperty('--bg-color', '#f1f5f9')
        root.style.setProperty('--border-color', '#aaa')
        root.style.setProperty('--font-color', '#212529')
        root.style.setProperty('--primary-color', '#db7b1b')
        main.dataset.theme = 'light'
    } else {
        root.style.setProperty('--bg-color', '#212529')
        root.style.setProperty('--border-color', '#aaa')
        root.style.setProperty('--font-color', '#f1f5f9')
        root.style.setProperty('--primary-color', '#dc9349')
        main.dataset.theme = 'dark'
    }
})

