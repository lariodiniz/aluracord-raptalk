import Head from "next/head";
import {ContextProvider} from '../contexts/context'

export default function MyApp({ Component, pageProps}){
    return (
<>
      <Head > 
        <title>AluraCord - RapTalk</title>
        <link rel="icon" href="/static/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />
        <link rel="manifest" href="/static/site.webmanifest" />
        <meta name="theme-color" content="#827291" />
      </Head>

        <ContextProvider>
        <GlobalStyle />
        <Component {...pageProps} />
        </ContextProvider>
</>

    ) 
}



function GlobalStyle(){
  return (
      <style global jsx>{`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      list-style: none;
    }
    body {
      font-family: 'Open Sans', sans-serif;
    }
    /* App fit Height */ 
    html, body, #__next {
      min-height: 100vh;
      display: flex;
      flex: 1;
    }
    #__next {
      flex: 1;
    }
    #__next > * {
      flex: 1;
    }
    /* ./App fit Height */ 
  `}</style>
  )
}
