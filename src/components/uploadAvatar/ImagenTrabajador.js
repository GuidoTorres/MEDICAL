/* eslint-disable */
import React from "react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const ImagenTrabajador = ({ setAvatar, avatar, dataSelected, id }) => {
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

  console.log(dataSelected);
  return (
    <div
      className="image__upload"
      {...getRootProps()}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <img
          // className={avatar ? 'image__avatar' : 'image__carga'}
          src=""
          alt=""
        />
      ) : (
        <img
          style={{
            maxHeight: "100%",
            maxWidth: "100%",
          }}
          className="image__avatar"
          src={
            avatar && avatar
              ? avatar.preview
              : dataSelected && dataSelected.photo
              ? dataSelected.photo
              : ""
          }
          alt=""
        />
      )}
    </div>
  );
};

export default ImagenTrabajador;
