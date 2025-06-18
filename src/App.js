import React, { useState, useEffect } from 'react';
import './App.css'; // Importa o arquivo CSS para estilos globais ou específicos

// URL da imagem de um semáforo real. Você pode substituir por outra URL se desejar.
// É importante que esta imagem sirva apenas como base, e as luzes sejam sobrepostas pelo CSS/JS.
const IMAGEM_BASE_SEMAFORO = 'http://googleusercontent.com/image_generation_content/1';

function TrafficLight() {
  // luzAtual: armazena a cor da luz que está acesa ('red', 'yellow', 'green')
  // setLuzAtual: função para atualizar o estado luzAtual
  // Usamos os nomes das cores em inglês para que o CSS as reconheça corretamente.
  const [luzAtual, setLuzAtual] = useState('red'); // Começa com a luz vermelha

  // useEffect: Hook para lidar com efeitos colaterais, como a mudança automática das luzes
  useEffect(() => {
    // Define um intervalo para mudar a luz a cada 3 segundos (3000 milissegundos)
    const idIntervalo = setInterval(() => {
      // Lógica para alternar as luzes em sequência: red -> green -> yellow -> red
      if (luzAtual === 'red') {
        setLuzAtual('green');
      } else if (luzAtual === 'green') {
        setLuzAtual('yellow');
      } else {
        setLuzAtual('red');
      }
    }, 3000); // Intervalo de 3 segundos

    // Função de limpeza: O clearInterval é chamado quando o componente é desmontado
    // ou antes que o efeito seja reexecutado (se as dependências mudarem).
    // Isso evita vazamentos de memória e garante que apenas um intervalo esteja ativo.
    return () => clearInterval(idIntervalo);
  }, [luzAtual]); // A dependência luzAtual garante que o efeito seja re-executado
                      // se luzAtual mudar, o que redefine o timer para a nova sequência.


  // Estilo para o contêiner principal do semáforo.
  // A imagem de fundo é definida aqui.
  const estiloContenedorSemaforo = {
    backgroundImage: `url('${IMAGEM_BASE_SEMAFORO}')`, // Usa a imagem do semáforo como fundo
    backgroundSize: '100% 100%', // Cobre toda a área do contêiner
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100px', // Largura do contêiner do semáforo (ajuste conforme a imagem)
    height: '250px', // Altura do contêiner do semáforo (ajuste conforme a imagem)
    borderRadius: '10px',
    position: 'relative', // Para posicionar as luzes sobre a imagem
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around', // Distribui as luzes uniformemente
    alignItems: 'center',
    padding: '10px 0',
  };

  // Estilo para cada "luz" individual do semáforo.
  // `cor` é o parâmetro para determinar a cor da luz (red, yellow, green)
  const estiloLuz = (cor) => ({
    width: '40px', // Tamanho do círculo da luz
    height: '40px', // Tamanho do círculo da luz
    borderRadius: '50%', // Transforma o div em um círculo
    backgroundColor: cor, // Define a cor de fundo da luz
    // Opacidade condicional: 1 (totalmente visível) se a luz atual for esta cor, senão 0.2 (apagada)
    opacity: luzAtual === cor ? 1 : 0.2, // Opacidade reduzida para luzes apagadas
    // Adiciona uma sombra para dar um efeito de "brilho" à luz acesa
    boxShadow: luzAtual === cor ? `0 0 20px 10px ${cor}, inset 0 0 15px 3px rgba(255, 255, 255, 0.7)` : 'none', // Aumentei os valores para um brilho mais evidente
    transition: 'opacity 0.3s ease-in-out, box-shadow 0.3s ease-in-out', // Transição suave para opacidade e sombra
    border: '2px solid rgba(0,0,0,0.2)', // Borda sutil
  });

  // Mapeamento de cores para exibição no texto, para manter a interface em português
  const nomeCorPortugues = {
    'red': 'VERMELHO',
    'yellow': 'AMARELO',
    'green': 'VERDE'
  };

  return (
    <div className="app-container">
      <h1>Semáforo do useState </h1>
      <div style={estiloContenedorSemaforo}>
        {/* Renderiza as luzes. A visibilidade é controlada pela opacidade em estiloLuz */}
        <div style={estiloLuz('red')}></div> {/* Usando 'red' para o CSS */}
        <div style={estiloLuz('yellow')}></div> {/* Usando 'yellow' para o CSS */}
        <div style={estiloLuz('green')}></div> {/* Usando 'green' para o CSS */}
      </div>
      <p>O farol está: <span style={{ fontWeight: 'bold', color: luzAtual }}>{nomeCorPortugues[luzAtual]}</span></p>
    </div>
  );
}


function App() {
  return (
    <div className="App">
      <TrafficLight />
    </div>
  );
}

export default App;