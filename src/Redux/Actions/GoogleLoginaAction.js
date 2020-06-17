import {GoogleSignin} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';

const GoogleLogin = async () => {
  console.log('google');
  const {idToken} = await GoogleSignin.signIn();
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  return await auth().signInWithCredential(googleCredential);
};

export {GoogleLogin};
