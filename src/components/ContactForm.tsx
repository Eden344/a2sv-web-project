import {useForm} from "react-hook-form";
import {DevTool} from "@hookform/devtools";

type FormValues = {
  username :string
  email:string
  message:string
}
function ContactForm  () {
 const form = useForm<FormValues>();
 const {register, control, handleSubmit, formState} = form;
 const {errors} = formState;

 const onSubmit = (data : FormValues) =>{
console.log('form submitted', data);
alert('Message sent successfully!');
 };

  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="form-control">
            <label htmlFor = "username">Username</label>
            <input 
            type = "text" 
            id='usename' 
            {...register("username",
            {required:
              {
                value: true,
                message:'username is required'}},
            )}/>
            <p className="error">{errors.username?.message}</p>
            </div>

            <div className="form-control">
            <label htmlFor = "email">Email</label>
            <input 
            type = "email" 
            id='email' 
            {...register("email",{
              pattern:{
                value: /^\S+@\S+$/i,
                message: "invalid email format"
              },
              required:{
                value:true,
                message: "Email is required"

              },
            })}/>
            <p className="error">{errors.email?.message}</p>
            </div>

            <div className="form-control">
            <label htmlFor = "message">Message</label>
            <textarea 
            id='message'
            rows={4}
            {...register("message",
              {required:{
                value:true,
                message:'message is required'}}
            )}/>
            <p className="error">{errors.message?.message}</p>
            </div>

            <button>Submit</button>

        </form>
        <DevTool control={control}/>


      
    </div>
  );
};

export default ContactForm;

 
