import React, { Component } from 'react';

class Loading extends Component {
    render() {
        if(!this.props.loading){
            return null
        }
        return (
            <div>
                {this.props.loading}
            </div>
        );
    }
}

export default Loading;