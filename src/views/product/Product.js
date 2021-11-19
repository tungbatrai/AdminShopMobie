import React from "react";
import PaginationSection from "../../components/common/pagination/pagination";
import { useHistory } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import { cilColorBorder, cilDelete, cilLibraryAdd, cilLifeRing } from "@coreui/icons";
const Product = () => {
  const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 10];
  const history = useHistory();

  function handleNew() {
    history.push("./product/new");
  }

  function handleEdit(id) {
    history.push("./product/edit/" + id);
  }
  function handleStyleProduct(id) {
    history.push("./product/type-product/" + id);
  }
  return (
    <>
      <h3 className="product ">Producty</h3>
      <div className="search container">
        <form className="d-flex ">
          <span className="pt-2">
            <CIcon icon={cilLifeRing} /> total elements {array.length}
          </span>
          <div className="w-20 mx-5">
            <select
              className="form-select "
              aria-label="Default select example"
            >
              <option selected>ALL</option>
              <option value="1">Category</option>
              <option value="2">name</option>
              <option value="3">image</option>
              <option value="4">Price </option>
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
            <b>
              <CIcon icon={cilLifeRing} /> Add product
            </b>
          </p>
          <button className="btn btn-dark mx-2 col-2" onClick={handleNew}>
            <CIcon icon={cilLibraryAdd} /> Register new
          </button>
        </div>
        <div className="new  row mx-0">
          <p className="col-2 mt-2 ">
            <b>
              <CIcon icon={cilLifeRing} /> Table
            </b>
          </p>
        </div>
        <table className="table table-dark  ">
          <thead>
            <tr className="text-center">
              <th scope="col">#</th>
              <th scope="col">name</th>
              <th scope="col">Category</th>
              <th scope="col">title</th>
              <th scope="col">image</th>
              <th scope="col">TypeProduct</th>
              <th scope="col">Detail</th>
              <th scope="col">Delete</th>
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
                    <div
                      className=" d-flex align-items-center justify-content-center"
                      style={{ height: "100px" }}
                    >
                      3{item}00
                    </div>
                  </td>
                  <td>
                    <img
                      src="https://apl-mintpot.s3.ap-northeast-2.amazonaws.com/1637048317098___abc.jpg"
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
                      <button
                        className="btn btn-dark mx-2"
                        type="submit"
                        // onClick={goEdit(index)}
                        onClick={() => handleStyleProduct(index)}
                      >
                        <CIcon icon={cilColorBorder} /> Detail
                      </button>
                    </div>
                  </td>
                  <td style={{ width: "10%", minWidth: "130px" }}>
                    <div
                      className=" d-flex align-items-center justify-content-center"
                      style={{ height: "100px" }}
                    >
                      <button
                        className="btn btn-dark mx-2"
                        type="submit"
                        // onClick={goEdit(index)}
                        onClick={() => handleEdit(index)}
                      >
                        <CIcon icon={cilColorBorder} />  Detail
                      </button>
                    </div>
                  </td>
                  <td style={{ width: "5%", minWidth: "50px" }}>
                    <div
                      className=" d-flex align-items-center justify-content-center minWidth120"
                      style={{ height: "100px" }}
                    >
                      <button className="btn btn-danger mx-2" type="submit">
                      <CIcon icon={cilDelete} /> Delete
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
