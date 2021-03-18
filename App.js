import { StatusBar } from 'expo-status-bar';
import React,{Component,createRef} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {TextInput, Button,HelperText,Checkbox} from 'react-native-paper';
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
      tempObject:'',
      similarObject:false,
      checked:[]
    };
    
  }

  componentDidMount() {
    this.setState({image_id: Math.floor(Math.random() * Math.floor(105))})
    fbAuthenticated();
  }

renameLabel=(i)=> {
  var actText = this.state.activityText[i]?this.state.activityText[i]:"<Activity>";
  var objText = this.state.similarObject ? this.state.tempObject:(this.state.objectsText[i]?this.state.objectsText[i]:"<Object>");
  return ("To "+actText+", "+objText+" must");
}

hasErrors = (text) => {
    if(!text && this.state.onSubmit){
      return true;
    }
    return false;
};

removeObject = (i) => {
     var tempArray = this.state.objectsText;
     var tempArray2 = this.state.activityText;
     var tempArray3= this.state.changeInCircumstancesText;
     tempArray.splice(i,1);
     tempArray2.splice(i,1);
     tempArray3.splice(i,1);
    this.setState({
	                objectsText: tempArray,
                  actText: tempArray2,
                  changeInCircumstancesText: tempArray3,
    });
     this.setState(prevState => {
          return {objectCount: prevState.objectCount - 1} 
    });
};

removeSpatialActivity = (i) => {
     var tempArray = this.state.spatialActivityText;
     tempArray.splice(i,1);
    this.setState({
	      spatialActivityText: tempArray,
    });
     this.setState(prevState => {
        return {spatialActivitiesCount: prevState.spatialActivitiesCount - 1} 
    });
};

render(){
var spatialActivities = [];
var objects = [];
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
            (this.state.similarObject ? (
              this.setState(update(this.state, {
	                objectsText: {
		                          [i]: {
			                            $set: this.state.tempObject
	                          	  }
	                            }
               }))  
            ):(
              this.setState(update(this.state, {
	                objectsText: {
		                          [i]: {
			                            $set: text
	                          	  }
	                            }
          }))
            ));
            
          
          }}
          value = {this.state.similarObject ? this.state.tempObject:this.state.objectsText[i]}
        />
        <HelperText type= "error" visible={this.hasErrors(this.state.objectsText[i])}>
              Empty Text
        </HelperText>
        </>

        <TextInput
        style={{width:250,margin:20}}
        mode='flat'
        label="Associated Activity"
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
        <Checkbox
            status={this.state.checked[i] ? 'checked' : 'unchecked'}
            onPress={() => {
              this.setState(update(this.state, {
	                checked: {
		                          [i]: {
			                            $set: !this.state.checked[i]
	                          	  }
	                            }
               })) 
            }}
        />
        Shown In Scene
        <HelperText type="error" visible={this.hasErrors(this.state.activityText[i])}>
        Empty Text
        </HelperText>
        <TextInput
        style={{width:250,margin:20}}
        mode='flat'
        label={
            this.renameLabel(i)
        }
        disabled = {this.state.checked[i]}
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
        color={(i == (this.state.objectCount-1))?"#457b9d":"#a41726"}
        style={{margin:20,width:150,height:50,alignContent:'center',justifyContent: 'center'}}
        onPress={() =>{
                  (i == (this.state.objectCount-1))?(
                    this.setState(prevState => {
                      return {
                        similarObject:true,
                        tempObject: this.state.objectsText[i],
                        objectCount: prevState.objectCount + 1,
                      } })
                      
                   ) :(
                      this.removeObject(i)
                    )
              }}
        >
        {(i == (this.state.objectCount-1))?"Add activity":"Remove"}
        </Button>
        {(i == (this.state.objectCount-1))?
        <Button mode="contained"  
        color={(i == (this.state.objectCount-1))?"#457b9d":"#a41726"}
        style={{margin:20,width:150,height:50,alignContent:'center',justifyContent: 'center'}}
        onPress={() =>{
                  (i == (this.state.objectCount-1))?(
                    this.setState(prevState => {
                      return {objectCount: prevState.objectCount + 1, similarObject:false} }) 
                    ):(
                         this.removeObject(i)
                  )
              }}
        >
        {(i == (this.state.objectCount-1))?"Add Object":"Remove Object"}
        </Button>:<></>}
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
        label="Spatial Relation"
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
        color={(i == (this.state.spatialActivitiesCount-1))?"#457b9d":"#a41726"}
        style={{margin:20,alignContent:'center',justifyContent: 'center'}}
         onPress={() =>{
                  (i == (this.state.spatialActivitiesCount-1))?(
                    this.setState(prevState => {
                      return {spatialActivitiesCount: prevState.spatialActivitiesCount + 1} }) 
                    ):(
                         this.removeSpatialActivity(i)
                    ) 
              }}
        >
        {(i == (this.state.spatialActivitiesCount-1))? "Add More" : "Remove"}
        </Button>
			</View>
      
      </>
		)
	}

  return (
    
    <View style={styles.container}>
      <Text style={styles.titleText}>VoxML Annotation Survey</Text>
      <Image style={styles.tinyLogo} source={require('./Images/'+this.state.image_id+'.jpg')} />
      <View style={{width:500}}>
        <Text style={{fontSize: 20,marginLeft:5,marginTop:20}}>
        Provide a brief caption of the image.
        </Text>
      </View>
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
      <View style={{width:500}}>
        <Text style={{fontSize: 20,marginLeft:5,marginTop:20}}>
        What activity (if any) is the focus of the scene?
        </Text>
      </View>
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
        <Text style={{fontSize: 20, paddingLeft:25,}}>
          Identify the objects/entities in the scene (including people and animals).<br />
          For each entity, add activities associated with that object. <br />
          Check the "Shown In Scene" box if the listed activity is depicted in the image.<br />
          Otherwise, use the next field to indicate what would need to change for that activity to be possible.
        </Text>
        { objects }
        <Text style={{fontSize: 20,paddingLeft:25,}}>
          Identify the major spatial and configurational relations between entities in the scene.<br />
          See the provided guideline for sample relations.
        </Text>
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
