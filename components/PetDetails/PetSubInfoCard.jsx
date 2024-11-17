import { View, Text, Image, StyleSheet } from 'react-native'
import Colors from '@/constants/Colors'
import React from 'react'

export default function PetSubInfoCard({icon, title, value}) {
  return (
    <View style={styles.container}>
        <Image source={icon} style={{width: 40, height: 40}} />
        <View style={{flex: 1}}>
            <Text style={{fontFamily: 'outfit', fontSize: 16}}>{title}</Text>
            <Text style={{fontFamily: 'outfit-medium',fontSize: 16 }}>{value}</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
   container:{
    display: 'flex', 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 10, 
    backgroundColor: Colors.WHITE, 
    margin: 5, 
    borderRadius:8, 
    gap: 10, 
    flex: 1,
    height: 80,
    flexShrink: 0,
   }
});