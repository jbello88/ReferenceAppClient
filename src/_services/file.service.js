const baseUrl = `${process.env.REACT_APP_API_URL}/files/upload`;

export const fileService = {
  uploadFile: async (formData) => {
    console.log("file upload service");

    try {
      let response = await fetch(baseUrl, {
        method: "POST",

        body: formData,
      });

      response = await response.json();
      console.log(response);
      const message = '&lt;img src="' + response + '" width="10%" &gt;';
      return message;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};
