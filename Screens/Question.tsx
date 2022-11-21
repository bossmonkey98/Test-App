import {StyleSheet, View, Text, TouchableOpacity ,TextInput } from 'react-native'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../Hooks/Hooks'
import { setAnswer } from '../Features/quizDataSlice'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ScreenParamTypes } from '../App'
import DragAndDrop from "volkeno-react-native-drag-drop";

const Question = () => {
  const {Questions , userDetails} = useAppSelector((state)=>state.userData)
  const [quesNo , setQuesNo] = React.useState<number>(0)
  const [text , setText] = React.useState<any>('')
  const dispatch = useAppDispatch()
  const navigator = useNavigation<NativeStackNavigationProp<ScreenParamTypes,'Questions'>>()
  return (
    <View style={styles.container}>
      {
        // chips
      }
      <View style={styles.chipsWrapper}>
        {Questions.map((i:any)=>
        <TouchableOpacity style={i.id === quesNo+1 ?styles.activeChip:i.answered?styles.answeredChip:styles.chip} key={i.id} onPress={()=>{
          setQuesNo(i.id-1)
        }}>
          <Text style={styles.textStyle}>{i.id}</Text>
          </TouchableOpacity>)}
      </View>
      {Questions[quesNo].type === 'others' &&
      <View style={styles.qWrapper}>
        <Text style={styles.header}>Question {Questions[quesNo].id}</Text>
        <Text style={styles.question}>{Questions[quesNo].question}</Text>
        {Questions[quesNo].options.map((option:any)=>
          <TouchableOpacity  key={option.id} style={
            Questions[quesNo].selectedAnswer === option ? styles.selectedOption :styles.option
          } onPress={()=>{
            dispatch(setAnswer({id:quesNo,selectedAnswer:option,score:Questions[quesNo].answer === option?1:0}))
            if(quesNo !== 4)setQuesNo(quesNo+1)
          }}>
            <Text style={styles.textStyle}>{option}</Text>
          </TouchableOpacity>
          )}
      </View>}
      {
        // Question type Multiple Correct Answer
      Questions[quesNo].type === 'multi' &&
      <View style={styles.qWrapper}>
        <Text style={styles.header}>Question {Questions[quesNo].id}</Text>
        <Text style={styles.question}>{Questions[quesNo].question}</Text>
        {Questions[quesNo].options.map((option:any)=>
          <TouchableOpacity  key={option.id} style={
            Questions[quesNo].selectedAnswer.includes(option) ? styles.selectedOption :styles.option
          } onPress={()=>{
            dispatch(setAnswer({id:quesNo,selectedAnswer:option}))
            
          }}>
            <Text style={styles.textStyle}>{option}</Text>
          </TouchableOpacity>
          )}
      </View>}
      {
        //Question type 'Match The Following'
      Questions[quesNo].type === 'matchTheFollowing' &&
      <View style={{flex:1}}>
        <Text style={styles.header}>Question {Questions[quesNo].id}</Text>
        <Text style={{fontSize:18,alignSelf:'center',marginTop:10}}>Drag the following option to the empty column</Text>
      <DragAndDrop
      style={styles.matchContainer}
      contentContainerStyle={styles.contentContainerStyle}
      itemKeyExtractor={(item) => item.id}
      zoneKeyExtractor={(zone) =>zone.id}
      zones={[
    {
      id: 1,
      items:Questions[quesNo].question
    },
    {
      id: 2,
      items:Questions[quesNo].answered?Questions[quesNo].selectedAnswer:[]
    },
  ]}
      items={Questions[quesNo].answered?[]:[...Questions[quesNo].options]}
      itemsContainerStyle={styles.itemsContainerStyle}
      zonesContainerStyle={styles.zonesContainerStyle}
      onMaj={(zones) => {
        if(zones[1].items.length === 4) dispatch(setAnswer({id:quesNo,selectedAnswer:zones[1].items}))
      }}
      itemsInZoneStyle={styles.itemsInZoneStyle}
      renderItem={(item) => {
        return (
          <View style={styles.dragItemStyle}>
            <Text style={styles.dragItemTextStyle}>{item.text}</Text>
          </View>
        );
      }}
      renderZone={(zone, children) => {
        return (
          <View
            style={{
              ...styles.dragZoneStyle,
            }}
          >
            <Text style={styles.dragZoneTextStyle}>{zone.text}</Text>
            {children}
          </View>
        );
      }}
    /></View>}
    {
    //Question type 'Fill In The Blanks'
    Questions[quesNo].type ==='fillBlanks' && 
    <View style={styles.qWrapper}>
      <Text style={styles.header}>Question {Questions[quesNo].id}</Text>
        <Text style={styles.question}>{Questions[quesNo].question}</Text>
        <TextInput style={styles.inputStyle} placeholder='type your answer here ...' value={Questions[quesNo].selectedAnswer} onChangeText=
        {(i)=>
        dispatch(setAnswer({id:quesNo,selectedAnswer:i}))
        }/>
      </View>}
      {
        // Question access buttons
      }
      <View style={styles.btnContainer}>
        {quesNo + 1 > 1 &&
        <TouchableOpacity style={styles.btn} onPress={()=>{
          setQuesNo(quesNo-1)
        }}>
          <Text style={styles.textStyle}>
            {userDetails.language === "English" && "Previous"}
          {userDetails.language === "French" && "Précédente"}
          {userDetails.language === "German" && "Zurück"}</Text>
        </TouchableOpacity>}
        {quesNo + 1 !== 5?
        <TouchableOpacity style={styles.btn} onPress={()=>{
          setQuesNo(quesNo+1)
        }}>
          <Text style={styles.textStyle}>{userDetails.language === "English" && "Next"}
          {userDetails.language === "French" && "Prochaine"}
          {userDetails.language === "German" && "Nächste"}</Text>
        </TouchableOpacity>:
        <TouchableOpacity style={styles.btn} onPress={()=>{
          null
        }}>
          <Text style={styles.textStyle} onPress={()=>navigator.navigate('Result')}>{userDetails.language === "English" && "Submit"}
          {userDetails.language === "French" && "Soumettre"}
          {userDetails.language === "German" && "Einreichen"}</Text>
        </TouchableOpacity>
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:8,
    backgroundColor: '#EFF5F5',
  },
  chipsWrapper:{
    flexDirection:'row',
    justifyContent:'space-evenly'
  },
  chip:{
    marginVertical:18,
    height:40,
    width:40,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:100,
    backgroundColor:'grey',
  },
  activeChip:{
    marginVertical:18,
    height:40,
    width:40,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:100,
    backgroundColor:'teal',
  },
  answeredChip:{  marginVertical:18,
    height:40,
    width:40,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:100,
    backgroundColor:'red',
  },
  textStyle:{
    fontSize:18,
    color:'#FFF'
  },
  qWrapper:{
    flex:1,
    marginVertical:8,
    marginHorizontal:12,
  },
  header:{
    fontSize:36,
    alignSelf:'center'
  },
  question:{
    fontSize:22,
    marginVertical:12,
  },
  option:{
    height:70,
    minHeight:50,
    marginVertical:4,
    padding:12,
    backgroundColor:'blue',
    justifyContent:'center',
    borderRadius:15,
  },
    unSelected:{
    height:70,
    minHeight:50,
    marginVertical:4,
    padding:12,
    backgroundColor:'blue',
    justifyContent:'center',
    opacity:0.4,
    borderRadius:15,
  },
    selectedOption:{
    height:70,
    minHeight:50,
    marginVertical:4,
    padding:12,
    backgroundColor:'teal',
    justifyContent:'center',
    borderRadius:15,
  },
  btnContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:32,
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
  btn:{
    width:100,
    height:50,
    backgroundColor:'teal',
    justifyContent:'center',
    alignItems:'center',
    marginHorizontal:18,
    borderRadius:10,
  },
    matchContainer: {
    flex: 1,
    marginVertical:8,
    backgroundColor: '#EFF5F5',
  },
  itemsInZoneStyle: {
    width: "100%",
  },
  contentContainerStyle: {
    padding: 20,
  },
  itemsContainerStyle: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
  zonesContainerStyle: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  dragItemStyle: {
    width: "47%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    backgroundColor: "blue",
    padding: 10,
  },
  dragItemTextStyle: {
    color: "#FFF",
    fontSize:18,
    textAlign: "center",
  },
  dragZoneStyle: {
    width: "47%",
    borderWidth:1,
    borderColor:'teal',
    padding: 8,
    minHeight: 130,
    marginVertical: 15,
  },
  dragZoneTextStyle: {
    position: "absolute",
    opacity: 0.2,
    zIndex: 0,
    alignSelf: "center",
    top: "50%",
  },
})

export default Question