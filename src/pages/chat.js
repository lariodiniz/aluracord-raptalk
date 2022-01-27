import React from 'react';
import { Box, Text, TextField, Image, Button, Icon } from '@skynexui/components';

import CircularProgress  from '@mui/material/CircularProgress';
import Popover from '@mui/material/Popover';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';


import { createClient } from '@supabase/supabase-js';


import GithubInfo from './../components/githubInfo';
import { Context } from '../contexts/context'
import appConfig from '../utils/constants.json';
import style from '../style/style.json';
import GetUserInfoGithub from '../services/getUserInfoGithub'


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export default function ChatPage(props) {

    let { login } = React.useContext(Context)
    const USER = login.value.username
    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
    const [message, setMessage] = React.useState('');
    const [messageList, setMessageList] = React.useState([]);
   
    React.useEffect(() => {
        if (!USER){
            window.location.href ='/'
        }
        else{
            getListMessagens();
        }
      }, []);

    const Erase = (id)=> {
        supabaseClient.from('mensagens').delete().match({id:id}).then(({data})=>{
            getListMessagens();
        });
    }

    const getListMessagens = () =>{
        supabaseClient.from('mensagens').select('*').order('created_at', {ascending: false}).then(({data})=>{
            let messages = data.map((message)=>{return {...message, dono: message.de === USER}})
            setMessageList(messages);
        });
        
    }

    const handleNewMessage = (newMessage ) =>{
        if ( newMessage.replaceAll(' ', '') !==''){
            let men = {de:USER, texto:newMessage}
            supabaseClient.from('mensagens').insert([men])
            .then((retorno)=>{
                getListMessagens();
            });
            setMessage('');
        }
        
    }

    const keyPress = (event) =>{
        if ((event.key === 'Enter') && (!event.shiftKey)){
            event.preventDefault();
            handleNewMessage(message);
        }
    }
    

    if (!USER){
        return (<Box styleSheet={styles.view}>
                    <CircularProgress color="secondary" />
                </Box>)
    }

    return (
        <Box styleSheet={styles.view}>
            <Box styleSheet={styles.panel}>
                <Header login={login} />
                <Box styleSheet={styles.innerPanel}>
                    {
                        messageList.length <= 0 ?
                        <CircularProgress color="secondary" />
                        :
                        <MessageList messages={messageList} erase={Erase}/> 
                    }
                    
                    <Box as="form" styleSheet={styles.form}>
                        <TextField
                            placeholder="Insira sua mensagem aqui..."
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                            onKeyPress={keyPress}
                            type="textarea"
                            styleSheet={styles.textArea}
                        />
                        <Button
                            onClick={()=>handleNewMessage(message)}
                            type='button'
                            label='Ok'
                            buttonColors={{
                            contrastColor: style.theme.colors.neutrals["000"],
                            mainColor: style.theme.colors.primary[500],
                            mainColorLight: style.theme.colors.primary[400],
                            mainColorStrong: style.theme.colors.primary[600],
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
            <Box styleSheet={styles.components.header.panel} >
                <Text variant='heading5' styleSheet={styles.components.header.title}>
                    Chat
                </Text>
                <Image styleSheet={styles.components.header.image}
                    src={`${appConfig.GITHUB}${login.value.username}.png`}
                />
                
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    onClick={logout}
                />
            </Box>
    )
}

function Message({message, erase}) {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handlePopoverClose = () => {
        setAnchorEl(null);
      };
    
      const open = Boolean(anchorEl);
    return (
            <Text tag="li" styleSheet={styles.components.message.panel}>
                <Box
                    >
                    <Box styleSheet={{
                        flexDirection: 'row',display: 'flex',
                        alignItems: 'center', 
                        justifyContent: `${message.dono ? 'right': 'left'}`,}}>
                        <Image
                            onMouseEnter={handlePopoverOpen}
                            onMouseLeave={handlePopoverClose}
                            styleSheet={styles.components.message.image}
                            src={`${appConfig.GITHUB}${message.de}.png`}
                            />
                            <Text tag="strong" styleSheet={styles.components.message.name}>
                                {message.de}
                            </Text>
                            <Text styleSheet={styles.components.message.data}tag="span">
                                {new Date(message.created_at).toLocaleDateString()}
                            </Text>
                            {
                                (message.dono  || message.de === 'lariodiniz') ?
                                <Icon name={"FaEraser"}
                            onClick={()=>erase(message.id)}
                                styleSheet={styles.components.message.iconErase}/>:
                            <></>

                            }
                        </Box>
                    </Box>
                    <Box styleSheet={{
                        flexDirection: 'row',display: 'flex',
                        alignItems: 'center', 
                        justifyContent: `${message.dono ? 'right': 'left'}`
                        }}>
                        <Text styleSheet={styles.components.message.text}>
                            {message.texto}
                        </Text>
                    </Box>

                    <Popover
                        id="mouse-over-popover"
                        sx={{
                            pointerEvents: 'none',
                            }}
                        open={open}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                        }}
                        onClose={handlePopoverClose}
                        disableRestoreFocus
                    >
                        <GithubPanel id={message.id} name={message.de} />
                    </Popover>
            </Text>
    )
}

const GithubPanel = ({id, name})=>{

    const [userGitHub, setuserGitHub] = React.useState({});

    React.useEffect(() => {
        const getUserGitHub = async (username)=>{
            const success= (dados)=>{
                console.log(dados)
                setuserGitHub(dados)
              }
              GetUserInfoGithub(username, success, ()=>{});
        }

        getUserGitHub(name);
      }, []);
    if (userGitHub.id === null){
        return (<Card sx={styles.components.githubPanel.card}>
                <CircularProgress color="secondary" />
            </Card>
        )
    }
    return (
        <Card sx={styles.components.githubPanel.card}>
        <CardMedia
          component="img"
          height="140"
          image={`${appConfig.GITHUB}${name}.png`}
          alt={name}
        />
        <CardContent>
            <Box styleSheet={styles.components.githubPanel.nameBox}>
            <Text styleSheet={styles.components.githubPanel.name}>
                {userGitHub.name}
            </Text>
            </Box>
            <Box styleSheet={styles.components.githubPanel.infosBox}>
                <GithubInfo icon={"FaCode"} text={'Repositórios'}
                  number={userGitHub.public_repos} />
                <GithubInfo icon={"FaPeopleArrows"} text={'Seguidores'}
                  number={userGitHub.followers} />
            </Box>
            <Box styleSheet={styles.components.githubPanel.bio}>
                <Text styleSheet={styles.components.githubPanel.bioText}>
                    {userGitHub.bio}
                </Text>
            </Box>
            <Box styleSheet={styles.components.githubPanel.gitLink}>
            <Icon name={"FaGithub"} size="5ch"
                            onClick={()=>erase(message.id)}
                                styleSheet={styles.components.githubPanel.icon}/>
            </Box>
          
          
          
        </CardContent>
        <CardActions>
          
        </CardActions>
      </Card>
        
    )
}

function MessageList({messages, erase}) {
    return (
        <Box tag="ul"styleSheet={styles.components.messageList.panel}>
            {messages.map((message)=>{
            return (
                <Box key={message.id}>
                    <Message message={message} erase={erase} />
                </Box>
            )})}
        </Box>
    )
}

const styles = {
    view:{      
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: style.theme.colors.primary[500],
        backgroundImage: `url(${appConfig.BACKGROUND})`,
        backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',      
    },
    panel:{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
        borderRadius: '5px',
        backgroundColor: style.theme.colors.neutrals[700],
        height: '100%',
        maxWidth: '95%',
        maxHeight: '95vh',
        padding: '32px',
    },
    innerPanel:{
        position: 'relative',
        display: 'flex',
        flex: 1,
        height: '80%',
        backgroundColor: style.theme.colors.neutrals[600],
        flexDirection: 'column',
        borderRadius: '5px',
        padding: '16px',
    },
    form: {
        display: 'flex',
        alignItems: 'center',
    },
    textArea:{
        width: '100%',
        border: '0',
        resize: 'none',
        borderRadius: '5px',
        padding: '6px 8px',
        backgroundColor: style.theme.colors.neutrals[800],
        marginRight: '12px',
        color: style.theme.colors.neutrals[200],
    },
    components:{
        header:{
            panel:{ width: '100%', 
                marginBottom: '16px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between' 
            },
            image:{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
            },
            title:{
                color: style.theme.colors.neutrals['000'],
            }
        },
        messageList:{
            panel:{
                overflowY: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,                
                marginBottom: '16px',
            }
        },
        message:{
            panel:{
                borderRadius: '5px',
                padding: '6px',
                marginBottom: '12px',
                hover: {
                    backgroundColor: style.theme.colors.neutrals[700],
                }
            },
            image:{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                display: 'inline-block',
                marginRight: '8px',
            },
            name:{
                color: style.theme.colors.neutrals['000'],
            },
            data:{
                fontSize: '10px',
                marginLeft: '8px',
                color: style.theme.colors.neutrals[300],
            },
            iconErase:{
                marginLeft: '15px',
                width: '16px',
                height: '16px',
                color: style.theme.colors.neutrals['800'],
                hover: {
                    color: style.theme.colors.neutrals['000'],
                }
            },
            text:{
                color: style.theme.colors.neutrals['000'],
            },
        },

        githubPanel:{
            card:{
                backgroundColor: style.theme.colors.neutrals['800'],
                maxWidth: '380px'
            },
            nameBox:{
                marginBottom: '15px'
            },
            name:{
                color: style.theme.colors.neutrals['000'],
            },
            infosBox:{
                display: 'flex',
                flex: 1,
                flexDirection: 'row',
                with:'100%',
                marginBottom: '15px'
            },
            bio:{
                with:'100%'
            },
            bioText:{
                
                color: style.theme.colors.neutrals['000'],
                fontSize:'small'
            },
            gitLink:{
                display: 'flex',
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                margin: '5px',
            },
            icon:{
                color: style.theme.colors.neutrals['000'],
            }
        }
    }

}