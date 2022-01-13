import React, { useState } from 'react';
import styled, { createGlobalStyle } from "styled-components";
import Router from './Router';
import { ReactQueryDevtools } from 'react-query/devtools'
import { GlobalStyle } from './styles/global-styles';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './styles/theme';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from './atom';


function App() {

  const isDark = useRecoilValue(isDarkAtom)

  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle/>
        <Router/>
        <ReactQueryDevtools initialIsOpen={false}/>
      </ThemeProvider>
    </>

  );
}


export default App;
 