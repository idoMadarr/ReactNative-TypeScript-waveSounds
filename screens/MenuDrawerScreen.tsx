// import React from 'react';
// import {View, StyleSheet, SafeAreaView} from 'react-native';
// import {useAppSelector} from '../redux/hooks';
// import LinearGradient from 'react-native-linear-gradient';
// import Colors from '../assets/design/palette.json';
// import {sendPushDetails} from '../redux/actions/authAction';
// import {onLogout} from '../utils/onLogout';
// import {PropDimensions} from '../dimensions/dimensions';
// import Lottie from 'lottie-react-native';

// // Components
// // import OnlineList from '../components/MenuPartials/OnlineList';
// import TextElement from '../components/resuable/TextElement';
// import ButtonElement from '../components/resuable/ButtonElement';

// const MenuDrawerScreen = () => {
//   const user = useAppSelector(state => state.authSlice.user);

//   return (
//     <SafeAreaView style={styles.screen}>
//       <LinearGradient
//         colors={[
//           Colors.primary,
//           Colors['gradient--modal-start'],
//           Colors['gradient-modal-end'],
//         ]}>
//         {/* <View style={styles.drawerWrapper}>
//           <View style={styles.drawerHeader}>
//             <TextElement
//               fontSize={'xl'}
//               fontWeight={'bold'}
//               cStyle={{color: Colors.active}}>
//               {`Hi ${user.username.toUpperCase()}`}
//             </TextElement>
//             <TextElement>
//               WaveSounds is a Fullstack digital music application that gives you
//               access to millions of songs and other content from creators all
//               over the world.
//             </TextElement>
//             <TextElement>
//               This{' '}
//               <TextElement fontWeight={'bold'} cStyle={{color: Colors.active}}>
//                 BETA
//               </TextElement>{' '}
//               project was built from the ground up with TypeScript on all
//               levels. NodeJS as a backend, combined with MongoDB for storing
//               user's data & React Native (febric) (CLI) for building beautiful
//               user interface - including Full Authentication Process, Social
//               login, Complex Navigation, Reanimated animations, Gestures
//               handlers, Colors interpolation, Push Notification, and much more.
//             </TextElement>
//           </View>
//           <ButtonElement
//             title={'Click For Push Details'}
//             backgroundColor={Colors.transparent}
//             titleColor={Colors.active}
//             customStyle={styles.details}
//             onPress={sendPushDetails}
//           />
//           <ButtonElement
//             title={'Logout'}
//             backgroundColor={Colors.primary}
//             titleColor={Colors.placeholder}
//             customStyle={styles.logout}
//             onPress={onLogout}
//           />
//           <View style={styles.lottieContainer}>
//             <Lottie
//               source={require('../assets/lottie/player.json')}
//               autoPlay
//               loop
//               style={styles.lottie}
//             />
//           </View>
//         </View> */}
//       </LinearGradient>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//   },
//   drawerWrapper: {
//     height: '100%',
//     width: PropDimensions.favoriteHeaderWidth,
//     alignSelf: 'center',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingTop: 16,
//   },
//   drawerHeader: {
//     width: '100%',
//     height: '45%',
//     justifyContent: 'space-evenly',
//   },
//   logout: {
//     width: 150,
//     borderRadius: 50,
//     borderWidth: 1,
//     borderColor: Colors.placeholder,
//     zIndex: 10,
//   },
//   details: {
//     borderRadius: 50,
//     borderWidth: 0,
//     elevation: 0,
//   },
//   lottieContainer: {
//     width: PropDimensions.fullWidth,
//     height: '30%',
//     overflow: 'hidden',
//   },
//   lottie: {
//     position: 'absolute',
//     top: '-50%',
//     left: '-150%',
//     width: '400%',
//     height: '400%',
//   },
// });

// export default MenuDrawerScreen;
