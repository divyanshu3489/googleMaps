import { Platform } from 'react-native';
import { PermissionsAndroid, PermissionStatus } from 'react-native';

interface Permissions {
  [key: string]: PermissionStatus
}

export const RequestPermission = async ()=>{
    try {
        if(Platform.OS === 'android'){
            let granted: Permissions = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
            ]);

            // granted['android.permission.ACCESS_BACKGROUND_LOCATION'] = await PermissionsAndroid.request(
            //     PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION
            // );

            Object.keys(granted).forEach((key, index)=>{
                if(granted[key] === PermissionsAndroid.RESULTS.GRANTED){
                    console.log("Permission Granted")
                } else {
                    console.log("Permission Denied")
                }
            })
        }
        
    } catch (err) {
      console.warn(err);
    }
};
