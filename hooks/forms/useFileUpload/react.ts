import { useState, ChangeEvent } from 'react';

export function useFileUpload() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    setFiles(selectedFiles);

    if (selectedFiles && selectedFiles.length > 0) {
      const file = selectedFiles[0];
      // Create preview for images
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      } else {
        setPreviewUrl(null);
      }
    }
  };

  const clear = () => {
    setFiles(null);
    setPreviewUrl(null);
  };

  return { files, previewUrl, onChange, clear };
}
