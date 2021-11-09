import React from "react";
import { useHistory } from "react-router-dom";
import "../../scss/_custom.scss";
const ProdcutNew = () => {
  return (
    <>
      <div className="prodcutNew"> Product new</div>
      <div className="input-group w-75 pt-2">
        <span className="input-group-text width30">Name </span>
        <input type="text" aria-label="First name" class="form-control" />
      </div>
      <div className="input-group w-75 pt-2">
        <span className="input-group-text width30">Category </span>
        <input type="text" aria-label="First name" class="form-control" />
      </div>
      <div className="input-group w-75 pt-2">
        <span className="input-group-text width30">Price </span>
        <input type="text" aria-label="First name" class="form-control" />
      </div>
      <div className="input-group w-75 pt-2">
        <span className="input-group-text width30">Quantity </span>
        <input type="text" aria-label="First name" class="form-control" />
      </div>
      <div className="input-group w-75 pt-2">
        <span className="input-group-text width30">Image </span>
        <input type="text" aria-label="First name" class="form-control" />
      </div>
    </>
  );
};

export default ProdcutNew;
