import { alertService } from "@/_services";
const baseUrl = "http://localhost:4000/upload";

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
      alertService.success(
        '&lt;img src="' + response + '" width="10%" &gt;',
        options
      );
      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};

//  headers: { "Content-Type": "multipart/form-data" },
