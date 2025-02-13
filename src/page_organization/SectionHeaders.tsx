import React, { useState } from "react";
import "../css/page_organization_css/SectionHeader.css";
import { Category } from "../entities/Category";
import { useAppStore } from "../App";

const SectionHeader = (props: any) => {
  return (
    <>
      <span className="section_header" key={props.name}>
        <h2 id="section_header_name">{props.name}</h2>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => props.addListItem(props.name)}
        >
          Add an Item to {props.name}
        </button>

        <button
          onClick={() => {
            props.handleDeleteCategory(props.category, props.index);
          }}
          className="btn"
          style={{
            marginLeft: "10px", // Space between inputs and button
            background: "#df5d09",
            color: "white",
            marginRight: "3px",
          }}
        >
          Delete Category
        </button>

        <span
          className="badge badge-pill badge-secondary"
          style={{ color: "black", background: "grey" }}
        >
          {props.name === "Income"
            ? props.totalIncomeAllocated
            : props.categoryValue}{" "}
          {" / "}
          {props.incomeValue}
        </span>
        <span
          className="badge badge-warning"
          style={{ color: "grey", background: "orange", marginLeft: "25px" }}
        >
          {"Spent: "}
          {props.getExpenseTotal(props.category)}
        </span>
      </span>
    </>
  );
};

export default SectionHeader;
