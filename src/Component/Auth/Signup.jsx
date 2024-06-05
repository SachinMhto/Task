import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../ReduxToolKit/AuthSlice";
import { useNavigate } from "react-router-dom";

const Signup = ({ togglePanel }) => {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const navigate = useNavigate();
  const [formData, setFormdata] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });
  const [isRegistered, setIsRegistered] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (auth.data && auth.data.status) {
      alert("Registration successful!");
      setFormdata({
        username: "",
        email: "",
        password: "",
        role: "",
      });
      setIsRegistered(true);
    }
  }, [auth.data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
    console.log("Loginform", formData);
  };

  return (
    <div>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <h1 className="text-lg font-bold text-center pb-8">Register Here</h1>
        <TextField
          fullWidth
          label="Username"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter Your Name.."
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter Your Email.."
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter Your password.."
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select Role</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="role"
            value={formData.role}
            label="Role"
            onChange={handleChange}
          >
            <MenuItem value={"ROLE_CUSTOMER"}>USER</MenuItem>
            <MenuItem value={"ROLE_ADMIN"}>ADMIN</MenuItem>
          </Select>
        </FormControl>
        <div>
          <Button
            fullWidth
            className="customeButton"
            type="submit"
            sx={{ padding: ".9rem" }}
          >
            Register
          </Button>
        </div>
      </form>
      <div className="flex justify-center items-center mt-2 py-5 gap-2">
        <Button onClick={togglePanel}>Sign in</Button>
      </div>
    </div>
  );
};

export default Signup;
