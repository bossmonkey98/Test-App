import { View, Text , Dimensions, StyleSheet} from 'react-native'
import React from 'react'
import {PieChart} from 'react-native-chart-kit';
import { useAppSelector } from '../Hooks/Hooks';

const Result = () => {
  const {Questions} = useAppSelector(state=>state.userData)
  const [Score , setScore] = React.useState<any>(undefined)
  
  const calcScore = () =>{
    let score = 0
    for ( let i of Questions){
    score = score + i.score
  }
  return score
  }
React.useEffect(()=>{ let score = calcScore();setScore(score)},[])

  return (
    Score === undefined ?<View style={styles.container}><Text style={styles.textStyle}>Loading Results....</Text></View>:
    <View style={styles.container}>
      <Text style={styles.textStyle}>Result</Text>
            <PieChart
        data={[
          {
            name: 'Correct',
            Result: Score,
            color: 'green',
            legendFontColor: '#000',
            legendFontSize: 18,
          },
          {
            name: 'Incorrect',
            Result: 5 - Score,
            color: 'red',
            legendFontColor: '#000',
            legendFontSize: 18,
          },
        ]}
        width={Dimensions.get('window').width}
        height={200}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        style={{
          marginVertical: 8,
          justifyContent:'space-evenly'
        }}
        accessor="Result"
        backgroundColor="transparent"
        paddingLeft='0'
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'flex-start',
    paddingVertical:'50%',
    backgroundColor: '#EFF5F5',
  },
  textStyle:{
    fontSize:36,
    alignSelf:'center',
    marginVertical:22,
  }
})
export default Result