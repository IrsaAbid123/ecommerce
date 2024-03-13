import * as React from 'react';
import { useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface AddressProps { }

const Address = (props: AddressProps) => {
    const [name, setName] = useState("")
    const [country, setCountry] = useState("")
    const [city, setCity] = useState("")
    const [houseNo, setHouseNo] = useState("")
    const [streetNo, setStreetNo] = useState("")
    const [mobileNo, setMobileNo] = useState("")
    const [landMark, setLandMark] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const navigation = useNavigation()

    // function that make post request to add the adress

    const handleAddAdresses = async () => {
        // defining the user id and storing it in the async storage
        const userId = '65f1498ade8b6ca6feb467cd'
        await AsyncStorage.setItem('userId', userId)

        // dfinig th erequest body
        const userData = {
            name: name,
            country: country,
            city: city,
            houseNo: houseNo,
            streetNo: streetNo,
            mobileNo: mobileNo,
            landMark: landMark,
            postalCode: postalCode
        };

        // getting the id from async storage
        const storedId = await AsyncStorage.getItem('userId')
        console.log(storedId)
        axios.post(`https://3301-39-53-21-161.ngrok-free.app/adresses/${storedId}`, userData)
            .then((response) => {
                Alert.alert('Success', 'Address added successfully');
                const addressId = response.data._id;
                console.log('Address ID:', addressId);
                console.log(response);
                setTimeout(() => {
                    navigation.navigate('AddAddress');
                }, 1000);
                setName("")
                setCountry("")
                setCity("")
                setHouseNo("")
                setStreetNo("")
                setMobileNo("")
                setLandMark("")
                setPostalCode("")
            }).catch((err: any) => {
                console.log(err)
                Alert.alert('Error', 'Error adding new adress')
            })
    }
    return (
        <ScrollView className="flex flex-1 bg-white">
            {/* Search bar */}
            <View className="bg-[#1aada8] flex-row items-center p-8">
            </View>

            {/* View which has all the text input */}
            <View className="m-3">
                {/* Add a new adress text input */}

                {/* Full name */}
                <View className="mt-3">
                    <Text className="text-black font-bold text-lg">Enter your First and Last name</Text>
                    <TextInput
                        value={name}
                        onChangeText={(text) => setName(text)}
                        placeholder='Enter your name...'
                        className="border-2 border-gray-300 mt-2 pl-2 ml-2 text-base"
                    />
                </View>

                {/* Country */}
                <View>
                    <Text className="text-black font-bold text-lg">Add your Country</Text>
                    <TextInput
                        value={country}
                        onChangeText={(text) => setCountry(text)}
                        placeholder='Country...'
                        className="border-2 border-gray-300 mt-2 pl-2 ml-2 text-base"
                    />
                </View>
                {/* City */}
                <View>
                    <Text className="text-black font-bold text-lg">Add your city name</Text>
                    <TextInput
                        value={city}
                        onChangeText={(text) => setCity(text)}
                        placeholder='City name...'
                        className="border-2 border-gray-300 mt-2 pl-2 ml-2 text-base"
                    />
                </View>

                {/* Mobile number */}
                <View className="mt-3">
                    <Text className="text-black font-bold text-lg">Add your Mobile number</Text>
                    <TextInput
                        value={mobileNo}
                        onChangeText={(text) => setMobileNo(text)}
                        placeholder='Mobile No.'
                        className="border-2 border-gray-300 mt-2 pl-2 ml-2 text-base"
                    />
                </View>

                {/* Flate house number building and company*/}
                <View className="mt-3">
                    <Text className="text-black font-bold text-lg">Add Flate, House No. or building No.</Text>
                    <TextInput
                        value={houseNo}
                        onChangeText={(text) => setHouseNo(text)}
                        placeholder='Enter here...'
                        className="border-2 border-gray-300 mt-2 pl-2 ml-2 text-base"
                    />
                </View>

                {/* Street no*/}
                <View className="mt-3">
                    <Text className="text-black font-bold text-lg">Add your street No.</Text>
                    <TextInput
                        value={streetNo}
                        onChangeText={(text) => setStreetNo(text)}
                        placeholder='Enter here...'
                        className="border-2 border-gray-300 mt-2 pl-2 ml-2 text-base"
                    />
                </View>

                {/*LandMark */}
                <View className="mt-3">
                    <Text className="text-black font-bold text-lg">Add LandMark</Text>
                    <TextInput
                        value={landMark}
                        onChangeText={(text) => setLandMark(text)}
                        placeholder='e.g near Shalimar hospital....'
                        className="border-2 border-gray-300 mt-2 pl-2 ml-2 text-base"
                    />
                </View>

                {/* Pincode*/}
                <View className="mt-3">
                    <Text className="text-black font-bold text-lg">Add your Pincode</Text>
                    <TextInput
                        value={postalCode}
                        onChangeText={(text) => setPostalCode(text)}
                        placeholder='Add here...'
                        className="border-2 border-gray-300 mt-2 pl-2 ml-2 text-base"
                    />
                </View>
            </View>

            {/* Add adress button */}
            <TouchableOpacity
                onPress={handleAddAdresses}
                className="bg-amber-300 p-4 my-5 mx-20 rounded-2xl">
                <Text className="text-center text-lg font-bold text-black">Add Adress</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default Address;