import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs 
      screenOptions={{
        tabBarActiveTintColor: '#0C8140',
      }}
    >
      <Tabs.Screen
        name="mainpage"
        options={{
          title:'首页',
          headerShown:false,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarIcon: ({ color }) => <FontAwesome size={28} color={color} />,
        }}
      />

      <Tabs.Screen
        name="map"
        options={{
          title: '花期地图',
          headerShown:false,
          tabBarLabelStyle: styles.tabBarLabel,          
          tabBarIcon: ({ color }) => <FontAwesome size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="aihelper"
        options={{
          title:'智能助手',
          headerShown:false,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarIcon: ({ color }) => <FontAwesome size={28} color={color} />,
        }}
      />

      <Tabs.Screen
        name="record"
        options={{
          title: '生产记录',
          headerShown:false,
          tabBarLabelStyle: styles.tabBarLabel,          
          tabBarIcon: ({ color }) => <FontAwesome size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="myself"
        options={{
          title:'我的',
          headerShown:false,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarIcon: ({ color }) => <FontAwesome size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarLabel: {
    fontSize: 11,
    fontFamily: 'Source Han Sans-Bold',
    fontWeight:700,
    position: 'absolute',
    top: '50%',
    marginTop: -8,
  }
});
