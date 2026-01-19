# useFileUpload

## Explanation
Simplifies file input handling. Provides easy access to the `FileList` and automatically generates preview URLs for image uploads.

## Usage

### React
```tsx
const { files, previewUrl, onChange } = useFileUpload();
// <input type="file" onChange={onChange} />
// {previewUrl && <img src={previewUrl} />}
```

### Angular
```typescript
onFileSelected(event: any) {
  this.fileService.handleFile(event.target.files[0]).subscribe(url => ...);
}
```

### Vue
```vue
<script setup>
const { previewUrl, onChange } = useFileUpload();
</script>
<!-- <input type="file" @change="onChange" /> -->
```

📂 Handle uploads like a pro with #useFileUpload

File inputs are tricky. Accessing `e.target.files` and creating object URLs for previews is repetitive.

React snippet:
```tsx
const { previewUrl, onChange } = useFileUpload();
// <img src={previewUrl} />
```

Instant previews, zero boilerplate. 🖼️

📦 Full Code: https://github.com/amit373/awesome-hooks/tree/main/hooks/forms/useFileUpload


#react #frontend #uploads #javascript
