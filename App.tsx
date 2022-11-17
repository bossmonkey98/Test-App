import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import Home from './Screens/Home';
import Question from './Screens/Question';
import Result from './Screens/Result';
import Rules from './Screens/Rules';
import { store } from './Store/Store';

export type ScreenParamTypes = {
  "Home":undefined;
  "Rules":undefined;
  'Questions':undefined;
  "Result":undefined;
}

export default function App() {
  const Stack = createNativeStackNavigator<ScreenParamTypes>()
  return (
    <Provider store={store}>
    <NavigationContainer>
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={Home} options={{title:"Home"}}/>
        <Stack.Screen name='Rules' component = {Rules} options={{title:'Test Rules',headerBackVisible:false}}/>
        <Stack.Screen name='Questions' component={Question} options={{title:"Questions",headerBackVisible:false}}/>
        <Stack.Screen name='Result' component={Result} options={{title:"Result",headerBackVisible:false}}/>
      </Stack.Navigator>
    </View>
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF5F5',
  },
});
