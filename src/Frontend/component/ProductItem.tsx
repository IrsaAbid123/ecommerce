import React from 'react';
import { Text, View, StyleSheet, Pressable, Image, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo'



const ProductItem = ({ item }: any) => {
  return (
    <Pressable className="my-3">

      {/* View which contain image and title */}
      <View className="mx-3">
        <Image source={{ uri: item.image }} className="w-36 h-36" style={{ resizeMode: 'contain' }} />
        <Text numberOfLines={1} className="text-black text-base truncate w-36 mt-3">{item.title}</Text>
      </View>

      {/* View which handles the rating and price */}
      <View className="flex flex-row justify-between items-center mx-3">
        <View className="flex flex-row items-center">
          <Text>PKR </Text>
          <Text className="font-bold text-black text-lg">{item.price}</Text>
        </View>
        <View className="flex flex-row items-center">
          <Entypo name="star" size={15} color="#e8d827" />
          <Text className="text-amber-400">{item?.rating?.rate}</Text>
        </View>
      </View>

      {/* View which controls the add to cart button */}
      <TouchableOpacity className="bg-amber-400 mx-5 p-3 my-1 rounded-full">
        <Text className="text-black text-center text-base">Add to Cart</Text>
      </TouchableOpacity>
    </Pressable>
  );
};

export default ProductItem;