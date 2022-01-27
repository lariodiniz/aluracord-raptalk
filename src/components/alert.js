import React from 'react'
import { Box, Text  } from '@skynexui/components';

import style from '../style/style.json';

export default function Alert({message, type, id}) {

    const styles = Style(type)
    return (
        <Box styleSheet={styles.box}>
          <Text variant="body4" styleSheet={styles.text}>
            {message}
          </Text>
        </Box>
    );
  }

  const Style = (type)=>{

    let backgroundColor = '';

    switch (type?.toLowerCase()){
        case 'dark':
            backgroundColor = style.theme.colors.alerts['dark'];
            break
        case 'secondary':
            backgroundColor = style.theme.colors.alerts['secondary'];
            break
        case 'success':
            backgroundColor = style.theme.colors.alerts['success'];
            break
        case 'danger':
            backgroundColor = style.theme.colors.alerts['danger'];
            break
        case 'warning':
            backgroundColor = style.theme.colors.alerts['warning'];
            break
        case 'info':
            backgroundColor = style.theme.colors.alerts['info'];
            break
        case 'light':
            backgroundColor = style.theme.colors.alerts['light'];
            break
        default:
            backgroundColor = style.theme.colors.alerts['primary'];
    }

      return {
      box:{
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: backgroundColor,
        height:'2em',
        width:'100%',
        border: '1px solid',
        borderColor: style.theme.colors.neutrals[999],
        borderRadius: '5px',
        padding: '3px',
        boxShadow: '5px 5px 5px -2px rgba(62,53,69,0.7)',
        marginBottom: '10px'
      },
      text:{
        color: style.theme.colors.neutrals['700']
      }
  }}