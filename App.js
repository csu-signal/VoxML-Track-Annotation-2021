import { StatusBar } from 'expo-status-bar';
import React,{Component} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {fbInitializeApp,getfirebasedb,fbAuthenticated} from "./config";

var firebase;
var objectsArray = [];
var depictedActivityArray = [];
class  App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      count:1,
      captionText:'',
      FocusActivityText:''
    };
  }

  componentDidMount() {
    fbAuthenticated();
  }

render(){

  var objects = [];
	for(let i = 0; i < this.state.count; i++){
		objects.push(
      <>
			<View  style={{
        flexDirection: 'row',margin:5}} key = {i}>
				<TextInput
          style={{margin:20}}
          mode='flat'
          label="Object"
          onChangeText={(text)=>{objectsArray[i]=text}}
        />
        <TextInput
        style={{margin:20}}
        mode='flat'
        label="Depicted Activity"
        onChangeText={(text)=>{depictedActivityArray[i]=text}}
        />
			</View>
      <Button icon="plus" mode="contained"  color="blue" style={{width:50,height:50,alignContent:'center'}}
      onPress={() =>{
      this.setState(prevState => {
      return {count: prevState.count + 1} }) }}>
      </Button>
      </>
		)
	}


  return (
    
    <View style={styles.container}>
      <Text style={styles.titleText}>VoxML Annotation Survey</Text>
      <Image style={styles.tinyLogo} source={require('./Images/'+1+'.jpg')} />
      <TextInput
        mode='flat'
        label= "caption"
        onChangeText={(text)=>{
          this.setState({captionText: text})
        }}
      />
      <TextInput
        mode='flat'
        label="Focus Activity"
        onChangeText={(text)=>{
          this.setState({FocusActivityText: text})
        }}
      />
      <View >
        { objects }
        <Text style={styles.headerText}>Change in circumstances</Text>
 
         { objectsArray.map((item, key)=>(
           	<View  style={{
              flexDirection: 'row',margin:5}}>
         <Text key={key} style={styles.TextStyle}> To {depictedActivityArray[key]} { objectsArray[key] } must </Text>
        
         <TextInput
          mode='flat'
          label="Action"
         
        />
        </View>


         )
         )}
        
      </View>
      <View>
      <Button  mode="contained" onPress={
          ()=>{
            getfirebasedb().ref('/users/1232')
            .set({
              Caption: this.state.captionText,
              FocusActivitiy: this.state.FocusActivityText,
              Objects: JSON.stringify(objectsArray),
            })
            .then(() => console.log('Data set.'));
          }
        }>
        Submit
        </Button>
        <Button  mode="contained">
        Next
        </Button>
      </View>
      <StatusBar style="auto" />
    </View>
  );
      }
}
export default App;
const styles = StyleSheet.create({
  titleText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tinyLogo: {
    width: 400,
    height: 400,
  },
  TextStyle:{
    fontSize : 25,
     textAlign: 'center',
     alignContent:'center'
  }
});
