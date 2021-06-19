import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Switch,
  Button,
  View,
  Image,
  SafeAreaView,
  Alert,
  TouchableHighlight,
  Icon,
} from 'react-native';

export default function App() {

const [isHardMode, setHardMode] = useState(true);
const [pennyGraphic, setPennyGraphic] = useState(require('./assets/pennies/0penny.png'));
const [numberOfPennies, setPennyCount] = useState(0);
const [totalCounter, setTotalCounter] = useState(0);
const [displayAboutInformation, setDisplayAboutInformation] = useState(0);
  const toggleSwitch = () => setHardMode(previousState => !previousState);
 const zero_p = require('./assets/pennies/0penny.png');
 const one_p = require('./assets/pennies/1penny.png');
 const two_p = require('./assets/pennies/2penny.png');
 const three_p = require('./assets/pennies/3penny.png');
 const four_p = require('./assets/pennies/4penny.png');
 const five_p = require('./assets/pennies/5penny.png');
 const six_p = require('./assets/pennies/6penny.png');
 const seven_p = require('./assets/pennies/7penny.png');
 const eight_p = require('./assets/pennies/8penny.png');
 const nine_p = require('./assets/pennies/9penny.png');

 const changeMode = () => {
      setHardMode(isHardMode => !isHardMode);
 };


  var pennyImage = require('./assets/pennies/0penny.png');

  const resetButtonPressed = () => {
    setPennyGraphic( pennyGraphic => zero_p);
    setTotalCounter( totalCounter => 0 );
  }
  const yesButtonPressed = () => {
    updateGraphics(1);
  }

  const noButtonPressed = () => {
    updateGraphics(-1);
  }

  const updateGraphics = (up) => {
    var skip_total_counter = 0;
    switch (pennyGraphic) {
      case zero_p: 
      pennyImage = up == 1 ? one_p : zero_p;
      break;
      case one_p: 
        pennyImage = up == 1 ? two_p : zero_p;
        break;
        case two_p: 
        pennyImage = up == 1 ? three_p : one_p;
        break;
        case three_p: 
        pennyImage = up == 1 ? four_p : two_p;
        break;
        case three_p: 
        pennyImage = up == 1 ? four_p : two_p;
        break;
        case four_p: 
        pennyImage = up == 1 ? five_p : three_p;
        break;
        case five_p: 
        pennyImage = up == 1 ? six_p : four_p;
        break;
        case six_p: 
        pennyImage = up == 1 ? seven_p : five_p;
        break;
        case seven_p: 
        pennyImage = up == 1 ? eight_p : six_p;
        break;
        case eight_p: 
        pennyImage = up == 1 ? nine_p : seven_p;
        break;
        case nine_p: 
        if (up == 1) {
          Alert.alert("Congratulations! Complete.");
          pennyImage = zero_p;
          setTotalCounter( totalCounter => 0 );
          skip_total_counter = 1;
        } else {
          pennyImage = eight_p;
        }
        break;
      default:
        pennyImage = zero_p;
        break;
    }

    if (isHardMode && up != 1) {
      pennyImage = zero_p;
    }

    setPennyGraphic( pennyGraphic => pennyImage);
    if (!skip_total_counter) {
    setTotalCounter( totalCounter => totalCounter + 1)
    }
  }

  const bannerError = (e) => {
    console.log(e);
    return;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.header}>The Penny Game { isHardMode? "Hard Mode" : "Easy Mode" } </Text>
      </View>

      <View style={styles.header}>
        <Button style={styles.header} title={ displayAboutInformation ? "Hide About" : "About the Penny Game" } onPress={ () => { setDisplayAboutInformation(!displayAboutInformation) } }
        />
      </View>
      <View style={displayAboutInformation ? styles.about : styles.hide}>
        <Text style={styles.bottomPadding}>Use the penny game to practice any musical concept that needs repetition.</Text>
        <Text style={styles.bottomPadding}>When you get something right, you get a penny.  When you get something wrong, { isHardMode? "you lose all your pennies" : "you put a penny back"}.</Text>
        <Text style={styles.bottomPadding}>The goal is to get to 10 pennies.  Then, you move on to the next thing to practice. </Text>
      </View>
      <View style={displayAboutInformation? styles.hide : styles.container} >
      <Image source={ pennyGraphic } />
      <Text>Did you get it right?</Text>
      <View style={styles.tableRow}>
      <View style={styles.button}>
      <Button
        title="Yes"
        style={styles.yesButton}
        onPress={ () => { yesButtonPressed() } }
      />
      </View>
      <View style={styles.button}>
      <Button
        title="No"
        style={styles.noButton}
        onPress={ () => { noButtonPressed() } }
      />
      </View>
      </View>
    <Text>Total Attempts: { totalCounter }</Text>

      </View>
      <View style={styles.center} >
        <Button
        title= { isHardMode? "Change to Easy Mode" : "Change to Hard Mode" }
        onPress = { changeMode }
        />
        <Text>{ isHardMode? "(Currently In: Hard Mode)" : "(Currently In: Easy Mode)" }</Text>
      </View>
      <View style={styles.button}>
    <Button
        title="Reset"
        onPress={ () => { resetButtonPressed() } }
      />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bottomPadding: {
    paddingBottom: 15,
    marginLeft: 5,
  },
  hide: {
    display: 'none',
  },
  about: {
    padding: 10,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    fontSize: 18,
  },
  center: {
    alignItems: 'center',
  },
  successButton: {
    borderRadius: 5,
    backgroundColor: "blue",
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: '40%',
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 4,
    borderColor: 'lightblue',
    borderWidth: 2,
    margin: 3,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
