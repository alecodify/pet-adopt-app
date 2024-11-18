import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Shared from '@/shared/Shared'
import { useUser } from '@clerk/clerk-expo'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { database } from '@/config/FirebaseConfig';
import PetListItem from '@/components/Home/PetListItem';

export default function Favorite() {
  const { user } = useUser();
  const [favIds, setFavIds] = useState([]);
  const [favPetList, setFavPetList] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    user && GetFavoriteIds();
  },[user]);
  

  const GetFavoriteIds = async() => {
      setLoader(true);
      const result = await Shared.GetFavList(user);
      setFavIds(result.favorites);
      GetFavoritePetsList(result.favorites);
      setLoader(false);
  }

  const GetFavoritePetsList = async (id) =>{
      setLoader(true);
      setFavPetList([])
      const q = query(collection(database, 'Pets'), where('id', 'in', id));
      const querySnapShot = await getDocs(q);

      querySnapShot.forEach((doc) => {
        setFavPetList(prev => [...prev, doc.data()])
      })
      setLoader(false);
  }

  return (
    <View style={{padding: 20, marginTop: 10}}>
      <Text style={{fontFamily: 'outfit-medium', fontSize: 30}}>Favorites</Text>
      <FlatList data={favPetList} onRefresh={GetFavoriteIds} refreshing={loader} numColumns={2} renderItem={({item, index}) => (
        <View style={{padding: 10}}>
            <PetListItem pet={item} />
        </View>
      )} />
    </View>
  )
}