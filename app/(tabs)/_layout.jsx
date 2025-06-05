import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions=
      {
      {headerShown:false}
      }>
        <Tabs.Screen name="home"
        options=
        {{
            tabBarIcon:({color,size})=>
             <Ionicons name="home-outline" size={size} color={color} />,
             tabBarLabel:'Home'
            
        }}/>
        <Tabs.Screen name="explore"
        options=
        {{
            tabBarIcon:({color,size})=>
             <Ionicons name="search-outline" size={size} color={color} />,
             tabBarLabel:'Explorează'
            
        }}/>
        <Tabs.Screen name="progress"
        options=
        {{
            tabBarIcon:({color,size})=>
             <Ionicons name="analytics-outline" size={size} color={color} />,
             tabBarLabel:'Hartă'
             // "map-outline"
            
        }}/>
         <Tabs.Screen
        name="simulator"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="lock-open-outline" size={size} color={color} />
          ),
          tabBarLabel: 'Simulator',
        }}
      />
        <Tabs.Screen name="profile"
        options=
        {{
            tabBarIcon:({color,size})=>
             <Ionicons name="person-circle-outline" size={size} color={color} />,
             tabBarLabel:'Profil'
            
        }}/>
    </Tabs>
  )
}