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
    <div className="image__upload" {...getRootProps()}>
      <input {...getInputProps()} />
      {
        <img
          style={{
            maxHeight: "100%",
            maxWidth: "95%",
          }}
          className="image__avatar"
          src={
            avatar && avatar.preview
              ? avatar.preview
              : dataSelected &&
                dataSelected.corporation &&
                dataSelected.corporation.logo
              ? dataSelected.corporation.logo
              : ""
          }
          alt=""
        />
      }
    </div>
  );
};

export { UploadAvatar };
