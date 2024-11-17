import { View, Text, Image } from 'react-native'
import MarkFavorite from '../MarkFavorite'
import Colors from '@/constants/Colors'
import React from 'react'

export default function PetInfo({ pet }) {
  return (
    <View>
      <Image source={{uri: pet?.imageUrl}} style={{width: '100%', height: 400, objectFit: 'cover'}} />
      <View style={{padding: 15,display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <View >
            <Text style={{fontFamily: 'outfit-bold', fontSize: 25}}>{pet.name}</Text>
            <Text style={{fontFamily: 'outfit',color: Colors.GRAY, fontSize: 18}}>{pet?.address}</Text>
        </View>

        <MarkFavorite pet={pet} />
      </View>
    </View>
  )
}