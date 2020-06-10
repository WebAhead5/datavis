const getTables = async (setTableList) => {


    try {

        //call API for user infomation for use in tables page
        const res = await fetch("/table/getTables", {
            method: "POST",
            headers: { jwt_token: localStorage.token }
        });

        //result from DB request on backend - will send default info

        const parseData = await res.json()

        setTableList(parseData)


    } catch (err) {
        console.error(err.message);
    }
}

export default getTables