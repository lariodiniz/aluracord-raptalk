import React from 'react'
import { Box } from '@skynexui/components';

import Alert from './alert';

export default function ListAlert({messages, type}) {
    if (messages.lenght <= 0){
      return <></>
    }
    return (

        <Box styleSheet={styles.box}>
          {
             
            messages.map((men, key)=>(
              <Box key={key}>
                <Alert  message={`${men}`} type={type} />
             </Box>
            )
            )
          }
        </Box>
    );
  }

const styles = {
  box:{
        flexDirection: 'column',
        width:'100%',
    }
  }