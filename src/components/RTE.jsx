import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

export default function RTE({ name = "content", control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-green-800 mb-2">
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey='dbzentvyxisyv4aa1943702c49kr459storzb9n2yc1nusxc'
            initialValue={defaultValue}
            onEditorChange={onChange}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "advlist", "autolink", "lists", "link", "image", "charmap", "preview",
                "anchor", "searchreplace", "visualblocks", "code", "fullscreen",
                "insertdatetime", "media", "table", "help", "wordcount"
              ],
              toolbar:
                "undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | " +
                "bullist numlist outdent indent | link image media | code preview fullscreen | removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; background-color: #ffffff; color: #000000 }"
            }}
          />
        )}
      />
    </div>
  )
}
