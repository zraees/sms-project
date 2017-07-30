import React from 'react'
import classNames from 'classnames'
import Msg from '../i18n/Msg'
import LanguageStore from '../i18n/LanguageStore' 
import Dropzone from 'react-dropzone';

const RFFileUpload = (field) => {
  const files = field.input.value;
  const phrase = LanguageStore.getData().phrases["image preview"] || "image preview";
  return (
    <div>
      <Dropzone
        name={field.name}
        multiple={false}
        disablePreview={false}
        className='react-dropzone'
        activeClassName='active-react-dropzone'
        onDrop={( filesToUpload, e ) => field.input.onChange(filesToUpload)}
      >
      <center className="padding2px"><Msg phrase="DropPicText"/></center>
      </Dropzone>
      {field.meta.touched &&
        field.meta.error &&
        <span className="error">{field.meta.error}</span>}
      {files && Array.isArray(files) && (
        <center>
          <img className="studentImgAdd" src={ files[0].preview } alt={phrase} />
        </center>
      )}
    </div>
  );
};

export default RFFileUpload