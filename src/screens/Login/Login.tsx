import { ScrollView } from 'react-native';
import Login from '../../components/Login/Login';
import Connexion from '../../components/Connexion/Connexion';
import React, { useState } from 'react';
import ProfilCard from '../../components/ProfilCard/ProfilCard';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <ScrollView>
      {isLoggedIn ? (
        <ProfilCard onLogout={handleLogout} />
      ) : (
        <Connexion onLoginSuccess={handleLoginSuccess} />
      )}
    </ScrollView>
  );
};

export default Home;
