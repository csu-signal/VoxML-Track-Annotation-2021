import { StatusBar } from 'expo-status-bar';
import React,{Component,createRef} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {TextInput, Button,HelperText,Checkbox,Modal,Provider,Portal} from 'react-native-paper';
import {getfirebasedb,fbAuthenticated} from "./config";
import update from 'react-addons-update';

var similar;
var previousData = [];
var currentImageData = [];
const containerStyle = {alignItems:'center',backgroundColor: 'white', padding: 20, width:"100%",height:"100%"};
class  App extends Component {
  constructor(props) {  
    super(props);
    this.state = {
      visible:true,
      image_id:1,
      objectCount:1,
      spatialActivitiesCount:1,
      captionText:'',
      UID:'',
      FocusActivityText:'',
      objectsText:[''],
      activityText:[''],
      changeInCircumstancesText:[''],
      spatialActivityText:[''],
      onSubmit:false,
      tempObject:'',
      similarObject:false,
      checked:[],
      onButtonClick:false,
    };
    
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  componentDidMount() {
    for(var i=0;i<103;i++){
      currentImageData[i]=i+1;
    }
    fbAuthenticated();
  }
  removePreviousImageIds(){
    console.log("Previous images data")
    for(var i = 0; i<previousData.length;i++){
      for( var j = 0; j < arr.length; j++){ 
        if ( currentImageData[i] === previousData[i]) { 
            currentImageData.splice(j, 1); 
        }
      }
    }
    console.log("Current Images data"+currentImageData);
  }

renameLabel=(i)=> {
  var actText = this.state.activityText[i]?this.state.activityText[i]:"<Activity>";
  var objText = this.state.similarObject ? this.state.tempObject:(this.state.objectsText[i]?this.state.objectsText[i]:"<Object>");
  return ("To "+actText+", "+objText+" must");
}
getImageID=()=> {
  var imageData = currentImageData[this.state.image_id]?currentImageData[this.state.image_id]:1;
  return (require('./Images/'+imageData+'.jpg'));
}
renameObjectValue=(i)=> {
  if(similar){
    similar = false
    this.setState(update(this.state, {
	                objectsText: {
		                          [i]: {
			                            $set: this.state.tempObject
	                          	  }
	                            }
               }))
  }
  var value = this.state.similarObject ? this.state.tempObject :this.state.objectsText[i]
  return (value);
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

insertObject = (i) => {     
  var tempArray = this.state.objectsText;
  tempArray.splice(i,0,this.state.objectsText[i]);
  this.setState({
	  objectsText: tempArray,
  });
  this.setState(prevState => {
      return {objectCount: prevState.objectCount + 1} 
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
showModal = () => {this.setState({
  visible:true
})};
hideModal = () => {
  console.log("On dismiss modal")
};
render(){
var spatialActivities = [];
var objects = [];
	for(let i = 0; i < this.state.objectCount; i++){
		objects.push(
      <>
			<View  style={{
        flexDirection: 'row',margin:5}} key = {i}>
          <>
				{this.state.objectsText[i] == this.state.objectsText[i-1]? <View style={{width:250,margin:20}}></View>:(<TextInput
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
          value = {this.state.objectsText[i]}
        />)}
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
        <View style={{alignItems:"center",justifyContent:"center"}}>
        <Text style={{fontSize: 18,paddingLeft:25,}}>
        Shown In Scene
        </Text>
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
        </View>
        <HelperText type="error" visible={this.hasErrors(this.state.activityText[i])}>
        Empty Text
        </HelperText>
        <TextInput
        style={{width:250,margin:20}}
        mode='flat'
        label={
            this.renameLabel(i)
        }
        disabled = {!this.state.checked[i]}
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
        color={(i == 0)?"#457b9d":"#a41726"}
        style={{margin:20,width:150,height:50,alignContent:'center',justifyContent: 'center'}}
        onPress={() =>{
                  ((i == (0))?(
                    this.insertObject(i)
                   ) :(
                      this.removeObject(i)
                    ));
              }}
        >
        {(i == 0)?"Add activity":"Remove"}
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
        color={(i == 0)?"#457b9d":"#a41726"}
        style={{margin:20,alignContent:'center',justifyContent: 'center'}}
         onPress={() =>{
                  (i == 0)?(
                    this.setState(prevState => {
                      return {spatialActivitiesCount: prevState.spatialActivitiesCount + 1} }) 
                    ):(
                         this.removeSpatialActivity(i)
                    ) 
              }}
        >
        {(i == 0)? "Add More" : "Remove"}
        </Button>
			</View>
      
      </>
		)
	}

  return (
    <Provider>
      <Portal>
    <Modal visible={this.state.visible} contentContainerStyle={containerStyle}>
      <Text style={{fontSize: 60,fontWeight: 'bold',}}>VoxML Annotation Survey</Text>
          <TextInput
              style={{width:500,margin:20}}
              mode='flat'
              label= "UID"
              onChangeText={(text)=>{
                  this.setState({UID: text})
            }}
            value={this.state.UID}
          />
          <HelperText type="error" visible={this.state.onButtonClick}>
            Email address is invalid!
          </HelperText>
          <Button mode="contained"  
              color={"#457b9d"}
              style={{margin:20,width:150,height:50,alignContent:'center',justifyContent: 'center'}}
              onPress={() =>{
                // this.hasErrorsEmailId();
                if((this.state.UID.includes('@')&&this.state.UID.includes('.'))){
                  this.setState({onButtonClick:false});
                  if(this.state.UID){
                    var id = this.state.UID
                    var refUid = getfirebasedb().ref('/UID/'+ id.replace(/[.]/g,','));
                    if (refUid){
                        getfirebasedb().ref('/UID/'+ id.replace(/[.]/g,',')+'/previousImagesData').
                        once('value').then(function(snapshot) {
                              snapshot.forEach(function(data) {
                                  previousData.push(data.val());
                                  console.log("Data VAlue"+data.val());
                                  for( var j = 0; j < currentImageData.length; j++){ 
                                          if ( currentImageData[j] === data.val()) { 
                                          currentImageData.splice(j, 1);
                                    }
                                  }
                              }
                              );console.log("Current Index::::"+currentImageData);
                          },this.setState({image_id: this.getRandomInt(0,currentImageData.length)}));
                      }    
                      else{
                        getfirebasedb().ref('/UID/'+id.replace(/./g,','))
                                .set({
                                  userID: this.state.UID,
                                  previousImagesData: previousData,
                                })
                        .then(() => this.setState({image_id: this.getRandomInt(0,currentImageData.length)}));
                      }
                    }
                    this.setState({
                        visible:false
                    })
                  }
                  else{
                    this.setState(
                      {
                        onButtonClick:true,
                      }
                    )
                  }
                }
                }
              >
              Submit
              </Button>
        </Modal>
        </Portal>
    <View style={styles.container}>
      <Text style={styles.titleText}>VoxML Annotation Survey....{this.state.image_id}...{currentImageData[this.state.image_id]}</Text>
      <Image style={styles.tinyLogo} source={this.getImageID()} />
      <View style={{width:500}}>
        <Text style={{fontSize: 20,marginLeft:5,marginTop:20}}>
        Provide a brief caption of the image.
        </Text>
      </View>
      <TextInput
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
        <Button mode="contained"  
        color={"#457b9d"}
        style={{margin:20,width:150,height:50,alignContent:'center',justifyContent: 'center'}}
        onPress={() =>{
                    this.setState(prevState => {
                      return {objectCount: prevState.objectCount + 1, similarObject:false} }) 
              }}
        >
        {"Add Object"}
        </Button>
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
            var id=this.state.UID;
            previousData.push(currentImageData[this.state.image_id]);
            currentImageData.splice(this.state.image_id,1)
            getfirebasedb().ref('/UID/'+id.replace(/[.]/g,','))
                              .set({
                                userID: this.state.UID,
                                previousImagesData: previousData,
                              })
                      .then(() => this.setState({image_id: this.getRandomInt(0,currentImageData.length)}));
            console.log("Current Image Data:::"+currentImageData);
          }
        }>
        Submit
        </Button>
      </View>
      <StatusBar style="auto" />
    </View>
    </Provider>
  );
  }
  
  sendDataToFirebase = () => {
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

  onSubmit = () => {
    this.setState({
              onSubmit:true,
            })
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
