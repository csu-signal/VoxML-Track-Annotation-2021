import { StatusBar } from 'expo-status-bar';
import React,{Component} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {getfirebasedb,fbAuthenticated} from "./config";

var firebase;
var objectsArray = [];
var depictedActivityArray = [];
var changeInCircumstancesArray = [];
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
        flexDirection: 'row',margin:5,}} key = {i}>
				<TextInput
          style={{width:250,margin:20}}
          mode='flat'
          label="Object"
          onChangeText={(text)=>{objectsArray[i]=text}}
        />
        <TextInput
        style={{width:250,margin:20}}
        mode='flat'
        label="Associated Depicted Activity"
        onChangeText={(text)=>{depictedActivityArray[i]=text}}
        />
        <Button mode="contained"  
        color="#457b9d" 
        style={{margin:20,alignContent:'center',justifyContent: 'center'}}
        onPress={() =>{
                this.setState(prevState => {
                return {count: prevState.count + 1} }) }}
        >
        Add More
        </Button>
			</View>
      
      </>
		)
	}


  return (
    
    <View style={styles.container}>
      <Text style={styles.titleText}>VoxML Annotation Survey</Text>
      <Image style={styles.tinyLogo} source={require('./Images/'+1+'.jpg')} />
      <TextInput
        style={{width:500,margin:20}}
        mode='flat'
        label= "Caption"
        onChangeText={(text)=>{
          this.setState({captionText: text})
        }}
      />
      <TextInput
        style={{width:500,margin:20}}
        mode='flat'
        label="Focus Activity"
        onChangeText={(text)=>{
          this.setState({FocusActivityText: text})
        }}
      />
      <View >
        { objects }
        {/* <Text style={styles.headerText}>Change in circumstances</Text> */}
 
         { objectsArray.map((item, key)=>(
           	<View  style={{
              flexDirection: 'row',margin:5}}>
         <Text key={key} style={styles.TextStyle}> To {depictedActivityArray[key]}, { objectsArray[key] } must </Text>
        
         <TextInput
          mode='flat'
          label="Action"
          onChangeText={(text)=>{changeInCircumstancesArray[key]=text}}
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
              depictedActivity: JSON.stringify(depictedActivityArray),
              changeInCircumstances: JSON.stringify(changeInCircumstancesArray),
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
