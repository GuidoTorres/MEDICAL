/* eslint-disable */
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const UploadAvatar = ({ setAvatar, avatar, dataSelected, editar }) => {
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
          className="image__avatar"
          src={
            avatar
              ? avatar.preview
              : dataSelected &&
                dataSelected.corporation &&
                dataSelected.corporation.logo
              ? dataSelected.corporation.logo
              : ""
          }
          alt=""
        />
      )}
    </div>
  );
};

export { UploadAvatar };
