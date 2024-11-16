import { View, FlatList, Image, Dimensions, StyleSheet } from 'react-native'
import { collection, getDocs } from 'firebase/firestore'
import { database } from '@/config/FirebaseConfig'
import { useEffect, useState } from 'react'

const Banner = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        GetSlider();
    },[])

    const GetSlider = async() => {
        setData([]);
        const snapshot = await getDocs(collection(database, 'Sliders'));
        snapshot.forEach((doc) => {
            setData(data => [...data, doc.data()]);
        })
    } 

  return (
    <View style={{marginTop: 20}}>
      <FlatList data={data} horizontal showsHorizontalScrollIndicator={false} renderItem={({item, index}) => (
        <View>
            <Image  source={{uri: item?.imageUrl}} style={styles.imageStyle} />
        </View>
      )} />
    </View>
  )
}

const styles = StyleSheet.create({
    imageStyle: {
        width: Dimensions.get('screen').width*0.9, 
        height: 170, 
        borderRadius: 15, 
        marginRight: 10
    }
})

export default Banner