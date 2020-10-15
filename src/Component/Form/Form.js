
import React, { Fragment } from "react"
import MultiSelect from "react-multi-select-component";
import "./Form.css"


class Form  extends React.Component{

    constructor(){
        super()
        this.state={
            firstName:"",
            lastName:"",
            Phone:"",
            email:"",
            select:"",
            password:"",
            confirmpassword:"",
            selectedDate:"",
            radio:"",
            selectedOption:"Male",
            submit:false,
            disabled:false,
            emailerr:false,
            confirmPassword:"",
            optionsState:"",
            passworderr:false,
            valierr:false,
            telLener:false,
            telerr:false,
            passwordPattern:false
        }
    }

    handleDateChange=(e)=>{//function for setting the date in the state
        this.setState({selectedDate:e.target.value,valierr:false})
    }

    handlechange=(e)=>{//functionn for setting the value first name and last name
        if(e.target.value.match(/^[a-zA-Z]+$/)){
            this.setState({[e.target.name]:e.target.value})
        }else{
            //dont do anything
        }
       
    }

    handleSelectoption = (e) => {
        this.setState({ selectedOption: e.target.value, valierr: false })
    }

    handleemailvalidation = (e) => {//HANDLE EMAIL VALIDATION
        this.setState({ emailerr: false, valierr: false, disabled: false })
        if (e.target.value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,6}$/)) {// VALIDATING THE EMAIL
            this.setState({ [e.target.name]: e.target.value, disabled: false })
        }
        else {
            this.setState({ [e.target.name]: e.target.value }, () => {
                this.setState({ emailerr: true, disabled: true })
            })
        }
    }

    handlephonevalidation = (e) => {//Phone number validation
        this.setState({ telerr: false, valierr: false, telLener: false, disabled: false })
        if (e.target.value.match(/^[0-9]*$/i)) {
            var tel = document.getElementsByClassName("tel")[0]
            tel.setAttribute("maxLength", "10")
            tel.setAttribute("minLength", "10")
            this.setState({ [e.target.name]: e.target.value }, () => {
                if (this.state.Phone.length < 10) {
                    this.setState({ disabled: true, telLener: true })
                }
            })
        } else {
            this.setState({ telerr: true,disabled:true })
        }
    }

    setSelected=(e)=>{//for setting the select value in state
        this.setState({optionsState:e.target.value,valierr:false})
    }

    handlepassword=(e)=>{
        this.setState({[e.target.name]:e.target.value,passworderr:false,valierr:false,passwordPattern:false})
    }

    handletogglepassword=()=>{
        const password = document.getElementsByClassName('Password')[0];
        const eye = document.getElementsByClassName('eye')[0];
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
    
    }
    handletoggleConfirmpassword=()=>{
        const password = document.getElementsByClassName('confirmPassword')[0];
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
    
    }

    handleSubmit=()=>{//functionn to trigger on submit
        const{firstName,lastName,Phone,email,options,password,selectedDate,submit,selectedOption,confirmPassword,optionsState}=this.state
            this.setState({submit:true},()=>{
                if(firstName.trim()===""||lastName.trim()===""||Phone.trim()===""||email.trim()===""||password.trim()===""||selectedDate.trim()===""||confirmPassword.trim()===""||optionsState.trim()===""){
                    this.setState({valierr:true})
                }else{
                    if(password.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$")){//logic to check if password match the pattern
                        this.setState({passwordPattern:true})
                    }else{
                        if(password!==confirmPassword){//logic to check if the password is same or not
                            this.setState({passworderr:true})
                        }else{
                            alert(`firstName:${firstName},
                            lastName:${lastName},
                            Phone:${Phone},
                            email:${email},
                            password:${password},
                            selectedDate:${selectedDate},
                            selectedOption:${selectedOption},
                            confirmPassword:${confirmPassword},
                            optionsState:${optionsState}`)
                        }
                    }
                    
                }
                   
            }) 
    }

    

    render(){
        const{firstName,lastName,Phone,email,passwordPattern,password,selectedDate,submit,selectedOption,valierr,confirmPassword,optionsState,passworderr}=this.state
        return(
            <Fragment>
                <div className="formContainer">
                    <h2>Registration Form</h2>
                    <div className="form">
                        <div className="form-group">
                            <label className="required">First Name</label>
                            <input
                            type="text"
                            name="firstName"
                            value={firstName}
                            className={submit && firstName === "" ? "form-control Inputerror" : "form-control"}
                            onChange={this.handlechange}/>
                            <i className="fas fa-user"></i> 
                        </div>
                        <div className="form-group">
                            <label className="required">Last Name</label>
                            <input
                            type="text"
                            name="lastName"
                            className={submit && lastName === "" ? "form-control Inputerror" : "form-control"}
                            value={lastName}
                            onChange={this.handlechange}/>
                            <i className="fas fa-user"></i> 
                        </div>
                        <div className="form-group">
                            <label className="required">BirthDay</label>
                            <input
                                type="date"    
                                format="MM/dd/yyyy"
                                value={selectedDate}
                                className={submit && selectedDate=== "" ? "form-control Inputerror" : "form-control"}
                                onChange={this.handleDateChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="radio" className={submit && selectedOption === "" ? "required error-lblnew" : "required"}>Gender:</label>
                        
                            <div>
                                <label className="checkbox-inline"><input type="radio"
                                    value="Male" name="selectedOption"
                                    checked={selectedOption === "Male"}
                                    onChange={this.handleSelectoption} /> Male</label>
                                <label className="checkbox-inline"><input type="radio"
                                    value="Female"
                                    checked={selectedOption === "Female"}
                                    name="selectedOption"
                                    onChange={this.handleSelectoption} /> Female</label>
                            </div>
                            
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" className={submit && email === "" ? "required error-lblnew" : "required"}>Email:</label>
                            <input type="text"
                                className={submit && email === "" ? "form-control Inputerror" : "form-control"}
                                name="email"
                                value={email}
                                onChange={this.handleemailvalidation} />
                                <i className="fas fa-envelope"></i>
                            {this.state.emailerr ? <p className="error">Use Valid Email Address*</p> : <div></div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" className="required"> Phone Number:</label>
                            <input type="text"
                                className={submit && Phone=== "" ? "form-control Inputerror tel" : "form-control tel"}
                                name="Phone"
                                value={Phone}
                                onChange={this.handlephonevalidation} />
                                <i className="fas fa-phone"></i>
                            {this.state.telerr ? <p className="error">Phone number can be numbers only*</p> : <div></div>}
                            {this.state.telLener ? <p className="error">Phone number  should be of  atleast 10 digit  *</p> : <div></div>}
                        </div>
                        <div className="form-group">
                            <label className="required">Password</label>
                                <input
                                type="password"
                                className={submit && password === "" ? "form-control Inputerror Password" : "form-control Password"}
                                name="password"
                                value={password}
                                onChange={this.handlepassword}
                                />
                                <i className="fas fa-eye eye"  onClick={this.handletogglepassword}></i> 
                        </div>
                        <div className="form-group">
                            <label className="required"> Confirm Password</label>
                                <input
                                type="password"
                                className={submit && confirmPassword === "" ? "form-control Inputerror confirmPassword" : "form-control confirmPassword"}
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={this.handlepassword}/>
                                <i className="fas fa-eye "  onClick={this.handletoggleConfirmpassword}></i>
                        </div>
                        <div  className="form-group">
                            <label className="required"> Select</label>
                            <select 
                            value={optionsState} 
                            onChange={this.setSelected}
                            className={submit && optionsState === "" ? "form-control Inputerror optionsState" : "form-control optionsState"}>
                                 <option value=""></option>
                                <option value="Apple">Apple</option>
                                <option value="Banana">Banana</option>
                                <option value="Cranberry">Cranberry</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        {passworderr?<p className="error">Password and Confirm Password must be same</p>:""}
                        {valierr?<p className="error">Please fill all the mandatory  field</p>:""}
                        {passwordPattern?<p className="error">Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character</p>:""}
                        <button onClick={this.handleSubmit} 
                        className={this.state.disabled ? "disable" : "primaryBtn"}
                        
                         disabled={this.state.disabled}>
                            Submit
                        </button>
                    </div>
                </div>
            </Fragment>
        )
    } 
}

export default Form

