import React from 'react'

class PrintContainer extends React.PureComponent {
    state = {  }
    render() { 
        return ( 
            <div>
                 {this.props.children} 
            </div>

         );
    }
}
 
export default PrintContainer;