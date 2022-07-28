import React, { useEffect } from "react";

import entity from "../../services/entity";

interface props {}

const Entity: React.FC<props> = (props) => {
  useEffect(() => {
    const getAllEntities = async () => {
      const res = await entity.getEntities();
      console.log(res);
    };
    getAllEntities();
  }, []);
  return <>This is Entity</>;
};

export default Entity;
