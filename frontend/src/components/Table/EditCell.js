import React from 'react'



export default function EditCell({newValueOfCell, columnName, rowNum}) {
    // console.log(newValueOfCell, 'the newewodwe');
        const dataToSend = {
            newValueOfCell: newValueOfCell,
            columnName: columnName,
            rowNum: rowNum   
        }


    localStorage.setItem('changedCell',JSON.stringify(dataToSend));
}



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