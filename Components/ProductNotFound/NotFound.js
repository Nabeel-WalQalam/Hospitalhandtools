import React from 'react'
import Image from 'next/image'
import { Flex, Text } from '@chakra-ui/react'
export const NotFound = ({text}) => {
  return (
    <React.Fragment>
        <Flex justify={'center'} align={'center'} direction={'column'}>
        <Image src={'/assets/product-not-found.jpg'}  alt='not found' width={500} height={100} />
        <Text marginTop={'1rem'} fontSize={'2rem'} color={'#153A5B'} fontWeight={'bold'}>{text}</Text>
        </Flex>
    </React.Fragment>
  )
}
