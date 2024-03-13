import * as React from 'react';
import { useState } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import Navigation from '../navigation/Navigation';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

interface LoginScreenProps { }

const LoginScreen = (props: LoginScreenProps) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(true)

    const handleLogin = async () => {
        const user = {
            email: email,
            password: password
        };
        axios.post('https://3301-39-53-21-161.ngrok-free.app/login', user)
        .then((response) => {
            const token = response.data.token
            AsyncStorage.setItem('authToken', token)
            setTimeout(() => {
                navigation.navigate('Main')
            }, 1000);
            setEmail("")
            setPassword("")
        }).catch((error) => {
            Alert.alert('err')
            console.log(error)
        })
    }

    const navigation = useNavigation()
    return (
        <View className="flex flex-1 m-6">
            {/* View Which handles amazon logo and text */}
            <View className="flex items-center mt-5 ">
                <Image source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/019/766/223/small_2x/amazon-logo-amazon-icon-transparent-free-png.png' }}
                    className="w-24 h-24 m-5" />
                <Text className="text-black font-bold text-xl">Login to your account</Text>
            </View>

            {/* View which handles input texts of email and password */}

            <View className=" mt-20">
                <View className=" px-2 flex flex-row bg-gray-300 items-center my-7">
                    <MaterialCommunityIcons name="email" size={30} color="gray" />
                    <TextInput
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        placeholder='Enter your email'
                    />
                </View>
                <View className="px-2 flex flex-row bg-gray-300 items-center ">
                    <Entypo name="lock" size={30} color="gray" />
                    <TextInput
                        secureTextEntry={showPassword}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        placeholder='Enter your Password' />
                    <TouchableOpacity
                        className="mr-24 flex-1 flex-row-reverse"
                        onPress={() => setShowPassword(!showPassword)}>
                        <Entypo name={showPassword ? 'eye-with-line' : 'eye'} size={20} color="gray" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity>
                    <Text className="text-right text-blue-600 text-base mt-2">Forget password</Text>
                </TouchableOpacity>
            </View>

            {/* View which handles  */}
            <TouchableOpacity onPress={handleLogin}>
                <View className="flex bg-amber-400 mx-16 mt-16 p-3 rounded-xl">
                    <Text className="text-xl text-white text-center">Login</Text>
                </View>
            </TouchableOpacity>

            <View className="flex flex-row justify-center mt-2 items-center">
                <Text className="text-black text-[15px] ml-1">
                    Dont have an Account?
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>

                    <Text className="text-blue-600 text-[15px] ml-1">
                        SignUp
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LoginScreen;