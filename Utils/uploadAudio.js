export const uploadAudio =
  async uri => {

    try {

      const data =
        new FormData();

      data.append('file', {
        uri,
        type: 'audio/mp4',
        name: `audio_${Date.now()}.mp4`,
      });

      data.append(
        'upload_preset',
        'audio_upload',
      );

      const response =
        await fetch(
          'https://api.cloudinary.com/v1_1/dlctpxe7p/video/upload',
          {
            method: 'POST',
            body: data,
          },
        );

      const result =
        await response.json();

      return result.secure_url;

    } catch (error) {

      console.log(error);

      return null;

    }
};