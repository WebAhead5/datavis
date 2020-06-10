module.exports = function (req, res, next) {
    const { email, first_name, last_name, password } = req.body;

    //Check email is valid format
    function validEmail(userEmail) {

        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }

    //register: check all fields exist
    if (req.path === "/register") {
        if (![email, first_name, last_name, password].every(Boolean)) {
            return res.json("Missing Credentials");
        } else if (!validEmail(email)) {
            return res.json("Invalid Email");
        }

        //login: check all fields exisit
    } else if (req.path === "/login") {
        if (![email, password].every(Boolean)) {
            return res.json("Missing Credentials");
        } else if (!validEmail(email)) {
            return res.json("Invalid Email");
        }
    }

    next();
};
