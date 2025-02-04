import { useRef, useState } from "react";

const DropZone = ({ onFiles }) => {
  //const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const handleDragOver = (e) => {
    e.preventDefault();
    //setIsDragging(true);
  };

  const handleLeave = (e) => {
    e.preventDefault();
    //Si el mouse sale del dropzone, se desactiva el estado de dragging
    // setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    //dataTransfer es un objeto que contiene los elementos que se han arrastrado
    //dataTransfer.files es una lista de archivos de tipo FileList que se han arrastrado
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onFiles(files);
    }
    //setIsDragging(false);
  };
  //Cuando quiero hacer click manualmente para seleccionar archivos
  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      onFiles(files);
    }
  };
  return (
    <div
      className={`dropzone w-full h-full flex justify-center
         items-center border border-dashed border-white/50 rounded-2xl
            hover:cursor-pointer
         `}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleLeave}
      onClick={() => fileInputRef.current.click()}
    >
      <p className="text-white/70 text-center">
        Arrastra y suelta tus archivos o haz click para seleccionarlos
      </p>
      <input
        ref={fileInputRef}
        id="file-input"
        type="file"
        multiple
        style={{ display: "none" }}
        accept=".mp3,.wav,.ogg"
        onChange={handleFileInputChange}
      />
    </div>
  );
};

export default DropZone;
