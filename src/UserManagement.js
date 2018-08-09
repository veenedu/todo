import React, { Component } from 'react';
import LoginForm from './LoginForm'
import RegistrationForm from './RegistrationForm'

let divLink={
    cursor:'pointer',
    display:'inline-block',
    marginRight:16
}

let comps= {
    login:LoginForm,
    register:RegistrationForm
}

class UserManagement extends Component {

    state = {
        compName: 'login'
    }

    onLinkClick= (compName)=>{
        this.setState({
            compName:compName
        })
    }

    render() {
        let ComponentToRender = comps[this.state.compName]
        let selectedLink = {
            background:'red'
        }
        return (
            <div>
                <div>
                    <div onClick={()=>{this.onLinkClick('login')}} style={{...divLink, ...this.state.compName=='login'? selectedLink:{}  }}>Login</div>
                    <div onClick={()=>{this.onLinkClick('register')}} style={{...divLink, ...this.state.compName=='register'? selectedLink:{}  }}>Register</div>
                </div>
                <ComponentToRender />
            </div>
        );
    }
}

export default UserManagement;