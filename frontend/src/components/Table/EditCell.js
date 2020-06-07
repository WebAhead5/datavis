import React from 'react'


// const transferToBE = (storageValue) => {

// }


export default function EditCell({newValueOfCell, columnName}) {
    // console.log(newValueOfCell, 'the newewodwe');
        const dataToSend = {
            newValueOfCell: newValueOfCell,
            columnName: columnName
        }


    localStorage.setItem('changedCell',JSON.stringify(dataToSend));
    // transferToBE(newValueOfCell);
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