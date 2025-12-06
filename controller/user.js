    import student from "../model/user.js"
    import bcrypt from 'bcryptjs';
    import jwt from 'jsonwebtoken';
    // REGISTER USER
    export const createStudents = async (req, res) => {
        const {
            name, email, phoneNumber, password, country, state, address, userName
        } = req.body;
        try {
            // check if email exist
        const exit = await student.findOne({email})
        if(exit){ return res.status(404).json
            ({message: "User Name Already Exist"})
        }
            // check if phone number exist
            const phone = await student.findOne({phoneNumber})
            if(phone) 
                return res.status(400).json
                ({message: "Phone Number Already Exist"})

                // HASH PASSWORD
                const salt = await bcrypt.genSalt(10)
                const hashPassword = await bcrypt.hash(password, salt)
                // create user
                const students = await student.create({
                    name, email,
                    phoneNumber,
                    password: hashPassword,
                    country,
                    state,
                    address,
                    userName
                })
                return res.status(201).json({
                    message: "Registration Successful", students
                })
        } catch (error) {
            console.error(error)
            res.status(500).json({message: "Server Error", error: error})
        }
    }

    // GET ALL USERS
    export const getAllStudents = async (req, res) => {
        try {
            let students = await student.find().select
            ('-password')
            res.status(200).json(students)
        } catch (error) {
            res.status(500).json({message: "Server Error",error})
        }
    }

    //LOGIN
    export const loginUser= async (req, res) => {
        //Create Payload
        const { email, password } = req.body
        try {
    //Check user exist
            const user = await student.findOne({ email })
            if(!user)
            return res.status(404).json({ message: "Email Not Registered"})
        // compare password
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch)
        return res.status(400).json({ message: "incorrect password"})

        const token = jwt.sign({ id:user._id}, 
            process.env.SECRET_KEY, { expiresIn: '3hr' } 
        )
        res.status(200).json({message: "Login Successful",
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber
        }
        })
        } catch (error) {
            res.status(500).json({ message: error.message})
        }
    }
    //GET USER BY ID
    export const getUserById = async (req, res) => {
        const  userID = req.params.id
        try {
            const user = await student.findById(userID).select('-password')
            if(!user) return res.status(404).json({ message: "User not found"})
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json({ message: error.message})
        }
    }

    // update user

 export const updateUser = async (req, res) => {
  let userId = req.params.id;

  const { name, email, phoneNumber, country, state, address, userName, password } = req.body;

  try {
    let user = await student.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // update fields
    user.name = name || user.name;
    user.email = email || user.email;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.password = password || user.password;
    user.country = country || user.country;
    user.state = state || user.state;
    user.address = address || user.address;
    user.userName = userName || user.userName;

    await user.save();

    res.status(200).json({
      message: "User updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        country: user.country,
        state: user.state,
        address: user.address,
        userName: user.userName
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

    // delete user
export const deleteUser = async (req, res) => {
  try {
    const user = await student.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
