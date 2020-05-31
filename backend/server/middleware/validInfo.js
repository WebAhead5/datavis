module.exports = function (req, res, next) {
    const { email, first_name, last_name, password } = req.body;

    //Check email is valid format
    function validEmail(userEmail) {
        console.log(1);

        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }
    console.log(req.path);

    //register: check all fields exist
    if (req.path === "/register") {
        console.log(email.length, 'email length');
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
