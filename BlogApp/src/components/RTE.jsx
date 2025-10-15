import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';

function RTE({ name, control, label, defaultValue = '' }) {
  const themeMode = useSelector((state) => state.theme.mode);
  return (
    <div className="w-full">
      {label && <label className="mb-2 block text-gray-700 dark:text-slate-200">{label}</label>}
      <Controller
        name={name || 'content'}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            key={themeMode}
            apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
            initialValue={defaultValue}
            init={{
              height: 500,
              menubar: true,
              skin: themeMode === 'dark' ? 'oxide-dark' : 'oxide',
              content_css: themeMode === 'dark' ? 'dark' : 'default',
              plugins: [
                'advlist',
                'autolink',
                'lists',
                'link',
                'image',
                'charmap',
                'preview',
                'anchor',
                'searchreplace',
                'visualblocks',
                'code',
                'fullscreen',
                'insertdatetime',
                'media',
                'table',
                'help',
                'wordcount',
              ],
              toolbar:
                'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style:
                'body { font-family:Inter,Helvetica,Arial,sans-serif; font-size:14px; background-color: transparent; color: inherit; }',
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}

export default RTE;
