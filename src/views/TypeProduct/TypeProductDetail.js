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
  cilCloudUpload,
  cilColorPalette,
  cilHistory,
  cilLibraryAdd,
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
const TypeProductDetail = () => {
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
  const [typeProduct, setTypeProduct] = useState(0);
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
  function handleSelectType(e) {
    console.log(parseInt(e.target.value));
    setTypeProduct(parseInt(e.target.value));
  }
  return (
    <>
      <div> TypeProductDetail</div>
      <div>
        {/* Type  */}
        <span className="input-group-text w-50 mt-4 mb-2">
          <b>2 &nbsp;Type Product </b>
        </span>
        <div className="row pt-2 ml-1 w-50">
          <select
            id="type"
            className="form-control border-black"
            onChange={(e) => handleSelectType(e)}
          >
            <option value="0">Select type prodcut</option>
            <option value="1">Điện thoại</option>
            <option value="2">Máy tính</option>
            <option value="3"> Đồng hồ</option>
            <option value="4">other</option>
          </select>
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
        {typeProduct != 0 && (
          <span className="input-group-text w-50 mt-4 mb-2">
            <b>3 &nbsp;specifications</b>
          </span>
        )}
        <Specification typeProduct={typeProduct} />
        <div className="row my-3">
          <div className="col-5"></div>
          <div className="col-2">
            <NavLink to="/product">
              <button
                className="btn btn-dark mx-2 col-1 w-100"
                //  onClick={(e) => HandleCancel()}
              >
                <CIcon icon={cilHistory} /> Cancel
              </button>
            </NavLink>
          </div>
          <div className="col-2">
            <button
              className="btn btn-dark mx-2 col-1 w-100"
              //  onClick={(e) => HandleCancel()}
              type="submit"
            >
              <CIcon icon={cilCloudUpload} /> Submit
            </button>
          </div>
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
    name: `dataEdit.styleColor`,
  });
  const [visible, setVisible] = useState(false);
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
      <div className="minWidth200">
        <CButton
          className="mt-2 btn btn-dark  width15"
          onClick={() => handleAddColor()}
        >
          <CIcon icon={cilLibraryAdd} /> &nbsp; Add Style
        </CButton>
      </div>
      <div className="row pt-1">
        {fields &&
          fields.length > 0 &&
          fields.map((item, index) => {
            return (
              <CCard className="col-3 mt-2 mx-2 " key={index}>
                <h6 className="mt-3">
                  <CIcon icon={cilMemory} /> &nbsp;Memory {index}
                </h6>

                <CCardBody>
                  {/* <CCardTitle>Image {index} </CCardTitle> */}
                  <CRow className="align-items-start">
                    <CCol>
                      <CFormFloating className="mb-3">
                        <CFormInput
                          type="text"
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
                      <CFormFloating className="mb-3">
                        <CFormInput
                          type="number"
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
                  <div className="row pt-2 mx-0">
                    <CFormFloating className="mb-3 px-0">
                      <CFormInput
                        type="text"
                        id="floatingInput"
                        placeholder="color"
                        defaultValue={item.color}
                        {...register(`dataEdit.type.${index}.color`, {
                          //  value: getValues(`dataEdit.latitude.${index}`),
                        })}
                      />
                      <CFormLabel htmlFor="floatingInput">
                        Type color
                      </CFormLabel>
                    </CFormFloating>
                  </div>

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
                    className="imageProduct w-25"
                    {...register(`imageUrl${index}`, {})}
                    onClick={() => setVisible(true)}
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
                        className="btn btn-dark mx-0 "
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
                  <CModal
                    size="lg"
                    alignment="center"
                    visible={visible}
                    onClose={() => setVisible(false)}
                  >
                    <CModalHeader onClose={() => setVisible(false)}>
                      <CModalTitle className="text-center w-100">
                        Image 1
                      </CModalTitle>
                    </CModalHeader>
                    <CModalBody className="w-100">
                      <img
                        src={getValues(`imageUrl${index}`)}
                        alt=""
                        className="w-100 "
                      />
                    </CModalBody>
                  </CModal>
                </CCardBody>
              </CCard>
            );
          })}
      </div>
    </>
  );
}
function Specification({ typeProduct }) {
  return (
    <>
      {(() => {
        switch (typeProduct) {
          case 0:
            return <div></div>;
          case 1:
            return (
              <div>
                <div className="row pt-2">
                  <div className="input-group width85 pt-2 ">
                    <span className="input-group-text width30">Screen </span>
                    <CFormTextarea
                      placeholder=""
                      style={{ height: "100px", minHeight: "70px" }}
                    ></CFormTextarea>
                  </div>
                  <div className="input-group width85 pt-2 h60p">
                    <span className="input-group-text width30">
                      Rear camera
                    </span>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="input-group width85 pt-2 h60p">
                    <span className="input-group-text width30">
                      Selfie Camera
                    </span>
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
                    <span className="input-group-text width30">
                      Battery capacity
                    </span>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="input-group width85 pt-2 h60p">
                    <span className="input-group-text width30">Sim </span>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="input-group width85 pt-2 h60p">
                    <span className="input-group-text width30">
                      Operating system
                    </span>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="input-group width85 pt-2 h60p">
                    <span className="input-group-text width30">Origin </span>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="input-group width85 pt-2 h60p">
                    <span className="input-group-text width30">Debut year</span>
                    <input type="date" className="form-control" />
                  </div>
                </div>
              </div>
            );

          case 2:
            return (
              <div>
                <div className="row pt-2">
                  <div className="input-group width85 pt-2 h60p">
                    <span className="input-group-text width30">CPU</span>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="input-group width85 pt-2 h60p">
                    <span className="input-group-text width30">Screen</span>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="input-group width85 pt-2 h60p">
                    <span className="input-group-text width30">Graphics </span>
                    <input type="number" className="form-control" />
                  </div>
                  <div className="input-group width85 pt-2 h60p">
                    <span className="input-group-text width30">Hard drive</span>
                    <input type="number" className="form-control" />
                  </div>
                  <div className="input-group width85 pt-2 h60p">
                    <span className="input-group-text width30">
                      Operating system
                    </span>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="input-group width85 pt-2 h60p">
                    <span className="input-group-text width30">
                      Weight ( kg)
                    </span>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="input-group width85 pt-2 h60p">
                    <span className="input-group-text width30">Size (mm)</span>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="input-group width85 pt-2 h60p">
                    <span className="input-group-text width30">Origin </span>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="input-group width85 pt-2 h60p">
                    <span className="input-group-text width30">Debut year</span>
                    <input type="text" className="form-control" />
                  </div>
                </div>
              </div>
            );
          case 3:
            return (
              <div>
                <div className="row pt-2">
                  <div className="input-group width85 pt-2 h60p">
                    <span className="input-group-text width30">
                      Screen technology
                    </span>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="input-group width85 pt-2 h60p">
                    <span className="input-group-text width30">
                      Screen size
                    </span>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="input-group width85 pt-2 h60p">
                    <span className="input-group-text width30">CPU </span>
                    <input type="number" className="form-control" />
                  </div>
                  <div className="input-group width85 pt-2 h60p">
                    <span className="input-group-text width30">
                      Internal memory
                    </span>
                    <input type="number" className="form-control" />
                  </div>
                  <div className="input-group width85 pt-2 h60p">
                    <span className="input-group-text width30">
                      Operating system
                    </span>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="input-group width85 pt-2 h60p">
                    <span className="input-group-text width30">
                      Can connect to the operating system
                    </span>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="input-group width85 pt-2 h60p">
                    <span className="input-group-text width30">
                      Face material
                    </span>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="input-group width85 pt-2 h60p">
                    <span className="input-group-text width30">
                      String material
                    </span>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="input-group width85 pt-2 h60p">
                    <span className="input-group-text width30">Waterproof</span>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="input-group width85 pt-2 h60p">
                    <span className="input-group-text width30">
                      Battery life
                    </span>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="input-group width85 pt-2 h60p">
                    <span className="input-group-text width30">Connection</span>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="input-group width85 pt-2 h60p">
                    <span className="input-group-text width30">Origin</span>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="input-group width85 pt-2 h60p">
                    <span className="input-group-text width30">Debut year</span>
                    <input type="text" className="form-control" />
                  </div>
                </div>
              </div>
            );
          case 4:
            return <div>Time</div>;
          default:
            return <div>You are a other.</div>;
        }
      })()}
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
  const [modaIndex, setModaIndex] = useState();
  function addPhoto(e, id) {
    setImage(e.target.files[0].name);
    setValue(`imageSlideType${id}`, e.target.files[0].name);
    setValue(`imageSlideUrl${id}`, URL.createObjectURL(e.target.files[0]));
  }
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, "true");
    setImages(imageList);
  };
  const handleShow = (e, url) => {
    console.log(e, url);
    setModaIndex(url);
    setVisible(!visible);
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
                  <CCol xs={3} className="minWidth300">
                    <CCard>
                      <CCardBody>
                        <div className=" mt-2 mx-0 " key={index}>
                          <img
                            src={image.data_url}
                            alt=""
                            className="width260p"
                            onClick={() => handleShow(index, image.data_url)}
                          />

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
            <CModal
              visible={visible}
              size="lg"
              alignment="center"
              onClose={() => setVisible(false)}
            >
              <CModalHeader onClose={() => setVisible(false)}>
                <CModalTitle className="text-center w-100">
                  List slide
                </CModalTitle>
              </CModalHeader>
              <CModalBody className="w-100">
                <img src={modaIndex} alt="" className="w-100 " />
              </CModalBody>
            </CModal>
          </div>
        )}
      </ImageUploading>
    </div>
  );
}
export default TypeProductDetail;
