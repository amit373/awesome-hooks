import { ref } from 'vue';

export function useFileUpload() {
  const files = ref<FileList | null>(null);
  const previewUrl = ref<string | null>(null);

  const onChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    files.value = input.files;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.type.startsWith('image/')) {
        previewUrl.value = URL.createObjectURL(file);
      } else {
        previewUrl.value = null;
      }
    }
  };

  return { files, previewUrl, onChange };
}
