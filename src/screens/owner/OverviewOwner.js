// Main Component Imports

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  BackHandler,
  Alert,
  Dimensions,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";

// Linear Gradient and Chart Component Imports

import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../auth/context";
import {
  VictoryChart,
  VictoryGroup,
  VictoryBar,
  VictoryStack,
  VictoryAxis,
  VictoryTheme,
  VictoryLegend,
} from "victory-native";

// Icon Component Imports

import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Divider } from "@rneui/themed";

// Backend Logic

// Login/Reg === Success ? (Database) : (Login/Reg)
// Overview/Buyer === Login Success? (Retrieve Login from DB to Display Data) : (Login/Reg)

// Device Width x Height

  const Width = Dimensions.get('window').width;
  const Height = Dimensions.get('window').height;

const OverviewBuyer = ({ navigation, route }) => {

  // User Token

  const { userToken } = route.params;

  console.log("usertoken post-login: " + userToken)

  // Auth Context

  const { signOut } = React.useContext(AuthContext);

  // Back Button + Back-Device Handler

  function handleBackButtonClick() {
    showConfirmDialog();
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);

  // State Hooks

  const [showBox, setShowBox] = useState(true);
  const [sideBar, setSideBar] = useState("none");
  const [navBar, setNavBar] = useState("flex");
  //   const [overflows, setOverflows] = useState("visible");

  // Alert Handler (Device Back button logout handler)

  const showConfirmDialog = () => {
    return Alert.alert(
      "Do wish to log out?",
      "Changes will be automatically be updated!",
      [
        {
          text: "Yes",
          onPress: () => {
            setShowBox(false);
            signOut();
          },
        },
        {
          text: "No",
        },
      ]
    );
  };

  // Profile Image Handlers (including image state)

  const [image, setImage] = useState(null);
  const [hasImage, setHasImage] = useState(false);

  const fetchData = async () => {
    try {
      console.log("Fetching data...");
      const fetchedData = await AsyncStorage.getItem('imgData');
      if(fetchedData !== null) {
        console.log("Fetched Data: " + fetchedData);
        setImage(fetchedData);
        setHasImage(true);
      }
    } catch (error) {
      console.log("Error while fetching the data: " + error);
    }
  }

  // useEffect for fetchAPI

  useEffect(() => {
    fetchData();
  }, []);

  // Stacked Bar Data

  const data = [
    { x: "sun", y: 3 },
    { x: "mon", y: 4 },
    { x: "tue", y: 2 },
    { x: "wed", y: 3 },
    { x: "thu", y: 4 },
    { x: "fri", y: 2 },
    { x: "sat", y: 3 },
  ];

  // Stats Breakdown

  const breakdown = [
    {
      id: 1,
      mm: "May",
      dd: 7,
      day: "Sunday",
      totalWeight: 31,
    },
    {
      id: 2,
      mm: "May",
      dd: 8,
      day: "Monday",
      totalWeight: 42,
    },
    {
      id: 3,
      mm: "May",
      dd: 9,
      day: "Tuesday",
      totalWeight: 11,
    },
    {
      id: 4,
      mm: "May",
      dd: 10,
      day: "Wednesday",
      totalWeight: 30,
    },
    {
      id: 5,
      mm: "May",
      dd: 11,
      day: "Thursday",
      totalWeight: 27,
    },
    {
      id: 6,
      mm: "May",
      dd: 12,
      day: "Friday",
      totalWeight: 17,
    },
    {
      id: 7,
      mm: "May",
      dd: 13,
      day: "Saturday",
      totalWeight: 28,
    },
  ];

  // Chart Legend Data

  const legend = [
    {
        itemId: 1,
        material: "plastic",
        color: "#E9D985"
    },
    {
        itemId: 2,
        material: "metal",
        color: "#FF7961"
    },
    {
        itemId: 3,
        material: "textile",
        color: "#FFC7C7"
    }
  ]

  // Inventory Level Count (temporary)

  const inventoryLevel = 250;

  // Main Overview Component

  // 

  return (
    <SafeAreaView>
        <View style={{
            display: sideBar,
            position: 'absolute',
            zIndex: 1,
            left: 0,
            width: Width * 100 / 100,
            height: '100%',
            backgroundColor: 'rgba(52, 52, 52, 0.8)',
            overflow: 'hidden',
        }}>
            <View style={styles.sidebarContainer}>
                <LinearGradient
                    colors={["#F4F5F4", "#97C5A6"]}
                    style={{
                        padding: 20,
                        borderBottomRightRadius: 40,
                    }}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 0, y: 0 }}
                >
                    <View style={styles.sidebarProfile}>
                        <TouchableOpacity onPress={() => {navigation.navigate("OwnerProfile")}}>
                          {
                              hasImage === true ? 
                              (<Image style={styles.pfp} source={{uri: image}}></Image>) : 
                              (<Image style={styles.pfp} source={require('../assets/img/pfp.jpg')}></Image>)
                          }
                        </TouchableOpacity>
                        <Text style={styles.profileName}>Aladiah Mehriel Fulminar</Text>
                    </View>
                    <View style={styles.sidebarNavlist}>
                        <TouchableOpacity style={styles.navlistButton} onPress={() => {navigation.navigate("ScrapCat")}}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Image source={require('../assets/img/categIcon.png')}></Image>
                                <Text style={styles.navlistLabel}>Categories</Text>
                            </View>
                            <Image source={require('../assets/img/sidebarArrow.png')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.navlistButton} onPress={() => {navigation.navigate("Inventory")}}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Image source={require('../assets/img/inveIcon.png')}></Image>
                                <Text style={styles.navlistLabel}>Inventory</Text>
                            </View>
                            <Image source={require('../assets/img/sidebarArrow.png')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.navlistButton} onPress={() => {navigation.navigate("ReportALS")}}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Image source={require('../assets/img/analyticsIcon.png')}></Image>
                                <Text style={styles.navlistLabel}>Analytics</Text>
                            </View>
                            <Image source={require('../assets/img/sidebarArrow.png')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.navlistButton} onPress={() => {navigation.navigate("About")}}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Image source={require('../assets/img/categIcon.png')}></Image>
                                <Text style={styles.navlistLabel}>About Litter</Text>
                            </View>
                            <Image source={require('../assets/img/sidebarArrow.png')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.navlistButton} onPress={() => {showConfirmDialog();}}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Image source={require('../assets/img/logoutIcon.png')}></Image>
                                <Text style={styles.navlistLabel}>Log Out</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        marginTop: 50,
                    }}>
                        <TouchableOpacity style={styles.closeButton} onPress={() => {
                            setSideBar("none"); 
                            setNavBar("flex");
                        }}>
                            <MaterialCommunityIcons name="window-close" size={24} color="#3E5A47" />
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </View>
        </View>
      <ScrollView>
        <LinearGradient
          colors={["#F2F2F2", "#3E5A47"]}
          style={styles.gradientContainer}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 0, y: 0.9 }}
        >
         <View style={styles.header}>
            <View style={styles.topHeader}>
                <TouchableOpacity onPress={() => {
                    setSideBar("flex"); 
                    setNavBar("none");
                }}>
                    <Image source={require('../assets/img/sidebar_logo.png')}></Image>
                </TouchableOpacity>
                <Text style={styles.userWelcome}>Hey, Aladiah</Text>
            </View>
            <View style={styles.overview}>
                <View style={styles.scrapWeight}>
                    <Text style={styles.overviewTitle}>Overview</Text>
                    <TouchableOpacity onPress={() => {navigation.navigate("ReportALS")}}>
                        <View style={styles.todayScrap}>
                            <Text style={styles.scrapStatTitle}>Today's Scraps {"(kg)"}</Text>
                            <Text style={styles.scrapCount}>14</Text>
                            <Image style={{
                                position: 'absolute',
                                top: 30,
                                left: 130
                            }} source={require('../assets/img/statsArrow1.png')}></Image>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {navigation.navigate("ReportALS")}}>
                        <View style={styles.todayScrap}>
                            <Text style={styles.scrapStatTitle}>Total Scraps {"(kg)"}</Text>
                            <Text style={styles.scrapCount}>209</Text>
                            <Image style={{
                                position: 'absolute',
                                top: 30,
                                left: 130
                            }} source={require('../assets/img/statsArrow1.png')}></Image>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.inventoryLevel}>
                    <Text style={styles.inventoryTitle}>Inventory Level</Text>
                    <Image style={styles.inventoryCan} source={require('../assets/img/trashcan.png')}></Image>
                    {
                        inventoryLevel <= 50 ? (
                            <View>
                                {console.log("first level")}
                                <Image style={{
                                    position: 'absolute',
                                    top: 127,
                                    left: 77
                                }} source={require('../assets/img/firstbar.png')}></Image>
                            </View>
                        )
                        : inventoryLevel <= 149 ? (
                            <View style={styles.barContainer}>
                                {console.log("second level")}
                                <Image style={{
                                    position: 'absolute',
                                    top: 104,
                                    left: 74
                                }} source={require('../assets/img/secondbar.png')}></Image>
                                <Image style={{
                                    position: 'absolute',
                                    top: 126,
                                    left: 77
                                }} source={require('../assets/img/firstbar.png')}></Image>
                            </View>
                        )
                        : inventoryLevel <= 199 ? (
                            <View style={styles.barContainer}>
                                {console.log("third level")}
                                <Image style={{
                                    position: 'absolute',
                                    top: 82,
                                    left: 72
                                }} source={require('../assets/img/thirdbar.png')}></Image>
                                <Image style={{
                                    position: 'absolute',
                                    top: 104,
                                    left: 74
                                }} source={require('../assets/img/secondbar.png')}></Image>
                                <Image style={{
                                    position: 'absolute',
                                    top: 126,
                                    left: 77
                                }} source={require('../assets/img/firstbar.png')}></Image>
                            </View>
                        )
                        : inventoryLevel <= 249 ? (
                            <View style={styles.barContainer}>
                                <Image style={{
                                    position: 'absolute',
                                    top: 60,
                                    left: 70
                                }} source={require('../assets/img/fourthbar.png')}></Image>
                                <Image style={{
                                    position: 'absolute',
                                    top: 82,
                                    left: 72
                                }} source={require('../assets/img/thirdbar.png')}></Image>
                                <Image style={{
                                    position: 'absolute',
                                    top: 104,
                                    left: 74
                                }} source={require('../assets/img/secondbar.png')}></Image>
                                <Image style={{
                                    position: 'absolute',
                                    top: 126,
                                    left: 77
                                }} source={require('../assets/img/firstbar.png')}></Image>
                            </View>
                        ) 
                        : inventoryLevel >= 250 ? (
                            <View style={styles.barContainer}>
                                <Image style={{
                                    position: 'absolute',
                                    top: 38,
                                    left: 68
                                }} source={require('../assets/img/fifthbar.png')}></Image>
                                <Image style={{
                                    position: 'absolute',
                                    top: 60,
                                    left: 70
                                }} source={require('../assets/img/fourthbar.png')}></Image>
                                <Image style={{
                                    position: 'absolute',
                                    top: 82,
                                    left: 72
                                }} source={require('../assets/img/thirdbar.png')}></Image>
                                <Image style={{
                                    position: 'absolute',
                                    top: 104,
                                    left: 74
                                }} source={require('../assets/img/secondbar.png')}></Image>
                                <Image style={{
                                    position: 'absolute',
                                    top: 126,
                                    left: 77
                                }} source={require('../assets/img/firstbar.png')}></Image>
                            </View>
                        ) 
                        : (console.log("empty inventory"))
                    }
                    <Image style={{
                        position: 'absolute',
                        top: 66,
                        left: 10
                    }} source={require('../assets/img/inventoryNumbers.png')}></Image>
                    <Image style={{
                        position: 'absolute',
                        top: 73,
                        left: 44
                    }} source={require('../assets/img/dashedline.png')}></Image>
                    <Text style={styles.weightTitle}>Weight of Scraps</Text>
                </View>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              width: "100%",
              paddingLeft: 25,
              paddingRight: 30,
              marginTop: 20,
            }}
          >
            <Text
              style={{
                fontFamily: "Inter-Medium",
                fontSize: 15,
                color: "#627D6B",
              }}
            >
              May 7 - May 13 Scrap Statistics
            </Text>
            <TouchableOpacity onPress={() => {navigation.navigate("ReportALS")}}>
                <Image source={require('../assets/img/statsArrow2.png')}></Image>
            </TouchableOpacity>
          </View>
          <View style={styles.graphContainer}>
            <Text style={{
                position: 'absolute',
                fontFamily: 'Inter-Medium',
                fontSize: 12,
                color: '#5E5E5E',
                transform: [{ rotate: '90deg'}],
                top: 160,
                left: Width > 380 ? 280 : 235
            }}>weight of scrap per type</Text>
            <VictoryChart
              style={styles.chart}
              theme={VictoryTheme.material}
              padding={60}
              domainPadding={20}
            >
              <VictoryStack
                style={styles.chartStack}
                colorScale={["#E9D985", "#FF7961", "#FFC7C7"]}
              >
                {data.map((dataGraph, index) => {
                  // console.log(data[index]);
                  return <VictoryBar key={index} data={data} />;
                })}
              </VictoryStack>
            </VictoryChart>
            <View style={styles.chartLegend}>
                {
                    legend.map((data) => {
                        return(
                            <View key={data.itemId}>
                                <View style={{
                                    width: 41,
                                    height: 13,
                                    backgroundColor: data.color,
                                    margin: 10
                                }}/>
                                <Text style={{textAlign: 'center'}}>{data.material}</Text>
                            </View>
                        )
                    })
                }
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
      <View style={{
        alignSelf: 'center',
        display: navBar,
        position: 'absolute',
        bottom: 0,
      }}>
            <Image source={require('../assets/img/navBG.png')}/>
            <TouchableOpacity style={{
                position: 'absolute',
                top: 30,
                left: 100,
            }} onPress={() => {navigation.navigate("Inventory")}}>
                <Image source={require('../assets/img/invIcon.png')}/>
            </TouchableOpacity>
            <TouchableOpacity style={{
                backgroundColor: '#61876E',
                borderRadius: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                top: -30,
                left: 170,
                width: 67,
                height: 58,
            }} onPress={() => {navigation.navigate("ScrapCat")}}>
                <Image source={require('../assets/img/addIcon.png')}/>
            </TouchableOpacity>
            <TouchableOpacity style={{
                position: 'absolute',
                top: 20,
                left: 275
            }}>
                <Image source={require('../assets/img/homeIcon.png')}/>
                <Image style={{
                    marginTop: 5,
                    marginLeft: 4.5
                }}
                source={require('../assets/img/highlighter.png')}/>
            </TouchableOpacity>
          </View>
    </SafeAreaView>
  );
};

// Overview Component Stylesheet

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    width: Width * 100 / 100,
    backgroundColor: "#2c3e50",
    alignItems: "center",
    zIndex: 2
  },
  pfp: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: "#3E5A47",
    marginRight: 10,
  },
  sidebarContainer: {
    width: 230,
  },
  sidebarProfile: {
    marginTop: 30
  },
  profileName: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#3E5A47',
    width: 160,
    marginTop: 10,
  },
  sidebarNavlist: {
    marginTop: 50
  },
  navlistButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 15,
    borderBottomWidth: 0.2,
    marginTop: 20,
    borderColor: '#C9CCCA',
  },
  navlistLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#3E5A47',
    marginLeft: 10,
  },
  closeButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#3E5A47',
    width: 50,
    height: 50,
  },
  header: {
    paddingTop: 60
  },
  topHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingLeft: 5,
    // paddingRight: 5
  },
  overview: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
    width: Width * 88 / 100
  },
  scrapWeight: {
    width: Width * 42 / 100
  },
  overviewTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 30,
    color: '#3E5A47'
  },
  todayScrap: {
    backgroundColor: '#61876E',
    borderRadius: 10,
    width: 150,
    height: 78,
    padding: 10,
    marginTop: 20
  },
  scrapStatTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#F4F5F4'
  },
  scrapCount: {
    fontFamily: 'Inter-Bold',
    fontSize: 30,
    color: '#F4F5F4'
  },
  inventoryLevel: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    width: 169,
    height: 213,
    marginTop: 25,
    marginLeft: 10,
  },
  inventoryTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    textAlign: 'center',
    color: '#5E5E5E',
    marginTop: 10,
  },
  userWelcome: {
    fontFamily: 'Inter-Regular',
    fontSize: 20,
    fontStyle: 'italic',
    color: '#3E5A47'
  },
  inventoryCan: {
    position: 'absolute',
    top: 45,
    left: 55
  },
  weightTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    color: '#5E5E5E',
    position: 'absolute',
    width: 80,
    top: 175,
    left: 15
  },
  statsContainer: {
    display: "flex",
    flexWrap: "wrap",
    height: 320,
    paddingTop: 20,
  },
  statDate: {
    fontFamily: "Inter-Regular",
    fontSize: 17,
    color: "#627D6B",
  },
  statWeight: {
    fontFamily: "Inter-Bold",
    fontSize: 20,
    color: "#627D6B",
  },
  graphContainer: {
    backgroundColor: 'white',
    width: Width * 90 / 100,
    marginTop: 20,
    marginBottom: 120,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chart: {
    background: {
      fill: "white",
    },
  },
  chartLegend: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '94%',
    borderColor: '#989E9A',
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 20,
    padding: 5
  },
  chartStack: {
    data: { stroke: "black", strokeWidth: 1 },
  },
});

//make this component available to the app
export default OverviewBuyer;
