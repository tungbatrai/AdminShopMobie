import React from "react";
import { Link } from "react-router-dom";
import PaginationSection from "../../components/common/pagination/pagination";
const User = () => {
  const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 10];
  return (
    <>
      <h3 className="user ">Table user</h3>
      <div className="search container">
        <form className="d-flex ">
          <span className="pt-2">
            {" "}
            <b>O</b> total elements {array.length}
          </span>
          <div className="w-20 mx-5">
            <select
              className="form-select "
              aria-label="Default select example"
            >
              <option selected>ALL</option>
              <option value="1">User name</option>
              <option value="2">Email</option>
              <option value="3">Phone Number</option>
              <option value="4">Role</option>
            </select>
          </div>
          <div className="w-20">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Xin mời nhập"
              aria-label="Search"
            />
          </div>
          <button className="btn btn-outline-dark mx-2" type="submit">
            Tìm kiếm
          </button>
        </form>
      </div>
      <div id="list" className="mt-5">
        <div className="new mb-3 row mx-0">
          <p className="col-2 mt-2 ">
            <b>O add product</b>{" "}
          </p>
          <Link to="/user/new">
            {" "}
            <button className="btn btn-dark mx-2 col-1">New</button>
          </Link>
        </div>
        <table className="table table-dark  ">
          <thead>
            <tr className="text-center">
              <th scope="col">#</th>
              <th scope="col">User name</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Detail</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {array.map((item, index) => {
              return (
                <tr className="text-center" key={index}>
                  <th scope="row">{item}</th>
                  <td>user {item}</td>
                  <td>0123456</td>
                  <td>test@gmail</td>
                  <td>Admin/user</td>
                  <td style={{ width: "10%", minWidth: "130px" }}>
                  <Link to={`/user/edit/${index}`}>
                  <button className="btn btn-dark mx-2">
                      Detail
                    </button>
                  </Link>
                 
                  </td>
                  <td style={{ width: "5%", minWidth: "50px" }}>
                    <button className="btn btn-danger mx-2" type="submit">
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
            {/* <PaginationSection
                size={dataFill.pageable.pageSize}
                number={data.currentPage}
                totalElements={data.totalElements}
                handlePaging={handlePaging}
              /> */}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-center">
        <PaginationSection
          size="1"
          number="2"
          totalElements="3"
          handlePaging="4"
        />
      </div>
    </>
  );
};

export default User;
