const baseUrl = "http://localhost:4000/uploads";

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
      const options = { autoClose: false };

      const message = '&lt;img src="' + response + '" width="10%" &gt;';

      return message;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};

//  headers: { "Content-Type": "multipart/form-data" },
