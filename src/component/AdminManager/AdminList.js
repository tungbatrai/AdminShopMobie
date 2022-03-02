/** @format */

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

export default function AdminList() {
  const history = useHistory();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [data, setData] = useState({
    content: [],
    pageable: {
      pageNumber: 1,
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
        // setData(response.data);
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
                alert("삭제 실패 !");
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

  return (
    <main>
      <div className="container-fluid">
        <div className="row">
          <div className="col-5">
            <h4 className="mt-5 mb-3">Admin</h4>
            <p>Total {data.totalElements} </p>
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
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>pass</th>
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
                  Delete
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
                  register
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
