import React from 'react'
import { Box, Image, Text } from '@skynexui/components';
import appConfig from '../utils/constants.json';
import style from '../style/style.json';

export default function Page404() {

    return (
      <>
        
        <Box
          styleSheet={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column',
            backgroundColor: style.theme.colors.primary['050'],
            
            
          }}
        >
        <Image styleSheet={{
                  marginBottom: '16px',
                  height: '500px',
                }}
                src={appConfig.IMAGE_404} />
         <Text variant="h1" 
            styleSheet={{ 
                marginTop: '32px', 
                fontSize: '24px',
                fontWeight: 600,
                color: style.theme.colors.primary['900'] }}
        >
        404 - Page not found        
        </Text>
        </Box>
      </>
    );
  }