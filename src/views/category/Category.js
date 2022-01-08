import React, { useEffect } from "react";
import "./Category.scss";
import { useForm, useFieldArray } from "react-hook-form";
import CIcon from "@coreui/icons-react";
import { cilAsteriskCircle } from "@coreui/icons";
import { CCol, CContainer, CForm, CFormInput, CFormLabel, CFormTextarea, CRow } from "@coreui/react";
const Category = () => {
  return (
    <>
      <h3>List category </h3>
      <div className="row">
        <CategoryPhone />
      </div>
      <div>
        
      </div>
      <div>
        <div className="row">
          <Company />
        </div>
      </div>
    </>
  );
};

function CategoryPhone() {
  const { register, control, handleSubmit, reset, trigger, setError } = useForm(
    {
      // defaultValues: {}; you can populate the fields by this attribute
    }
  );
  const { fields, append, remove } = useFieldArray({
    control,
    name: "dataEdit",
  });
  useEffect(() => {
    reset({
      dataEdit: [
        {
          name: "APLE",
        },
        {
          name: "SASUNG",
        },
        {
          name: "EG",
        },
        {
          name: "SKT",
        },
      ],
    });
  }, []);
  return (
    <div className="row">
      <h6 className="pt-2">
        <CIcon icon={cilAsteriskCircle} /> &nbsp;Company Name
      </h6>
      <CForm onSubmit={handleSubmit((data) => console.log(data))}>
        <div>
        <CForm>
  <div className="mb-3">
    <CFormLabel htmlFor="exampleFormControlInput1">Email address</CFormLabel>
    <CFormInput type="email" id="exampleFormControlInput1" placeholder="name@example.com"   {...register(`test.name`)} />
  </div>
  <div className="mb-3">
    <CFormLabel htmlFor="exampleFormControlTextarea1">Example textarea</CFormLabel>
    <CFormTextarea id="exampleFormControlTextarea1" rows="3"   {...register(`test.textAreaA`)} ></CFormTextarea>
  </div>
</CForm>
          {fields.map((item, index) => (
            <div key={item.id} className="row pt-3">
              <div className="col-6">
                <input
                  className="form-control "
                  {...register(`dataEdit.${index}.name`)}
                />
     
              </div>

              <div className="col-6">
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={() => remove(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="row pt-3">
          <div className="col-2">
            <button
              type="button"
              onClick={() => append({ firstName: "bill", lastName: "luo" })}
              className="btn btn-dark"
            >
              Add
            </button>
          </div>
          <div className="col-2"></div>{" "}
          <div className="col-2">
            <input type="submit" className="btn btn-dark" />
          </div>
        </div>
      </CForm>
    </div>
  );
}
function Company() {
  const { register, control, handleSubmit, reset, trigger, setError } = useForm(
    {
      // defaultValues: {}; you can populate the fields by this attribute
    }
  );
  const { fields, append, remove } = useFieldArray({
    control,
    name: "dataEdit",
  });
  useEffect(() => {
    reset({
      dataEdit: [
        {
          name: "Điện thoại bàn",
        },
        {
          name: "Điện thoại không giây",
        },
        {
          name: "Máy tính bảng",
        },
        {
          name: "Hàng hiêm",
        },
      ],
    });
  }, []);
  return (
    <div className="row">
      <h6 className="pt-2">
        {" "}
        <CIcon icon={cilAsteriskCircle} /> &nbsp;Category
      </h6>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <div>
          {fields.map((item, index) => (
            <div key={item.id} className="row pt-3">
              <div className="col-6">
                <input
                  className="form-control "
                  {...register(`dataEdit.${index}.name`)}
                />
              </div>

              <div className="col-6">
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={() => remove(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="row pt-3">
          <div className="col-2">
            <button
              type="button"
              onClick={() => append({ firstName: "bill", lastName: "luo" })}
              className="btn btn-dark"
            >
              Add
            </button>
          </div>
          <div className="col-2"></div>{" "}
          <div className="col-2">
            <input type="submit" className="btn btn-dark" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Category;
