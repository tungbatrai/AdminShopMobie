import React from "react";
import PaginationSection from "../../components/common/pagination/pagination";
import "./user.scss";
const User = () => {
  const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 10];
  return (
    <>
      <h3 className="user ">Table user</h3>
      <div className="search container">
        <form class="d-flex ">
          <span className="pt-2">
            {" "}
            <b>O</b> Tổng số phần tử {array.length}
          </span>
          <div className="w-20 mx-5">
            <select class="form-select " aria-label="Default select example">
              <option selected>ALL</option>
              <option value="1">Tài khoản</option>
              <option value="2">Email</option>
              <option value="3">SDT</option>
              <option value="4">Chức vụ</option>
            </select>
          </div>
          <div className="w-20">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Xin mời nhập"
              aria-label="Search"
            />
          </div>
          <button class="btn btn-outline-dark mx-2" type="submit">
            Tìm kiếm
          </button>
        </form>
      </div>
      <div id="list" className="mt-5">
        <table class="table table-dark  ">
          <thead>
            <tr className="text-center">
              <th scope="col">#</th>
              <th scope="col">Tài khoản</th>
              <th scope="col">Số điện thoại</th>
              <th scope="col">Email</th>
              <th scope="col">Chức vụ</th>
              <th scope="col">Nội dung</th>
              <th scope="col">Xóa</th>
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
                  <td  style={{ width: "10%", minWidth: "130px" }}>
                    
                    <button class="btn btn-dark mx-2" type="submit">
                      Chi tiết
                    </button>
                  </td>
                  <td  style={{ width: "5%", minWidth: "50px" }}>
                   
                    <button class="btn btn-danger mx-2" type="submit">
                      Xóa
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
