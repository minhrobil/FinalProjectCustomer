export const getBase64 = (file)=> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
}
export const getMultipleBase64 = async (files) => {
    let image = []
    for (let i = 0; i < files.length; i++) {
        if(files[i]['originFileObj']){
            image = [...image,await getBase64(files[i].originFileObj)]
        }else{
            image = [...image,files[i]['url']]
        }
    }
    return image
}