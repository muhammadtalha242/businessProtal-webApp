import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import React, { useState } from 'react';
import styled from 'styled-components';
import { INPUT_PROPS_COMMON } from '../../interfaces';
import { GREY_SECONDARY, RED_PRIMARY } from '../../styles/colors';

export const enum FILES_TYPES {
  images,
  documents,
}

interface props extends INPUT_PROPS_COMMON {
  type: FILES_TYPES;
  text?: string;
  multiple?: boolean;
}
const FileUploadContainer = styled.div`
  .error-message {
    position: absolute;
    color: ${RED_PRIMARY};
    margin-top: 4px;
    font-size: 12px;
  }
`;

export const Label = styled.div`
  font-weight: 500;
  font-size: 13px;
  letter-spacing: 0.05em;
  color: ${GREY_SECONDARY};
  margin-bottom: 8px;
`;

const FileUpload: React.FC<props> = (props) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  let accept = '.xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf';
  accept = props.type === FILES_TYPES.images ? 'image/*' : '.xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf';

  const name = props.name || 'files';

  const setUploadFile = (files: UploadFile[]) => {
   
    // const formData = new FormData();
    // formData.append('file', files );
    try {
      const udatedFiles =files.map((file) => {
        return file as RcFile
        // formData.append('file', file as RcFile);
      });
    // console.log(formData.getAll('file')[0]);

      setUploading(true);

      if (props.setValue)
        props.setValue({
          name,
          value: udatedFiles,
        });
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    } finally {
      setUploading(false);
    }
  };

  const handleUpload: UploadProps['onChange'] = (info) => {
    setUploadFile(info.fileList);
  };

  const onRemove = (file: any) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList);
    // setUploadFile(newFileList);
  };

  const propsUpload: UploadProps = {
    name,
    accept,
    onRemove,
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    onChange: handleUpload,
    fileList,
  };

  return (
    <FileUploadContainer>
      {props.label && <div>{props.label && <Label>{props.label}</Label>}</div>}
      <Upload {...propsUpload}>
        <Button icon={<UploadOutlined />} loading={uploading}>
          {`Select ${props.text}` || 'Select File'}
        </Button>
      </Upload>
      {props.errorMessage && <div className="error-message">{props.errorMessage}</div>}
    </FileUploadContainer>
  );
};

export default FileUpload;
