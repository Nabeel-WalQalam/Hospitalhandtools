import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export const Texteditor = ({ setText, isposted, editText }) => {
  const [value, setValue] = useState("");
  // console.log("quill", value);

  useEffect(() => {
    setText(value);
  }, [value]);

  useEffect(() => {
    if (isposted) {
      setValue("");
      setText("");
    } else {
      setValue(editText);
    }
  }, [isposted]);

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // text formatting buttons
    [{ header: [1, 2, 3, 4, 5, 6, false] }], // header dropdown
    [{ list: "ordered" }, { list: "bullet" }], // list buttons
    [{ indent: "-1" }, { indent: "+1" }], // indent buttons
    [{ align: [] }],
    [{ "code-block": "code-block" }],
    ["link"], // media buttons
    ["clean"], // remove formatting button
  ];

  return (
    <ReactQuill
      className={"editor"}
      style={{ height: "300px" }}
      modules={{ toolbar: toolbarOptions }}
      value={value}
      onChange={setValue}
    />
  );
};
