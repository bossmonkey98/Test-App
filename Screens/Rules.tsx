import { StyleSheet,View, Text , TouchableOpacity } from 'react-native'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../Hooks/Hooks'
import { getQuestions } from '../Features/quizDataSlice'
import { questions } from '../Data/questions'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ScreenParamTypes } from '../App'

const Rules = () => {
    const dispatch = useAppDispatch()
    const {userDetails} = useAppSelector((state)=>state.userData)
    const navigator = useNavigation<NativeStackNavigationProp<ScreenParamTypes,'Rules'>>()
    let ques : any
    if(userDetails.language){
        ques = questions.filter((i:any)=>i.language === userDetails.language)
    }
  return (
    <View style={styles.constainer}>
      <Text style={styles.headerStyle}>Rules</Text>
      <Text style={styles.textStyle}>{'\u25AA'} Question are of type multiple choice , true/false , fill in the blanks and match the following</Text>
      <Text style={styles.textStyle}>{'\u25AA'} For match the following you need to drag and drop the respective answers</Text>
      <Text style={styles.textStyle}>{'\u25AA'} You can navigate to previous / next question</Text>
      <Text style={styles.textStyle}>{'\u25AA'} There is no negative marking for wrong answers</Text>
      <TouchableOpacity style={styles.btnStyle} onPress={()=>{
        dispatch(getQuestions(ques[0].questions))
        navigator.navigate('Questions')
      }}>
        <Text style={styles.btnTextStyle}>Start Test</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    constainer:{
        flex:1,
        paddingVertical:24,
        paddingHorizontal:12,
        backgroundColor: '#EFF5F5',
    },
    textStyle:{
        fontSize:18,
        margin:8,
        marginHorizontal:8,
    },
    headerStyle:{
        fontSize:24,
        alignSelf:'center',
        marginBottom:8,
        textDecorationLine:'underline'
    },
    btnStyle:{
      marginVertical:50,
      marginHorizontal:8,
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
export default Rules