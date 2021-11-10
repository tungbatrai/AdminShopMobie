import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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
  const ListImage = [0, 1, 2, 3, 4, 5];
  function addPhoto(e, id) {
    setImage(e.target.files[0].name);
    setValue(`imageType${id}`, e.target.files[0].name);
    setValue(`imageUrl${id}`, URL.createObjectURL(e.target.files[0]));
    const imgUrl = URL.createObjectURL(e.target.files[0]);
    // setImageUr(imgUrl);
    // console.log
    //URL.createObjectURL(e.target.files[0])
  }

  function handleMainPhotoInput(idx) {
    console.log(idx);
    document.getElementById(`formFile${idx}`).click();
  }
  return (
    <>
      <div className="prodcutNew"> Product new</div>
      <div className="input-group w-75 pt-2 h60p">
        <span className="input-group-text width30">Name </span>
        <input type="text" className="form-control" />
      </div>
      <div className="input-group w-75 pt-2 h60p">
        <span className="input-group-text width30">Category </span>
        <select
          id="type"
          className="form-control border-black"
          //style={{ maxWidth: "200px" }}
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
      <div className="row pt-5">
        <div className="col-6">
          <div className=" ">
            <span className="input-group-text ">Image slide</span>
            {/* <input type="text"  className="form-control" /> */}
          </div>
        </div>

        <div className="row pt-3">
          {ListImage.map((item, index) => {
            return (
              <CCard className="col-5 mt-3 mx-2 " key={index}>
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

      <div className="row pt-4">
        <span className="mx-2 mt-3 input-group-text width30">
          {" "}
          specifications{" "}
        </span>
        <div className="input-group w-75 pt-4 ">
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
          <input type="text" className="form-control" />
        </div>
        <div className="input-group w-75 pt-2 h60p">
          <span className="input-group-text width30">Memory </span>
          <input type="text" className="form-control" />
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
          <input type="text" className="form-control" />
        </div>
        <div className="input-group w-75 pt-2 h60p">
          <span className="input-group-text width30">Release time </span>
          <input type="text" className="form-control" />
        </div>
      </div>
    </>
  );
};

export default ProdcutNew;
