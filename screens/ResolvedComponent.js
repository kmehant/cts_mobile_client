import * as React from 'react';
import {Card, Button}  from 'react-native-elements';
import { Platform,Dimensions, StyleSheet, Text, View, TextInput, TouchableOpacity,ScrollView,ImageBackground, ActivityIndicator, AsyncStorage, Alert} from 'react-native';
import Cards from '../components/card'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import *as Animatable from 'react-native-animatable';
import {  FontAwesome5 } from 'react-native-vector-icons';

export default class ResolvedComponent extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      emaildid: '',
      data:[],
      res1:true,
      check:"",
      mainData:[],
      res:true,
      dialogVisible: false,
      term:""
    };
}

fun = (value) => {
  this.setState({
    term: value
  });
}
searchFun = (text) => {
  this.setState({
    loading: true
  })
  let searchTerm = this.state.term;
 if (searchTerm == "") return;
let cardinal = 20;
  let str = "https://cts-server.herokuapp.com/search/" + cardinal;

  fetch(str, {
    headers: {
      data: this.state.mainData,
      search_term: this.state.term
    }
  })
    .then((resp) => {
      return resp.json();
    })
    .then((jsonData) => {
      console.log(jsonData);
      this.setState({
        loading: false          });   
        this.setState({
          data: jsonData

      });
    })
    .catch((e) => {
      console.log(e);
      Alert.alert('Failed', 'Server might be down, please try sometime later')
      this.setState({
        loading: false          });


    })
}

handle=()=> {
  {
    this.state.res1=false
  }
  
}


comp = async () => {
  this.setState({
    loading:true
  })
  let t = await AsyncStorage.getItem('token');
  console.log(t);
  let type = await AsyncStorage.getItem('type');
  console.log(type);

  if (t == '[object Object]')
  {
    Alert.alert('Authentication Failure', 'Please login again!');
    this.setState({
      loading:false
    })
    return;
  }

  let str = '';

  if (type == 'Teacher')
  str = "https://cts-server.herokuapp.com/mytcomplaints/r/"+t;
  else
  str = "https://cts-server.herokuapp.com/myscomplaints/r/"+t;
  
  fetch(str, {

  })
      .then((resp)=>{ return resp.json();
      })
      .then((jsonData) => {
        console.log(jsonData);
        this.setState({
          loading:false,
          data: jsonData,
          mainData: jsonData
        })

          
      })
      .catch((e)=>{
          console.log(e);
      })

}


getEmail = async () => {
  let em = await AsyncStorage.getItem('email');
  this.setState({emailid: em});
}

 componentDidMount() {
      this.getEmail();


      

  


}
 fun() {   // search bar code
   
}
  render(){
    if(this.state.loading){
      return( 
        <View style={ styles.loader}> 
          <ActivityIndicator size="large" color="white"/>
        </View>
    )}

  return (
            <View style={styles.container}>
<Card
  title='NIT Andhra Pradesh CTS'>
       <View style={{ flexDirection: 'row'}}>
     <FontAwesome5 name="user-alt" size={25} color="black" />
  <Text style={{marginLeft:30,marginBottom: 10, alignSelf: 'center', fontSize: 15}}>
    {this.state.emailid}
  </Text>
  </View>
  <TouchableOpacity style={styles.tags1} onPress={this.comp}>

          <Text style={{color:'white',fontSize: 15, alignSelf:'center'}}>Fetch Your Resolved Complaints</Text>
        
          
        </TouchableOpacity>
</Card>

<View style={styles.MainContainer}>
<View style={{flexDirection:"row", flex:1, alignItems:'center', alignSelf: 'center', backgroundColor: 'white', padding: 10}}>
       
          
       <View style={{backgroundColor:"pink",borderRadius:10,width:20,height:10,marginLeft:10,marginRight:3}}>
         </View>
                 
         <Text style= {{fontSize: 15, fontWeight: "100"}}>invalid</Text>
         <View style={{backgroundColor:"#d7ffd9",borderRadius:10,width:20,height:10,marginLeft:10,marginRight:3}}>
         </View>
                 
         <Text style= {{fontSize: 15, fontWeight: "100"}}>valid</Text>
        
           </View>
           
    
<Card title="Your Complaints">
  
<View style={styles.viewStyle}>
        <View style ={styles.searchbar}>
        <Animatable.View animation="slideInRight" duration={500} style={{ height: 50, backgroundColor: 'white', flexDirection: 'row', padding: 5, alignItems: 'center' }}>
        <TextInput
          style={styles.textInputStyle}
          value={this.state.text}
          underlineColorAndroid="transparent"
          onChangeText= {text => this.fun(text)} 
          onSubmitEditing = {(event) => (this.searchFun(event.nativeEvent.text))}
          placeholder="   Search Here"
          blurOnSubmit = {true}
        />
        </Animatable.View>
        </View>
        </View>

  {
    
   
    this.state.data.map((u, i) => {
      let c= u[12].toString();
      if(c==="b'\\x01'") {
        this.state.check="Yes" 
      }
      else{
        this.state.check="No"
      }
      console.log(this.state.check)
      console.log(u[12])
      {
       
       console.log(c)
      return (
        
        <View key={i}>

          <Cards style={{marginTop: 10, marginBottom: 10}}>

            <View  style={[(this.state.check=="Yes") ? styles.bgcolor1: styles.bgcolor2]}>
            <View style={{margin:5}}>
          <View style={{flexDirection:'row-reverse'}}>
          <Text style={{fontFamily:'open-sans-bold',margin:3}}>{u[9]}</Text>
         </View>
         <View style={{flexDirection:'row',marginBottom:10}}>
          <Text style={{fontFamily:'open-sans-bold'}}>Complaint:</Text>
          <Text style={{marginLeft:5}}>{u[5]}</Text>
          </View>
         <View  style={{margin:3}}>
    
          <Text style={{fontFamily:'open-sans-bold',marginBottom:5}}>Tags :</Text>
            </View>
         <View style={{flexDirection:'row'}}>
         { u[6].match(/Academics/g) ? <TouchableWithoutFeedback onPress={this.handle}>
              <View style={{backgroundColor:"#e87d7d", margin:5,
    padding: 3, borderRadius:8}}>
          <Text style={{marginLeft:5}}>{u[6].match(/Academics/g)}</Text> 
          </View>
        </TouchableWithoutFeedback> : null }
          
 

        { u[6].match(/Hostel/g) ? <TouchableWithoutFeedback onPress={this.handle}>
              <View style={{backgroundColor:"#94f092",margin:5,
    padding: 3, borderRadius:8}}>
          <Text style={{marginLeft:5}}>{u[6].match(/Hostel/g)}</Text> 
          </View>
        </TouchableWithoutFeedback> : null }


        { u[6].match(/Mess_Food/g) ? <TouchableWithoutFeedback onPress={this.handle}>
              <View style={{backgroundColor:"#92d1f0",margin:5,
    padding: 3, borderRadius:8}}>
          <Text style={{marginLeft:5}}>{u[6].match(/Mess_Food/g)}</Text> 
          </View>
        </TouchableWithoutFeedback> : null }
        
           
        { u[6].match(/Others/g) ? <TouchableWithoutFeedback onPress={this.handle}>
              <View style={{backgroundColor:"#d6d57c",margin:5,
    padding: 3, borderRadius:8}}>
          <Text style={{marginLeft:5}}>{u[6].match(/Others/g)}</Text> 
          </View>
        </TouchableWithoutFeedback> : null }
        </View>
          
      
        <Text style={{fontFamily:'open-sans-bold'}}>Message from Resolver:</Text>
          <Text style={styles.name}>{u[14]}</Text>
          
          <View style={{flexDirection:"row"}}>
      <Text style={{fontFamily:'open-sans-bold'}}>Resolver Name:</Text>
          <Text > {u[16]}</Text>
          </View>
          <View style={{flexDirection:"row"}}>
          <Text style={{fontFamily:'open-sans-bold'}}>Resolver position:</Text>
          <Text style={styles.name}> {u[18]}</Text>
          
         </View>
         </View>
         </View>
         </Cards>

        </View>
      );
      }
    })
  }
</Card>

</View>



    </View>
  );
}
}






const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6e6e6e',
  },
  textInputStyle: {
    height: 40,
    width:'100%',
    borderWidth: 1,
    paddingLeft: 10,
    borderColor: 'red',
    borderRadius:10,
    fontFamily:'open-sans-bold',
    backgroundColor: '#FFFFFF',
  },
  bgcolor1:{
    backgroundColor:"#d7ffd9",
    elevation: 5,
    borderRadius: 20
    
  },
  bgcolor2:{
    backgroundColor:"pink",
    elevation: 5,
    borderRadius: 20
  },
  viewStyle: {
    justifyContent: 'center',
    flex: 1,


  },

  loader:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get('window').height,
    backgroundColor: "#424242"
    
   },
  input: {
    fontSize: 15,
    borderColor:'grey',
    borderWidth:1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius:10
},
  loginBtn:{
    width:"100%",
    backgroundColor:"white",
    borderRadius:5,
    marginTop:10,
    marginBottom:10
  },
  tags1:{
    margin: 5,
    padding: 10,
    backgroundColor:"#e87d7d",
    borderRadius:8
    },
    tags2:{
      margin: 5,
      padding: 10,
      backgroundColor:"#94f092",
      borderRadius:8
      },
      tags3:{
        margin: 5,
        padding: 10,
        backgroundColor:"#92d1f0",
        borderRadius:8
        },
        tags4:{
          margin: 5,
          padding: 10,
          backgroundColor:"#d6d57c",
          borderRadius:8
          },
  authContainer: {

    alignContent:'center',
    width: '100%',
    maxWidth: 400,
    padding: 20,
    backgroundColor:'#424242',
  },
  mainContainer: {
    alignContent:'center',
    width: '100%',
    height: 800,
    maxWidth: 400,
    padding: 20,
    backgroundColor:'#424242',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
