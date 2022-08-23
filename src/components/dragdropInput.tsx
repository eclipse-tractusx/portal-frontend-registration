import React from 'react'
import { IInputProps } from 'react-dropzone-uploader'

function DragdropInput({
  labelClassName,
  accept,
  onFiles,
  content,
}: IInputProps) {
  return (
    <label className={labelClassName}>
      {content}
      <input
        style={{ display: 'none' }}
        type="file"
        accept={accept}
        multiple
        onChange={(e) => {
          onFiles(Array.prototype.slice.call(e.target.files))
        }}
      />
    </label>
  )
}

export default DragdropInput
