import { database } from "@/config/FirebaseConfig"
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"

const GetFavList = async(user) => {
    const docSnap = await getDoc(doc(database, 'UserFavoritePet', user?.primaryEmailAddress?.emailAddress));

    if (docSnap?.exists()) {
        return docSnap.data();
    }

    else{
        await setDoc(doc(database, 'UserFavoritePet', user?.primaryEmailAddress?.emailAddress), {
            email: user?.primaryEmailAddress?.emailAddress,
            favorites: []
        })
    }
}

const UpdateFavorite = async(user, favorites) =>{
    const docRef = doc(database, 'UserFavoritePet', user?.primaryEmailAddress?.emailAddress);
    try {
        await updateDoc(docRef, {
            favorites: favorites
        })
    } catch (error) {
        
    }
}

export default {
    GetFavList, UpdateFavorite
}