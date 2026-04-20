import AllSetScreen from "../Screens/AllSetScreen"
import EmergencyContactDetails from "../Screens/EmergencyContactDetails"
import Login from "../Screens/Login"
import QuestionPage from "../Screens/QuestionsPage"
import SignUp from "../Screens/SignUp"
import Splash from "../Screens/Splash"
import Danger from "../Screens/Danger"
import BarSetting from "../Screens/BarSetting"
import Account from "../Screens/Account"
import Playlist from "../Screens/Playlist"
import PrivacyPolicy from "../Screens/PrivacyPolicy"
import Help from "../Screens/Help"
import ForgotPassword from "../Screens/ForgotPassword"
import VerifyOtp from "../Screens/VerifyOtp"
import AudioRecorder from "../Screens/AudioRecorder"
import EditProfile from "../Screens/EditProfile"
import Audio from "../Screens/Audio"
//import MapScreen from "../Screens/MapScreen"
export const route = [
  {
    name: 'Splash',
    component: Splash,
    option: {
      headerShown: false,
    },
  },
  {
    name: 'Login',
    component: Login,
    option: {
      headerShown: false,
    },
  },
  {
    name: 'SignUp',
    component: SignUp,
    option: {
      headerShown: false,
    },
  },
  {
    name: 'EmergencyContactDetails',
    component: EmergencyContactDetails,
    option: {
      headerShown: false,
    },
  },
  {
    name: 'QuestionPage',
    component: QuestionPage,
    option: {
      headerShown: false,
    },
  },
  {
    name: 'AllSetScreen',
    component: AllSetScreen,
    option: {
      headerShown: false,
    },
  },
  {
    name: 'Danger',
    component: Danger,
    option: {
      headerShown: false,
    },
  },
  {
    name: 'BarSetting',
    component: BarSetting,
    option: {
      headerShown: false,
    },
  },
  {
    name: 'Account',
    component: Account,
    option: {
      headerShown: false,
    },
  },
  {
    name: 'Playlist',
    component: Playlist,
    option: {
      headerShown: false,
    },
  },
  {
    name: 'PrivacyPolicy',
    component: PrivacyPolicy,
    option: {
      headerShown: false,
    },
  },
  {
    name: 'Help',
    component: Help,
    option: {
      headerShown: false,
    },
  },
   {
    name: 'ForgotPassword',
    component: ForgotPassword,
    option: {
      headerShown: false,
    },
  },
   {
    name: 'VerifyOtp',
    component: VerifyOtp,
    option: {
      headerShown: false,
    },
  },
    {
    name: 'AudioRecorder',
    component: AudioRecorder,
    option: {
      headerShown: false,
    },
  },
    {
    name: 'Audio',
    component:Audio,
    option: {
      headerShown: false,
    },
  },{
   name: 'EditProfile',
    component:EditProfile,
    option: {
      headerShown: false,
    },
  },
  
]