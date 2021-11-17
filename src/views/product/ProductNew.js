import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
// import "../../scss/_custom.scss";
import { useFieldArray, useForm } from "react-hook-form";
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
const defaultValues = {
  dataEdit: [],
};
const ProdcutNew = () => {
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setError,
    setValue,
    getValues,
  } = useForm();
  const history = useHistory();
  const [image, setImage] = useState();
  const [imageUr, setImageUr] = useState();
  const ListImage = [0, 1, 2, 3];

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
        <b>2 &nbsp;Style color </b>{" "}
      </span>
      <div className="row ">
        <TypeColorPhone
          {...{ control, register, getValues, setValue, reset }}
        />
      </div>
      <span className="input-group-text w-50 mt-4 mb-2">
        <b>3 &nbsp; slide Phone </b>{" "}
      </span>
      <div className="row ">
        <SlideQCMobie {...{ control, register, getValues, setValue, reset }} />
      </div>
      <span className="input-group-text w-50 mt-4 mb-2">
        <b>3 &nbsp;specifications</b>{" "}
      </span>
      <Specification />
      <div className="row my-3">
        <div className="col-5"></div>
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

function TypeColorPhone({ control, getValues, setValue, register, reset }) {
  const [image, setImage] = useState();
  const [image2, setImage2] = useState();
  const { fields, remove, append, prepend, move } = useFieldArray({
    control,
    name: `dataEdit`,
  });
  useEffect(() => {
    reset({
      dataEdit: [
        {
          img: "",
          color: "màu đen",
        },
      ],
    });
  }, []);
  useEffect(() => {
    if (image) {
      console.log("true", image);
      setImage();
    }
  }, [image, image2]);
  function handleMainPhotoInput(idx) {
    console.log(idx);
    document.getElementById(`formFile${idx}`).click();
  }
  function addPhoto(e, id) {
    setImage(e.target.files[0].name);
    setValue(`imageType${id}`, e.target.files[0].name);
    setValue(`imageUrl${id}`, URL.createObjectURL(e.target.files[0]));
  }

  function handleAddColor() {
    for (var i = 0; i < 3; i++) {
      setTimeout(() => console.log(i), 1);
      // setTimeout(() => console.log(i));
      //  console.log(i);
    }
    append({ img: "" });
  }
  return (
    <>
      <div className="row pt-1">
        {fields &&
          fields.length > 0 &&
          fields.map((item, index) => {
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
                    {...register(`imageUrl${index}`, {})}
                  />
                )}

                <CCardBody>
                  {/* <CCardTitle>Image {index} </CCardTitle> */}

                  <div className="row">
                    <div className="col-8">
                      <CFormInput
                        hidden
                        type="file"
                        id={`formFile${index}`}
                        onChange={(e) => addPhoto(e, index)}
                      />
                      <CButton
                        className="btn btn-dark mx-0 w-50"
                        onClick={() => handleMainPhotoInput(index)}
                      >
                        Import image
                      </CButton>
                    </div>
                    {/* <div className="col-8">
                      {getValues(`imageType${index}`)}
                    </div> */}
                  </div>
                  <div className="row pt-2 mx-0">
                    <div className="my-2">
                      {" "}
                      <b>Type color</b>
                    </div>
                    <input
                      className="form-control w-75"
                      defaultValue={item.color}
                      // {...register(`dataEdit.${index}.latitude`, {
                      //   value: getValues(`dataEdit.${index}.latitude`),
                      // })}
                    />
                  </div>
                </CCardBody>
              </CCard>
            );
          })}
      </div>
      <div className="minWidth200">
        <CButton
          className="mt-2 btn btn-dark "
          onClick={() => handleAddColor()}
        >
          Add
        </CButton>
      </div>
    </>
  );
}
function Specification() {
  return (
    <>
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
    </>
  );
}
function SlideQCMobie({ control, getValues, setValue, register, reset }) {
  const ListImageSecond = [0, 1, 2];
  const [image, setImage] = useState();
  const [image2, setImage2] = useState();

  function handleMainPhotoInput(idx) {
    console.log(idx);
    document.getElementById(`formFile${idx}`).click();
  }
  function addPhoto(e, id) {
    setImage(e.target.files[0].name);
    setValue(`imageType${id}`, e.target.files[0].name);
    setValue(`imageUrl${id}`, URL.createObjectURL(e.target.files[0]));
  }

  return (
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
                <div className="col-8">
                  <CFormInput
                    hidden
                    type="file"
                    id={`formFileSecond${index}`}
                    onChange={(e) => addPhoto(e, index)}
                  />
                  <CButton
                    className="btn btn-dark mx-0 w-50"
                    onClick={() => handleMainPhotoInput(index)}
                  >
                    Import image
                  </CButton>
                </div>
                <div className="col-8">
                  {getValues(`imageSecondType${index}`)}
                </div>
              </div>
            </CCardBody>
          </CCard>
        );
      })}
    </div>
  );
}
export default ProdcutNew;
