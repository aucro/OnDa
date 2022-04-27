import React, { useState } from 'react';
import { FileUploader } from "react-drag-drop-files";
const fileTypes = ["JPEG", "PNG", "GIF"];
const memoImage = () => {
    const [file, setFile] = useState(null);

    return (
        <div>
            memoImage
        </div>
    );
};

export default memoImage;