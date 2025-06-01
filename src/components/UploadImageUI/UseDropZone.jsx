import { useDropzone } from 'react-dropzone';
import { useEffect, useState } from 'react';

const UseDropzone = ({ setImage, photo }) => {
  const [preview, setPreview] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        file.preview = URL.createObjectURL(file);
        setImage(file);
        setPreview(file.preview);
      }
    },
  });

  // Clean up old preview and reset when `photo` is null
  useEffect(() => {
    if (!photo && preview) {
      URL.revokeObjectURL(preview);
      setPreview(null);
    }
  }, [photo]);

  return (
    <div className="w-full mt-2 mx-auto border-2 border-dashed rounded-lg border-blue-500">
      <div
        {...getRootProps()}
        className="p-2 text-center cursor-pointer hover:bg-blue-50 transition-all"
      >
        <input {...getInputProps()} />
        <p className="text-gray-600">📂 Drag & drop an image here, or click to select</p>
      </div>

      {preview && (
        <div className="mt-2 flex justify-center">
          <img
            src={preview}
            alt="preview"
            className="w-48 h-48 object-contain rounded shadow-md"
          />
        </div>
      )}
    </div>
  );
};

export default UseDropzone;