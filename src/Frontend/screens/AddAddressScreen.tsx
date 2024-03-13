import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput, Pressable, ScrollView, } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface AddAddressScreenProps { }

const AddAddressScreen = (props: AddAddressScreenProps) => {
    const [adresses, setAdresses] = useState("")
    const navigation = useNavigation()

    // Making a function to that fetches data from get request(all the adresses in the array)
    const handleFetchingAdresses = async () => {
        // getting stored userId which is stored in the async storage
        const userId = await AsyncStorage.getItem('userId')

        // Getting all the data form get request
        axios.get(`https://3301-39-53-21-161.ngrok-free.app/adresses/${userId}`).then((response) => {
            console.log(response)
            // set al the data in to a state
            setAdresses(response.data)
        }).catch((error) => {
            console.log(error)
        })

    }

    useEffect(() => {
        handleFetchingAdresses()
    }, [])

    return (
        <ScrollView className="flex flex-1 bg-white">
            <View>
                {/* Search bar  */}
                <View className="bg-[#1aada8] flex-row items-center p-3">
                    <View className="bg-white flex-row items-center flex-1 pl-2 rounded-sm">
                        <TouchableOpacity>
                            <AntDesign name="search1" size={20} color="black" />
                        </TouchableOpacity>
                        <TextInput className="pl-2 text-base" placeholder='Search Amazon.in...' />
                    </View>
                    <TouchableOpacity className="pl-2">
                        <SimpleLineIcons name="microphone" size={25} color="black" />
                    </TouchableOpacity>
                </View>

                {/* Your addresses text */}
                <View className=" m-3">
                    <Text className="text-black font-bold text-2xl">Your Adresses</Text>
                </View>

                {/* Border */}
                <Text className="h-[2px] bg-slate-300 my-2" />

                {/* Navigation to the next screen */}
                <Pressable
                    onPress={() => navigation.navigate('Address')}>
                    <View className="flex flex-row justify-between mx-3">
                        <Text className="text-base text-black py-1">Add new Adress</Text>
                        <MaterialCommunityIcons name="arrow-right-thin" color="black" size={20} />
                    </View>
                </Pressable>
                <Text className="h-[2px] bg-slate-300 my-2" />

                {
                    Array.isArray(adresses) ? (

                        adresses?.map((item, index) => (
                            <Pressable key={index}>
                                <View
                                    className="p-2 border-[1px] border-gray-400 m-3 rounded-md">
                                    <View className="flex flex-row items-center">
                                        <Text className="font-bold, text-black text-xl">{item?.name}</Text>
                                        <Entypo name="location-pin" size={20} color="red" />
                                    </View>
                                    <View className="flex flex-row items-center">
                                        <Text className="text-black text-base">{item?.country}, </Text>
                                        <Text className="text-black text-base">{item?.city}</Text>
                                    </View>
                                    <View className="flex flex-row items-center">
                                        <Text className="text-black text-base">{item?.houseNo}, </Text>
                                        <Text className="text-black text-base">{item?.streetNo}, </Text>
                                        <Text className="text-black text-base">{item?.landMark}</Text>
                                    </View>

                                    <Text className="text-black text-base">MobileNo: {item?.mobileNo}</Text>
                                    <Text className="text-black text-base">Postal code: {item.postalCode}</Text>
                                    <View className="flex flex-row mt-2">

                                        <TouchableOpacity
                                            // onPress={handleDelete}
                                            className=" p-2 mr-2 border-gray-500 border-[1px] rounded-md">
                                            <Text className=" text-black">Delete</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity className=" p-2 border-gray-500 mr-2 border-[1px] rounded-md ">
                                            <Text className=" text-black">Update</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity className=" p-2 border-gray-500 border-[1px] rounded-md ">
                                            <Text className=" text-black">Set as default</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Pressable>
                        ))
                    ) : (
                        <View>
                            <Text>No adress found</Text>
                        </View>
                    )
                }
            </View>
        </ScrollView>
    );
};

export default AddAddressScreen;
