 import './pagination.scss'
import React from "react";
import Pagination from "react-js-pagination";

export default function PaginationSection(
    {
        number = 1,
        size = 10,
        totalElements = 0,
        handlePaging,
    }
) {

    return (
        <Pagination
            itemClass="page-item"
            linkClass="page-link"
            activeClass="active"
            activePage={number }
            itemsCountPerPage={size}
            totalItemsCount={totalElements}
            pageRangeDisplayed={5}
            onChange={handlePaging}
        />
    )
}