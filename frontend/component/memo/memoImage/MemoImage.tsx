import { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import styles from '../../../styles/scss/Memo.module.scss'
const fileTypes = ["JPEG", "PNG", "GIF"];
interface Props {
  width: number,
  height: number,
  content: any,
  header: any,
  drag: any,
  memoInfo: any,
}
export default function MemoImage({memoInfo, drag}) {
  const { width, height, info } = memoInfo
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(info);
  const [isEditable, setIsEditable] = useState(false);
  const handleChange = (file) => {
    setFile(file);
  };
  const onUpdateButtonClick = () =>{
    setIsEditable(true);
    drag.disableDragging();
  }
  const onApproveUpdateClick = () => {
      setIsEditable(false);
      drag.enableDragging();
  }
  const onDeleteButtonClick = () =>{

  }
  useEffect(()=>{
    if(file!==null){
      setPreviewImage(URL.createObjectURL(file[0]));
    }

  },[file])
  return (
    <div className="App">
      <div className={styles.deleteButton} onClick={onDeleteButtonClick}>
          ❌
      </div>
      {!isEditable && (<div className={styles.updateButton} onClick={onUpdateButtonClick}>✏️</div>)}
      {previewImage!==null && <img src={previewImage} className={styles.image} />}
      {isEditable && <div className={styles.fileUploader}>
        <FileUploader
          multiple={true}
          handleChange={handleChange}
          name="file"
          types={fileTypes}
        />
      </div>}
      {isEditable && (
        <div className={styles.approveUpdateButton} onClick={onApproveUpdateClick}>
          ✔️
        </div>
      )}
    </div>
  );
}
