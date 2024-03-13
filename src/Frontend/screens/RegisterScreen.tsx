import * as React from 'react';
import { useState } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Navigation from '../navigation/Navigation';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

interface RegisterScreenProps { }

const RegisterScreen = (props: RegisterScreenProps) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(true)
    const navigation = useNavigation()

    const handleRegister = () => {
        const user = {
            name: name,
            email: email,
            password: password
        };
        axios.post('https://3301-39-53-21-161.ngrok-free.app/register', user)
            .then((response) => {
                Alert.alert('Registeration sucessfull')
                setTimeout(() => {
                    navigation.navigate('Login')
                }, 1000);
                setName("")
                setEmail("")
                setPassword("")
            }).catch((error: any) => {
                Alert.alert("Registeration error")
                console.log('error', error)
            })
    }
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
                <View className="px-2 flex flex-row bg-gray-300 items-center ">
                    <Ionicons name="person" size={30} color="gray" />
                    <TextInput
                        value={name}
                        onChangeText={(text) => setName(text)}
                        placeholder='Enter your name' />
                </View>
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
                <TouchableOpacity
                >
                    <Text className="text-right text-blue-600 text-base mt-2">Forget password</Text>
                </TouchableOpacity>
            </View>

            {/* View which handles  */}
            <TouchableOpacity
                onPress={handleRegister}>
                <View className="flex bg-amber-400 mx-16 mt-16 p-3 rounded-xl">
                    <Text className="text-xl text-white text-center">Register</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default RegisterScreen;
