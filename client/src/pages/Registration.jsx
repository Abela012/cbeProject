
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from '../components/FormError';
import api from "../api/axios.js";


const schema = yup.object().shape({
  firstName: yup.string().required(" Customer's First Name is required!"),
  middleName: yup.string().required(" Customer's Middle Name is required!"),
  lastName: yup.string().required(" Customer's Last Name is required!"),
  businessName: yup.string().required("Customer's Business Name is required!"),
  customerEmail: yup.string().email().required("Customer's Email is required"),
  phoneNumber: yup.string().matches(
    /^0\d{9}$/,
    'Phone number must be in the format 0912345678'
  ).required("Customer's phone number is required "),
  address: yup.string().required("Adress is required"),
  catagory: yup.string().required('please select a catagory')
})


export default function Registration(){


const {register, handleSubmit, reset, formState: {errors}}  = useForm({
  resolver: yupResolver(schema)
})

const submitForm = async (data)=>{
  const response = await api.post('/customer_registration', data);
  console.log(response);
  
  reset()
  
}

   
  return (

      <form className='Hform' onSubmit={handleSubmit(submitForm)} >
      <div className="title"><h2>Customer Registration Page</h2></div>
      <br/>
      <div className="forminput">
      <label htmlFor="fName">First Name</label>
      <input type="text" id='fName' {...register('firstName')} />
       <FormError error={errors.firstName?.message} />
      </div>
      <div className="forminput">
      <label htmlFor="mName">Middle Name</label>
      <input type="text" id='mName' {...register('middleName')} />
       <FormError error={errors.middleName?.message} />
      </div>
      <div className="forminput">
      <label htmlFor="lName">Last Name</label>
      <input type="text" id='lName' {...register('lastName')} />
       <FormError error={errors.lastName?.message} />
      </div>
      <div className="forminput">
      <label htmlFor="bName">Business Name</label>
      <input type ="text"  id='bName' {...register('businessName')} />
      <FormError error={errors.businessName?.message} />
      </div>
      <div className="forminput"> 
      <label htmlFor="email"> Customer Email</label>
      <input type="email" id='email' {...register('customerEmail')} />
      <FormError error={errors.customerEmail?.message} />
      </div>
      <div className="forminput">
      <label htmlFor="pNumber">Phone Number</label>
      <input type="text" id='pNumber' {...register('phoneNumber')} />
      <FormError error={errors.phoneNumber?.message} />
      </div>
      <div className="forminput">
      <label htmlFor="address">Address</label>
      <input type="text" id='address' {...register('address')} />
      <FormError error={errors.address?.message} />
      </div>

      <div className="forminput">
      <label htmlFor="catagory">Case Catagory</label>
  <select id="catagory" {...register('catagory')} >
    <option value="">Select Case Catagory</option>
    <option value="a">A</option>
    <option value="b">B</option>
    <option value="c">C</option>
    <option value="d">D</option>
  </select>
  <FormError error={errors.catagory?.message} />
      </div>
      <button type="submit" className="btn btn-submit">
        Register
      </button>
    already registerd?
    <a href="#"></a>
      </form>

  )
}
