import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import "../assets/style/board.scss";
import Resim1 from "../assets/img/baby-elephant-3526681_1280.png";
import Resim2 from "../assets/img/kid-7404537_1280.png";
import Resim3 from "../assets/img/child-8320341_1280.png";
import Resim4 from "../assets/img/fox-5679446_1280.png";
import Resim5 from "../assets/img/lamb-1388937_1280.png";
import Resim6 from "../assets/img/bee.png";
import Resim7 from "../assets/img/bird.png";
import Resim8 from "../assets/img/dinasour.png";
import Resim9 from "../assets/img/duck.png";
import Resim10 from "../assets/img/cat.png";
import Resim11 from "../assets/img/rakun.png";
import Resim12 from "../assets/img/rat.png";
import Resim13 from "../assets/img/butterfly.png"
import CardBack from "../assets/img/greeting-card-6690064_1280.png";

const Board = () => {
  const [cardImages, setCardImages] = useState([
    { id: 1, image: Resim1, flipped: false, matched: false },
    { id: 2, image: Resim1, flipped: false, matched: false },
    { id: 3, image: Resim2, flipped: false, matched: false },
    { id: 4, image: Resim2, flipped: false, matched: false },
    { id: 5, image: Resim3, flipped: false, matched: false },
    { id: 6, image: Resim3, flipped: false, matched: false },
    { id: 7, image: Resim4, flipped: false, matched: false },
    { id: 8, image: Resim4, flipped: false, matched: false },
    { id: 9, image: Resim5, flipped: false, matched: false },
    { id: 10, image: Resim5, flipped: false, matched: false },
    { id: 11, image: Resim6, flipped: false, matched: false },
    { id: 12, image: Resim6, flipped: false, matched: false },
    { id: 13, image: Resim7, flipped: false, matched: false },
    { id: 14, image: Resim7, flipped: false, matched: false },
    { id: 15, image: Resim8, flipped: false, matched: false },
    { id: 16, image: Resim8, flipped: false, matched: false },
    { id: 17, image: Resim9, flipped: false, matched: false },
    { id: 18, image: Resim9, flipped: false, matched: false },
    { id: 19, image: Resim10, flipped: false, matched: false },
    { id: 20, image: Resim10, flipped: false, matched: false },
    { id: 21, image: Resim11, flipped: false, matched: false },
    { id: 22, image: Resim11, flipped: false, matched: false },
  ]);

  const [flippedCards, setFlippedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [timer, setTimer] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (gameStarted) {
      shuffleCards();
      startTimer();
    }

    return () => {
      clearInterval(timer); 
    };
  }, [gameStarted]);

  useEffect(() => {
    if (timeLeft <= 0) {
      gameOver();
    }
  }, [timeLeft]);

  useEffect(() => {
    if (cardImages.every((card) => card.matched)) {
      Swal.fire({
        title: 'Tebrikler!',
        text: 'Tüm kartları eşleştirdiniz!',
        icon: 'success',
        confirmButtonText: 'Tamam',
      }).then(() => {
        startNewGame();
      });
    }
  }, [cardImages]);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages];
    for (let i = shuffledCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
    }
    setCardImages(shuffledCards);
  };

  const startTimer = () => {
    const newTimer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    setTimer(newTimer);
  };

  const stopTimer = () => {
    clearInterval(timer);
  };

  const flipCard = (id) => {
    const newCards = [...cardImages];
    const card = newCards.find((card) => card.id === id);

    if (flippedCards.length === 2) return; 

    card.flipped = true;
    setFlippedCards([...flippedCards, card]);

    if (flippedCards.length === 1) {
      // İki kart seçildiğinde eşleşmeyi kontrol et
      const firstCard = flippedCards[0];

      if (firstCard.image === card.image) {
        // Kartlar eşleşiyorsa açık kalsın
        firstCard.matched = true;
        card.matched = true;
        setScore(score + 10);
      } else {
        setTimeout(() => {
          firstCard.flipped = false;
          card.flipped = false;
          setCardImages([...newCards]);
        }, 1000);
      }
      setFlippedCards([]);
    }

    setCardImages([...newCards]);

    // Süreyi başlatma
    if (!gameStarted) {
      setGameStarted(true);
    }
  };

  const gameOver = () => {
    stopTimer();
    Swal.fire({
      title: 'Süre Doldu!',
      text: 'Maalesef verilen süre içerisinde oyunu tamamlayamadınız.',
      icon: 'error',
      confirmButtonText: 'Tamam',
    });
  };

  const startNewGame = () => {
    setCardImages((prevCards) =>
      prevCards.map((card) => ({
        ...card,
        flipped: false,
        matched: false
      }))
    );
    setFlippedCards([]);
    setScore(0);
    setTimeLeft(60);
    stopTimer();
    setGameStarted(false);
  };

  return (
    <div>
      <div className='scoreboard'>
      <h1 style={{ textAlign: 'center', color: "black" }}>Score: {score}</h1>
      <h2 style={{ textAlign: 'center', color: 'black' }}>Kalan Süre: {timeLeft} saniye</h2>
      <button className='newgame' onClick={startNewGame} style={{ padding: '10px 20px', fontSize: '16px' }}> Yeni Oyun
      </button>
         
      </div>
      <div className="group">
    {cardImages.map((card) => (
      <div key={card.id} className={`card ${card.flipped || card.matched ? 'flipped' : ''}`}>
        {card.flipped || card.matched ? (
          <img 
            src={card.image}
            alt={`Fotoğraf ${card.id}`}
            onClick={() => flipCard(card.id)}
          />
        ) : (
          <img
            src={CardBack}
            alt="Kart Arka"
            className="card-back "
            onClick={() => flipCard(card.id)}
          />
        )}
      </div>
    ))}
  </div>
    </div>
  );
};

export default Board;
