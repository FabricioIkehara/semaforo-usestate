import React, { useState, useEffect } from 'react';
import './App.css'; 


const IMAGEM_BASE_SEMAFORO = 'http://googleusercontent.com/image_generation_content/1';

function TrafficLight() {
  
  const [luzAtual, setLuzAtual] = useState('red'); 

  
  useEffect(() => {
    
    const idIntervalo = setInterval(() => {
     
      if (luzAtual === 'red') {
        setLuzAtual('green');
      } else if (luzAtual === 'green') {
        setLuzAtual('yellow');
      } else {
        setLuzAtual('red');
      }
    }, 3000); 

    
    return () => clearInterval(idIntervalo);
  }, [luzAtual]); 

  // Estilo para o contêiner principal do semáforo.
  // A imagem de fundo é definida aqui.
  const estiloContenedorSemaforo = {
    backgroundImage: `url('${IMAGEM_BASE_SEMAFORO}')`, // sem a imagem, inativo
    backgroundSize: '100% 100%', // Cobre toda a área do contêiner
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100px', 
    height: '250px', 
    borderRadius: '10px',
    position: 'relative', 
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around', 
    alignItems: 'center',
    padding: '10px 0',
  };

  
  const estiloLuz = (cor) => ({
    width: '40px', 
    height: '40px', 
    borderRadius: '50%', 
    backgroundColor: cor, 
    
    opacity: luzAtual === cor ? 1 : 0.2, 
    boxShadow: luzAtual === cor ? `0 0 20px 10px ${cor}, inset 0 0 15px 3px rgba(255, 255, 255, 0.7)` : 'none', // Aumentei os valores para um brilho mais evidente
    transition: 'opacity 0.3s ease-in-out, box-shadow 0.3s ease-in-out', 
    border: '2px solid rgba(0,0,0,0.2)',
  });


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