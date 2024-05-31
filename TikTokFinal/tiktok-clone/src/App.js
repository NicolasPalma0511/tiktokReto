import React, { useEffect, useState } from 'react';
import Video from './components/Video';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import { FaHome, FaUserFriends, FaCompass, FaVideo, FaBell, FaInbox, FaUser, FaPlus, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const App = () => {
  const [userId, setUserId] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');

    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      const newUserId = uuidv4();
      setUserId(newUserId);
      localStorage.setItem('userId', newUserId);
    }
  }, []);

  const videos = [
    { id: 'video1', url: 'https://www.dropbox.com/scl/fi/3bs9ba6fzo08bs1b9sx9p/AFTERSUN-Aftersun-2022-Aftersun-topfilmsTyE-online-video-cutter.com.mp4?rlkey=7c8pu0nemi4ar99yf0k1z4l4w&st=hg7azne5&raw=1' },
    { id: 'video2', url: 'https://www.dropbox.com/scl/fi/uqxi0k7it885ce9qfz2qz/MIDSOMMAR-2019-Midsommar-topfilmsTyE-online-video-cutter.com.mp4?rlkey=f8lp9pen6whtceaibpx4aa03h&st=xk3cuzzs&raw=1' },
    { id: 'video3', url: 'https://www.dropbox.com/scl/fi/s5que95cpfev6n18p8s3h/PSICOSIS-Psycho-1960-de-Alfred-Hitchcock..-psicosis-psycho-online-video-cutter.com.mp4?rlkey=4s1uxceqnqyazv40khbo6awzc&st=8pd2namh&raw=1' },
    { id: 'video4', url: 'https://www.dropbox.com/scl/fi/ntfyz3nlb9k1gxkx8e8w0/R-QUIEM-POR-UN-SUE-O-Requiem-for-a-dream-2000-de-Darren-Aronofsky-online-video-cutter.com.mp4?rlkey=zwpgyjbsh9675d8v3a6pray6p&st=0gamisi1&raw=1' },
    { id: 'video5', url: 'https://www.dropbox.com/scl/fi/cwoxirs82k95kusuzk26z/HIJOS-DE-LOS-HOMBRES-Children-of-men-2006-de-Alfonso-Cuar-n-online-video-cutter.com.mp4?rlkey=wwso9719c98rsxqfhwwwd4e13&st=d8cejjcx&raw=1' },
  ];

  const handlePrevVideo = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : videos.length - 1));
  };

  const handleNextVideo = () => {
    setCurrentIndex((prevIndex) => (prevIndex < videos.length - 1 ? prevIndex + 1 : 0));
  };

  return (
    <div className="app">
      <div className="sidebar">
        <img className="logo" src="https://e7.pngegg.com/pngimages/22/793/png-clipart-tecsup-lima-technology-organization-business-technology-blue-electronics.png" alt="TikTok Logo" />
        <ul className="menu">
          <li><FaHome /> Para ti</li>
          <li><FaUserFriends /> Siguiendo</li>
          <li><FaUserFriends /> Amigos</li>
          <li><FaCompass /> Explorar</li>
          <li><FaVideo /> LIVE</li>
          <li><FaUser /> Perfil</li>
        </ul>
        <div className="following">
          <p>Cuentas que sigues</p>
          <ul>
            <li>persas_fc_oficial</li>
            <li>toni.kr8s</li>
            <li>Erickson OC Ssj</li>
            <li>Victor Kacha</li>
            <li>mauriciooo</li>
            <li>Niki</li>
            <li>dantecarranza41</li>
            <li>Fabricio kkkkkk</li>
          </ul>
        </div>
      </div>
      <div className="main-content">
        <div className="header">
          <input className="search-bar" type="text" placeholder="Buscar en Tecsup" />
          <div className="header-icons">
            <FaPlus className="header-icon" />
            <FaBell className="header-icon" />
            <FaInbox className="header-icon" />
            <FaUser className="header-icon" />
          </div>
        </div>
        <div className="suggested-users">
          <div className="user">Misterio</div>
          <div className="user">Accion</div>
          <div className="user">Terror</div>
          <div className="user">Psicológica</div>
        </div>
        <div className="scroll-container">
          <button className="nav-button" onClick={handlePrevVideo}><FaArrowUp /></button>
          <Video
            key={videos[currentIndex].id}
            videoId={videos[currentIndex].id}
            userId={userId}
            videoUrl={videos[currentIndex].url}
          />
          <button className="nav-button" onClick={handleNextVideo}><FaArrowDown /></button>
        </div>
      </div>
    </div>
  );
};

export default App;
