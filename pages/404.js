import React from 'react'
import { Box, Image, Text } from '@skynexui/components';
import appConfig from '../config.json';

export default function PaginaInicial() {

    return (
      <>
        
        <Box
          styleSheet={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column',
            backgroundColor: appConfig.theme.colors.primary['050'],
            
            
          }}
        >
        <Image styleSheet={{
                  marginBottom: '16px',
                  height: '500px',
                }}
                src={'https://cdn.pixabay.com/photo/2016/05/30/14/23/detective-1424831_960_720.png'} />
         <Text variant="h1" 
            styleSheet={{ 
                marginTop: '32px', 
                fontSize: '24px',
                fontWeight: 600,
                color: appConfig.theme.colors.primary['900'] }}
        >
        404 - Page not found        
        </Text>
        </Box>
      </>
    );
  }