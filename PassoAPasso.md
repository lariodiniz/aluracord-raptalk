# Passo a Passo

## Aula 01

### Inicie o projeto

- yarn:

```
yarn init -y
```

- npm:

```
npm init -y
```

### Instale as bibliotecas next, react e react-dom

- yarn:

```
yarn add next react react-dom
```

- npm:

```
npm i next react react-dom
```

### adicione o bloco scripts no seu **package.json**

- abra o arquivo package.json e cole o seguinte código:

```
"scripts":{
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
```

### Crie a sua primeira pagina

1.  crie a pasta **pages**
2.  dentro da pasta **pages** crie o arquivo **index.js**
3.  No arquivo **index.js** adicione o seguinte código:

```
function HomePage(){
    return <div>Welcome to Next.js</div>
}

export default HomePage
```

### Execute o servidor

- yarn:

```
yarn dev
```

- npm:

```
npm run dev
```

### Instale a biblioteca skynexui

- yarn:

```
yarn add @skynexui/components
```

- npm:

```
npm i @skynexui/components
```

### Crie a primeira pagina do Aluracord

1. crie o arquivo **config.json** na raiz do projeto com o seguinte código:

```
{
  "name": "Aluracord - Matrix (peas)",
  "stickers": [
    "http://2.bp.blogspot.com/-d21tffsTIQo/U_H9QjC69gI/AAAAAAAAKqM/wnvOyUr6a_I/s1600/Pikachu%2B2.gif",
    "https://media1.giphy.com/media/BdghqxNFV4efm/200.gif",
    "https://c.tenor.com/TKpmh4WFEsAAAAAC/alura-gaveta-filmes.gif",
    "https://i.pinimg.com/originals/0b/1c/23/0b1c2307c83e1ebdeed72e41b9a058ad.gif",
    "https://c.tenor.com/VylWt5lyjBoAAAAC/omg-yes.gif",
    "https://i.pinimg.com/originals/96/34/c5/9634c520c9a3cd4e7f23190bb2c96500.gif"
  ],
  "theme": {
    "colors": {
      "primary": {
        "050": "#E3F9E5",
        "100": "#C1EAC5",
        "200": "#A3D9A5",
        "300": "#7BC47F",
        "400": "#57AE5B",
        "500": "#3F9142",
        "600": "#2F8132",
        "700": "#207227",
        "800": "#0E5814",
        "900": "#05400A"
      },
      "neutrals": {
        "000": "#FFFFFF",
        "050": "#F5F7FA",
        "100": "#E4E7EB",
        "200": "#CBD2D9",
        "300": "#9AA5B1",
        "400": "#52667A",
        "500": "#313D49",
        "600": "#29333D",
        "700": "#212931",
        "800": "#181F25",
        "900": "#101418",
        "999": "#080A0C"
      }
    }
  }
}

```

2. Atualize o **index.js** com o seguinte código:

```
import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import appConfig from '../config.json';

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

//Componente React
function Titulo(props){

    let Tag = props.tag || 'h1';
    return (
    <>
        <Tag>{props.children}</Tag>
        <style jsx>{`
            ${Tag} {
                color:${appConfig.theme.colors.neutrals['000']};
                font-size: 24px;
                font-weight: 600;
            }
            `}</style>
    </>
        )
}

export default function PaginaInicial() {
    const username = 'lariodiniz';

    return (
      <>
        <GlobalStyle />
        <Box
          styleSheet={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: appConfig.theme.colors.primary[500],
            backgroundImage: 'url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)',
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
          }}
        >
          <Box
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              width: '100%', maxWidth: '700px',
              borderRadius: '5px', padding: '32px', margin: '16px',
              boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
              backgroundColor: appConfig.theme.colors.neutrals[700],
            }}
          >
            {/* Formulário */}
            <Box
              as="form"
              styleSheet={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
              }}
            >
              <Titulo tag="h2">Boas vindas de volta!</Titulo>
              <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
                {appConfig.name}
              </Text>

              <TextField
                fullWidth
                textFieldColors={{
                  neutral: {
                    textColor: appConfig.theme.colors.neutrals[200],
                    mainColor: appConfig.theme.colors.neutrals[900],
                    mainColorHighlight: appConfig.theme.colors.primary[500],
                    backgroundColor: appConfig.theme.colors.neutrals[800],
                  },
                }}
              />
              <Button
                type='submit'
                label='Entrar'
                fullWidth
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals["000"],
                  mainColor: appConfig.theme.colors.primary[500],
                  mainColorLight: appConfig.theme.colors.primary[400],
                  mainColorStrong: appConfig.theme.colors.primary[600],
                }}
              />
            </Box>
            {/* Formulário */}


            {/* Photo Area */}
            <Box
              styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '200px',
                padding: '16px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                border: '1px solid',
                borderColor: appConfig.theme.colors.neutrals[999],
                borderRadius: '10px',
                flex: 1,
                minHeight: '240px',
              }}
            >
              <Image
                styleSheet={{
                  borderRadius: '50%',
                  marginBottom: '16px',
                }}
                src={`https://github.com/${username}.png`}
              />
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[200],
                  backgroundColor: appConfig.theme.colors.neutrals[900],
                  padding: '3px 10px',
                  borderRadius: '1000px'
                }}
              >
                {username}
              </Text>
            </Box>
            {/* Photo Area */}
          </Box>
        </Box>
      </>
    );
  }
```

3. Customize a pagina index como você gostar

### Crie o arquivo **.gitignore** para o node.

- execute o comando:

```
npx gitignore node
```

## Aula 02

### Use o state do react para controlar a variavel username no arquivo index.js

1. Importe o React

```
import React from 'react'
```

2. use o useState para declarar a variavel

```
const [username, setUsername] = React.useState('lariodiniz');
```

3. use a variavel username e a função setUsername no campo de imput no compotent TextField que é um imput

```
  <TextField
    value={username} onChange={function A(event){
      let valor = event.target.value;
      setUsername(valor)
    } }
    fullWidth
    textFieldColors={{
      neutral: {
        textColor: appConfig.theme.colors.neutrals[200],
        mainColor: appConfig.theme.colors.neutrals[900],
        mainColorHighlight: appConfig.theme.colors.primary[500],
        backgroundColor: appConfig.theme.colors.neutrals[800],
      },
    }}
  />
```

### Crie a pagina chat

1.  Dentro da pasta **pages** crie o arquivo **chat.js**
2.  No arquivo **chat.js** adicione o seguinte código:

```
function PaginadoChat(){
    return <div>Página do Chat</div>
}

export default PaginadoChat
```

### Crie compentende global no next.js

1.  dentro da pasta **pages** crie o arquivo **\_app.js**
2.  No arquivo **\_app.js** adicione o seguinte código:

```
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

export default function MyApp({ Component, pageProps}){
    return (
        <>
        <GlobalStyle />
        <Component {...pageProps} />
        </>
    )
}
```

3.  No arquivo **index.js** remova a função GlobalStyle e o componente GlobalStyle:

### Navegue entre as paginas index.js e chat.js

1. No arquivo index.js import o useRouter do next

```
import { useRouter } from 'next/router';
```

2. No arquivo index.js crie a variável de roteamento.

```
const roteamento = useRouter();
```

3. No arquivo index.js crie a função e a função onSubmit no componente Box que é o form da pagina.

```
onSubmit={function(event){
  event.preventDefault();
  roteamento.push('/chat')}}
```

## Aula 01

### Criando a lógica da mensagem

1.0 Crie a variavel mensagem com useState

```
const [mensagem, setMensagem] = React.useState('');
```

2.0 Crie a variavel lista de mensagem com useState

```
const [listaMensagem, setListaMensagem] = React.useState([]);
```

3.0 Crie a função handleNovaMensagem

```
    const handleNovaMensagem = (novaMensagem) =>{

        setListaMensagem([...listaMensagem, novaMensagem])
        setMensagem('')
    }
```

4.0 Atualize o textBox com as duas variaveis criadas e o evento onKeyPress

```
<TextField
                            placeholder="Insira sua mensagem aqui..."
                            value={mensagem}
                            onChange={(event) => setMensagem(event.target.value)}
                            onKeyPress={(event) =>{
                                if ((event.key === 'Enter') && (!event.shiftKey)){
                                    event.preventDefault();
                                    handleNovaMensagem(mensagem);
                                }
                            }}
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
```
