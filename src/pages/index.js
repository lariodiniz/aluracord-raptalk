import React from 'react'
import { useRouter } from 'next/router';
import { Box, Button, Text, TextField, Image, Icon  } from '@skynexui/components';
import CircularProgress  from '@mui/material/CircularProgress';

import GetUserInfoGithub from '../services/getUserInfoGithub';

import Title from '../components/title';
import ListAlert from './../components/listAlert';
import GithubInfo from './../components/githubInfo';


import { Context } from '../contexts/context';
import appConfig from '../utils/constants.json';
import style from '../style/style.json';



export default function Index() {

    let { login } = React.useContext(Context);

    const [username, setUsername] = React.useState('');
    const [seeking, setSeeking] = React.useState('');
    const [alerts, setAlerts] = React.useState([]);
    const [user, setUser] = React.useState({followers:0, repositories: 0});
    const [image, setImage] = React.useState(appConfig.STANDERT_USER);
    const appRouter = useRouter();

    const validUsername = (event)=>{

      const value = event.target.value;

      const success= (dados)=>{
        setImage(`${appConfig.GITHUB}${dados.login}.png`)
        setUser({followers:dados.followers, repositories: dados.public_repos})
      }
     
      if (value.length > 2){
        let result = GetUserInfoGithub(value, success, setAlerts);
      }
      else{
        setUser({followers:0, repositories: 0})
        setImage(appConfig.STANDERT_USER)
      }

      setUsername(value)
    }

    const changePage = async (event)=>{
      event.preventDefault(); 

      const success= (dados)=>{
        let log = login.value
        log.username = dados.login
        login.set(log)
        appRouter.push(`/chat?username=${dados.login}`)
      }
      setSeeking(true)
      GetUserInfoGithub(username, success, setAlerts);

    }

    return (
        <Box styleSheet={styles.view}>
          
          <Box styleSheet={styles.panel}>
            <Box as="form" onSubmit={changePage} styleSheet={styles.form}>
              {seeking ? <CircularProgress color="secondary" />:<></>}
              
              <Title tag="h2">Boas vindas de volta!</Title>
              <Text variant="body3" styleSheet={styles.subtitle}>
                {appConfig.name}
              </Text>
              <TextField
                value={username} onChange={validUsername}
                placeholder='username do github'
                fullWidth
                textFieldColors={{
                  neutral: {
                    textColor: style.theme.colors.neutrals[200],
                    mainColor: style.theme.colors.neutrals[900],
                    mainColorHighlight: style.theme.colors.primary[500],
                    backgroundColor: style.theme.colors.neutrals[800],
                  },
                }}
              />
              <ListAlert messages={alerts} type={'warning'} />
              
              <Button
                type='submit'
                disabled={(username.length < 3) && !seeking}
                label='Entrar'
                fullWidth
                buttonColors={{
                  contrastColor: style.theme.colors.neutrals["000"],
                  mainColor: style.theme.colors.primary[500],
                  mainColorLight: style.theme.colors.primary[400],
                  mainColorStrong: style.theme.colors.primary[600],
                }}
              />
            </Box>
            <Box styleSheet={styles.photoBox}>
              <Image styleSheet={styles.image} src={image} />
              <Text variant="body4"styleSheet={styles.nameArea}>
                {username}
              </Text>
                <Box styleSheet={styles.infoArea}>
                  <GithubInfo icon={"FaCode"} text={'Repositórios'}
                  number={user.repositories} />
                  <GithubInfo icon={"FaPeopleArrows"} text={'Seguidores'}
                  number={user.followers} />
              </Box>
            </Box>
            {/* Photo Area */}
          </Box>
        </Box>
    );
  }

  

  const styles = {
    view:{      
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: style.theme.colors.primary[500],
        backgroundImage: `url(${appConfig.BACKGROUND})`,
        backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',      
    },
    panel: {
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
      backgroundColor: style.theme.colors.neutrals[700],
    },
    form: {
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
    },
    subtitle: { 
      marginBottom: '32px', 
      color: style.theme.colors.neutrals[300] 
    },
    photoBox:{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      maxWidth: '200px',
      padding: '16px',
      backgroundColor: style.theme.colors.neutrals[800],
      border: '1px solid',
      borderColor: style.theme.colors.neutrals[999],
      borderRadius: '10px',
      flex: 1,
      minHeight: '240px',
    },
    image:{
      borderRadius: '50%',
      marginBottom: '16px',
    },
    nameArea:{
      color: style.theme.colors.neutrals[200],
      backgroundColor: style.theme.colors.neutrals[900],
      padding: '3px 10px',
      borderRadius: '1000px'
    },
    infoArea:{
      flexDirection: 'column',
      marginTop: '10px'
    }
  }