import React from 'react'



 const EditCell = async ({newValueOfCell, columnName, rowNum, selectedTable}) => {

    
    try {
console.log(selectedTable,'selected tablleeeeees');

        const res = await fetch("/table/editcontent", {
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
        console.log(details);
        
        
        // setTimeout( localStorage.setItem('changedCell',JSON.stringify(dataToSend)),100)


    } catch (err) {
        console.error(err.message);
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