import AudioRecorderPlayer
  from 'react-native-audio-recorder-player';

const audioRecorderPlayer =
  new AudioRecorderPlayer();

export const startSOSRecording =
  async () => {

    try {

      const uri =
        await audioRecorderPlayer
          .startRecorder();

      return uri;

    } catch (error) {

      console.log(error);

      return null;

    }
};

export const stopSOSRecording =
  async () => {

    try {

      const result =
        await audioRecorderPlayer
          .stopRecorder();

      return result;

    } catch (error) {

      console.log(error);

      return null;

    }
};