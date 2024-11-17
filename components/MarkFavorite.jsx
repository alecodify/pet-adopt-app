import { View, Text, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import Shared from '@/shared/Shared';
import { useUser } from '@clerk/clerk-expo';

export default function MarkFavorite({ pet }) {
    const { user } = useUser();
    const [favList, setFavList] = useState();

    useEffect(() =>{
       user && GetFavorite();
    },[user]);

    const GetFavorite = async() => {
      const result =  await Shared.GetFavList(user)
      setFavList(result.favorites? result.favorites : [])
    }

    const AddToFavorite = async() =>{
        const favResult = favList;
        favResult.push(pet.id);
        await Shared.UpdateFavorite(user, favResult);
        GetFavorite();
    }

    const RemoveFromFavorite = async() =>{
        const favResult = favList.filter(item => item != pet.id);
        await Shared.UpdateFavorite(user, favResult);
        GetFavorite();
    }

  return (
    <View>

        {favList?.includes(pet.id) ? (
            <Pressable onPress={() => {RemoveFromFavorite()}}>
                <Ionicons name='heart' size={24} color={'red'} />
            </Pressable>
        ) : (
            <Pressable onPress={() => {AddToFavorite()}}>
                <Ionicons name='heart-outline' size={24} color={'black'} />
            </Pressable>
        )}
       
        
    </View>
  )
}