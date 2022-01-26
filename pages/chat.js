import React from 'react';
import { Box, Text, TextField, Image, Button, Icon } from '@skynexui/components';

import appConfig from '../config.json';
import { Context } from '../context'
import Constantes from '../constantes'

function random() {
    let r = Math.random()
    return  Math.floor(r * 3);
  }

const MENSAGENS_PADRAO = [
    {usuario:'peas', texto: 'Ola, esta resposta é automatica, servindo apenas para teste.'},
    {usuario:'omariosouto', texto: 'Fala ai, esta resposta é automatica.'},
    {usuario:'vanessametonini', texto: 'Tudo bom? Esta resposta é automatica.'},
]


export default function ChatPage() {


    let { login } = React.useContext(Context)

    const USER = login.value.username

    React.useEffect(() => {
        if (!USER){
            window.location.href ='/'
        }
      }, []);

    const [mensagem, setMensagem] = React.useState('');
    const [listaMensagem, setListaMensagem] = React.useState([]);

    const Delete = (id)=> {
        let novalistaMensagem = listaMensagem.filter((men)=>men.id !==id)
        setListaMensagem(novalistaMensagem)
    }

    const handleNovaMensagem = (novaMensagem) =>{
        if ( novaMensagem.replaceAll(' ', '') !==''){
            let men = {
                id:listaMensagem.length+1,
                usuario:USER, 
                dono: true,
                texto:novaMensagem,
                data: new Date().toLocaleDateString()}
    
            let rand = random();
            let men2 = {
                id:listaMensagem.length+2,
                usuario:MENSAGENS_PADRAO[rand].usuario, 
                dono: false,
                texto:MENSAGENS_PADRAO[rand].texto,
                data: new Date().toLocaleDateString()}
    
            setListaMensagem([men2, men, ...listaMensagem])
    
            setMensagem('')
        }
        
    }
    if (!USER){
        return <Box
        styleSheet={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: appConfig.theme.colors.primary[500],
            backgroundImage: `url(${Constantes.BACKGROUND})`,
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
            color: appConfig.theme.colors.neutrals['000']
        }}
    ></Box>
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(${Constantes.BACKGROUND})`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header login={login} />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                     <MessageList mensagens={listaMensagem} apagar={Delete}/> 
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
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
                        <Button
                            onClick={()=>handleNovaMensagem(mensagem)}
                            type='button'
                            label='Ok'
                            buttonColors={{
                            contrastColor: appConfig.theme.colors.neutrals["000"],
                            mainColor: appConfig.theme.colors.primary[500],
                            mainColorLight: appConfig.theme.colors.primary[400],
                            mainColorStrong: appConfig.theme.colors.primary[600],
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header({login}) {

    const logout = ()=>{
        let log = login.value
        log.username = ''
        login.set(log)
        window.location.href='/'
    }
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                
                <Text variant='heading5'>
                    Chat
                </Text>
                <Box
                styleSheet={{
                    alignItems: 'center', 
                    justifyContent: 'center',
                    
                }}>
                <Image
                            styleSheet={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                            }}
                            src={`${Constantes.GITHUB}${login.value.username}.png`}
                            />


                </Box>
                
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    onClick={logout}
                />
            </Box>
        </>
    )
}

function Message({mensagem, apagar}) {


    return (
            <Text
                key={mensagem.id}
                tag="li"
                styleSheet={{
                    borderRadius: '5px',
                    padding: '6px',
                    marginBottom: '12px',
                    hover: {
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                    }
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex', 

                        flexDirection: 'column'
                    }}
                >
                    <Box
                    styleSheet={{
                        marginBottom: '8px',
                    }}
                    >
                    <Box styleSheet={{
                        flexDirection: 'row',display: 'flex',
                        alignItems: 'center', 
                        justifyContent: `${mensagem.dono ? 'right': 'left'}`,}}>
                            <Image
                            styleSheet={{
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                display: 'inline-block',
                                marginRight: '8px',
                            }}
                            src={`${Constantes.GITHUB}${mensagem.usuario}.png`}
                            />
                            <Text tag="strong">
                                {mensagem.usuario}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {mensagem.data}
                            </Text>
                            <Icon name={"FaEraser"}
                            onClick={()=>apagar(mensagem.id)}
                                styleSheet={{
                                marginLeft: '15px',
                                width: '16px',
                                height: '16px',
                                color: appConfig.theme.colors.neutrals['800'],
                                hover: {
                                    color: appConfig.theme.colors.neutrals['000'],
                                }
                            }}/>
                        </Box>
                   
                    </Box>
                    <Box styleSheet={{
                        flexDirection: 'row',display: 'flex',
                        alignItems: 'center', 
                        justifyContent: `${mensagem.dono ? 'right': 'left'}`
                        }}>
                        {mensagem.texto}
                    </Box>
                    
                </Box>
            </Text>
    )
}


function MessageList({mensagens, apagar}) {
    return (
        <Box
        tag="ul"
        styleSheet={{
            overflowY: 'scroll',
            display: 'flex',
            flexDirection: 'column-reverse',
            flex: 1,
            
            marginBottom: '16px',
        }}
    >
        {mensagens.map((menAtual)=><Message mensagem={menAtual} apagar={apagar} />)}
        </Box>
    )
}