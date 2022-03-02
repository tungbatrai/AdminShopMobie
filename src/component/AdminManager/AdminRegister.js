import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { SwalCommon } from "../../constants/SwalCommon";
import { ValidationText } from "../../constants/Validation";
import { AdminService } from "../../services/AdminService";
import ValidationError from "../common/ValidationError";

export default function AdminRegister(props) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    setError,
  } = useForm();

  const [isCreateAction, setCreateAction] = useState(true);
  const [data, setData] = useState({
    id: props.match.params.id,
  });

  useEffect(() => {
    let { id } = props.match.params;
    if (id) {
      setCreateAction(false);
      getData();
    }
  }, [props.match.params.id]);

  function getData() {
    AdminService.adminDetail(props.match.params.id).then((res) => {
      if (res.status === 200) {
        setData(res.data);
      }
    });
  }

  function onSubmit(data) {
    if (isCreateAction) {
      AdminService.adminRegister(data).then((res) => {
        if (res.status === 200) {
          swal(SwalCommon.ALERT_SAVE_COMPLETE);
        }
      });
    } else {
      AdminService.adminEdit(data).then((res) => {
        if (res.status === 200) {
          swal(SwalCommon.ALERT_SAVE_COMPLETE);
        }
      });
    }
  }

  return (
    <Container>
      {isCreateAction ? (
        <h2 className="mt-4">Register Admin</h2>
      ) : (
        <h2 className="mt-4">Edit Admin</h2>
      )}
      <div className="mt-5">
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td className="td203">
                  ID
                  <span className="text-danger mr-1"> * </span>
                </td>
                <td>
                  <input
                    className="form-control txtInput"
                    placeholder="please input ID"
                    maxLength={50}
                    {...register("id", {
                      value: data.id,
                      required: true,
                    })}
                  />
                  <div className="text-left">
                    {errors.id && <ValidationError text={ValidationText.ID} />}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="td203">
                  Name
                  <span className="text-danger mr-1"> * </span>
                </td>
                <td>
                  <input
                    className="form-control txtInput"
                    placeholder="please input your Name"
                    {...register("name", {
                      value: data.name,
                      required: true,
                      maxLength: 20,
                    })}
                  />
                  <div className="text-left">
                    {errors.name?.type === "required" && (
                      <ValidationError text="이름을 입력해주세요." />
                    )}
                    {errors.name?.type === "maxLength" && (
                      <ValidationError text="user name only 20 characters" />
                    )}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="td203">
                  Mobile Number
                  <span className="text-danger mr-1"> * </span>
                </td>
                <td>
                  <input
                    className="form-control txtInput"
                    placeholder="please input mobile number"
                    maxLength={50}
                    {...register("phone", {
                      value: data.phone,
                      required: true,
                    })}
                  />
                  <div className="text-left">
                    {errors.id && (
                      <ValidationError text={ValidationText.Phone} />
                    )}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="td203">
                  Password
                  <span className="text-danger mr-1"> * </span>
                </td>
                <td>
                  <input
                    className="form-control txtInput"
                    placeholder="please input your password"
                    maxLength={50}
                    {...register("password", {
                      value: data.Password,
                      required: true,
                    })}
                  />
                  <div className="text-left">
                    {errors.id && (
                      <ValidationError text={ValidationText.Password} />
                    )}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="td203">
                  Confirm Password
                  <span className="text-danger mr-1"> * </span>
                </td>
                <td>
                  <input
                    className="form-control txtInput"
                    placeholder="please confirm password"
                    maxLength={50}
                    {...register("confirmPassword", {
                      value: data.Password,
                      required: true,
                    })}
                  />
                  <div className="text-left">
                    {errors.id && (
                      <ValidationError text={ValidationText.ConfirmPassword} />
                    )}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <Row className="justify-content-center mt-5">
            <Col md="2">
              <Button block variant="secondary" to="/adminManager">
                {data.id == null ? "취소" : "목록"}
              </Button>
            </Col>
            <Col md="2">
              <Button block variant="primary" type="submit">
                저장
              </Button>
            </Col>
          </Row>
        </form>
      </div>
    </Container>
  );
}
