import {Dimensions, StyleSheet} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default styles = StyleSheet.create({
  lineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginTop: hp('4%'),
  },
  hairline: {
    backgroundColor: '#e3e6e4',
    height: 1,
    width: wp('40%'),
  },
});
