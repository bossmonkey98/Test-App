import {StyleSheet, TouchableOpacity, View, Text, TextInput } from 'react-native'
import React , {useState} from 'react'
import Dropdown from '../Components/DropDown'
import { useAppDispatch } from '../Hooks/Hooks';
import { setUserDetails } from '../Features/quizDataSlice';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreenParamTypes } from '../App';
import { data } from '../Data/questions';

export type userDataTypes = {
  name:string;
  email:string;
  phoneNo:string;
  language:string;
}

const Home = () => {
  const [userData ,setUserData] = useState<userDataTypes>({
    name:'',
    email:'',
    phoneNo:'',
    language:'',
  })


  const dispatch = useAppDispatch()
  const navigator = useNavigation<NativeStackNavigationProp<ScreenParamTypes,'Home'>>()
  
  return (
    <View style={styles.Container}>
      <Text style={styles.headerStyle}>Enter Your Details</Text>
      <Text style={styles.textStyle}>Enter Name</Text>
      <TextInput style={styles.inputStyle} placeholder='John Snow' onChangeText={(text)=>{
        setUserData({...userData,name:text})
      }}/>
      <Text style={styles.textStyle}>Enter Email</Text>
      <TextInput style={styles.inputStyle} placeholder='abc@mail.com' keyboardType='email-address' onChangeText={(text)=>{
        setUserData({...userData,email:text})
      }}/>
      <Text style={styles.textStyle}>Enter Phone Number</Text>
      <TextInput style={styles.inputStyle} placeholder='1234567890' maxLength={10} keyboardType='number-pad' onChangeText={(text)=>{
        setUserData({...userData,phoneNo:text})
      }}/>
      <Text style={styles.textStyle}>Select Language</Text>
      <Dropdown label='Select Language' data = {data} onSelect={(i)=>{
        setUserData({...userData,language:i.label})
        }}/>
      <TouchableOpacity style={styles.btnStyle} onPress ={()=>{
        if(!(userData.email && userData.language && userData.name && userData.phoneNo )) alert('Please fill all the details')
        else{
          dispatch(setUserDetails(userData))
          navigator.navigate('Rules')
        }
      }}>
        <Text style={styles.btnTextStyle}>Submit</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    Container:{
        flex:1,
        padding:18,
        backgroundColor: '#EFF5F5',
    },
    headerStyle:{
        fontSize:24,
        alignSelf:'center',
        marginBottom:8,
    },
    textStyle:{
        fontSize:18,
        marginTop:8,
        marginHorizontal:8,
    },
    inputStyle:{
        margin:8,
        borderWidth:0.6,
        borderColor:'blue',
        borderRadius:10,
        height:50,
        padding:10,
        fontSize:18,
    },
    btnStyle:{
      margin:8,
      height:50,
      borderRadius:10,
      backgroundColor:'blue',
      justifyContent:'center',
      alignItems:'center',
    },
    btnTextStyle:{
      color:'white',
      fontSize:20,
    }
})

export default Home