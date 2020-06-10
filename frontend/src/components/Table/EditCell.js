import React from 'react'
import { toast, ToastPosition } from "react-toastify";



const EditCell = async ({ newValueOfCell, columnName, rowNum, selectedTable }) => {

    try {
<<<<<<< HEAD
console.log(selectedTable,'selected tablleeeeees');

        const res = await fetch("/table/editcontent", {
=======
        const res = await fetch("http://localhost:4000/table/editcontent", {
>>>>>>> cb2d71a7840e05a10efcaf811246dcfcd8c23a4d
            method: "POST",
            headers: { jwt_token: localStorage.token, "Content-type": "application/json" },
            body: JSON.stringify({
                newValueOfCell: newValueOfCell,
                columnName: columnName,
                rowNum, rowNum,
                selectedTable: selectedTable
            })
        });

        const details = await res.json()
        toast.info(details);
    } catch (err) {
        toast.error(err.message);
    }

}

export default EditCell
//update query for jsonb column;

/*
update tables t
 set data = (
     select
         jsonb_agg(
             case when (x.obj ->> 'id')::int = 1
                 then x.obj || '{"first_name": "Marcus"}'
                 else x.obj
             end
             order by x.ord
         ) new_data
     from jsonb_array_elements(t.data) with ordinality x(obj, ord)
 );
*/