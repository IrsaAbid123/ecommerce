import * as React from 'react';
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Entypo from 'react-native-vector-icons/Entypo'

interface UpperCatagoryProps { }

const UpperCatagory = ({ route }) => {
    const { catagory } = route.params
    console.log(catagory)
    return (
        <ScrollView className="bg-white flex-1">
            {/* Search bar */}
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
            {/* Designing items */}
            <View className="flex flex-1 flex-row flex-wrap">

                {
                    catagory.map((item, index) => (
                        <View
                            className="m-5"
                            key={index}>
                            <Image
                                className="w-32  h-32 rounded-md"
                                style={{ resizeMode: 'contain' }}
                                source={{ uri: item.image }} />
                            <Text className="text-black text-base my-1">{item.title}</Text>
                            <View className="flex flex-row justify-between items-center">
                                <View className="flex flex-row">
                                    <Text>PKR </Text>
                                    <Text className="text-black font-bold">{item.oldPrice}</Text>
                                </View>
                                <View className="flex flex-row items-center">
                                    <Entypo name="star" size={20} color="#e8d827" />
                                    <Text className="text-amber-400">{item.id}</Text>
                                </View>
                            </View>
                            <TouchableOpacity className="bg-amber-400 rounded-full mx-3 mt-3 p-3">
                                <Text className="text-center font-bold text-black">Add to Cart</Text>
                            </TouchableOpacity>
                        </View>
                    ))
                }
            </View>
        </ScrollView>
    );
};

export default UpperCatagory;