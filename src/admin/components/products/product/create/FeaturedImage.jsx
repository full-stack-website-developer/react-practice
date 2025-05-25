import React, { useEffect, useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';

import 'filepond/dist/filepond.min.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';

registerPlugin(FilePondPluginFileValidateType, FilePondPluginFileValidateSize);

const FeaturedImageEdit = ({ formik }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const image = formik.values.featuredImage;
    console.log('[useEffect] featuredImage in Formik:', image);

    if (image instanceof File) {
      const objectUrl = URL.createObjectURL(image);
      setFiles([
        {
          source: objectUrl,
          options: {
            type: 'local',
            file: image,
          },
        },
      ]);
      return () => URL.revokeObjectURL(objectUrl); // cleanup
    } else if (typeof image === 'string' && image.startsWith('data:image')) {
      setFiles([
        {
          source: image,
          options: {
            type: 'local',
          },
        },
      ]);
    } else {
      setFiles([]);
    }
  }, [formik.values.featuredImage]);

  return (
    <FilePond
      files={files}
      allowMultiple={false}
      acceptedFileTypes={['image/*']}
      maxFileSize="5MB"
      onupdatefiles={(fileItems) => {
        console.log('[onupdatefiles] Raw File Items:', fileItems);
        setFiles(fileItems);

        if (fileItems.length > 0) {
          const file = fileItems[0].file;

          if (file instanceof File) {
            console.log('[onupdatefiles] Setting Formik featuredImage as File:', file);
            formik.setFieldValue('featuredImage', file);
          } else {
            console.warn('[onupdatefiles] Unexpected file type:', file);
          }
        } else {
          console.log('[onupdatefiles] Clearing featuredImage');
          formik.setFieldValue('featuredImage', '');
        }
      }}
      name="featuredImage"
      labelIdle='Drag & Drop your featured image or <span class="filepond--label-action">Browse</span>'
      labelFileTypeNotAllowed="⚠️ Only image files are allowed."
      labelMaxFileSizeExceeded="⚠️ File is too large. Max size is 5MB."
    />
  );
};

export default FeaturedImageEdit;
