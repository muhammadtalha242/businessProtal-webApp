import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import React, { useEffect, useState } from 'react';
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
  value?: any
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
  accept = props.type === FILES_TYPES.images ? 'image/*' : '.xlsx,.xls, .doc, .docx,.ppt, .pptx,.txt,.pdf';
  console.log("props:",props);

  useEffect(() => {
    
    if(props.value){
      setFileList(props.value)
    }
  }, [props.value])
  

  const setUploadFile = (files: UploadFile[]) => {
    const formData = new FormData();
    try {
      fileList.forEach((file, index) => {
        formData.append(`${props.name}`, file as RcFile);
      });

      setUploading(true);

      if (props.setValue)
        props.setValue({
          name: props.name,
          value: fileList,
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
    setUploadFile(newFileList);
  };

  const propsUpload: UploadProps = {
    name: 'files',
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
      <Upload {...propsUpload} multiple>
        <Button icon={<UploadOutlined />} loading={uploading}>
          {`Select ${props.text}` || 'Select File'}
        </Button>
      </Upload>
      {props.errorMessage && <div className="error-message">{props.errorMessage}</div>}
    </FileUploadContainer>
  );
};

export default FileUpload;
