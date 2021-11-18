import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
// import "../../scss/_custom.scss";
import { useFieldArray, useForm } from "react-hook-form";
import ImageUploading from "react-images-uploading";
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardImage,
  CCardText,
  CCardTitle,
  CCol,
  CFormFloating,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  cilColorPalette,
  cilMemory,
  cilTerrain,
  cilVerticalAlignBottom,
  cilXCircle,
} from "@coreui/icons";
const defaultValues = {
  dataEdit: {
    MainFeatures: [
      { name: "", category: "", title: "", image: "", content: "" },
    ],
    memorytype: [{ memory: "memory", price: "10000" }],
    styleColor: [{ image: "memory", color: "10000" }],
    slidePhone: [{ image: "" }, { image: "" }, { image: "" }, { image: "" }],
  },
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
    setValue(`imageTitleType`, e.target.files[0].name);
    setValue(`imageUrl`, URL.createObjectURL(e.target.files[0]));
    const imgUrl = URL.createObjectURL(e.target.files[0]);
    console.log(e.target.files[0].name);
  }

  function handleMainPhotoInput() {
    document.getElementById(`addImage`).click();
  }

  return (
    <div>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <span className="input-group-text w-50 mb-2">
          <b>1 &nbsp; Condition and Type </b>
        </span>
        <div className="row ">
          <div className="input-group width85 pt-2 h60p">
            <span className="input-group-text width30">Name </span>
            <input type="text" className="form-control" />
          </div>
          <div className="input-group width85 pt-2 h60p">
            <span className="input-group-text width30">Company name </span>
            <select
              id="type"
              className="form-control border-black"

              // onChange={handleChange}
            >
              <option value="">Select category</option>
              <option value="SAMSUNG">SamSung</option>
              <option value="LG">LG</option>
              <option value="IPHONE"> Iphone</option>
              <option value="BKAV"> Bkav</option>
              <option value="VIN"> VIN</option>
              <option value="XIHAOMI"> XIHAOMI</option>
            </select>
            {/* <input type="text"  className="form-control" /> */}
          </div>
          <div className="input-group width85  pt-2 h60p">
            <span className="input-group-text width30">Title </span>
            <input type="text" className="form-control" />
          </div>
          <div className="input-group width85 mb-1 pt-2 h60p">
            <span className="input-group-text width30">image </span>
            <span className="input-group-text width70">
              <div className="col-4">
                <CFormInput
                  hidden
                  type="file"
                  id={`addImage`}
                  onChange={(e) => addPhoto(e)}
                />
                <CButton
                  className="btn btn-dark mx-0 w-100"
                  onClick={() => handleMainPhotoInput()}
                >
                  <CIcon icon={cilVerticalAlignBottom} /> &nbsp; Import image
                </CButton>
              </div>
              <div className="col-8">
                <div className=" px-3  d-flex justify-content-left align-items-center h-100">
                  <p className=" d-flex  align-items-center h-100 mb-0">
                    {image}
                  </p>
                </div>
              </div>
            </span>
          </div>
          <div className="input-group width85 pt-2 ">
            <span className="input-group-text width30">Content </span>
            {/* <input type="number" className="form-control" /> */}
            <CFormTextarea
              placeholder=" You can comment here"
              style={{ height: "100px", minHeight: "70px" }}
            ></CFormTextarea>
          </div>
        </div>
        {/* <span className="input-group-text w-50 mt-4 mb-2">
          <b>2 &nbsp;Memory type </b>
        </span> */}
        <div className="row ">
          {/* <Memorytype {...{ control, register, getValues, setValue, reset }} /> */}
        </div>
        <span className="input-group-text w-50 mt-4 mb-2">
          <b>2 &nbsp;Style color </b>
        </span>
        <div className="row ">
          <TypeColorPhone
            {...{ control, register, getValues, setValue, reset }}
          />
        </div>
        <span className="input-group-text w-50 mt-4 mb-2">
          <b>3 &nbsp; slide Phone </b>
        </span>
        <div className="row ">
          <SlideQCMobie
            {...{ control, register, getValues, setValue, reset }}
          />
        </div>
        <span className="input-group-text w-50 mt-4 mb-2">
          <b>3 &nbsp;specifications</b>
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
      </form>
    </div>
  );
};
function Memorytype({ control, getValues, setValue, register, reset }) {
  const { fields, remove, append, prepend, move } = useFieldArray({
    control,
    name: `dataEdit.memorytype`,
  });
  useEffect(() => {
    console.log("fields", fields);
    // reset({
    //   dataEdit: [],
    // });
  }, []);

  function handleAddColor() {
    append({
      memory: " memmory",
      price: "10000",
    });
  }
  return (
    <>
      <div className="row pt-1">
        {fields &&
          fields.length > 0 &&
          fields.map((item, index) => {
            return (
              <CCard className="col-5 mt-2 mx-2 " key={index}>
                <h6 className="mt-3">
                  {" "}
                  <CIcon icon={cilMemory} /> &nbsp;Memory {index}
                </h6>

                <CCardBody>
                  {/* <CCardTitle>Image {index} </CCardTitle> */}

                  <div className="row">
                    <div className="col-6">
                      <input
                        className="form-control w-75"
                        defaultValue={item.memory}
                        {...register(`dataEdit.memorytype.${index}.memory`, {
                          //  value: getValues(`dataEdit.latitude.${index}`),
                        })}
                      />
                    </div>
                    <div className="col-6">
                      <input
                        className="form-control w-75"
                        defaultValue={item.price}
                        {...register(`dataEdit.memorytype.${index}.price`, {
                          //  value: getValues(`dataEdit.${index}.latitude`),
                        })}
                      />
                    </div>
                    {/* <div className="col-8">
                      {getValues(`imageType${index}`)}
                    </div> */}
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

function TypeColorPhone({ control, getValues, setValue, register, reset }) {
  const [image, setImage] = useState();
  const [image2, setImage2] = useState();
  const { fields, remove, append, prepend, move } = useFieldArray({
    control,
    name: `dataEdit.styleColor`,
  });
  useEffect(() => {
    // reset({
    //   dataEdit: [
    //     {
    //       img: "",
    //       color: "màu đen",
    //     },
    //   ],
    // });
  }, []);
  useEffect(() => {
    if (image) {
      console.log("true", image);
      setImage();
    }
  }, [image]);
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
    append({ img: "", memory: " 512", price: "10000" });
  }
  return (
    <>
      <div className="row pt-1">
        {fields &&
          fields.length > 0 &&
          fields.map((item, index) => {
            return (
              <CCard className="col-5 mt-2 mx-2 " key={index}>
                <h6 className="mt-3">
                  {" "}
                  <CIcon icon={cilMemory} /> &nbsp;Memory {index}
                </h6>

                <CCardBody>
                  {/* <CCardTitle>Image {index} </CCardTitle> */}
                  <CRow className="align-items-start">
                    <CCol>
                      <CFormFloating className="mb-3">
                        <CFormInput
                          type="email"
                          id="floatingInput"
                          placeholder="Memory"
                          defaultValue={item.memory}
                          {...register(`dataEdit.type.${index}.memory`, {
                            //  value: getValues(`dataEdit.latitude.${index}`),
                          })}
                        />
                        <CFormLabel htmlFor="floatingInput">Memory</CFormLabel>
                      </CFormFloating>
                    </CCol>

                    <CCol>
                      {" "}
                      <CFormFloating className="mb-3">
                        <CFormInput
                          type="email"
                          id="floatingInput"
                          placeholder="price"
                          defaultValue={item.price}
                          {...register(`dataEdit.type.${index}.price`, {
                            //  value: getValues(`dataEdit.${index}.latitude`),
                          })}
                        />
                        <CFormLabel htmlFor="floatingInput">Price</CFormLabel>
                      </CFormFloating>
                    </CCol>
                  </CRow>

                  {/* <div className="col-8">
                      {getValues(`imageType${index}`)}
                    </div> */}
                </CCardBody>
                <h6 className="mt-3">
                  <CIcon icon={cilColorPalette} /> &nbsp; image {index}
                </h6>
                {!getValues(`imageUrl${index}`) && (
                  <>
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
                        <CIcon icon={cilVerticalAlignBottom} /> &nbsp; Import
                        image
                      </CButton>
                    </div>
                    {/* <div className="col-8">
                      {getValues(`imageType${index}`)}
                    </div> */}
                  </div>
                  <div className="row pt-2 mx-0">
                    <CFormFloating className="mb-3 px-0">
                      <CFormInput
                        type="t"
                        id="floatingInput"
                        placeholder="color"
                        defaultValue={item.color}
                        {...register(`dataEdit.type.${index}.color`, {
                          //  value: getValues(`dataEdit.latitude.${index}`),
                        })}
                      />
                      <CFormLabel htmlFor="floatingInput">TypeColor</CFormLabel>
                    </CFormFloating>
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
        <div className="input-group width85 pt-2 ">
          <span className="input-group-text width30">Screen </span>
          <CFormTextarea
            placeholder=""
            style={{ height: "100px", minHeight: "70px" }}
          ></CFormTextarea>
        </div>
        <div className="input-group width85 pt-2 h60p">
          <span className="input-group-text width30">Rear camera </span>
          <input type="text" className="form-control" />
        </div>
        <div className="input-group width85 pt-2 h60p">
          <span className="input-group-text width30">Selfie Camera </span>
          <input type="text" className="form-control" />
        </div>
        <div className="input-group width85 pt-2 h60p">
          <span className="input-group-text width30">RAM </span>
          <input type="number" className="form-control" />
        </div>
        <div className="input-group width85 pt-2 h60p">
          <span className="input-group-text width30">Memory </span>
          <input type="number" className="form-control" />
        </div>
        <div className="input-group width85 pt-2 h60p">
          <span className="input-group-text width30">CPU </span>
          <input type="text" className="form-control" />
        </div>
        <div className="input-group width85 pt-2 h60p">
          <span className="input-group-text width30">GPU </span>
          <input type="text" className="form-control" />
        </div>
        <div className="input-group width85 pt-2 h60p">
          <span className="input-group-text width30">Battery capacity </span>
          <input type="text" className="form-control" />
        </div>
        <div className="input-group width85 pt-2 h60p">
          <span className="input-group-text width30">Sim </span>
          <input type="text" className="form-control" />
        </div>
        <div className="input-group width85 pt-2 h60p">
          <span className="input-group-text width30">Operating system </span>
          <input type="text" className="form-control" />
        </div>
        <div className="input-group width85 pt-2 h60p">
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
        <div className="input-group width85 pt-2 h60p">
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
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (image) {
      console.log("true", image);
      setImage();
    }
  }, [image]);
  function handleMainPhotoInput(idx) {
    document.getElementById(`formSlide${idx}`).click();
  }
  function addPhoto(e, id) {
    setImage(e.target.files[0].name);
    setValue(`imageSlideType${id}`, e.target.files[0].name);
    setValue(`imageSlideUrl${id}`, URL.createObjectURL(e.target.files[0]));
  }
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
  return (
    <div className="row ">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <CButton
              className="btn btn-dark mx-0 "
              onClick={onImageUpload}
              {...dragProps}
            >
              <CIcon icon={cilVerticalAlignBottom} /> &nbsp; Import image
            </CButton>
            &nbsp;
            <CButton
              className="btn btn-dark   mx-0 "
              onClick={onImageRemoveAll}
            >
              <CIcon icon={cilXCircle} /> &nbsp; Remove all images
            </CButton>
            <CRow className="align-items-start">
              {imageList.map((image, index) => {
                return (
                  <CCol xs={3}>
                    <CCard>
                      {" "}
                      <CCardBody>
                        <div className=" mt-2 mx-0 " key={index}>
                          <img
                            src={image.data_url}
                            alt=""
                            className="width260p"
                            onClick={() => setVisible(!visible)}
                          />
                          {/* modal */}
                          <CModal
                            visible={visible}
                            onClose={() => setVisible(false)}
                          >
                            <CModalHeader
                              alignment="center"
                              onClose={() => setVisible(false)}
                            >
                              {/* <CModalTitle>Modal title</CModalTitle> */}
                            </CModalHeader>
                            <CModalBody className='w-100'>
                              <img
                                src={image.data_url}
                                alt=""
                                className="w-100 "
                              />
                            </CModalBody>
                            {/* <CModalFooter>
                              <CButton
                                color="secondary"
                                onClick={() => setVisible(false)}
                              >
                                Close
                              </CButton>
                              <CButton color="primary">Save changes</CButton>
                            </CModalFooter> */}
                          </CModal>
                          <div className="image-item__btn-wrapper mt-2">
                            <CButton
                              className="btn btn-dark mx-0 col-5"
                              onClick={() => onImageUpdate(index)}
                            >
                              Update
                            </CButton>

                            <CButton
                              className="btn btn-dark mx-0 col-5  ml-4"
                              onClick={() => onImageRemove(index)}
                            >
                              Remove
                            </CButton>
                          </div>
                        </div>
                      </CCardBody>
                    </CCard>
                  </CCol>
                );
              })}
            </CRow>
          </div>
        )}
      </ImageUploading>

      {/* {ListImageSecond.map((item, index) => {
        return (
          <CCard className="col-5 mt-2 mx-2 " key={index}>
            <h6 className="mt-3">
              {" "}
              <CIcon icon={cilTerrain} /> image {index}
            </h6>
            {!getValues(`imageSlideUrl${index}`) && (
              <>
                <CAlert className="text-center " color="warning ">
                  No image
                </CAlert>
              </>
            )}
            {getValues(`imageSlideUrl${index}`) && (
              <CCardImage
                orientation="top"
                src={getValues(`imageSlideUrl${index}`)}
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
                    id={`formSlide${index}`}
                    onChange={(e) => addPhoto(e, index)}
                  />
                  <CButton
                    className="btn btn-dark mx-0 w-50"
                    onClick={() => handleMainPhotoInput(index)}
                  >
                    <CIcon icon={cilVerticalAlignBottom} /> &nbsp; Import image
                  </CButton>
                </div>
                <div className="col-8">
                  {getValues(`imageSlideType${index}`)}
                </div>
              </div>
            </CCardBody>
          </CCard>
        );
      })} */}
    </div>
  );
}
export default ProdcutNew;
