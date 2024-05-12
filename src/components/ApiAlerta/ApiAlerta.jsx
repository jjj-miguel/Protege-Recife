// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Drizzle from '../../assets/drizzle.svg';
import Normal from '../../assets/Normal.svg';
import Rain from '../../assets/Rain.svg'
import storm from '../../assets/storm.svg'
import Styles from './ApiAlerta.module.css';
const API_KEY = '447954334ef4e0c591d2ef05536ccc95';
const CITY_NAME = 'Recife'; // Substitua 'NOME_DA_CIDADE' pelo nome da cidade desejada.

const ApiAlerta = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&units=metric&appid=${API_KEY}&lang=pt_br`);
        setWeather(response.data);
      } catch (error) {
        console.error('Erro ao obter dados meteorológicos:', error);
      }
    };

    fetchWeather();
  }, []);

  if (!weather) {
    return <div>Carregando...</div>;
  }

  const weatherDescription = weather.weather[0].description;
  let imageUrl;
  let descriptionClima;
  let descriptionClass;



    if (weatherDescription.includes('tempestade')) { 
    imageUrl = [storm];
    descriptionClima = "Alerta Vermelho";// URL_PARA_tempestade
    descriptionClass = Styles['storm-text']; // Aplica a classe CSS para clima normal
} else if (weatherDescription.includes('chuva')) { 
    imageUrl = [Rain];
    descriptionClima = "Alerta Laranja";// URL_PARA_CHUVA forte
    descriptionClass = Styles['rain-text']; // Aplica a classe CSS para clima normal

  } else if (weatherDescription.includes('chuvisco')) { 
    imageUrl = [Drizzle]; // URL_PARA_CHUVISCO
    descriptionClima = "Alerta Amarelo";
    descriptionClass = Styles['drizzle-text']; // Aplica a classe CSS para chuva fraca 
  } 
    else {
    imageUrl = [Normal]; // URL_PARA_CLIMA_NORMAL
    descriptionClima = "Alerta Verde";
    descriptionClass = Styles['normal-text']; // Aplica a classe CSS para clima normal

  }

  return (
    <div className={Styles.Container}>
    <div className={Styles.Imagem} style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover' }}></div>
    <div className={Styles.Alerta}>
    <p className={Styles.text_regiao}> Sua região está em : </p>
    <p className={descriptionClass}>{descriptionClima}</p>
    </div> 
      <div className={Styles.dcAlerta}>
              <p>Condição atual: {weatherDescription}</p>
      </div>

      </div>
  );
};

export default ApiAlerta;
