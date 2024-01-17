import { useState } from "react";
import { Link,useNavigate } from "react-router-dom"
import { useForm, useWatch } from "react-hook-form";
import dark from "./assets/moon.png"
import light from "./assets/light.png"

function Form(props) {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { darkmode, setDarkMode } = props;

  const toggleDarkMode = () => {
    setDarkMode(!darkmode);
  };

  const bgStyle = darkmode ? { background: "rgb(18, 72, 112)" } : {};
  
  const navigate = useNavigate();
  const password = watch('password', '');

  const onSubmit = data => {
    console.log(data);
    setIsSubmitted(true);

      setTimeout(()=>{
        navigate('/');
      },1000
      )

  };

  return (
    <div className="bg-red-500 main2" style={bgStyle}>

<nav className='flex justify-between bg-gray-50 h-100 p-6'>

<Link to={'/'}><img className='h-9 hover:opacity-80' src="https://kalvium.com/wp-content/uploads//2023/04/Kalvium-Logo-SVG.svg" alt="logo" />
</Link>
<div className="theme-btn flex items-center justify-between">
  <img className="h-8" src={darkmode ? light : dark} alt="" onClick={toggleDarkMode} />
  <Link to={'/'}><button className="border border-white bg-red-500 p-2 px-6 rounded text-white font-bold hover:bg-gray-500 transition duration-300">Home</button></Link>


</div>
</nav>
      <center>
        <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>

          {isSubmitted && !Object.keys(errors).length && (
            <div className="pop p-3  rounded mb-5"><p className="registered-heading">Account created successfully</p></div>
          )}

          <h2 className="register-head">Create an Account</h2>


          <label htmlFor="firstname">Full Name</label>
          <input className="form-input" {...register('firstname', {
            required: 'This Field is required',
            minLength: { value: 3, message: 'Minimum 3 characters are required' },
            maxLength: { value: 30, message: 'Maximum length is 30 characters' }
          })} placeholder="Enter your First Name" id="firstname" />
          <br />
          {errors.firstname && <span  className="error-span">{errors.firstname.message}</span>}



          <label htmlFor="email">Email</label>
          <input className="form-input" {...register('email', {
            required: 'This Field is required',
            pattern: { value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Invalid email' },
            minLength: { value: 4, message: 'Minimum 4 characters are required' },
            maxLength: { value: 30, message: 'Maximum length is 20 characters' }
          })} placeholder="Enter your Email address" id="email" />
          <br />
          {errors.email && <span className="error-span">{errors.email.message}</span>}


          <label htmlFor="password">New Password</label>
          <input className="form-input" {...register('password', {
            required: 'This Field is required',
            minLength: { value: 10, message: 'Minimum 10 characters are required' },
            maxLength: { value: 20, message: 'Maximum length is 20 characters' },
            pattern: {
              value: /^(?=.*[!@#$%^&*])/, 
              message: 'Password must contain at least one special character',
            }
          })} placeholder="Enter your Password" type="password" id="password" />
          <br />
          {errors.password && <span className="error-span">{errors.password.message}</span>}


          <label htmlFor="repeat-password">Re-enter the Password</label>
      <input
        className="form-input"
        {...register('repeatPassword', {
          required: 'This Field is required',
          validate: value => value === password || 'Your Password do not match',
        })}
        placeholder="Re-enter the Password"
        type="password"
        id="repeat-password"
      />
      <br />
      {errors.repeatPassword && <span  className="error-span">{errors.repeatPassword.message}</span>}


      <label className="terms" htmlFor="terms">
        <input
          type="checkbox"
          id="terms"
          {...register('terms', { required: 'You must accept the terms and conditions' })}
        />
       &nbsp;&nbsp;Accept <span className="  underline">Terms and Conditions</span>
      </label>
      <br />
      {errors.terms && <span className="error-terms" >{errors.terms.message}</span>}

          <br />
          <button type="submit" className="sub-btn">Signup</button>

        </form>



      </center>




    </div>
  )
}

export default Form