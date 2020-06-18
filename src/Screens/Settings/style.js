import {Dimensions, StyleSheet} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default styles = StyleSheet.create({
  // FlatList
  ListImg: {
    width: wp('13%'),
    borderRadius: 50,
    borderColor: 'grey',
    borderWidth: 2,
    marginLeft: wp('3%'),
    flexDirection: 'row',
    height: hp('8%'),
  },

  ListTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: hp('2%'),
    marginLeft: wp('5%'),
  },
  MainListView: {
    marginTop: hp('3%'),
    paddingBottom: hp('1%'),
  },
  ListView: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#cfcfcf',
  },

  FlatListStyle: {marginBottom: hp('20%')},

  FindFriendStyle: {
    height: hp('10%'),
    flex: 2,
  },

  FindFriendText: {
    marginTop: hp('3%'),
    marginLeft: wp('7%'),
    fontSize: 16,
    fontWeight: 'bold',
  },
  FindFriendIcon: {
    marginTop: hp('3%'),
    marginLeft: wp('5%'),
  },
});
