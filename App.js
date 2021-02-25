import { StatusBar } from 'expo-status-bar';
import React,{Component} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {fbInitializeApp,getfirebasedb} from "./config";

//var firebase;
class  App extends Component {

  constructor(props) {
    super(props);
    this.state = {count:1};
  }

  componentDidMount() {
    console.log("Expo component mount");
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
      <Image style={styles.tinyLogo} source={require('./Images/'+Math.floor(Math.random() * Math.floor(104))+'.jpg')} />
      <TextInput
        mode='flat'
        label="Caption"
      />
      <TextInput
        mode='flat'
        label="Focus Activity"
      />
      <View >
        { objects }
        <Button  mode="contained" >
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
