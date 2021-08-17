/* eslint-disable */
import React from "react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const ImagenServicios = ({ setAvatar, avatar, dataSelected, id }) => {
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
          style={{
            maxHeight: "100%",
            maxWidth: "100%",
            marginLeft: "100px",
            border: "1px solid red",
          }}
          className="image__avatar"
          // className={avatar ? 'image__avatar' : 'image__carga'}
          src=""
          alt=""
        />
      ) : (
        <img
          style={{
            maxHeight: "100%",
            maxWidth: "100%",
            textAlign: "center ",
          }}
          className="image__avatar"
          src={
            avatar
              ? avatar.preview
              : dataSelected &&
                dataSelected.services &&
                dataSelected.services[id] &&
                dataSelected.services[id].image
              ? dataSelected.services[id].image
              : ""
          }
          alt=""
        />
      )}
    </div>
  );
};

export default ImagenServicios;
