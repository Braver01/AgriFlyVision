import { View, Text , StyleSheet, Image, TextInput, TouchableOpacity} from "react-native";
import { useState , useEffect } from "react";
import { useNavigation } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PermissionsAndroid } from "react-native";
import { ImageBackground } from "react-native";
import axios from "axios";
export default function Login(){
  const navigation = useNavigation();
  const successLogin = ()=>{
    navigation.navigate('tabs')
  }
  const [login,setLogin]=useState(false)
  const [sign,setSign]=useState(false)
  const [agree,setAgree]=useState(false)
  const getAgree = ()=>{
    setAgree(true)
  }
  const disAgree = ()=>{
    setAgree(false)
  }
  const losecatch=()=>{
    setLogin(false)
    setSign(false)
  }
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const storeToken = async (token) => {
    try {
      await AsyncStorage.setItem('token', token);
    } catch (error) {
      console.log('Error storing token:', error);
    }
  };
  const tologin = ()=>{
    if (email&&password) {
     axios.post('https://circle.clairvoyance.icu/user/login',{"email":email,"password":password})
    .then((response) => {
      console.log(response);
      if (response.data.success) {
        storeToken(response.data.success)
        successLogin();
      }
    })
    .catch((error) => {
      console.log(error);
      alert(error);
    }); 
    }else{
      alert('请输入邮箱和密码')
    }
  }

    const [semail,setSemail]=useState('')
    const [code,setCode]=useState('')
    const [password1,setPassword1]=useState('')
    const [password2,setPassword2]=useState('')
    const [activecode,setActivecode]=useState('')
    const sendCode = ()=>{
      if (code) {
       axios.post('https://circle.clairvoyance.icu/user/checkcode',{"email":semail,"code":code})
        .then((response) => {
          navigation.navigate('setcipher', { email: semail })
          console.log(response);
          getPassword();
        })
        .catch((error) => {
          console.log(error);
          alert('验证码错误')
        }); 
      }else{
        alert('请输入验证码')
      }
    }
    const getPassword = ()=>{
      if (password1) {
       if (password1===password2) {
        axios.post('https://circle.clairvoyance.icu/user/register',{"email":email,"password":password1})
        .then((response) => {
          setSign(false);
          setLogin(true);
        })
        .catch((error) => {
          console.log(error);
        });
      }else{
        alert('密码不一致')
      } 
      }else{
        alert('密码不能为空')
      }
      
    }
    const [countdown, setCountdown] = useState(0);
  
    useEffect(() => {
      let timer;
      if (countdown > 0) {
        timer = setInterval(() => {
          setCountdown(prevCountdown => prevCountdown - 1);
        }, 1000);
      }
      return () => clearInterval(timer);
    }, [countdown]);
    const handleGetVerificationCode = () => {
      if (semail) {
      if (countdown === 0) {
        setCountdown(60);
        axios.post('https://circle.clairvoyance.icu/user/getcode',{"email":email})
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      }  
      }else{
        alert('请输入邮箱')
      }
      
    };
    return(
      <ImageBackground source={require('./img/bac1.png')} style={{width:"100%",height:'100%'}}>
        {(login||sign)&&<Text onPress={losecatch} style={{width:'100%',height:'15%'}}></Text>}
        {(!login&&!sign)&&
        <View style={styles.contain}>
          <TouchableOpacity onPress={()=>setSign(true)} style={styles.box}>
           <Text style={styles.text}>注册</Text> 
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>setLogin(true)} style={styles.box}>
           <Text style={styles.text}>登入</Text> 
          </TouchableOpacity>
        </View>
        }
        
        {sign&&
        <View style={styles.constain1}>
          <View style={[styles.input,{marginTop:60}]}>
            <TextInput value={semail} onChangeText={setSemail} style={{marginLeft:10,}} placeholder="请输入邮箱"></TextInput>
          </View>
          <View style={[styles.input,{marginTop:25,flexDirection:'row'}]}>
            <TextInput value={code} onChangeText={setCode} style={{marginLeft:10,}} placeholder="请输入验证码"></TextInput>
            <TouchableOpacity 
                onPress={handleGetVerificationCode}
                disabled={countdown > 0}
                style={{marginLeft:'10%',margin:'auto'}}
              >
                <Text style={{color: countdown > 0 ? 'gray' : '#3083FE',fontSize:12,fontFamily:'Source Han Sans-Bold',fontWeight:700}}>
                  {countdown > 0 ? `${countdown}s后重试` : '获取验证码'}
                </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.input,{marginTop:25}]}>
            <TextInput value={password1} onChangeText={setPassword1} secureTextEntry style={{marginLeft:10,}} placeholder="请输入密码"></TextInput>
          </View>
          <View style={[styles.input,{marginTop:25}]}>
            <TextInput value={password2} onChangeText={setPassword2} secureTextEntry style={{marginLeft:10,}} placeholder="再次输入密码"></TextInput>
          </View>
          <View style={[styles.input,{marginTop:25}]}>
            <TextInput value={activecode} onChangeText={setActivecode} style={{marginLeft:10,}} placeholder="请输入无人机激活码"></TextInput>
          </View>

          <View style={{width:'90%',marginLeft:'5%',marginTop:70,justifyContent:'center',flexDirection:'row'}}>
          <TouchableOpacity onPress={agree?disAgree:getAgree} style={styles.agree}>
            {agree&&<View style={styles.circle}><Text onPress={agree?disAgree:getAgree}></Text></View>}
          </TouchableOpacity>
          <Text style={{fontSize:12,fontFamily:'Source Han Sans-Bold',fontWeight:700,marginLeft:10}}>已阅读并同意《用户协议》＆《隐私政策》</Text>
          </View>

            <TouchableOpacity onPress={sendCode} style={[styles.sign,{marginTop:20}]}>
              <Text style={{color:'white',margin:'auto',fontSize:16,textAlign:'center'}}>注册</Text>
            </TouchableOpacity>
        </View>
        }
        {login&&
        <View style={styles.constain1}>
          <View style={[styles.input,{marginTop:60}]}>
            <TextInput onChangeText={setEmail} value={email} style={{marginLeft:10,}} placeholder="请输入邮箱"></TextInput>
          </View>
          <View style={[styles.input,{marginTop:25}]}>
            <TextInput onChangeText={setPassword} value={password} style={{marginLeft:10,}} placeholder="请输入密码"></TextInput>
          </View>
          <TouchableOpacity onPress={tologin} style={[styles.sign,{marginTop:80}]}>
              <Text style={{color:'white',margin:'auto',fontSize:16}}>登入</Text>
          </TouchableOpacity>
          <Text style={{textAlign:'center',marginTop:20,color:'#999999'}}>忘记密码?</Text>
          <Text onPress={()=>navigation.navigate('tabs')} style={{textAlign:'center',marginTop:20}}>开发者入口</Text>
        </View>
        }
        
        
      </ImageBackground>
    )
}
const styles = StyleSheet.create({
    contain:{
      marginTop:'160%',
      flexDirection:'row',
      justifyContent:'space-around'
    },box:{
      width:'30%',
      height:40,
      backgroundColor:'white',
      borderRadius:50,
    },text:{
      margin:'auto'
    },constain1:{
      width:'100%',
      height:'85%',
      borderTopLeftRadius:30,
      borderTopRightRadius:30,
      backgroundColor:'white'
    },input:{
      width:'80%',
      marginLeft:'10%',
      height:40,
      borderRadius:15,
      backgroundColor:'white',
      justifyContent:'center',
      elevation:3,
    },sign:{
      width:'80%',
      marginLeft:'10%',
      height:50,
      borderRadius:25,
      backgroundColor:'#0C8140',
    },agree:{
      width:18,
      height:18,
      borderRadius:10,
      borderColor:'#999999',
      borderWidth:1.5,
    },circle:{
      width:15,
      height:15,
      borderRadius:8,
      backgroundColor:'#5A9CFE',
      margin:'auto'
    }
})