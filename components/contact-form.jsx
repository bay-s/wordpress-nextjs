import { useState } from "react";
import ErrorMessage from "./error-message";
 
const ContactForm = () => {
    const [contact,setContact] = useState({
        name:"",
        subject:"",
        email:"",
        message:""
      })
    const [message,setMessage] = useState({
      pesan:'',
      error:false,
      isLoading:false,
      sukses:false
    })  
    
      const handlerChange = (e) => {
        const {name,value} = e.target
        setContact(contact => ({
          ...contact,
          [name]:value
        }));
        
      }

 const sendMessage = (e) => {
    e.preventDefault()
    setMessage({ ...message, 
      isLoading:true
    }); 
    const scriptUrl = `https://script.google.com/macros/s/AKfycbxKbGQXTjkq4NKgLqbT75rpXD4EsO6RGnRS7eZbDOc0yFfndhEiTHbJ3prQDw5e3FajlA/exec`;
  console.log(contact);
    if(!contact.name){
      errMessage(`Name field are required `)
      return
    }else if(!contact.email){
      errMessage(`Email field are required `)
      return
    }else if(!contact.subject){
      errMessage(`Subject field are required `)
      return
    }else if(!contact.message){
      errMessage(`Message field are required `)
      return
    }

    const formData = new FormData();
    for (const property in contact) {
      if (contact.hasOwnProperty(property)) {
        formData.append(property, contact[property]);
      }
    }
   
    fetch(scriptUrl, { method: "POST", body: formData })
    .then(response => {
      if(response.ok){
        successMessage('Send message success !')
      }else{
        errMessage(`Something wrong sent message failed`)
      }
    })
    .catch(error => {
      console.error('Error!', error.message)
      errMessage(`Something wrong ${error.message}`)
    });

 };
      
     
const successMessage = (msg) => {
  setMessage({ ...message, 
    sukses:true,
    error:false,
    isLoading:false,
    pesan:msg
  }); 
  setContact({
    name: "",
    subject: "",
    email: "",
    message: ""
  });
}   

const errMessage = (msg) => {
  setMessage({ ...message, 
    sukses:false,
    error:true,
    isLoading:false,
    pesan:msg
  }); 
 
}
    return(
<article className="is-flex flex-column gap-2" id="contact-list">


 <h4 className="is-title txt-white is-size-4 mb-5">Send me a message</h4>
   <form className="is-flex flex-column gap-1" onSubmit={sendMessage}  >
 
<div class="field">
<label class="label ">Name</label>
<div class="control">
<input className="input bg-transparent is-primary" name="name" type="text" onChange={handlerChange }/>
</div>
</div>

<div class="field">
<label class="label ">Email</label>
<div class="control">
<input className="input bg-transparent is-primary" name="email" type="email" onChange={handlerChange } required  />
</div>
</div>

<div class="field">
<label class="label ">Subject</label>
<div class="control">
<input className="input bg-transparent is-primary" name="subject" type="text" onChange={handlerChange }/>
</div>
</div>

<div class="field">
  <label class="label">Message</label>
  <div class="control">
    <textarea class="textarea bg-transparent is-primary" name="message" onChange={handlerChange }></textarea>
  </div>
</div>

{
  message.isLoading ?  <a href="#" className="button is-link is-loading" disabled>Submit</a>
  : <button className="button is-link" type="submit">Submit</button>
}
</form>

<ErrorMessage pesan={message.pesan} isError={message.error} sukses={message.sukses}/>
</article>
    )
}

export default ContactForm



{/* <article className="column is-6">

<h4 className="is-title txt-white is-size-4 mb-5">Send me a message</h4>
  <form className="is-flex flex-column gap-1" onSubmit={sendMessage}  >

<div class="field">
<label class="label ">Name</label>
<div class="control">
<input className="input bg-transparent is-primary" name="name" type="text" onChange={handlerChange }/>
</div>
</div>

<div class="field">
<label class="label ">Email</label>
<div class="control">
<input className="input bg-transparent is-primary" name="email" type="email" onChange={handlerChange } required  />
</div>
</div>

<div class="field">
<label class="label ">Subject</label>
<div class="control">
<input className="input bg-transparent is-primary" name="subject" type="text" onChange={handlerChange }/>
</div>
</div>

<div class="field">
 <label class="label">Message</label>
 <div class="control">
   <textarea class="textarea bg-transparent is-primary" name="message" onChange={handlerChange }></textarea>
 </div>
</div>

{
 message.isLoading ?  <a href="#" className="button is-link is-loading" disabled>Submit</a>
 : <button className="button is-link" type="submit">Submit</button>
}
</form>
</article>

<article className="column is-flex flex-column gap-2">

<h4 className="is-title txt-white is-size-5 text-center mb-5">We're open for any suggestion or just to have a chat</h4>
 
 <ul className="is-flex flex-column gap-5 mt-5">
 <li className="is-flex align-center gap-2">
  <i class="fa fa-map-marker is-size-3" aria-hidden="true"></i>
  <span className="">Address :  Bekasi Selatan</span>
  </li>

  <li className="is-flex align-center gap-2">
  <i class="fa fa-phone is-size-3" aria-hidden="true"></i>
  <span className="">WhatsApp :  Bekasi Selatan</span>
  </li>

  
  <li className="is-flex align-center gap-2">
  <i class="fa fa-paper-plane is-size-4" aria-hidden="true"></i>
  <span className="">Email :  bayux265@gmail.com</span>
  </li>
   
  <li className="is-flex align-center gap-2">
  <i class="fa fa-github is-size-3" aria-hidden="true"></i>
  <a className="txt-white" href="https://github.com/bay-s" target="blank">Github </a>
  </li>
 </ul>

<ErrorMessage pesan={message.pesan} isError={message.error} sukses={message.sukses}/>
</article> */}
