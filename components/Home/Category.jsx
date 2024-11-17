import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore';
import { database } from '@/config/FirebaseConfig';
import Colors from '@/constants/Colors';

export default function Category({ category }) {
    const [data, setData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Fish');

    useEffect(() => {
        GetCategory();
    },[])

    const GetCategory = async() => {
        setData([]);
        const snapshot = await getDocs(collection(database, 'Category'));
        snapshot.forEach((doc) => {
            setData(data => [...data, doc.data()]);
        })
    } 

  return (
    <View style={{marginTop: 20}}>
      <Text style={{fontFamily: 'outfit-medium', fontSize: 20}}>Category</Text>
      <FlatList data={data} numColumns={4} showsHorizontalScrollIndicator={false} renderItem={({item, index}) => (
        <TouchableOpacity onPress={() => {setSelectedCategory(item.name); category(item.name) }} style={{flex: 1}}>
            <View style={[styles.container, selectedCategory == item.name && styles.selectedCategoryStyle]}>
                <Image source={{uri: item?.imageUrl}} style={{width: 40, height: 40,}}/>
            </View>
            <Text style={{textAlign: 'center', fontFamily: 'outfit'}}>{item?.name}</Text>
        </TouchableOpacity>
      )} />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.LIGHT_PRIMARY,
        padding: 15,
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 15,
        borderColor: Colors.PRIMARY,
        margin: 5
    },
    selectedCategoryStyle: {
        backgroundColor: Colors.SECONDARY,
        borderColor: Colors.PRIMARY,
    }
});