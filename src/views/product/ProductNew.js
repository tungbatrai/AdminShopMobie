import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../../scss/_custom.scss";
import { CFormInput, CFormLabel } from "@coreui/react";
const ProdcutNew = () => {
  const [image, setImage] = useState([]);
  function addPhoto(e) {
    setImage(e.target.files[0].name);
    console.log("e", e, e.target.files[0].name);
  }
  return (
    <>
      <div className="prodcutNew"> Product new</div>
      <div className="input-group w-75 pt-2 h60p">
        <span className="input-group-text width30">Name </span>
        <input type="text" aria-label="First name" className="form-control" />
      </div>
      <div className="input-group w-75 pt-2 h60p">
        <span className="input-group-text width30">Category </span>
        <input type="text" aria-label="First name" className="form-control" />
      </div>
      <div className="input-group w-75 pt-2 h60p">
        <span className="input-group-text width30">Price </span>
        <input type="text" aria-label="First name" className="form-control" />
      </div>
      <div className="input-group w-75 pt-2 h60p">
        <span className="input-group-text width30">Quantity </span>
        <input type="text" aria-label="First name" className="form-control" />
      </div>
      <div className="input-group w-75 pt-2 h60p">
        <span className="input-group-text width30">Image </span>
        {/* <input type="text" aria-label="First name" className="form-control" /> */}
        <div className=" tableContent width70 row">
          <div className="col-2">
            {" "}
            <button className="btn btn-dark mx-2 h-75 mt-2">
              <CFormLabel htmlFor="formFile" className="pt-1 pb-1">
                Add
              </CFormLabel>
              <CFormInput
                hidden
                type="file"
                id="formFile"
                onChange={(e) => addPhoto(e)}
              />
            </button>{" "}
          </div>
         <div className="col"> <span className="h-100 d-flex align-items-center">{image}</span></div>
        </div>
      </div>
    </>
  );
};

export default ProdcutNew;
