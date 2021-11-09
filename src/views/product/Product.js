import React from "react";
import PaginationSection from "../../components/common/pagination/pagination";
import { useHistory } from "react-router-dom";

const Product = () => {
  const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 10];
  const history = useHistory();
  function handleEdit(id) {
   //  history.push("/product/detail/" + id);
  }
  function handleNew() {
    history.push("./product/new");
  }
  return (
    <>
      <h3 className="product ">Producty</h3>
      <div className="search container">
        <form class="d-flex ">
          <span className="pt-2">
            <b>O</b> Tổng số phần tử {array.length}
          </span>
          <div className="w-20 mx-5">
            <select class="form-select " aria-label="Default select example">
              <option selected>ALL</option>
              <option value="1">Thể loại</option>
              <option value="2">Tên</option>
              <option value="3">Ảnh</option>
              <option value="4">giá </option>
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
        <div className="new mb-3 row">
          <p className="col-2 mt-2"> Thêm product</p>
          <button class="btn btn-dark mx-2 col-1" onClick={handleNew}>
            New
          </button>
        </div>
        <table class="table table-dark  ">
          <thead>
            <tr className="text-center">
              <th scope="col">#</th>
              <th scope="col">Tên</th>
              <th scope="col">Thể loại</th>
              <th scope="col">Ảnh</th>
              <th scope="col">giá</th>
              <th scope="col">Số lượng</th>
              <th scope="col">Chi tiết</th>
              <th scope="col">Xóa</th>
            </tr>
          </thead>
          <tbody>
            {array.map((item, index) => {
              return (
                <tr className="text-center" key={index}>
                  <th scope="row">
                    <div
                      className=" d-flex align-items-center justify-content-center"
                      style={{ height: "100px" }}
                    >
                      {item}
                    </div>
                  </th>
                  <td className="h-100">
                    <div
                      className=" d-flex align-items-center justify-content-center"
                      style={{ height: "100px" }}
                    >
                      user {item}
                    </div>
                  </td>
                  <td>
                    <div
                      className=" d-flex align-items-center justify-content-center"
                      style={{ height: "100px" }}
                    >
                      Iphone {item}
                    </div>
                  </td>
                  <td>
                    <img
                      src="data:image/jpeg;base64,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"
                      className="w-100"
                      style={{ maxWidth: "200px", height: "100px" }}
                      alt=""
                    />
                  </td>
                  <td>
                    <div
                      className=" d-flex align-items-center justify-content-center"
                      style={{ height: "100px" }}
                    >
                      3{item}00
                    </div>
                  </td>
                  <td>
                    <div
                      className=" d-flex align-items-center justify-content-center"
                      style={{ height: "100px" }}
                    >
                      100
                    </div>
                  </td>
                  <td style={{ width: "10%", minWidth: "130px" }}>
                    <div
                      className=" d-flex align-items-center justify-content-center"
                      style={{ height: "100px" }}
                    >
                      <button
                        class="btn btn-dark mx-2"
                        type="submit"
                        onClick={handleEdit(index)}
                      >
                        Chi tiết
                      </button>
                    </div>
                  </td>
                  <td style={{ width: "5%", minWidth: "50px" }}>
                    <div
                      className=" d-flex align-items-center justify-content-center"
                      style={{ height: "100px" }}
                    >
                      <button class="btn btn-danger mx-2" type="submit">
                        Xóa
                      </button>
                    </div>
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

export default Product;
