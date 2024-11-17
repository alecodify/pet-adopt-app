import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Header from '@/components/Home/Header'
import Banner from '@/components/Home/Banner'
import PetListByCategory from '@/components/Home/PetListByCategory'
import { MaterialIcons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'

export default function Home() {
  return (
    <View style={{padding: 20, marginTop: 10}}>
        <Header />
        <Banner />
        <PetListByCategory />

        <TouchableOpacity onPress={() => {}} style={{display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', padding: 20, marginTop: 20, backgroundClip: Colors.LIGHT_PRIMARY, borderWidth: 1, borderColor: Colors.PRIMARY, borderRadius: 15, borderStyle: 'dashed', justifyContent: 'center'}}>
          <MaterialIcons name='pets' size={24} color={Colors.PRIMARY} />
          <Text style={{fontFamily: 'outfit-medium', color: Colors.PRIMARY}}>Add New Pet</Text>
        </TouchableOpacity>
    </View>
  )
}