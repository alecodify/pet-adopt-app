import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import { router } from 'expo-router'
import MarkFavorite from '../MarkFavorite'

export default function PetListItem({ pet }) {
  return (
    <TouchableOpacity onPress={() => {router.push({pathname: '/screens/petdetails', params: pet})}} style={{padding: 10, marginRight: 15, backgroundColor: Colors.WHITE, borderRadius: 10,}}>
      <View style={{position: 'absolute', zIndex: 1, right: 10, top: 10}}>
        <MarkFavorite pet={pet} />
      </View>
      <Image source={{uri: pet?.imageUrl}} style={{width: 150, height: 135, objectFit: 'cover', borderRadius: 10}} />
      <Text style={{fontSize: 18, fontFamily: 'outfit-medium', marginTop: 10}}>{pet?.name}</Text>
      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <Text style={{color: Colors.GRAY, fontFamily: 'outfit', }}>{pet?.breed}</Text>
        <Text style={{fontFamily: 'outfit', color: Colors.PRIMARY, backgroundColor: Colors.LIGHT_PRIMARY, paddingHorizontal: 6, borderRadius: 10, fontSize: 12}}>{pet?.age}YRS</Text>
      </View>
    </TouchableOpacity>
  )
}