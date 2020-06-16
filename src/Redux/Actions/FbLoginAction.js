import auth from '@react-native-firebase/auth';
import {
  LoginManager,
  GraphRequest,
  GraphRequestManager,
  AccessToken,
} from 'react-native-fbsdk';
import NavigationService from '../../Navigation/NavigationService';

const _firebaseFbLogin = async accessToken => {
  const fbCredential = auth.FacebookAuthProvider.credential(accessToken);

  return await auth().signInWithCredential(fbCredential);
};

const FbLogin = props => {
  return dispatch => {
    LoginManager.logInWithPermissions(['public_profile']).then(
      async result => {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          const {accessToken} = await AccessToken.getCurrentAccessToken();

          const responseInfoCallback = async (error, user) => {
            if (error) {
              console.log('Error fetching data: ' + error.toString());
            } else {
              console.log('Success fetching data: ' + user.toString());
              const firebaseFacebookLogin = await _firebaseFbLogin(accessToken);
              console.log(firebaseFacebookLogin, 'firebaseFacebookLogin');
              // NavigationService.navigate('Profile');
              props.navigation.navigate('Account');
              dispatch({
                type: 'FbLogin',
                FbUserDetail: 'firebaseFacebookLogin',
              });
              console.log('okkk');
            }
          };

          const infoRequest = new GraphRequest(
            '/me',
            {
              accessToken,
              parameters: {
                fields: {
                  string: 'id,email,name,picture.width(240).height(240)',
                },
              },
              version: 'v6.0',
            },
            responseInfoCallback,
          );

          new GraphRequestManager().addRequest(infoRequest).start();
        }
      },
      function(error) {
        console.log('Login fail with error: ' + error);
      },
    );
  };
};

export {FbLogin};
