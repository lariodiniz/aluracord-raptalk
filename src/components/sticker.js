import React from 'react';
import { Box, Image } from '@skynexui/components';

export default function Sticker({src}) {

  return (
    <Box styleSheet={styles.panel} >
        <Image src={src} styleSheet={styles.image} />
    </Box>
  )
}

const styles = {
        panel:{

        },
        image:{
            maxWeight: '70px',
            display: 'inline-block',
        }
}