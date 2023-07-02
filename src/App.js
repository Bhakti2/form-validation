import {
  Button,
  MenuItem,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
    Modal,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";

function App() {



  //Manage Object

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const Hobbies = [
    "Dancing",
    "Singing",
    "sports",
    "Painting",
    "Cooking",
    "Gaming",
    "Travelling",
    "Go to Seashore",
  ];
  const Country = ["India", "USA", "UK", "Korea", "New Zealand", "	Spain", "Saudi Arabia"];

  //Manage states
  const [open, setOpen] = useState(false);

  //Manage useEffects

  //Functions

  // formik validatoinSchema to validate inputs
  const validationSchema = yup.object({
    userName: yup.string("Enter your Name").required("UserName is required"),
    address: yup
      .string("Enter your Address")
      .min(10, "Address should be of minimum more than 10 characters length")
      .required("Address is required"),
    gender: yup.string("Enter your Gender").required("Gender is required"),
    hobbies: yup.array().of(yup.string()),
  });

  const formik = useFormik({
    initialValues: {
      userName: "",
      address: "",
      gender: "female",
      country: "India",
      hobbies: [],
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      setOpen(true);
      
      // alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <Modal
        open={open}
        onClose={() => {setOpen(false) ; formik.resetForm();}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            User Entered Values:
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Username : {formik.values.userName ? formik.values.userName : "None" } 
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Address: {formik.values.address ? formik.values.address : "None"}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Country: {formik.values.country ? formik.values.country : "None"}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Gender: {formik.values.gender ? formik.values.gender : "None"}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Hobbies: {formik.values.hobbies.length > 0 ? formik.values.hobbies.join(",") : "None"}
          </Typography>
          <div style={{display: "flex", justifyContent:"end"}}>

          <Button color="primary" variant="contained" onClick={() => {setOpen(false) ; formik.resetForm();}}>CLose</Button>

          </div>
        </Box>
      </Modal>

      <Box
        container
        display="flex"
        alignItems="center"
        sx={{ height: "100vh" }}
        style={{ backgroundColor: "#ecebed" }}
      >
        <Grid container justifyContent="center">
          <div style={{ backgroundColor: "white",    padding: "34px 25px",
    borderRadius:" 14px",
    borderTop: "10px solid #0070ff" }}>
            <form onSubmit={formik.handleSubmit}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{ textAlign: "center", marginBottom: "25px" }}
              >
                User Information
              </Typography>
              <Grid item sx={{ m: 1, width: 300 }}>
                <TextField
                  id="userName"
                  name="userName"
                  label="Username"
                  fullWidth
                  variant="outlined"
                  value={formik.values.userName}
                  onChange={formik.handleChange}
                  error={formik.touched.userName && Boolean(formik.errors.userName)}
                  helperText={formik.touched.userName && formik.errors.userName}
                />{" "}
              </Grid>

              <Grid item sx={{ m: 1, width: 300 }}>
                <TextField
                  id="address"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  error={formik.touched.address && Boolean(formik.errors.address)}
                  helperText={formik.touched.address && formik.errors.address}
                  label="Address"
                  multiline
                  rows={4}
                  fullWidth
                  variant="outlined"
                />
              </Grid>

              <Grid item sx={{ m: 1, width: 300 }}>
                <TextField
                  id="country"
                  name="country"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  select
                  fullWidth
                  label="Country"
                  defaultValue="India"
                  variant="outlined"
                >
                  {Country.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item sx={{ m: 1, width: 300 }}>
                <InputLabel id="gender">Gender</InputLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  error={formik.touched.gender && Boolean(formik.errors.gender)}
                  helperText={formik.touched.gender && formik.errors.gender}
                >
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>{" "}
              </Grid>

              <Grid item>
                <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel id="demo-multiple-name-label">Hobby</InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    name="hobbies"
                    value={formik.values.hobbies}
                    onChange={formik.handleChange}
                    multiple
                    fullWidth
                    input={<OutlinedInput label="Name" />}
                    MenuProps={MenuProps}
                  >
                    {Hobbies.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Button color="primary" variant="contained" fullWidth type="submit">
                Submit
              </Button>
            </form>
          </div>
        </Grid>
      </Box>
    </>
  );
}

export default App;
