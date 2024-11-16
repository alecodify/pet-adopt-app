import { View, Text } from 'react-native'
import React from 'react'
import Header from '@/components/Home/Header'
import Banner from '@/components/Home/Banner'
import PetListByCategory from '@/components/Home/PetListByCategory'

export default function Home() {
  return (
    <View style={{padding: 20, marginTop: 10}}>
        <Header />
        <Banner />
        <PetListByCategory />
    </View>
  )
}