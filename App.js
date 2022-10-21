import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
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
  Pressable,
  Linking,
  Dimensions,
} from 'react-native';
import { getCurrentTimestamp } from 'react-native/Libraries/Utilities/createPerformanceLogger';

export default function App() {

  const otherResourcesLink = 'https://zachbornheimermusic.com/education-resources';
  const musicLink = 'https://zachbornheimermusic.com/listen';

  const isPortrait = () => {
    const dim = Dimensions.get('screen');
    if (Platform.OS === 'web') {
      return true;
    }
    return dim.height >= dim.width;
  };

  const [isHardMode, setHardMode] = useState(true);
  const [pennyGraphic, setPennyGraphic] = useState(require('./assets/pennies/0penny.png'));
  const [numberOfPennies, setPennyCount] = useState(0);
  const [totalCounter, setTotalCounter] = useState(0);
  const [getOrientation, setOrientation] = useState(isPortrait() ? 'portrait' : 'landscape');
  const [displayAboutInformation, setDisplayAboutInformation] = useState(0);
  const [getPercentComplete, setPercentComplete] = useState(0);
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

  useEffect(() => {

    Dimensions.addEventListener('change', () => {
      setOrientation(isPortrait() ? 'portrait' : 'landscape');
    });
  }, []);


  const changeMode = () => {
    setHardMode(isHardMode => !isHardMode);
  };


  var pennyImage = require('./assets/pennies/0penny.png');

  const resetButtonPressed = () => {
    setPennyGraphic(pennyGraphic => pennyImages[0]);
    setTotalCounter(totalCounter => 0);
    setPercentComplete(0);
  }
  const yesButtonPressed = () => {
    updateGraphics(1);
  }

  const noButtonPressed = () => {
    updateGraphics(-1);
  }

  const updateGraphics = (up) => {
    var skip_total_counter = 0;
    var completed = false;
    if (numberOfPennies == 0 && up != 1) {
      pennyImage = pennyImages[0];
      setPennyCount(0);
    } else if (numberOfPennies == 9 && up == 1) {
      pennyImage = pennyImages[0];
      setPennyCount(0);
      completed = true;
    } else {
      let id = up == 1 ? (numberOfPennies + 1 <= 9 ? numberOfPennies + 1 : 9) : (numberOfPennies - 1 >= 0 ? numberOfPennies - 1 : 0);
      pennyImage = pennyImages[id];
      setPennyCount(id);
    }

    if (completed == false) {
      if (up == 1) {
        if (getPercentComplete < 100) {
          setPercentComplete(getPercentComplete + 10);
        }
      }

      if (up == -1) {
        if (getPercentComplete > 0) {
          setPercentComplete(getPercentComplete - 10);
        }
      }

      if (isHardMode && up != 1) {
        pennyImage = pennyImages[0];
        setPercentComplete(0);
        setPennyCount(0);
      }
    } else {
      let msg = `Penny Game Complete!\nIt took you ${totalCounter} total tries.`;
      if (Platform.OS === 'web') {
        alert(msg);
      } else {
        Alert.alert("Congratulations!", msg);
      }
      setPercentComplete(0);
      setTotalCounter(0);
      skip_total_counter = true;
    }


    setPennyGraphic(pennyGraphic => pennyImage);
    if (!skip_total_counter) {
      setTotalCounter(totalCounter => totalCounter + 1)
    }


  }

  const pennyImages = {
    0: require('./assets/pennies/0penny.png'),
    1: require('./assets/pennies/1penny.png'),
    2: require('./assets/pennies/2penny.png'),
    3: require('./assets/pennies/3penny.png'),
    4: require('./assets/pennies/4penny.png'),
    5: require('./assets/pennies/5penny.png'),
    6: require('./assets/pennies/6penny.png'),
    7: require('./assets/pennies/7penny.png'),
    8: require('./assets/pennies/8penny.png'),
    9: require('./assets/pennies/9penny.png'),
  };


  const propStyle = (percent, base_degrees) => {
    const rotateBy = base_degrees + (percent * 3.6);
    return {
      transform: [{ rotateZ: `${rotateBy}deg` }]
    };
  }
  const renderThirdLayer = (percent) => {
    if (percent > 50) {
      /**
      * Third layer circle default is 45 degrees, so by default it occupies the right half semicircle.
      * Since first 50 percent is already taken care  by second layer circle, hence we subtract it
      * before passing to the propStyle function
      **/
      return <View style={[styles.circularSecondProgressLayer, propStyle((percent - 50), 45)]}></View>
    } else {
      return <View style={styles.circularOffsetLayer}></View>
    }
  }

  const CircularProgress = ({ percent, image }) => {
    let circularFirstProgressLayerStyle;
    if (percent > 50) {
      circularFirstProgressLayerStyle = propStyle(50, -135);
    } else {
      circularFirstProgressLayerStyle = propStyle(percent, -135);
    }

    return (
      <View style={styles.circularContainer}>
        <View style={[styles.circularFirstProgressLayer, circularFirstProgressLayerStyle]}></View>
        {renderThirdLayer(percent)}
        <Text style={styles.progressImage}>{percent == 0 ? 'The\nPenny\nGame' : ''}</Text>
        <Image defaultSource={percent != 0 ? image : ''} style={styles['penny' + percent]} />
      </View>
    );
  }

  const footer_offset = 60;
  const progress_wheel_size = 172;

  const colors = {
    primary: '#5DB075',
    gray1: '#F6F6F6',
    gray2: '#E8E8E8',
    gray3: '#BDBDBD',
    gray4: '#666666',
    background: '#FFF',
    footer: '#D9D9D9',
    shadow: '#171717',
    white: "#FFF",
    black: "#000",
  };

  const pennyOffset = {
    /* ideal for 172 wheel size */
    left: 100,
    top: 185,
  }

  const styles = StyleSheet.create({
    modeSwitcherLandscape: {

    },
    bottomPadding: {
      paddingBottom: 15,
      marginLeft: 5,
    },
    hide: {
      display: 'none',
    },
    button: {
      width: '40%',
      height: 40,
      backgroundColor: colors.white,
      borderRadius: 4,
      borderColor: 'lightblue',
      borderWidth: 2,
      margin: 3,
    },
    about: {
      padding: 10,
      flex: 1,
      backgroundColor: colors.white,
      alignItems: 'center',
      justifyContent: 'center',
      borderTopRightRadius: 16,
      borderTopLeftRadius: 16,
      bottom: "0%",
      height: 295,
      width: '100%',
      zIndex: '10000',
      position: 'absolute'
    },
    aboutTextHeader: {
      fontWeight: '500',
      marginBottom: 16,
      fontSize: 24,
      marginTop: 30,
    },
    aboutText: {
      color: colors.gray4,
      width: 375,
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 20,
    },
    aboutCloseButton: {
      width: 327,
      height: 51,
      borderRadius: 100,
      backgroundColor: colors.primary,
      alignContent: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      marginBottom: 20,
    },
    aboutCloseButtonText: {
      color: colors.white,
      textAlign: 'center',
      fontWeight: '600',
      fontSize: 16,
      cursor: 'pointer',
    },
    header: {
      fontSize: 30,
      fontWeight: "600",
      lineHeight: "36.31px",
    },
    center: {
      alignItems: 'center',
    },

    btnShadow: {
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },

    yesButton: {
      width: 131,
      height: 51,
      backgroundColor: colors.primary,
      borderRadius: 100,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      center: true,
      marginRight: 27,
    },
    yesButtonText: {
      color: colors.white,
      fontSize: 16,
      fontWeight: '600',
      userSelect: 'none',
    },
    yesButtonLandscape: {
    },
    noButton: {
      width: 131,
      height: 51,
      borderColor: colors.primary,
      borderWidth: 1,
      borderRadius: 100,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      center: true,
      marginLeft: 27,
      backgroundColor: colors.gray1,
    },
    noButtonText: {
      color: colors.primary,
      fontSize: 16,
      fontWeight: '600',
      userSelect: 'none',
    },
    modalShown: {
      backgroundColor: colors.black,
      height: '200%',
      width: '200%',
      top: 0,
      position: 'absolute',
      opacity: '0.5',
      zIndex: '5',
      overflow: 'hidden',
    },


    activeMode: {
      backgroundColor: colors.white,
      borderWidth: 0,
      borderRadius: 50,
      width: 170,
      center: true,
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      color: colors.white,
      alignItems: 'center',
      justifyContent: 'center',
    },
    enabledModes: {
      cursor: 'pointer',
    },
    disabledModes: {
      cursor: 'not-allowed',
    },
    activeModeText: {
      backgroundColor: colors.white,
      borderWidth: 0,
      borderRadius: 50,
      fontSize: 16,
      fontWeight: '600',
      width: 166,
      center: true,
      textAlign: 'center',
      userSelect: 'none',
    },
    activeModeTextEnabled: {
      color: colors.primary,
    },
    activeModeTextDisabled: {
      color: colors.gray4,
    },
    inactiveMode: {
      color: colors.gray3,
      borderRadius: 50,
      width: 170,
      center: true,
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: colors.white,
      alignItems: 'center',
      justifyContent: 'center',
    },
    inactiveModeText: {
      borderRadius: 50,
      fontSize: 16,
      fontWeight: '600',
      color: colors.gray3,
      width: 166,
      center: true,
      textAlign: 'center',
      userSelect: 'none',
    },
    successButton: {
      borderRadius: 5,
      backgroundColor: "blue",
    },
    tableRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    yesNoButton: {

      flexDirection: 'row',
      justifyContent: 'space-between',
      borderRadius: 50,
      padding: 1,
      height: 51,

    },
    tableRowSwitcher: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderRadius: 50,
      borderWidth: 1,
      padding: 1,
      backgroundColor: colors.gray2,
      width: 345,
      height: 50,
      marginTop: 16,
      borderColor: colors.gray2,
    },
    container: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: 'center',
      paddingTop: Platform.OS === 'android' ? 60 : 0,
      marginTop: Platform.OS === 'web' ? 50 : 0,
    },
    rightQuestion: {
      fontWeight: '500',
      fontSize: 24,
      marginBottom: 20,
    },
    resetButton: {
      marginTop: getOrientation == 'portrait' ? -86 - 31 - 31 : -81,
      marginLeft: getOrientation == 'landscape' ? progress_wheel_size * 2 + 30 : 0,
      fontSize: 16,
      color: colors.primary,
      fontWeight: '600',
      textAlign: 'center',
    },
    footer: {
      flexDirection: 'row',
      backgroundColor: colors.footer,
      paddingTop: 31,
      paddingLeft: 31,
      paddingRight: 31,
      paddingLeft: 31,
      width: '150%',
      textAlign: 'center',
      justifyContent: 'center',
      paddingBottom: 31, /* to get the proper color, we need to occupy the bottom 60px */
      position: 'absolute',
      bottom: 0,
    },
    footerLink: {
      fontSize: 16,
      color: colors.primary,
      fontWeight: '600',
      marginLeft: 26,
      marginRight: 26,
      cursor: 'pointer',
    },
    progressCircle: {
      borderRadius: 1000,
      borderColor: colors.primary,
    },
    circularContainer: {
      marginTop: 19,
      width: progress_wheel_size,
      height: progress_wheel_size,
      borderWidth: 3,
      borderRadius: 100,
      borderColor: colors.gray2,
      justifyContent: 'center',
      alignItems: 'center'
    },
    circularFirstProgressLayer: {
      width: progress_wheel_size,
      height: progress_wheel_size,
      borderWidth: 3,
      borderRadius: progress_wheel_size / 2,
      position: 'absolute',
      borderLeftColor: 'transparent',
      borderBottomColor: 'transparent',
      borderRightColor: colors.primary,
      borderTopColor: colors.primary,
      transform: [{ rotateZ: '-135deg' }]
    },
    circularSecondProgressLayer: {
      width: progress_wheel_size,
      height: progress_wheel_size,
      position: 'absolute',
      borderWidth: 3,
      borderRadius: progress_wheel_size / 2,
      borderLeftColor: 'transparent',
      borderBottomColor: 'transparent',
      borderRightColor: colors.primary,
      borderTopColor: colors.primary,
      transform: [{ rotateZ: '45deg' }]
    },
    circularOffsetLayer: {
      width: progress_wheel_size,
      height: progress_wheel_size,
      position: 'absolute',
      borderWidth: 3,
      borderRadius: progress_wheel_size / 2,
      borderLeftColor: 'transparent',
      borderBottomColor: 'transparent',
      borderRightColor: colors.gray2,
      borderTopColor: colors.gray2,
      transform: [{ rotateZ: '-135deg' }]
    },
    currentPennyCount: {
      color: colors.gray3,
      marginTop: 11,
    },
    currentAttemptCount: {
      color: colors.gray3,
      marginBottom: 37,

    },
    progressImage: {
      fontSize: 24,
      textAlign: 'center',
      fontWeight: '500',
    },
    penny10: {
      width: 51,
      height: 51,
      left: (158 - pennyOffset.left),
      top: (236 - pennyOffset.top),
      position: 'absolute',
    },
    penny20: {
      width: 79,
      height: 64,
      left: (158 - pennyOffset.left),
      top: (223 - pennyOffset.top),
      position: 'absolute',
    },

    penny30: {
      width: 104,
      height: 86,
      left: (133 - pennyOffset.left),
      top: (223 - pennyOffset.top),
      position: 'absolute',
    },

    penny40: {
      width: 104,
      height: 94,
      left: (133 - pennyOffset.left),
      top: (223 - pennyOffset.top),
      position: 'absolute',
    },
    penny50: {
      width: 104,
      height: 94,
      left: (133 - pennyOffset.left),
      top: (223 - pennyOffset.top),
      position: 'absolute',
    },
    penny60: {
      width: 104,
      height: 98,
      left: (133 - pennyOffset.left),
      top: (219 - pennyOffset.top),
      position: 'absolute',
    },
    penny70: {
      width: 127,
      height: 98,
      left: (133 - pennyOffset.left),
      top: (219 - pennyOffset.top),
      position: 'absolute',
    },
    penny80: {
      width: 127,
      height: 114,
      left: (133 - pennyOffset.left),
      top: (219 - pennyOffset.top),
      position: 'absolute',
    },
    penny90: {
      width: 127,
      height: 120,
      left: (133 - pennyOffset.left),
      top: (219 - pennyOffset.top),
      position: 'absolute',
    },
    yesNoRowLandscape: {
      position: 'absolute',
      top: 75,
    },
    yesButtonLandscape: {
      marginRight: progress_wheel_size + 15
    },

  });

  const PreloadPennies = () => {
    return (
      <View style={styles.hide}>
        <Image source={pennyImages[1]} />
        <Image source={pennyImages[2]} />
        <Image source={pennyImages[3]} />
        <Image source={pennyImages[4]} />
        <Image source={pennyImages[5]} />
        <Image source={pennyImages[6]} />
        <Image source={pennyImages[7]} />
        <Image source={pennyImages[8]} />
        <Image source={pennyImages[9]} />
      </View>
    )
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.header}>The Penny Game</Text>
      </View>
      <View style={[styles.tableRowSwitcher, getOrientation != 'portrait' ? styles.modeSwitcherLandscape : '']}>
        <View style={[
          styles.easyButton,
          !isHardMode ? styles.activeMode : styles.inactiveMode,
          (!isHardMode ? (totalCounter == 0 ? styles.activeModeTextEnabled : styles.activeModeTextDisabled) : ''),
          (totalCounter == 0 ? styles.enabledModes : styles.disabledModes)]}>
          <Pressable
            title="Easy Mode"
            onPress={() => { if (totalCounter == 0) setHardMode(false); }}
          ><Text style={[
            (!isHardMode ? styles.activeModeText : styles.inactiveModeText),
            (!isHardMode ? (totalCounter == 0 ? styles.activeModeTextEnabled : styles.activeModeTextDisabled) : ''),
            (totalCounter == 0 ? styles.enabledModes : styles.disabledModes)]}>Easy Mode</Text>
          </Pressable>
        </View>
        <View style={
          [styles.hardButton,
          isHardMode ? styles.activeMode : styles.inactiveMode,
          (isHardMode ? (totalCounter == 0 ? styles.activeModeTextEnabled : styles.activeModeTextDisabled) : ''),
          (totalCounter == 0 ? styles.enabledModes : styles.disabledModes)]}>
          <Pressable
            title="Hard Mode"
            onPress={() => { if (totalCounter == 0) setHardMode(true) }}
          ><Text style={[
            (isHardMode ? styles.activeModeText : styles.inactiveModeText),
            (isHardMode ? (totalCounter == 0 ? styles.activeModeTextEnabled : styles.activeModeTextDisabled) : ''),
            (totalCounter == 0 ? styles.enabledModes : styles.disabledModes)]}>Hard Mode</Text>
          </Pressable>
        </View>
      </View>
      <View style={displayAboutInformation ? styles.about : styles.hide}>
        <Text style={styles.aboutTextHeader}>About The Penny Game</Text>
        <Text style={[styles.bottomPadding, styles.aboutText]}>Use the penny game to practice any musical concept that needs repetition. When you get something right, you get a penny, when you get something wrong, you put a penny back (easy mode) or all your pennies back (hard mode).</Text>
        <Pressable
          title="Yes"
          style={[styles.aboutCloseButton, styles.btnShadow]}
          onPress={() => { setDisplayAboutInformation(false) }}>
          <Text style={styles.aboutCloseButtonText}>Play The Game</Text>
        </Pressable>
      </View>
      <View style={styles.container} >

        <CircularProgress percent={getPercentComplete} image={pennyGraphic} />
        <Text style={styles.currentPennyCount}>{numberOfPennies} {numberOfPennies == 1 ? 'Penny' : 'Pennies'}</Text>
        <Text style={styles.currentAttemptCount}>{totalCounter} {totalCounter == 1 ? 'Try' : 'Tries'}</Text>


        <Text style={styles.rightQuestion}>Did you get it right?</Text>
        <View style={[styles.tableRow, getOrientation == 'landscape' ? styles.yesNoRowLandscape : '']}>
          <View style={styles.yesNoButton}>
            <Pressable
              title="Yes"
              style={[styles.yesButton, styles.btnShadow, getOrientation == 'landscape' ? styles.yesButtonLandscape : '']}
              onPress={() => { yesButtonPressed() }}>
              <Text style={styles.yesButtonText}>Yes</Text>
            </Pressable>
          </View>
          <View>
            <Pressable
              title="No"
              style={[styles.noButton, styles.btnShadow]}
              onPress={() => { noButtonPressed() }}>
              <Text style={styles.noButtonText}>No</Text>
            </Pressable>
          </View>

        </View>
      </View>
      <View>
        <Text
          title="Restart"
          onPress={() => { resetButtonPressed() }}
          style={styles.resetButton}
        >Restart The Game</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerLink} onPress={() => setDisplayAboutInformation(!displayAboutInformation)}>Rules</Text>
        <Text style={styles.footerLink} onPress={() => Linking.openURL(otherResourcesLink)}>Other Resources</Text>
        <Text style={styles.footerLink} onPress={() => Linking.openURL(musicLink)}>Music</Text>
      </View>
      <View style={displayAboutInformation ? styles.modalShown : ''}></View>
      <StatusBar style={["auto", styles.footer]} />
      <PreloadPennies />
    </SafeAreaView>
  );
}

