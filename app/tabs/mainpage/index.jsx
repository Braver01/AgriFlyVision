import { View, Text , StyleSheet, Image, TextInput, TouchableOpacity,FlatList,Dimensions,Animated} from "react-native";
import { useNavigation } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PermissionsAndroid } from "react-native";
import { ImageBackground } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import React,{useRef,useState,useEffect} from "react";
import { useAnimatedScrollHandler } from "react-native-reanimated";

const { width: windowWidth } = Dimensions.get('window');
export default function Main(){
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef(null);
    const intervalRef = useRef(null);
  
    const carouselItems = [
      {
        id: 1,
        imageUrl: require('../../img/move1.png')
      },
      {
        id: 2,
        imageUrl: require('../../img/move2.png')
      },
      {
        id: 3,
        imageUrl: require('../../img/move3.png')
      },
    ];
  
    // 自动轮播逻辑
    useEffect(() => {
      intervalRef.current = setInterval(() => {
        const newIndex = (currentIndex + 1) % carouselItems.length;
        setCurrentIndex(newIndex);
        
        flatListRef.current?.scrollToIndex({
          index: newIndex,
          animated: true,
        });
      }, 3000); // 3秒切换一次
  
      return () => clearInterval(intervalRef.current);
    }, [currentIndex]);
  
    const renderItem = ({ item }) => {
      return (
        <View style={{ width: windowWidth, height: 200 }}>
          <Image 
            source={item.imageUrl} 
            style={styles.image} 
            resizeMode="cover"
          />
        </View>
      );
    };
  
    const handleScroll = Animated.event(
      [{ nativeEvent: { contentOffset: { x: scrollX } } }],
      { useNativeDriver: false }
    );
  
    const handleMomentumScrollEnd = (e) => {
      const offsetX = e.nativeEvent.contentOffset.x;
      const newIndex = Math.round(offsetX / windowWidth);
      setCurrentIndex(newIndex);
      
      // 用户手动滑动后重置定时器
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        const nextIndex = (newIndex + 1) % carouselItems.length;
        setCurrentIndex(nextIndex);
        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
      }, 3000);
    };
    return(
      <View style={{width:'100%',height:'100%',backgroundColor:'white'}}>
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={carouselItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        getItemLayout={(data, index) => ({
          length: windowWidth,
          offset: windowWidth * index,
          index,
        })}
      />
      
      <View style={styles.indicatorContainer}>
        {carouselItems.map((_, index) => {
          const inputRange = [
            (index - 1) * windowWidth,
            index * windowWidth,
            (index + 1) * windowWidth,
          ];
          
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1.2, 0.8],
            extrapolate: 'clamp',
          });
          
          return (
            <Animated.View
              key={`indicator-${index}`}
              style={[
                styles.indicator,
                {
                  opacity,
                  transform: [{ scale }],
                },
              ]}
            />
          );
        })}
      </View>
    </View>
        <View style={styles.weather}>
            <View style={styles.box1}>
                <View style={{flexDirection:'row',gap:5}}>
                    <Image source={require('../../img/pic2.png')} style={styles.picture}/>
                    <View>
                        <Text style={{textAlign:'center'}}>空气温度</Text>
                        <Text style={{textAlign:'center'}}>'C</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',gap:5}}>
                    <Image source={require('../../img/pic3.png')} style={styles.picture}/>
                    <View>
                        <Text style={{textAlign:'center'}}>空气湿度</Text>
                        <Text style={{textAlign:'center'}}>%</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',gap:5}}>
                    <Image source={require('../../img/pic5.png')} style={styles.picture}/>
                    <View>
                        <Text style={{textAlign:'center'}}>二氧化碳浓度</Text>
                        <Text style={{textAlign:'center'}}>ppm</Text>
                    </View>
                </View>
            </View>
            <View style={styles.box1}>
                <View style={{flexDirection:'row',gap:5}}>
                    <Image source={require('../../img/pic1.png')} style={styles.picture}/>
                    <View>
                        <Text style={{textAlign:'center'}}>土壤温度</Text>
                        <Text style={{textAlign:'center'}}>'C</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',gap:5}}>
                    <Image source={require('../../img/pic4.png')} style={styles.picture}/>
                    <View>
                        <Text style={{textAlign:'center'}}>土壤湿度</Text>
                        <Text style={{textAlign:'center'}}>%</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',gap:5}}>
                    <Image source={require('../../img/pic6.png')} style={styles.picture}/>
                    <View>
                        <Text style={{textAlign:'center'}}>光照强度</Text>
                        <Text style={{textAlign:'center'}}>Lux</Text>
                    </View>
                </View>
            </View>
        </View>
        <View style={{flexDirection:'row',width:'96%',marginLeft:'2%',marginRight:'2%',marginTop:20}}>
            <View style={styles.notice}>
            <Image source={require('../../img/pic7.png')} style={[styles.picture,{margin:'auto'}]}/>
            <View style={{margin:'auto',right:5}}>
                <Text style={{color:'white',fontSize:18}}>通知</Text>
                <Text style={{color:'white',fontSize:18}}>中心</Text>
            </View>
            </View>
            <View style={styles.noticetext}>
                <View style={{height:'100%',width:'80%',justifyContent:'space-around',marginLeft:10}}>
                    <Text style={{fontSize:18}}>天气预警...</Text>
                    <Text style={{fontSize:18}}>无人机预警...</Text>
                </View>
                <View style={{width:'20%',height:'100%'}}><FontAwesome style={{margin:'auto',marginRight:20,color:'gray'}} size={50} name='angle-right'/></View>
            </View>
        </View>
        <View style={styles.news}>
        <View style={{height:'70%',width:'100%',flexDirection:'row',justifyContent:'space-between'}}>
          <View style={{marginLeft:10,marginTop:10,width:'70%'}}>
            <Text style={{fontSize:18,}}>新闻新闻新闻新闻新闻新闻新闻新闻新闻</Text>
          </View>
          <View style={styles.ima}></View>
        </View>
        <View style={{flexDirection:'row',height:'30%',width:'100%',justifyContent:'space-between'}}>
            <View style={{marginBottom:10,width:'40%',flexDirection:'row',justifyContent:'space-around'}}>
             <Text style={{fontSize:14,}}>2025.3.29</Text>   
             <Text style={{fontSize:14,}}>09:23</Text>   
            </View>
            <View style={{marginBottom:10,marginRight:15}}>
             <Text style={{fontSize:14}}>阅读：</Text>   
            </View>
        </View>
        </View>
      </View>
    )
}
const styles = StyleSheet.create({
  weather:{
    width:'96%',
    height:200,
    backgroundColor:'white',
    borderRadius:10,
    marginLeft:'2%',
    elevation:3,
    marginTop:5
  },box1:{
    flexDirection:'row',
    justifyContent:'space-around',
    marginTop:20,
    marginBottom:20,
  },picture:{
    width:40,
    height:40,
  },notice:{
    width:'25%',
    height:70,
    backgroundColor:'#0C8140',
    borderRadius:5,
    flexDirection:'row',
  },noticetext:{
    width:'70%',
    height:70,
    borderWidth:1,
    marginLeft:'5%',
    borderRadius:5,
    borderColor:'gray',
    flexDirection:'row',
  },news:{
    width:'96%',
    marginLeft:'2%',
    height:100,
    borderRadius:10,
    backgroundColor:'white',
    borderColor:'gray',
    borderWidth:1,
    marginTop:30
  },ima:{
    width:'20%',
    marginRight:15,
    height:"90%",
    borderRadius:10,
    backgroundColor:"gray",
    marginTop:10
  }, container: {
    marginTop: 0,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#888',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#000',
  },
})