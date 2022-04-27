import { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPEG", "PNG", "GIF"];

export default function App() {
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };
  useEffect(()=>{
    if(file!==null){
      setPreviewImage(URL.createObjectURL(file[0]));
    }

  },[file])
  return (
    <div className="App">
      <h1>Hello To Drag & Drop Files</h1>

      <p>{file ? `File name: ${file[0].name}` : "no files uploaded yet"}</p>
      {previewImage!==null && <img src={previewImage}/>}
      <FileUploader
        multiple={true}
        handleChange={handleChange}
        name="file"
        types={fileTypes}
      />
    </div>
  );
}
