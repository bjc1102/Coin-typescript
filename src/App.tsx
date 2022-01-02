import React, { useState } from 'react';
import styled, { createGlobalStyle } from "styled-components";
import Router from './Router';
import { ReactQueryDevtools } from 'react-query/devtools'
import { GlobalStyle } from './styles/global-styles';

function App() {

  return (
    <>      
      <GlobalStyle/>
      <Router/>
      <ReactQueryDevtools initialIsOpen={false}/>
    </>

  );
}

export default App;
 