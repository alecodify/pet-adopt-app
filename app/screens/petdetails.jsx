import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import PetInfo from '@/components/PetDetails/PetInfo';
import PetSubInfo from '@/components/PetDetails/PetSubInfo';
import PetAbout from '@/components/PetDetails/PetAbout';
import OwnerInfo from '@/components/PetDetails/OwnerInfo';
import Colors from '@/constants/Colors';

export default function Petdetails() {
    const pet = useLocalSearchParams();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerTransparent: true,
            headerTitle: '',
        })
    },[]);

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <PetInfo  pet={pet} />
        <PetSubInfo pet={pet} />
        <PetAbout pet={pet} />
        <OwnerInfo pet={pet} />
        <View style={{height: 70}}>

        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.adoptButton}>
          <Text style={{fontFamily: 'outfit-medium', textAlign: 'center', fontSize: 20}}>Adopt Me</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    adoptButton:{
      padding: 15,
      backgroundColor: Colors.PRIMARY,
    },
    bottomContainer: {
      position: 'absolute',
      width: '100%',
      bottom: 0
    }
});