import { Button, Form, Table } from "react-bootstrap";
import PaginationSection from "../common/PaginationSection";
import { NavLink, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { SwalCommon } from "../../constants/SwalCommon";
import DateTime from "../common/DateTime";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AdminService } from "../../services/AdminService";

const initialSelect = new Array(10).fill(false);

export default function AdmisstionList() {
  const history = useHistory();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [data, setData] = useState({
    content: [],
    pageable: {
      pageNumber: 0,
      pageSize: 10,
    },
    totalElements: 0,
    number: 0,
    size: 0,
    term: null,
    startSignupDate: startDate,
    endSignupDate: endDate,
    findType: "",
  });

  function handleCreate() {
    history.push("/admin/register");
  }

  function handleEdit(id) {
    history.push("/admin/edit/" + id);
  }

  function ChangePass() {
    history.push("/changePassword");
  }

  function handleChange(e) {
    const { id, value } = e.target;
    setData((data) => ({ ...data, [id]: value }));
  }

  function handlePaging(number) {
    setData({ ...data, pageable: { ...data.pageable, pageNumber: --number } });
  }

  useEffect(() => {
    getData();
  }, [data.pageable.pageNumber]);

  function getData() {
    AdminService.getAdmin(data).then((response) => {
      if (response.status === 200) {
        setData(response.data);
      }
    });
  }

  function deleteListAdmin() {
    let deletedIds = [];
    selected.forEach((select, index) => {
      if (select === true) deletedIds.push(data.content[index].id);
    });
    let requestBody = {
      data: deletedIds,
    };
    if (deletedIds.length <= 0) {
      swal(SwalCommon.PLEASE_CHOOSE);
    } else {
      swal(SwalCommon.ALERT_DELETE_ALL).then((willDelete) => {
        if (willDelete) {
          AdminService.deleteAdminList(requestBody)
            .then((response) => {
              if (response.status === 204) {
                getData();
                setSelected(initialSelect);
              } else {
                alert("err !");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    }
  }

  const [selected, setSelected] = useState(initialSelect);
  const [selectAllCheckBox, setSelectAllCheckBox] = useState(false);

  function handleSelected(index) {
    setSelected(
      selected.map((item, idx) => {
        return idx === index ? !item : item;
      })
    );
  }

  function handleSelectAll(e) {
    const checked = e.target.checked;
    setSelectAllCheckBox(checked);
    if (checked) {
      setSelected(data.content.map(() => true));
    } else {
      setSelected(data.content.map(() => false));
    }
  }
  function handleChangeSignupStartDate(date) {
    setStartDate(date);
    if (date != null) {
      data.startSignupDate = date.toLocaleDateString();
    }
  }
  function handleChangeSignupEndDate(date) {
    setEndDate(date);
    if (date != null) {
      data.endSignupDate = date.toLocaleDateString();
    }
  }

  function All() {
    setStartDate(null);
    setEndDate(null);
    data.startSignupDate = null;
    data.endSignupDate = null;
  }

  function SignUpToDay() {
    setStartDate(new Date());
    setEndDate(new Date());
    data.startSignupDate = new Date().toLocaleDateString();
    data.endSignupDate = new Date().toLocaleDateString();
  }

  function SignUp1Month() {
    var date = new Date();
    var result = new Date(date);
    let startDate = result.setDate(result.getDate() - 30);
    let endDate = date;
    setStartDate(startDate);
    setEndDate(endDate);
    data.startSignupDate = new Date(startDate).toLocaleDateString();
    data.endSignupDate = new Date(endDate).toLocaleDateString();
  }

  function SignUp3Month() {
    var date = new Date();
    var result = new Date(date);
    let startDate = result.setDate(result.getDate() - 90);
    let endDate = date;
    setStartDate(startDate);
    setEndDate(endDate);
    data.startSignupDate = new Date(startDate).toLocaleDateString();
    data.endSignupDate = new Date(endDate).toLocaleDateString();
  }

  function SignUp6Month() {
    var date = new Date();
    var result = new Date(date);
    let startDate = result.setDate(result.getDate() - 180);
    let endDate = date;
    setStartDate(startDate);
    setEndDate(endDate);
    data.startSignupDate = new Date(startDate).toLocaleDateString();
    data.endSignupDate = new Date(endDate).toLocaleDateString();
  }
  return (
    <main>
      <div className="container-fluid">
        <div className="row">
          <div className="col-5">
            <h4 className="mt-5 mb-3">Admin</h4>
            <p>총 {data.totalElements} 건</p>
          </div>
          <div className="col-7">
            <div className="row mt-5">
              <div className=" col-10 mb-3">
                <div className="row">
                  <DatePicker
                    className="form-control"
                    selected={startDate}
                    onChange={(date) => handleChangeSignupStartDate(date)}
                    dateFormat="yyyy/MM/dd"
                  />
                  <div className="d-flex ml-2 mr-2">
                    <div className="justify-content-center align-self-center">
                      ~
                    </div>
                  </div>
                  <DatePicker
                    className="form-control"
                    selected={endDate}
                    onChange={(date) => handleChangeSignupEndDate(date)}
                    dateFormat="yyyy/MM/dd"
                  />
                  <Button
                    className="mr-2 ml-3"
                    variant="secondary"
                    onClick={() => All()}
                  >
                    전체
                  </Button>
                  <Button
                    className="mr-2"
                    variant="secondary"
                    onClick={() => SignUpToDay()}
                  >
                    오늘
                  </Button>
                  <Button
                    className="mr-2"
                    variant="secondary"
                    onClick={() => SignUp1Month()}
                  >
                    1개월
                  </Button>
                  <Button
                    className="mr-2"
                    variant="secondary"
                    onClick={() => SignUp3Month()}
                  >
                    3개월
                  </Button>
                  <Button
                    className="mr-2"
                    variant="secondary"
                    onClick={() => SignUp6Month()}
                  >
                    6개월
                  </Button>
                </div>
                <div className="row mt-3">
                  <div className="col-0">
                    <select
                      id="findType"
                      className="form-control"
                      style={{ maxWidth: "200px" }}
                      onChange={handleChange}
                    >
                      <option value="ID">ID</option>
                      <option value="NAME">NAME</option>
                      <option value="PHONE">PHONE</option>
                    </select>
                  </div>
                  <div className="col-10">
                    <input
                      type="text"
                      class="form-control"
                      id="term"
                      placeholder="이름을 입력해주세요."
                      required
                      onChange={handleChange}
                    ></input>
                  </div>
                </div>
              </div>
              <div className="col-2 d-flex">
                <div className="justify-content-center align-self-center">
                  <Button className="btnSearch">검색</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Form>
            <div className="table-responsive">
              <Table bordered>
                <thead>
                  <tr>
                    <th className="text-center">
                      <Form.Check
                        checked={selectAllCheckBox}
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th>아이디</th>
                    <th>이름</th>
                    <th>전화번호</th>
                    <th>생성일</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data.content &&
                    data.content.length > 0 &&
                    data.content.map((item, index) => {
                      return (
                        <tr>
                          <td className="text-center">
                            <Form.Check
                              onChange={() => handleSelected(index)}
                              checked={selected[index]}
                            />
                          </td>
                          <td>{item.name}</td>
                          <td>{item.phone}</td>
                          <td>
                            <DateTime type="date" date={item.createdOn} />
                          </td>
                          <td>
                            <Button onClick={() => handleEdit(item.id)}>
                              Edit
                            </Button>
                          </td>
                          <td>
                            <Button onClick={() => ChangePass()}>
                              Change Password
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </div>

            <div className="d-flex justify-content-between">
              <div class="float-left">
                <Button variant="danger" onClick={() => deleteListAdmin()}>
                  삭제
                </Button>
              </div>
              <PaginationSection
                size={data.size}
                number={data.number}
                totalElements={data.totalElements}
                handlePaging={handlePaging}
              />
              <div className="float-right">
                <Button variant="org" onClick={handleCreate}>
                  작성
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </main>
  );
}

// function AdminItem(props) {
//   const history = useHistory();

//   function handleEdit(id) {
//     history.push("/admin/edit/" + id);
//   }

//   function ChangePass() {
//     history.push("/changePassword/" + id);
//   }

//   return (
//     <tr>
//       <td className="text-center">
//         <Form.Check aria-label="Checkbox for following text input" />
//       </td>
//       <td>{item.name}</td>
//       <td>{item.phone}</td>
//       <td>
//         <DateTime type="date" date={item.createdOn} />
//       </td>
//       <td>
//         <Button onClick={() => handleEdit(item.id)}>Edit</Button>
//       </td>
//       <td>
//         <Button onClick={() => ChangePass()}>Change Password</Button>
//       </td>
//     </tr>
//   );
// }
