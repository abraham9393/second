import { ImageBackground, TextInput, View, Text, Button, Modal, StyleSheet, Pressable } from "react-native";
import { Component } from "react";
import LinearGradient from 'react-native-linear-gradient';

// class ModGameOv extends Component {
//   render() {
//     return (
//       <Modal visible={this.props.isVisible} >
//         <View style={{backgroundColor: 'blue'}}>
//           <Text>Game over!</Text>
//         </View>
//       </Modal>
//     )
//   }
// }

class ModScreen extends Component {
  constructor() {
    super();
    this.state = { arrayNumbers: [], visibleGame: true }
  }

  render() {
    return (
      <Modal visible={this.props.visibleMod}>
        <LinearGradient
          colors={["orange", "yellow"]}
        >
          <ImageBackground source={require("./background.png")} style={styles.imagBack}  >
            <View style={{ flex: 1, alignItems: "center", paddingTop: 50 }}>
              <Text style={styles.oponentStyle}  >Opponents guess</Text>
              <Text style={styles.oponentStyleNum} >
                {this.props.myRandom}
              </Text>
              <View style={{ backgroundColor: "red", opacity: 1, borderRadius: 9, height: "15%", width: "50%" }} >
                <Text style={{ color: "yellow", paddingLeft: 30 }}  >Higher or lower??</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" }}>
                  <Button title="    -    " onPress={() => {
                    this.setState({ arrayNumbers: [...this.state.arrayNumbers, this.props.myRandom] });
                    this.props.upMaxRandom()
                    console.log("myRandom----->:", this.props.myRandom)
                    // this.changeGameOver()
                  }} /> 
                  { +this.props.myNumber === +this.props.myRandom 
                  ? <Modal visible={this.state.visibleGame}>
                      <View style={{backgroundColor: 'blue', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text>Game over!</Text>
                        <Button 
                        title="Go Back" 
                        onPress={() => {
                          this.setState({visibleGame: false, arrayNumbers: []})
                          this.props.initMyNumber();
                          this.props.initVisibleModal();
                          }}/>
                      </View>
                    </Modal>
                  : null
                  }
                  <Button title="    +    " onPress={() => {
                    this.setState({ arrayNumbers: [...this.state.arrayNumbers, this.props.myRandom] });
                    this.props.upMinRandom();
                    console.log("myRandom----->:", this.props.myRandom)
                    // this.changeGameOver()
                  }} />
                </View>
              </View>
              {this.state.arrayNumbers.map((num, index) => <Text style={styles.mapStyle}
                key={index}>#{index + 1}                                  Opponents Guess: {num}</Text>)}
            </View>
          </ImageBackground>

        </LinearGradient>
      </Modal>
    )
  }
}



class App extends Component {
  constructor() {
    super();
    this.state = {
      myNumber: 0,
      myRandom: 0, 
      min: 0, 
      max: 99,
      visibleModal: false
    }
  }

  initMyNumber = () => {
    this.setState({myNumber: 0})
  }

  initVisibleModal = () => {
    this.setState({visibleModal: false})
  }

  upMinRandom = () => {

    const min = this.state.myRandom + 1;
    const max = Math.floor(this.state.max);
    const numRandom = Math.floor(Math.random() * (max - min + 1) + min);
    //--

    this.setState({myRandom: numRandom, min: min});

     console.log("min:", min, "max:", max, "random:", numRandom)
  }


  upMaxRandom = () => {

    const max = this.state.myRandom - 1;
    const min = Math.ceil(this.state.min);

    const numRandom = Math.floor(Math.random() * (max - min + 1) + min);
    //--

    this.setState({myRandom: numRandom, max: max});

    console.log("min:", min, "max:", max, "random:", numRandom)
  }

  randomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    
    const numRandom = Math.floor(Math.random() * (max - min + 1) + min);
    console.log("min: ", min, "max:", max, "random:", numRandom)

    this.setState({ myRandom: numRandom });

  }



  render() {
    return (
      <View>
        <LinearGradient
          colors={["red", "yellow"]}
        >
          <ImageBackground source={require("./background.png")} style={styles.imagBack}  >
            <View style={styles.viewStyle}  >
              <Text style={styles.guessText}  >Guess My Number</Text>
              <View style={styles.redbox}  >
                <Text style={{ fontSize: 20, paddingTop: 5, color: "white" }} >Enter a Number</Text>
                <TextInput style={styles.numberInput}
                  onChangeText={(newNum) => this.setState({ myNumber: newNum })}
                  value={this.state.myNumber}
                  maxLength={2} keyboardType={"number-pad"}
                ></TextInput>

                <View style={styles.redView}>

                  <View >
                    <Pressable style={styles.container}>
                      <Text style={styles.textContainer}  >    Reset    </Text>

                    </Pressable>
                  </View>
                  <View >
                    <Pressable
                      style={styles.container}
                      android_ripple={{ color: "purple" }}
                      onPress={() => {
                        this.randomNumber(this.state.min, this.state.max);
                        this.setState({ visibleModal: !this.state.visibleModal })
                      }
                      }  >

                      <Text style={styles.textContainer}   >  Confirm  </Text>

                    </Pressable>
                  </View>
                </View>
              </View>
            </View>

          </ImageBackground >
          <ModScreen
            myNumber={this.state.myNumber} initMyNumber={this.initMyNumber} 
            visibleMod={this.state.visibleModal} initVisibleModal={this.initVisibleModal}
            myRandom={this.state.myRandom}
            min={this.state.min} max={this.state.max}
            upMaxRandom={this.upMaxRandom} upMinRandom={this.upMinRandom}

          ></ModScreen>
        </LinearGradient >
      </View >
    )
  }
}

export default App;

styles = StyleSheet.create({
  imagBack: {
    height: "100%",
    width: "100%",
    opacity: 0.78
  },
  viewStyle: {
    flex: 1, flexDirection: "column",
    padding: 10, paddingTop: 100,
    alignItems: "center"
  },

  redView: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "space-between",
    margin: 2,
    height: "30%",
    justifyContent: "space-around"
  },

  numberInput: {
    borderBottomWidth: 3,
    borderStyle: "solid",
    textAlign: "center",
    borderBottomColor: "yellow",
    width: 60, color: "yellow",
    fontSize: 25
  },
  guessText: {
    borderColor: "white",
    borderWidth: 3,
    borderStyle: "solid", marginBottom: 20,
    textAlign: "center",
    fontSize: 30, color: "white", padding: 5
  },

  redbox: {
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: "#72063c",
    padding: 5, opacity: 3,
    width: 220,
    textAlign: "center", alignContent: "center",
    alignItems: "center",
    height: "24%"
  },

  container: {
    backgroundColor: "#3b021f",
    borderRadius: 5,
    elevation: 5,
    marginHorizontal: 5

  },
  textContainer: {
    color: "white",
    textAlign: "center"
  },
  oponentStyle: {
    borderColor: "white",
    color: "white", borderWidth: 2,
    width: "90%", height: 40,
    marginBottom: 5,
    borderStyle: "solid",
    paddingLeft: 110, paddingTop: 7
  },
  oponentStyleNum: {
    borderColor: "yellow",
    padding: 4, borderWidth: 4,
    borderRadius: 7,
    color: "yellow",
    paddingLeft: 80,
    borderStyle: "solid",
    width: 200, height: 50,
    marginBottom: 5, fontSize: 20
  },
  mapStyle: {
    borderColor: "black",
    borderRadius: 50,
    borderStyle: "solid",
    borderWidth: 2,
    padding: 10,
    margin: 10,
    backgroundColor: "yellow",
    color: "black"
  }
}) 