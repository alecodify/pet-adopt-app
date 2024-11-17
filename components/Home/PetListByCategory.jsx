import { FlatList, View } from 'react-native'
import  { useEffect, useState } from 'react'
import Category from './Category'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { database } from '@/config/FirebaseConfig'
import PetListItem from './PetListItem'

const PetListByCategory = () => {
  const [petList, setPetList] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    GetPetList('Fish');
  },[])

  const GetPetList = async(category) => {
    setLoader(true);
    setPetList([]);
    const q = query(collection(database, 'Pets'), where('category', '==', category));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
      setPetList(petList => [...petList, doc.data()])
    })
    setLoader(false);
  }

  // console.log(petList)

  return (
    <View>
      <Category category={(value) => GetPetList(value)} />
      <FlatList style={{marginTop: 15}} horizontal data={petList} refreshing={loader} onRefresh={() => GetPetList('Fish')} renderItem={({item, index}) => (
        <PetListItem pet={item} />
      )} />
    </View>
  )
}

export default PetListByCategory