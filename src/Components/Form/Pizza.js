import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as yup from 'yup';
import axios from 'axios'
import Nav from '../MainPage/Nav';

const FormCont = styled.form `
display: flex;
flex-direction: column;
align-items: center;
background-color: teal;
padding: 20px;

label{
    margin: 0px 0px 15px 0px;
    align-items: center;
}
input{
    padding: 10px;
}
button{
    width: 200px;
    padding: 8px 15px 8px 15px;
	background: #FF8500;
	color: #fff;
	box-shadow: 1px 1px 4px #DADADA;
	-moz-box-shadow: 1px 1px 4px #DADADA;
	-webkit-box-shadow: 1px 1px 4px #DADADA;
	border-radius: 3px;
	-webkit-border-radius: 3px;
    -moz-border-radius: 3px;

}

input[type=text],input[type=password], textarea, select{
border: none;
	padding: 8px 15px 8px 15px;
	background: #FF8500;
	color: #fff;
	box-shadow: 1px 1px 4px #DADADA;
	-moz-box-shadow: 1px 1px 4px #DADADA;
	-webkit-box-shadow: 1px 1px 4px #DADADA;
	border-radius: 3px;
	-webkit-border-radius: 3px;
    -moz-border-radius: 3px;
}
`;
const ErrorMsg = styled.p `

  font-size: 1.2rem;
  color: red;

`;
const NavCont = styled.div `
    margin: 20px 0;

`;

const Form = ()=>{
  
//set initial form state
const [formState, setFormState] = useState({
  name: "",
  phone: "",
  instructions: "",
  size: "",
  pep:false,
  saus:false,
  cheese:false,
  pine: false,
});

//button disabled state
const [buttonDisabled, setButtonDisabled] = useState(true);

//errors state
const [errors, setErrors] = useState({
  name: "",
  phone: "",
});


const [post, setPost] = useState([]);

const validateChange = (e) => {
  

  yup
    .reach(formSchema, e.target.name)
    .validate(e.target.name  ? e.target.value : null)
    .then((valid) => {

      setErrors({
        ...errors,
        [e.target.name]: ""
      });
    })
    .catch((err) => {
      console.log(err);

      
      setErrors({
        ...errors,
        [e.target.name]: err.errors[0]
      });
    });
};
// onSubmit function
const formSubmit = (e) => {
  e.preventDefault(); 

  axios
    .post("https://reqres.in/api/users", formState)
    .then((res) => {
      
      // update temp state with value from API to display in <pre>
      setPost(res.data);
      setFormState({
        name: "",
        phone: "",
        instructions:"",
        size:"",
        pep:"",
        saus:"",
        cheese:"",
        pine:""
        
      });
    })
    .catch((err) => {});
};

// onChange function
const inputChange = (e) => {
  e.persist();
  const newFormData = {
    ...formState,
    [e.target.name]:
      e.target.type === "checkbox" ? e.target.checked : e.target.value
  };

  validateChange(e);
  setFormState(newFormData);
};

// schema used for all validation to determine whether the input is valid or not
const phoneRegex = RegExp(
    /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
  );
const formSchema = yup.object().shape({
  name: yup.string().min(2,"Must have at least 2 characters").required("Name is required"), // must include name or else error
  instructions: yup.string(),
  phone: yup.string().matches(phoneRegex, "Invalid phone number").required("Phone is required"),
  size: yup.string().oneOf(['Small', 'Medium', 'Large', 'XL']),
  pep: yup.boolean(),
  saus: yup.boolean(),
  cheese: yup.boolean(),
  pine: yup.boolean(),
    


  
});

// whenever state updates, validate the entire form. if valid, then change button to be enabled.
useEffect(() => {
  formSchema.isValid(formState).then((isValid) => {
    setButtonDisabled(!isValid);
  });
}, [formState]);

   
    return(
        
<FormCont onSubmit={formSubmit}>
    <NavCont>
        <Nav />
    </NavCont>
    
<label htmlFor="name">
        Name:
        <input
          id="name"
          type="text"
          name="name"
          data-cy="name"
          placeholder="Name" 
          value={formState.name}
          onChange={inputChange}
        />
        {errors.name.length > 0 ? <ErrorMsg>{errors.name}</ErrorMsg> : null}
    </label>
    <label htmlFor="phone">
        Phone:
        <input
          id="phone"
          type="text"
          name="phone"
          data-cy="phone"
          placeholder="Phone Number" 
          value={formState.phone}
          onChange={inputChange}
        />
        {errors.phone.length > 0 ? <ErrorMsg>{errors.phone}</ErrorMsg> : null}
        
    </label>
    <label htmlFor="size">Pizza Size:
        <select id="size" data-cy="size" name="size" value={formState.size} onChange={inputChange}>
        <option value="choose">--Choose A Size--</option>
        <option value="Small">Small</option>
        <option value="Medium">Medium</option>
        <option value="Large">Large</option>
        <option value="XL">XL</option>
    </select>
   
    </label>


    <label htmlFor="toppings">Choose Toppings:
    <input
          data-cy="toppings"
          id="pep"
          type="checkbox"
          name="pep"
          value={formState.pep}
          onChange={inputChange}
        />Pepperoni
        <input
          id="saus"
          type="checkbox"
          name="saus" 
          value={formState.saus}
          onChange={inputChange}
        />Sausage
         <input
          id="cheese"
          type="checkbox"
          name="cheese" 
          value={formState.cheese}
          onChange={inputChange}
        />Extra Cheese
        <input
          id="pine"
          type="checkbox"
          name="pine" 
          value={formState.pine}
          onChange={inputChange}
        />Pineapple

    </label>

    <label htmlFor="instructions">
        Special Instructions:
        <textarea
        id="instructions" 
        data-cy="instructions"
        type="instructions"
        placeholder="Special Instructions"
        name="instructions"
        value={formState.instructions}
        onChange={inputChange} />
        
    </label>
   
    <button data-cy="submit" disabled={buttonDisabled}>Place Order</button>
    <pre>{JSON.stringify(post, null, 2)}</pre>
</FormCont>
    )
}

export default Form;