
import React from 'react'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { route } from './Utils/Routes';
import { AppProvider } from './Utils/AppContext';


const Stack = createStackNavigator();
export default function App() {
 
  return (
      <AppProvider>

    
    <NavigationContainer>
      <Stack.Navigator>
      
      
        {route.map(data => {
          return (
            <Stack.Screen
              options={data.option}
              name={data.name}
              component={data.component}
            
       />
          );
        })}
      </Stack.Navigator>

      </NavigationContainer>
      </AppProvider>
      
    
  )
}



