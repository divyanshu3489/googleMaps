import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../networking/redux/store';

export const TransparentBox = () => {

  const { duration, distance } = useSelector((state: RootState)=> state.route)
  
    return (
        duration && distance ?
            <View style={styles.box}>
                <View style={styles.textView}>
                    <Text style={styles.label}>Distance: </Text>
                    <Text style={styles.label}>{distance.text} ({distance.value} metres)</Text>
                </View>
                <View style={styles.textView}>
                    <Text style={styles.label}>Estimated Time(ETA): </Text>
                    <Text style={styles.label}>{duration.text}</Text>
                </View>
            </View>
        : null
    ); 
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 20,
    borderWidth:1,
    borderRadius: 10,
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  textView:{
    flexDirection:'row'
  },
  label: {
    fontSize: 16,
    color: '#000', // Text color
    marginVertical: 5,
  },
});
