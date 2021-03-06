import React from 'react'
import { toast, ToastPosition } from "react-toastify";



const EditCell = async ({ newValueOfCell, columnName, rowNum, selectedTable }) => {
    
    try {
        const res = await fetch( process.env.REACT_APP_API_URL + "/table/editcontent", {
            method: "POST",
            headers: { jwt_token: localStorage.token, "Content-type": "application/json" },
            body: JSON.stringify({
                newValueOfCell: newValueOfCell,
                columnName: columnName,
                rowNum, rowNum,
                selectedTable: selectedTable
            })

        });
        
        
        // e.target.style.borderWidth = '5px';
        const details = await res.json()
        
        
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