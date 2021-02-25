import { StatusBar } from 'expo-status-bar';
import React,{Component} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {fbInitializeApp,getfirebasedb,fbAuthenticated} from "./config";

var firebase;
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
			<View  style={{
        flexDirection: 'row'}} key = {i}>
				<TextInput
          mode='flat'
          label="Object"
        />
        <Button icon="plus" mode="contained" 
        onPress={() =>{
        this.setState(prevState => {
        return {count: prevState.count + 1} }) }}>
        </Button>
			</View>
		)
	}
  return (
    
    <View style={styles.container}>
      <Text style={styles.titleText}>VoxML Annotation Survey</Text>
      <Image style={styles.tinyLogo} source={require('./Images/'+1+'.jpg')} />
      <TextInput
        mode='flat'
        label="Caption"
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
        <Button  mode="contained" onPress={
          ()=>{
            getfirebasedb().ref('/users/1232')
            .set({
              Caption: this.state.captionText,
              FocusActivitiy: this.state.FocusActivityText,
            })
            .then(() => console.log('Data set.'));
          }
        }>
        Submit
        </Button>
      </View>
      {console.log("Hello world")}
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
});
