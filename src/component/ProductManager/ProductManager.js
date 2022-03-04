/** @format */

import { Button, Form, Table } from "react-bootstrap";
import PaginationSection from "../common/PaginationSection";
import { NavLink, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { SwalCommon } from "../../constants/SwalCommon";
import { OrdersService } from "../../services/AdminOrder";

export default function AdminOrders() {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [dataFill, setDataFill] = useState({
    pageable: {
      pageNumber: 1,
      pageSize: 2,
    },
    product: "",
    brand: "",
    user: "",
    category: "",
    status: "",
  });

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
    OrdersService.getOrders(dataFill).then((response) => {
      if (response.status === 200) {
        console.log(response);
        setData(response.data);
      }
    });
  }
  function deleteListAdmin(id) {
    swal(SwalCommon.ALERT_DELETE_ALL).then((willDelete) => {
      if (willDelete) {
        console.log(id);
        // swal(SwalCommon.COMING_SOON);

        OrdersService.OrdersDeleteList(id)
          .then((response) => {
            if (response.status === 200) {
              swal(SwalCommon.ALERT_DELETE_COMPLETE).then(() => {
                getData();
              });
            } else {
              alert("삭제 실패 !");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
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
            <h4 className="font-weight-bold mt-5">Order list</h4>
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
                        Status
                      </div>
                      <div className="col-9 px-1 d-flex">
                        <div class="d-flex bd-highlight mb-3 w-100">
                          <div class="pt-3 bd-highlight w-100">
                            {" "}
                            <select
                              id="status"
                              className="form-control border-black w-100"
                              onChange={handleChange}
                            >
                              <option value="">Select</option>
                              <option value="COMPLETED">Completed</option>
                              <option value="INCOM">Incom</option>
                              <option value="WAITTING">waitting</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="row">
                      <div className="col-3 px-1 font-size11 align-self-center text-center">
                        User
                      </div>
                      <div className="col-9 px-1 d-flex">
                        <div class="d-flex bd-highlight mb-3 w-100">
                          <div class="pt-3 bd-highlight w-100">
                            {" "}
                            <input
                              type="text"
                              className="form-control border-black "
                              id="user"
                              required
                              onChange={handleChange}
                            ></input>
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
                        Product name
                      </div>
                      <div className="col-9 px-1 d-flex">
                        <div class="d-flex bd-highlight mb-3">
                          <div class="pt-3 bd-highlight">
                            {" "}
                            <input
                              type="text"
                              className="form-control border-black "
                              id="product"
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
                        Brand
                      </div>
                      <div className="col-9 px-1 d-flex">
                        <div class="d-flex bd-highlight mb-3">
                          <div class="pt-3 bd-highlight">
                            {" "}
                            <input
                              type="text"
                              className="form-control border-black "
                              id="brand"
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
                        Category
                      </div>
                      <div className="col-9 px-1 d-flex">
                        <div class="d-flex bd-highlight mb-3">
                          <div class="pt-3 bd-highlight">
                            {" "}
                            <input
                              type="text"
                              className="form-control border-black "
                              id="category"
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
                    {/* <th className="text-center">
                      <Form.Check
                        checked={selectAllCheckBox}
                        onChange={handleSelectAll}
                      />
                    </th> */}

                    <th>Product Name</th>
                    <th>User Name</th>
                    <th>Brand Name</th>
                    <th>Category Name</th>
                    <th>Quantity</th>
                    <th>Status</th>
                    <th>Detail</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {data.data &&
                    data?.data?.length > 0 &&
                    data.data.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.product_name}</td>
                          <td>{item.user_name}</td>
                          <td>{item.brand_name}</td>
                          <td>{item.category_name}</td>
                          <td>{item.quantity}</td>
                          <td>{item.status}</td>
                          <td>
                            <Button
                              className="btn-ct-light"
                              variant="light"
                              //  onClick={() => handleEdit(item.id)}
                            >
                              Detail
                            </Button>
                          </td>
                          <td className="text-center">
                            <Button
                              className="btn-ct-light"
                              variant="light"
                              onClick={() => deleteListAdmin(item.id)}
                            >
                              Delete
                            </Button>
                            {/* <Form.Check
                              onChange={() => handleSelected(index)}
                              checked={selected[index]}
                            /> */}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </div>

            <div className="d-flex justify-content-between">
              <div className="float-left"></div>
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
