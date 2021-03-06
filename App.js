import { StatusBar } from 'expo-status-bar';
import React,{Component,createRef} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {TextInput, Button,HelperText} from 'react-native-paper';
import {getfirebasedb,fbAuthenticated} from "./config";
import update from 'react-addons-update';

class  App extends Component {

  constructor(props) {
    
    super(props);
    this.state = {
      image_id:0,
      objectCount:1,
      spatialActivitiesCount:1,
      captionText:'',
      FocusActivityText:'',
      objectsText:[''],
      activityText:[''],
      changeInCircumstancesText:[''],
      spatialActivityText:[''],
      onSubmit:false,
    };
    
  }

  componentDidMount() {
    this.setState({image_id: Math.floor(Math.random() * Math.floor(105))})
    fbAuthenticated();
  }

renameLabel=(i)=> {
  var actText = this.state.activityText[i]?this.state.activityText[i]:"Activity";
  var objText = this.state.objectsText[i]?this.state.objectsText[i]:"Object";
  return ("To "+actText+", "+objText+" must");
}

hasErrors = (text) => {
    if(!text && this.state.onSubmit){
      return true;
    }
    return false;
};

render(){

  var objects = [];
  var spatialActivities = [];
	for(let i = 0; i < this.state.objectCount; i++){
		objects.push(
      <>
			<View  style={{
        flexDirection: 'row',margin:5,}} key = {i}>
          <>
				<TextInput
          style={{width:250,margin:20}}
          mode='flat'
          label="Object"
          onChangeText={(text)=>{
            this.setState(update(this.state, {
	                objectsText: {
		                          [i]: {
			                            $set: text
	                          	  }
	                            }
          }));
          
          }}
          value = {this.state.objectsText[i]}
        />
        <HelperText type="error" visible={this.hasErrors(this.state.objectsText[i])}>
              Empty Text
        </HelperText>
        </>
        <TextInput
        style={{width:250,margin:20}}
        mode='flat'
        label="Associated Depicted Activity"
        onChangeText={(text)=>{
          this.setState(update(this.state, {
	                activityText: {
		                          [i]: {
			                            $set: text
	                          	  }
	                            }
          }));
        }}
        value = {this.state.activityText[i]}
        />
        <HelperText type="error" visible={this.hasErrors(this.state.activityText[i])}>
        Empty Text
        </HelperText>
        <TextInput
        style={{width:250,margin:20}}
        mode='flat'
        label={
            this.renameLabel(i)
        }
        onChangeText={(text)=>{
          this.setState(update(this.state, {
	                changeInCircumstancesText: {
		                          [i]: {
			                            $set: text
	                          	  }
	                            }
          }));
        }}
        value = {this.state.changeInCircumstancesText[i]}
        />
        <HelperText type="error" visible={this.hasErrors(this.state.changeInCircumstancesText[i])}>
        Empty Text
        </HelperText>
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
          this.setState(update(this.state, {
	                spatialActivityText: {
		                          [i]: {
			                            $set: text
	                          	  }
	                            }
          }));
        }}
         value = {this.state.spatialActivityText[i]}
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
        // ref={(ref) => this.mainInput= ref}
        ref={input => { this.textRef = input }}
        style={{width:500,margin:20}}
        mode='flat'
        label= "Caption"
        onChangeText={(text)=>{
          this.setState({captionText: text})
        }}
        value={this.state.captionText}
      />
      <TextInput
        style={{width:500,margin:20}}
        mode='flat'
        label="Focus Activity"
        onChangeText={(text)=>{
          this.setState({FocusActivityText: text})
        }}
        value={this.state.FocusActivityText}
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
            this.setState({
              onSubmit:true,
            })
            getfirebasedb().ref('/Image/'+this.state.image_id)
            .set({
              Caption: this.state.captionText,
              FocusActivitiy: this.state.FocusActivityText,
              Objects: JSON.stringify(this.state.objectsText),
              DepictedActivity: JSON.stringify(this.state.activityText),
              ChangeInCircumstances: JSON.stringify(this.state.changeInCircumstancesText),
              SpatialActivities: JSON.stringify(this.state.spatialActivityText),
            })
            .then(() => console.log('Data set.'));
          }
        }>
        Submit
        </Button>
        <Button  mode="contained"  
        color="#457b9d"
        onPress={
          ()=>{
            
          this.setState({
            image_id: Math.floor(Math.random() * Math.floor(105)),
            objectCount:1,
            spatialActivitiesCount:1,
            captionText:'',
            FocusActivityText:'',
            objectsText:[''],
            activityText:[''],
            changeInCircumstancesText:[''],
            spatialActivityText:['']
          })
          }
        
      }
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
