import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Alert, TouchableOpacity, TextInput, Image} from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE, Region, LatLng } from 'react-native-maps';
import Geolocation, { GeolocationResponse } from '@react-native-community/geolocation';
import { useDispatch, useSelector } from 'react-redux';
import { getRoute, getDistance } from '../networking/API/googleAPI';
import { AppDispatch, RootState } from '../networking/redux/store';
import { RequestType } from '../types';
import { screenHeight, screenWidth } from '../appStyles/globalStyle';
import { TransparentBox } from '../components/TransparentBox';

export const Map =(): React.JSX.Element => {

  const dispatch = useDispatch<AppDispatch>();
  const { polylineCordinates } = useSelector((state: RootState)=> state.route)

  //Getting current location
  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      (pos) => {
        setPosition(pos);
      },
      (error) => Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
      { enableHighAccuracy: true}
    );
  };

  //Getting current location
  const watchPosition = () => {
    const watchId = Geolocation.watchPosition(
      (pos) => {
        setPosition(pos);
      },
      (error) => Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
      { enableHighAccuracy: true }
    );
    Alert.alert('watch position working ' + watchId);
    return ()=> Geolocation.clearWatch(watchId);
  };

  const [position, setPosition] = useState<GeolocationResponse | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(null);

  useEffect(()=>{
    const intervalID = setInterval(()=>{
      getCurrentPosition()
    }, 1000);
    return ()=> clearInterval(intervalID);
    // watchPosition()
  },[])

  const currentLocation: Region = {
    latitude: position?.coords.latitude || 0 ,
    longitude: position?.coords.longitude || 0,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  }

  const handleMapPress = (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude: latitude, longitude: longitude });
  };

  const handleDirection =()=>{
    let destinationCordinates = selectedLocation && `${selectedLocation.latitude},${selectedLocation.longitude}`;
    if(destinationCordinates){
      //Request Json
      const request: RequestType = {
        origin : `${currentLocation.latitude},${currentLocation.longitude}`,
        destination : destinationCordinates,
        travelMode:'bicycle'
      }

      dispatch(getRoute(request))
      dispatch(getDistance(request))
    }
  }

  return (
      <View style={styles.container}>
          <MapView
              provider={PROVIDER_GOOGLE} 
              style={styles.map}
              region={currentLocation}
              onPress={handleMapPress}
          >
              {/* Current Location */}
              <Marker 
                coordinate={currentLocation}
                title='Current Location'
              />
              {/* Selected Destination */}
              {selectedLocation && (
                <Marker
                  coordinate={selectedLocation}
                  title="Destination"
                />
              )}
              {polylineCordinates.length > 0 ? 
                <Polyline 
                  coordinates={polylineCordinates}
                  strokeColor={"#007AFF"}
                  strokeWidth={10}
                /> : null }
          </MapView>
          {/* <View style={[styles.inputContainer, isFocused && styles.inputFocused]}>
            <Image source={location} style={styles.image}/>
                <TextInput 
                  style={[styles.inputArea, isFocused && styles.textFocused]}
                  placeholder='Search here'
                  placeholderTextColor={placeholderColor}
                  onChangeText={(value)=>setTextInput(value)}
                  onFocus={() => {
                    setIsFocused(true)
                    setPlaceholderColor("#fafafa")
                  }}
                  onBlur={() => {
                    setIsFocused(false)
                    setPlaceholderColor("#000000")
                  }}
                />
        </View> */}

          {selectedLocation && (
            <>
              <TouchableOpacity
                style={styles.button}
                onPress={handleDirection}
              >
                <Text style={styles.buttonText}>Get Direction</Text>
              </TouchableOpacity>
              <TransparentBox/>
            </>
          )}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // position:'static',
    ...StyleSheet.absoluteFillObject,
    // justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: screenHeight,
    width: screenWidth,
    zIndex:100
  },
  inputContainer:{ 
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'#fafafa',//'#FAFAFAE5',
    marginHorizontal:20,
    borderRadius:20,
    marginTop:15,
    paddingHorizontal:5
  },
  inputArea:{
    height:50,
    flex:1,
    // marginLeft:5,
    fontSize:20,
    color:'#000000'
  },
  inputFocused: {
    backgroundColor:'#787878FF', //'#7B7979C3',//'#C5C5C580',
  },
  textFocused:{
    color:"white"
  },
  button:{
    width:150,
    height:50,
    // padding:10,
    marginVertical:5,
    alignSelf:'center', 
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#7fffd4',
    borderRadius:15
  },
  buttonText:{
    fontSize: 20,
    color:'#333333',
    fontWeight:'500'
  },
  image:{
    width:40,
    height:40
  }
});
