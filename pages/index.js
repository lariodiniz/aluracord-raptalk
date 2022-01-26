import React from 'react'
import { useRouter } from 'next/router';
import { Box, Button, Text, TextField, Image, Icon  } from '@skynexui/components';

import { Context } from '../context'
import appConfig from '../config.json';
import Constantes from '../constantes'


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

    let { login } = React.useContext(Context)


    
    const [username, setUsername] = React.useState('');
    const [user, setUser] = React.useState({seguidores:0, repositorios: 0});
    const [image, setImage] = React.useState(Constantes.STANDERT_USER);
    const roteamento = useRouter();

    const validUsername = (event)=>{
      let valor = event.target.value;
     
      if (valor.length > 2){
         setImage(`${Constantes.GITHUB}${valor}.png`)
         fetch(`${Constantes.GITHUB_API}${valor}`, { 
          method: 'GET'
        }).then(async (retorno)=>{
          if (retorno.status === 200){
            let dados = await retorno.json()
            setUser({seguidores:dados.followers, repositorios: dados.public_repos})
          }
        })
      }
      else{
        setUser({seguidores:0, repositorios: 0})
        setImage(Constantes.STANDERT_USER)
      }
      
      setUsername(valor)
      
    }

    const changePage = async (event)=>{
      event.preventDefault(); 

      const retorno = await fetch(`${Constantes.GITHUB_API}${username}`, { 
        method: 'GET'
      })

      if (retorno.status === 200){
        let user = await retorno.json()
        let log = login.value
        log.username = username
        login.set(log)
        roteamento.push('/chat')
      }
      else{
        alert('Usuário não existe')
      }
      
    }

    return (
      <>
        
        <Box
          styleSheet={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: appConfig.theme.colors.primary[500],
            backgroundImage: `url(${Constantes.BACKGROUND})`,
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
              onSubmit={changePage}
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
                value={username} onChange={validUsername}
                placeholder='username do github'
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
                disabled={username.length < 3}
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
                src={image}
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
                <Box
                styleSheet={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  display: 'flex',
                  padding: '16px',
                }}
              >
                
                <Box
                  styleSheet={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginLeft: '10px',
                    padding: '2px',
                    backgroundColor: appConfig.theme.colors.neutrals["000"],
                    border: '1px solid',
                    borderColor: appConfig.theme.colors.neutrals[999],
                    borderRadius: '10px',
                    minWidth: '160px'
                  }}
                >
                  <Icon name={"FaCode"}
                  styleSheet={{
                    marginRight: '5px'
                  }}/>
                  <Text
                    variant="body4"
                    styleSheet={{
                      color: appConfig.theme.colors.neutrals['900'],
                      padding: '3px 10px',
                      borderRadius: '1000px'
                    }}
                  >
                    Repositórios
                  </Text>
                  <Text
                    variant="body4"
                    styleSheet={{
                      color: appConfig.theme.colors.neutrals[200],
                      backgroundColor: appConfig.theme.colors.neutrals[900],
                      padding: '3px 10px',
                      borderRadius: '1000px'
                    }}
                  >
                    {user.repositorios}
                  </Text>
                </Box>
                <Box
                  styleSheet={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginLeft: '10px',
                    padding: '2px',
                    backgroundColor: appConfig.theme.colors.neutrals["000"],
                    border: '1px solid',
                    borderColor: appConfig.theme.colors.neutrals[999],
                    borderRadius: '10px',
                    minWidth: '160px'
                  }}
                >
                  <Icon name={"FaPeopleArrows"}
                  styleSheet={{
                    marginRight: '2px',
                    marginLeft: '5px',
                    width: '16px'
                  }}/>
                  <Text
                    variant="body4"
                    styleSheet={{
                      color: appConfig.theme.colors.neutrals['900'],
                      padding: '3px 10px',
                      borderRadius: '1000px'
                    }}
                  >
                    Seguidores
                  </Text>
                  <Text
                    variant="body4"
                    styleSheet={{
                      color: appConfig.theme.colors.neutrals[200],
                      backgroundColor: appConfig.theme.colors.neutrals[900],
                      padding: '3px 10px',
                      borderRadius: '1000px'
                    }}
                  >
                    {user.seguidores}
                  </Text>
                </Box>
              </Box>
            </Box>
            {/* Photo Area */}
          </Box>
        </Box>
      </>
    );
  }