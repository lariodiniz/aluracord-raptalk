import React from 'react'
import { Box, Text, Icon  } from '@skynexui/components';
import style from '../style/style.json';


const GithubInfo = ({icon, text, number})=>{

    return (
      <Box styleSheet={styles.panel}>
        <Icon name={icon} styleSheet={styles.icon}/>
        <Text variant="body4" styleSheet={styles.name}>
            {text}
        </Text>
        <Text variant="body4" styleSheet={styles.number}>
            {number}
        </Text>
    </Box>

    )
  }

const styles = {
    panel:{
        display: 'flex',
        flexDirection: 'row',
        marginLeft: '10px',
        padding: '2px',
        backgroundColor: style.theme.colors.neutrals["000"],
        border: '1px solid',
        borderColor: style.theme.colors.neutrals[999],
        borderRadius: '10px',
        minWidth: '160px'
      },
      icon:{
        marginRight: '2px',
        marginLeft: '5px',
        width: '16px'
      },
      name: {
        color: style.theme.colors.neutrals['900'],
        padding: '3px 10px',
        borderRadius: '1000px'
        },
        number: {
            color: style.theme.colors.neutrals[200],
            backgroundColor: style.theme.colors.neutrals[900],
            padding: '3px 10px',
            borderRadius: '1000px'
          }
}

  export default GithubInfo;