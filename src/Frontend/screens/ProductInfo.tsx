import * as React from 'react';
import { Text, View, TouchableOpacity, TextInput, ScrollView, Image, ImageBackground, Pressable } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { useRoute } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo'

interface ProductInfoProps { }

const ProductInfo = (props: ProductInfoProps) => {
  const route = useRoute();
  return (
    <ScrollView className="flex flex-1 bg-white">
      {/* View which contain the search bar */}
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

      {/* ScrollView which contain the carosaul images */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}>
        {route.params.carosoulImages.map((item, index) => (
          <ImageBackground
            key={index}
            source={{ uri: item }}
            style={{ width: 360, height: 360, marginTop: 20 }}
            resizeMode="contain"
          >

            {/* View which handles the content upper the background image */}
            <View className="flex flex-1  justify-between mx-4">

              {/* View which contain offer and share icon */}
              <View className="flex flex-row justify-between">
                {
                  route.params.offer ? (

                    <View className="bg-red-700 rounded-full w-14 h-14 flex justify-center items-center">
                      <Text className="text-white text-base">{route.params.offer}</Text>
                    </View>
                  ) : (
                    <View className="rounded-full w-12 h-12 flex justify-center items-center">
                      <Text className="text-white text-base"></Text>
                    </View>
                  )
                }
                <TouchableOpacity>
                  <View className="bg-gray-300 h-10 w-10 rounded-full flex justify-center items-center">
                    <Entypo name="share" size={18} color="black" />
                  </View>
                </TouchableOpacity>
              </View>

              {/* View which contain like button */}
              <View>
                <TouchableOpacity>
                  <View className="bg-gray-300 h-8 w-8 rounded-full flex justify-center items-center">
                    <AntDesign name="hearto" size={20} color="black" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        ))}
      </ScrollView>

      {/* View which contain the title and the price */}
      <View className="mt-4 mx-4">
        <Text className="text-lg text-black">{route.params.title}</Text>
        <View className="flex flex-row items-center">
          <Text className="text-black text-base">PKR </Text>
          <Text className="text-xl font-bold text-black">{route.params.price}</Text>
        </View>
      </View>
      {/* Border line */}
      <Text className="h-[2px] bg-gray-300 my-2" />

      {/* View which cntain the colour and size  details*/}
      <View className="mx-4">
        {/* View which handles the colour detail */}
        <View className="flex flex-row mt-2">
          <Text className="text-black text-lg">Color: </Text>
          <Text className="text-black text-lg font-bold">{route.params.color}</Text>
        </View>
        {/* View which handles the size details */}
        <View className="flex flex-row mt-3">
          <Text className="text-black text-lg">Size: </Text>
          <Text className="text-black text-lg font-bold">{route.params.size}</Text>
        </View>
      </View>

      {/* Border line */}
      <Text className="h-[2px] bg-gray-300 my-2" />

      {/* View which handles the delivery details */}
      <View className="mx-4">
        <Text className="text-black font-bold text-lg">Total: {route.params.oldPrice}</Text>
        <Text className="text-base font-bold text-[#59c989]">FREE delivery tomorrow at 3PM. Order now within 10hr 30min</Text>

        <View className="flex flex-row items-center  py-3">
          <EvilIcons name="location" color="black" size={30} />
          <Pressable>
            <Text className="font-bold text-black ">Deliver to Sujan - Banglore 209876 </Text>
          </Pressable>
        </View>
        <Text className="text-green-500 my-2 text-base">In Stock</Text>
      </View>


      {/* Add to cart button */}
      <TouchableOpacity className="bg-amber-500 p-2 mx-2 rounded-full items-center">
        <Text className="text-white text-base font-bold">Add to Cart</Text>
      </TouchableOpacity>

      {/* Buy now button */}
      <TouchableOpacity className="bg-amber-500 p-2 mx-2 my-6 rounded-full items-center">
        <Text className="text-white text-base font-bold">Buy now</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

export default ProductInfo;