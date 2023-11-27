import React from "react";

function InputFieldType(props) {
  const { data, touched, errors, handleChange, values } = props;
  return (
    <div className="">
      <select
        id="type"
        name="type"
        value={values.type ? values.type : ""}
        autoComplete="type"
        onChange={handleChange}
        style={touched.type && errors?.type ? { border: "1px solid red" } : {}}
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value="">--- Chọn loại ---</option>
        {data.map((ops, index) => (
          <option key={index} value={ops.value}>
            {ops.name}
          </option>
        ))}
      </select>
      {touched?.type && errors.type && (
        <p className="text-red-600 text-[12px] my-2">{errors?.type}</p>
      )}
    </div>
  );
}

export default InputFieldType;
