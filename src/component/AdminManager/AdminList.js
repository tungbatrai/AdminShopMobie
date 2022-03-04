/** @format */

import { Button, Form, Table } from "react-bootstrap";
import PaginationSection from "../common/PaginationSection";
import { NavLink, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { SwalCommon } from "../../constants/SwalCommon";
import { AdminService } from "../../services/AdminService";

const initialSelect = new Array(10).fill(false);

export default function AdminList() {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [dataFill, setDataFill] = useState({
    pageable: {
      pageNumber: 1,
      pageSize: 10,
    },
    role: "",
    phone: "",
    email: "",
    name: "",
  });

  const [selected, setSelected] = useState(initialSelect);
  const [selectAllCheckBox, setSelectAllCheckBox] = useState(false);

  function handleSelected(index) {
    setSelected(
      selected.map((item, idx) => {
        if (item) {
          setSelectAllCheckBox(false);
        }
        return idx === index ? !item : item;
      })
    );
  }

  function handleSelectAll(e) {
    const checked = e.target.checked;
    setSelectAllCheckBox(checked);
    if (checked) {
      setSelected(data.data.map(() => true));
    } else {
      setSelected(data.data.map(() => false));
    }
  }
  function handleChange(e) {
    const { id, value } = e.target;
    setDataFill((data) => ({ ...data, [id]: value }));
  }

  const [isChangePage, setIsChangePage] = useState(false);
  function handlePaging(number) {
    setDataFill({
      ...dataFill,
      pageable: { ...dataFill.pageable, pageNumber: number },
    });
    setIsChangePage(!isChangePage);
  }
  async function fillData() {
    setDataFill(
      {
        ...dataFill,
        pageable: { ...dataFill.pageable, pageNumber: 1 },
      },
      setIsChangePage(!isChangePage)
    );
  }
  useEffect(() => {
    getData();
  }, [isChangePage]);

  function getData() {
    AdminService.getAdmin(dataFill).then((response) => {
      if (response.status === 200) {
        console.log(response);
        setSelected(Array(response.data.data.length).fill(false));
        setSelectAllCheckBox(false);
        setData(response.data);
      }
    });
  }
  function deleteListAdmin() {
    let deletedIds = [];
    selected.forEach((select, index) => {
      if (select === true) deletedIds.push(data.data[index].id);
    });
    let requestBody = {
      data: deletedIds,
    };
    if (deletedIds.length <= 0) {
      swal(SwalCommon.PLEASE_CHOOSE);
    } else {
      swal(SwalCommon.ALERT_DELETE_ALL).then((willDelete) => {
        if (willDelete) {
          console.log(requestBody);
          swal(SwalCommon.COMING_SOON);

          // AdminService.adminDeleteList(requestBody)
          //   .then((response) => {
          //     if (response.status === 200) {
          //       swal(SwalCommon.ALERT_DELETE_COMPLETE).then(() => {
          //         getData();
          //       });
          //     } else {
          //       alert("삭제 실패 !");
          //     }
          //   })
          //   .catch((err) => {
          //     console.log(err);
          //   });
        }
      });
    }
  }
  function handleCreate() {
    history.push("/admin/register");
  }

  function handleEdit(id) {
    history.push("/admin/edit/" + id);
  }

  function ChangePass(id) {
    history.push("/changePassword/" + id);
  }

  return (
    <main>
      <div className="container-fluid">
        <div className="d-block d-xl-flex">
          <div className="tcol-25 tcol-lg-100 d-flex flex-column justify-content-between">
            <h4 className="font-weight-bold mt-5">Admin list</h4>
            <div className="font-size12">
              Total &nbsp;<span>{data.totalElements}</span>&nbsp;case
            </div>
          </div>
          <div className="tcol-75 tcol-lg-100">
            <div className="search">
              <div className="tcol-90 d-flex justify-content-center flex-column">
                <div className="row mx-0">
                  <div className="col-2"></div>
                  <div className="col-3">
                    <div className="row">
                      <div className="col-3 px-1 font-size11 align-self-center text-center">
                        Role
                      </div>
                      <div className="col-9 px-1 d-flex">
                        <div class="d-flex bd-highlight mb-3 w-100">
                          <div class="pt-3 bd-highlight w-100">
                            {" "}
                            <select
                              id="role"
                              className="form-control border-black w-100"
                              onChange={handleChange}
                            >
                              <option value="">Select</option>
                              <option value="ADMIN">Admin</option>
                              <option value="USER">User</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mx-0">
                  <div className="col-2"></div>
                  <div className="col-3">
                    <div className="row">
                      <div className="col-3 px-1 font-size11 align-self-center text-center">
                        Name
                      </div>
                      <div className="col-9 px-1 d-flex">
                        <div class="d-flex bd-highlight mb-3">
                          <div class="pt-3 bd-highlight">
                            {" "}
                            <input
                              type="text"
                              className="form-control border-black "
                              id="name"
                              required
                              onChange={handleChange}
                            ></input>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="row">
                      <div className="col-3 px-1 font-size11 align-self-center text-center">
                        Email
                      </div>
                      <div className="col-9 px-1 d-flex">
                        <div class="d-flex bd-highlight mb-3">
                          <div class="pt-3 bd-highlight">
                            {" "}
                            <input
                              type="text"
                              className="form-control border-black "
                              id="email"
                              required
                              onChange={handleChange}
                            ></input>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="row">
                      <div className="col-3 px-1 font-size11 align-self-center text-center">
                        Phone
                      </div>
                      <div className="col-9 px-1 d-flex">
                        <div class="d-flex bd-highlight mb-3">
                          <div class="pt-3 bd-highlight">
                            {" "}
                            <input
                              type="text"
                              className="form-control border-black "
                              id="phone"
                              required
                              onChange={handleChange}
                            ></input>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="m-auto">
                <Button
                  className="btnSearch btn-ct-light text-dark tcol-10"
                  variant="light"
                  onClick={fillData}
                >
                  Find
                </Button>
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

                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th>Detail</th>
                    <th>Reset Password</th>
                  </tr>
                </thead>
                <tbody>
                  {data.data &&
                    data?.data?.length > 0 &&
                    data.data.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td className="text-center">
                            <Form.Check
                              onChange={() => handleSelected(index)}
                              checked={selected[index]}
                            />
                          </td>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td>{item.phone}</td>
                          <td>
                            {item.role === "ADMIN" ? <>Admin</> : <>User</>}
                          </td>
                          <td>
                            <Button
                              className="btn-ct-light"
                              variant="light"
                              //  onClick={() => handleEdit(item.id)}
                            >
                              Detail
                            </Button>
                          </td>
                          <td>
                            <Button
                              className="btn-ct-light"
                              variant="light"
                              //    onClick={() => ChangePass(item.id)}
                            >
                              Reset Password
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </div>

            <div className="d-flex justify-content-between">
              <div className="float-left">
                <Button
                  className="btn-ct-light"
                  variant="light"
                  onClick={() => deleteListAdmin()}
                >
                  Delete
                </Button>
              </div>
              <PaginationSection
                size={dataFill.pageable.pageSize}
                number={data.currentPage}
                totalElements={data.totalElements}
                handlePaging={handlePaging}
              />
              <div className="float-right">
                <Button
                  className="btn-ct-light"
                  variant="light"
                  //  onClick={handleCreate}
                >
                  Register
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </main>
  );
}
