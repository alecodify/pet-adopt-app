import { View, Text, Image, TextInput, StyleSheet, ScrollView, TouchableOpacity, Pressable, ToastAndroid, ActivityIndicator } from 'react-native'
import { useNavigation } from 'expo-router'
import React, { useEffect, useState } from 'react'
import Colors from '@/constants/Colors';
import { Picker } from '@react-native-picker/picker'
import { collection, getDocs, setDoc } from 'firebase/firestore';
import { database, storage } from '@/config/FirebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useUser } from '@clerk/clerk-expo';

export default function AddNewPet() {
    const navigation = useNavigation();
    const [formData, setFormData] = useState({
      category: 'Cat', sex: 'Male'
    });
    const [gender, setGender] = useState();
    const [selectedCategory, setSelectedCategory] = useState();
    const [data, setData] = useState();
    const [image, setImage] = useState();
    const [loader, setLoader] = useState(false);
    const { user } = useUser();

    useEffect(() => {
        navigation.setOptions({
            // headerTransparent: true,
            headerTitle: 'Add New Pet',
        })
        GetCategory();
    }, []);

    const GetCategory = async() => {
        setData([]);
        const snapshot = await getDocs(collection(database, 'Category'));
        snapshot.forEach((doc) => {
            setData(data => [...data, doc.data()]);
        })
    } 

    const imagePicker = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
      
        console.log(result);
      
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }

    const handleInputChange = (name, value) =>{
        setFormData(prev => ({...prev, [name]:[value]}))
    }

    const onSubmit = () =>{
      if (Object.keys(formData).length != 8) {
        ToastAndroid.show('Enter All Details', ToastAndroid.SHORT);
        return;
      }
      setLoader(true);
      uploadImage();

    }

    const uploadImage = async () =>{
      const response = await fetch(image);
      const blobImage = await response.blob();
      const storageRef = ref(storage, '/PetAdopt/'+Date.now()+'.jpg');
      uploadBytes(storageRef, blobImage).then((snapshot) => {
        console.log('File Uploaded')
      }).then(resp=>{
        getDownloadURL(storageRef).then(async(downloadUrl)=> {
          console.log(downloadUrl);
          saveFormData(downloadUrl);
        })
      })
    }

    const saveFormData = async(imageUrl) => {
      const docId = Date.now().toString();
      await setDoc(doc(database, 'Pets', docId),{
        ...formData, 
        imageUrl: imageUrl,
        username: user?.fullName,
        email: user?.primaryEmailAddress?.emailAddress,
        userImage: user?.imageUrl,
        id: docId,
      });

      setLoader(false);
    }

  return ( 
    <ScrollView style={{padding: 20}}>
      <Text style={{fontFamily: 'outfit-medium', fontSize: 20,}}>Add New Pet For Adoption</Text>
      <Pressable onPress={imagePicker}>
        {!image ? (
             <Image source={require('../../assets/images/placeholder.png')} style={{width: 100, height: 100, objectFit: 'contain', borderRadius: 15, borderWidth: 1, borderColor: Colors.GRAY}}/>
         ): (
            <Image source={{uri: image}} style={{width: 100, height: 100, objectFit: 'contain', borderRadius: 15, borderWidth: 1, borderColor: Colors.GRAY}} />
         )}
      </Pressable>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet Name *</Text>
        <TextInput style={styles.input} onChangeText={(value) => handleInputChange('name', value)} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Category *</Text>
        <Picker
            selectedValue={selectedCategory}
            style={[styles.input, {paddingVertical: 0}]}
            onValueChange={(itemValue, itemIndex) =>{
                setSelectedCategory(itemValue);
                handleInputChange('category', itemValue)
            }}>
            {data?.map((category, index)=> (
                <Picker.Item key={index} label={category.name} value={category.value} />
            ))}
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Breed *</Text>
        <TextInput style={styles.input} onChangeText={(value) => handleInputChange('breed', value)} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Age *</Text>
        <TextInput keyboardType='number-pad' style={styles.input} onChangeText={(value) => handleInputChange('age', value)} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Gender *</Text>
        <Picker
            selectedValue={gender}
            style={[styles.input, {padding: 0}]}
            onValueChange={(itemValue, itemIndex) =>{
                setGender(itemValue);
                handleInputChange('sex', itemValue)
            }}>
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Weight *</Text>
        <TextInput keyboardType='number-pad' style={styles.input} onChangeText={(value) => handleInputChange('weight', value)} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address *</Text>
        <TextInput style={styles.input} onChangeText={(value) => handleInputChange('address', value)} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>About *</Text>
        <TextInput style={styles.input} numberOfLines={5} multiline={true} onChangeText={(value) => handleInputChange('about', value)} />
      </View>

      <TouchableOpacity disabled={loader} style={styles.button} onPress={onSubmit}>
        {loader? <ActivityIndicator size={'large'} /> :  <Text style={{fontFamily: 'outfit-medium', textAlign: 'center'}}>Submit</Text>}
      </TouchableOpacity>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
    inputContainer: {
        marginVertical: 5
    },
    input: {
        padding: 10,
        backgroundColor: Colors.WHITE,
        borderRadius: 7,
        fontFamily: 'outfit'
    },
    label:{
        marginVertical: 5,
        fontFamily: 'outfit',
    },
    button:{
        padding: 20,
        borderRadius: 7,
        backgroundColor: Colors.PRIMARY,
        marginVertical: 10,
        marginBottom: 50
    }

});