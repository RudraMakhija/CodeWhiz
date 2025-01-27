export const customStyles = {
  control: (styles) => ({
    ...styles,
    width: "100%",
    maxWidth: "14rem",
    minWidth: "12rem",
    borderRadius: "5px",
    color: "#333",
    fontSize: "0.9rem",
    lineHeight: "1.5rem",
    backgroundColor: "#F9F9F9",
    cursor: "pointer",
    border: "1px solid #CCC",
    boxShadow: "2px 2px 5px rgba(0,0,0,0.1);",
    ":hover": {
      border: "1px solid #BBB",
      boxShadow: "2px 2px 8px rgba(0,0,0,0.2);",
    },
  }),
  option: (styles) => ({
    ...styles,
    color: "#333",
    fontSize: "0.9rem",
    lineHeight: "1.5rem",
    width: "100%",
    background: "#F9F9F9",
    ":hover": {
      backgroundColor: "#ECECEC",
      color: "#333",
      cursor: "pointer",
    },
  }),
  menu: (styles) => ({
    ...styles,
    backgroundColor: "#F9F9F9",
    maxWidth: "14rem",
    border: "1px solid #CCC",
    borderRadius: "5px",
    boxShadow: "2px 2px 5px rgba(0,0,0,0.1);",
  }),
  placeholder: (defaultStyles) => ({
    ...defaultStyles,
    color: "#AAA",
    fontSize: "0.9rem",
    lineHeight: "1.5rem",
  }),
};
