import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
// import "../../scss/_custom.scss";
import { useForm } from "react-hook-form";
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardImage,
  CCardText,
  CCardTitle,
  CFormInput,
  CFormLabel,
  CFormTextarea,
} from "@coreui/react";
const ProdcutNew = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    // setvalue,
    // getvalues,
    setError,
    setValue,
    getValues,
  } = useForm();
  const history = useHistory();
  const [image, setImage] = useState();
  const [imageUr, setImageUr] = useState();
  const ListImage = [0, 1, 2, 3];
  const ListImageSecond = [0, 1, 2];
  function addPhoto(e, id) {
    setImage(e.target.files[0].name);
    setValue(`imageType${id}`, e.target.files[0].name);
    setValue(`imageUrl${id}`, URL.createObjectURL(e.target.files[0]));
    const imgUrl = URL.createObjectURL(e.target.files[0]);
  }

  function handleMainPhotoInput(idx) {
    console.log(idx);
    document.getElementById(`formFile${idx}`).click();
  }
  function addPhotoSecond(e, id) {
    setImage(e.target.files[0].name);
    setValue(`imageTypeSecond${id}`, e.target.files[0].name);
    setValue(`imageUrlSecond${id}`, URL.createObjectURL(e.target.files[0]));
  }

  function handleMainPhotoInputSecond(idx) {
    console.log(idx);
    document.getElementById(`formFileSecond${idx}`).click();
  }
  function HandleCancel() {
    history.push("./product");
  }
  return (
    <>
      <span className="input-group-text w-50 mb-2">
        <b>1 &nbsp; Condition and Type </b>{" "}
      </span>
      <div className="row ">
        <div className="input-group w-75 pt-2 h60p">
          <span className="input-group-text width30">Name </span>
          <input type="text" className="form-control" />
        </div>
        <div className="input-group w-75 pt-2 h60p">
          <span className="input-group-text width30">Category </span>
          <select
            id="type"
            className="form-control border-black"
         
            // onChange={handleChange}
          >
            <option value="">Select category</option>
            <option value="TITLE">title</option>
            <option value="TOURNAMENTDATE">title 2</option>
            <option value="ID"> title 3</option>
          </select>
          {/* <input type="text"  className="form-control" /> */}
        </div>
        <div className="input-group w-75 pt-2 h60p">
          <span className="input-group-text width30">Price </span>
          <input type="number" className="form-control" />
        </div>
        <div className="input-group w-75 pt-2 h60p">
          <span className="input-group-text width30">Quantity </span>
          <input type="number" className="form-control" />
        </div>
        <div className="input-group w-75 pt-2 ">
          <span className="input-group-text width30">Content </span>
          {/* <input type="number" className="form-control" /> */}
          <CFormTextarea
            placeholder=" You can comment here"
            style={{ height: "100px", minHeight: "70px" }}
          ></CFormTextarea>
        </div>
      </div>
      <span className="input-group-text w-50 mt-4 mb-2">
        <b>2 &nbsp; Image slide 1 </b>{" "}
      </span>
      <div className="row ">
        <div className="row pt-1">
          {ListImage.map((item, index) => {
            return (
              <CCard className="col-5 mt-2 mx-2 " key={index}>
                <h6 className="mt-3">O image {index}</h6>
                {!getValues(`imageUrl${index}`) && (
                  <>
                    {" "}
                    <CAlert className="text-center " color="warning ">
                      No image
                    </CAlert>
                  </>
                )}
                {getValues(`imageUrl${index}`) && (
                  <CCardImage
                    orientation="top"
                    src={getValues(`imageUrl${index}`)}
                    className="imageProduct"
                  />
                )}

                <CCardBody>
                  <CCardTitle>Image {index}</CCardTitle>

                  <div className="row">
                    <div className="col-4">
                      <CFormInput
                        hidden
                        type="file"
                        id={`formFile${index}`}
                        onChange={(e) => addPhoto(e, index)}
                      />
                      <CButton
                        className="btn btn-dark mx-0 w-100"
                        onClick={() => handleMainPhotoInput(index)}
                      >
                        Add
                      </CButton>
                    </div>
                    <div className="col-8">
                      {getValues(`imageType${index}`)}
                      {/* <span className="h-100 d-flex align-items-center"></span> */}
                    </div>
                  </div>
                </CCardBody>
              </CCard>
            );
          })}
        </div>
      </div>
      <span className="input-group-text w-50 mt-4 mb-2">
        <b>3 &nbsp; Image slide 2 </b>{" "}
      </span>
      <div className="row ">
        <div className="row ">
          {ListImageSecond.map((item, index) => {
            return (
              <CCard className="col-5 mt-2 mx-2 " key={index}>
                <h6 className="mt-3">O image {index}</h6>
                {!getValues(`imageUrlSecond${index}`) && (
                  <>
                    {" "}
                    <CAlert className="text-center " color="warning ">
                      No image
                    </CAlert>
                  </>
                )}
                {getValues(`imageUrlSecond${index}`) && (
                  <CCardImage
                    orientation="top"
                    src={getValues(`imageUrlSecond${index}`)}
                    className="imageProduct"
                  />
                )}

                <CCardBody>
                  <CCardTitle>Image {index}</CCardTitle>

                  <div className="row">
                    <div className="col-4">
                      <CFormInput
                        hidden
                        type="file"
                        id={`formFileSecond${index}`}
                        onChange={(e) => addPhotoSecond(e, index)}
                      />
                      <CButton
                        className="btn btn-dark mx-0 w-100"
                        onClick={() => handleMainPhotoInputSecond(index)}
                      >
                        Add
                      </CButton>
                    </div>
                    <div className="col-8">
                      {getValues(`imageSecondType${index}`)}
                      {/* <span className="h-100 d-flex align-items-center"></span> */}
                    </div>
                  </div>
                </CCardBody>
              </CCard>
            );
          })}
        </div>
      </div>
      <span className="input-group-text w-50 mt-4 mb-2">
        <b>3 &nbsp; Image slide 2 </b>{" "}
      </span>
      <div className="row pt-2">
        <div className="input-group w-75 pt-2 ">
          <span className="input-group-text width30">Screen </span>
          <CFormTextarea
            placeholder=""
            style={{ height: "100px", minHeight: "70px" }}
          ></CFormTextarea>
        </div>
        <div className="input-group w-75 pt-2 h60p">
          <span className="input-group-text width30">Rear camera </span>
          <input type="text" className="form-control" />
        </div>
        <div className="input-group w-75 pt-2 h60p">
          <span className="input-group-text width30">Selfie Camera </span>
          <input type="text" className="form-control" />
        </div>
        <div className="input-group w-75 pt-2 h60p">
          <span className="input-group-text width30">RAM </span>
          <input type="number" className="form-control" />
        </div>
        <div className="input-group w-75 pt-2 h60p">
          <span className="input-group-text width30">Memory </span>
          <input type="number" className="form-control" />
        </div>
        <div className="input-group w-75 pt-2 h60p">
          <span className="input-group-text width30">CPU </span>
          <input type="text" className="form-control" />
        </div>
        <div className="input-group w-75 pt-2 h60p">
          <span className="input-group-text width30">GPU </span>
          <input type="text" className="form-control" />
        </div>
        <div className="input-group w-75 pt-2 h60p">
          <span className="input-group-text width30">Battery capacity </span>
          <input type="text" className="form-control" />
        </div>{" "}
        <div className="input-group w-75 pt-2 h60p">
          <span className="input-group-text width30">Sim </span>
          <input type="text" className="form-control" />
        </div>
        <div className="input-group w-75 pt-2 h60p">
          <span className="input-group-text width30">Operating system </span>
          <input type="text" className="form-control" />
        </div>
        <div className="input-group w-75 pt-2 h60p">
          <span className="input-group-text width30">Origin </span>
          <select
            id="type"
            className="form-control border-black"
         
            // onChange={handleChange}
          >
            <option value="">Select made in</option>
            <option value="TITLE">Tàu</option>
            <option value="TOURNAMENTDATE">Việt Nam</option>
            <option value="ID"> Nga ngố</option>
          </select>
        </div>
        <div className="input-group w-75 pt-2 h60p">
          <span className="input-group-text width30">Release time </span>
          <input type="date" className="form-control" />
        </div>
      </div>
      <div className="row my-3">
        <div className="col-5">

        </div>
        <div className="col-2">
          <NavLink to="/product">
            <button
              className="btn btn-dark mx-2 col-1 w-100"
              //  onClick={(e) => HandleCancel()}
            >
              Cancel
            </button>
          </NavLink>
        </div>
        <div className="col-2">
          <button
            className="btn btn-dark mx-2 col-1 w-100"
            //  onClick={(e) => HandleCancel()}
            type="submit"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default ProdcutNew;
