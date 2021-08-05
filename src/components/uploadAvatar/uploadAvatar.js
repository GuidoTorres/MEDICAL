import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const UploadAvatar = ({
  setAvatar,
  avatar,
  editar,
  dataSelected,
  idServicio,
}) => {
  const [imagenServicio, setImagenServicio] = useState();
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

  const obtenerImagen = () => {
    const imagen =
      dataSelected &&
      dataSelected.map(
        (item) => item.services[Number(idServicio.subCategoria).imagen]
      );
    setImagenServicio(imagen);
  };

  console.log(imagenServicio);
  useEffect(() => {
    obtenerImagen();
  }, [idServicio]);

  return (
    <div className="image__upload" {...getRootProps()}>
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
            maxWidth: "95%",
          }}
          className="image__avatar"
          src={
            avatar
              ? avatar.preview
              : dataSelected &&
                dataSelected.corporation &&
                dataSelected.corporation.logo
              ? dataSelected.corporation.logo
              : imagenServicio
              ? imagenServicio
              : ""
          }
          alt=""
        />
      )}
    </div>
  );
};

export { UploadAvatar };
