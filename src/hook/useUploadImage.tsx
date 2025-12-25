const useUploadImage = () => {
  // const [uploadImage, { isLoading }] = useUploadImageMutation();

  const handleUpload = async (file: File) => {
    // try {
    //   if (file) {
    //     const formDataToUpload = new FormData();
    //     formDataToUpload.append("file", file);
    //     const uploadResult = await uploadImage(formDataToUpload).unwrap();
    //     return { path: uploadResult.Location };
    //   }
    //   return { path: "" };
    // } catch (error: any) {
    //   toast.error(error?.message);
    //   return { path: "" };
    // }
  };

  return { handleUpload, isLoading: false };
};

export default useUploadImage;
