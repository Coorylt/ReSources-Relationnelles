import { ScrollView} from 'react-native';
import Login from '../../components/Login/Login';
import Connexion from '../../components/Connexion/Connexion';
import React, { useState } from 'react';


const Home = () => {
  return (
    <ScrollView>
      <Login/>
      {/* <Connexion/> */}
    </ScrollView>
  );
};

export default Home;
