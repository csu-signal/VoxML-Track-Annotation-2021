import { StatusBar } from 'expo-status-bar';
import React,{Component} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {getfirebasedb,fbAuthenticated} from "./config";

var objectsArray = [];
var depictedActivityArray = [];
var changeInCircumstancesArray = [];
var spatialActivitiesArray = [];
class  App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      image_id:0,
      objectCount:1,
      spatialActivitiesCount:1,
      captionText:'',
      FocusActivityText:'',
      objectsText:[],
      activityText:[],
    };
  }

  componentDidMount() {
    this.setState({image_id: Math.floor(Math.random() * Math.floor(105))})
    fbAuthenticated();
  }


render(){

  var objects = [];
  var spatialActivities = [];
	for(let i = 0; i < this.state.objectCount; i++){
		objects.push(
      <>
			<View  style={{
        flexDirection: 'row',margin:5,}} key = {i}>
				<TextInput
          style={{width:250,margin:20}}
          mode='flat'
          label="Object"
          onChangeText={(text)=>{
            this.setState({
                objectsText: [...this.state.objectsText, text]
            })
            objectsArray[i]=text
          }}
        />
        <TextInput
        style={{width:250,margin:20}}
        mode='flat'
        label="Associated Depicted Activity"
        onChangeText={(text)=>{
          this.setState({
                objectsText: [...this.state.objectsText, text]
            })
          depictedActivityArray[i]=text
        }}
        />
        <TextInput
        style={{width:250,margin:20}}
        mode='flat'
        label={"To "+this.state.activityText[i]+", "+this.state.objectsText[i]+" must"} 
        onChangeText={(text)=>{depictedActivityArray[i]=text}}
        />
        <Button mode="contained"  
        color="#457b9d" 
        style={{margin:20,alignContent:'center',justifyContent: 'center'}}
        onPress={() =>{
                this.setState(prevState => {
                return {objectCount: prevState.objectCount + 1} }) }}
        >
        Add More
        </Button>
			</View>
      
      </>
		)
	}
  for(let i = 0; i < this.state.spatialActivitiesCount; i++){
		spatialActivities.push(
      <>
			<View  style={{
        flexDirection: 'row',margin:5,}} key = {i}>

				<TextInput
        style={{width:500,margin:20}}
        mode='flat'
        label="Spatial Activity"
        onChangeText={(text)=>{
          spatialActivitiesArray[i] = text;
        }}
      />
        <Button mode="contained"  
        color="#457b9d" 
        style={{margin:20,alignContent:'center',justifyContent: 'center'}}
        onPress={() =>{
                this.setState(prevState => {
                return {spatialActivitiesCount: prevState.spatialActivitiesCount + 1} }) }}
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
      <Image style={styles.tinyLogo} source={require('./Images/'+this.state.image_id+'.jpg')} />
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
        { spatialActivities }
      </View>
      <View>
      <Button mode="contained"  
        color="#457b9d" 
        style={{margin:20,alignContent:'center',justifyContent: 'center'}}
        onPress={
          ()=>{
            getfirebasedb().ref('/Image/'+this.state.image_id)
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
        <Button  mode="contained"  
        color="#457b9d"
        onPress={()=>{
          objectsArray = [];
          depictedActivityArray = [];
          changeInCircumstancesArray = [];
          this.setState({image_id: Math.floor(Math.random() * Math.floor(105))})
        }}
        style={{margin:20,alignContent:'center',justifyContent: 'center'}}>
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
