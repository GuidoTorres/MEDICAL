import React from "react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const ImagenPaciente = ({ setAvatar, avatar, dataSelected, editar }) => {
  const onDrop = useCallback(
    (acceptdFiles) => {
      const file = acceptdFiles[0];
      setAvatar({ file, preview: URL.createObjectURL(file) });
    },
    [setAvatar]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/png, image/jpg, image/jpeg",
    noKeyboard: true,
    onDrop,
  });
  return (
    <div className="image__upload" {...getRootProps()} style={{display:'flex', justifyContent:'center' }}>
      <input {...getInputProps()} />
      {
        <img
          style={{
            maxHeight: "100%",
            maxWidth: "100%",
          }}
          className="image__avatar"
          src={
            avatar && avatar.preview
              ? avatar.preview
              : dataSelected && dataSelected.photo
              ? dataSelected.photo
              : ""
          }
          alt=""
        />
      }
    </div>
  );
};

export default ImagenPaciente;
