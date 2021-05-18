/**
diary-app
https://api.cloudinary.com/v1_1/aac-devs-data
*/

const fileUpload = async (file) => {
  const cloudUrl = 'https://api.cloudinary.com/v1_1/aac-devs-data/upload';

  const formData = new FormData();
  formData.append('upload_preset', 'diary-app');
  formData.append('file', file);
  try {
    const resp = await fetch(cloudUrl, {
      method: 'POST',
      body: formData,
    });
    if (resp.ok) {
      const cloudResp = await resp.json();
      return cloudResp.secure_url;
    }
    const error = await resp.json();
    throw new Error(error);
  } catch (error) {
    throw new Error(error);
  }
};

export default fileUpload;
