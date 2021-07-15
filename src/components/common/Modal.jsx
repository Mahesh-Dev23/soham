import React from 'react'
import Modal from 'react-modal'

function Modal1(props) {
    return (
        <Modal isOpen={props.modal}
                    style={{
                    overlay: {
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(20, 20, 20, 0.9)',
                        backdropFilter: 'blur(10px)',
                        zIndex: 999
                    },
                    content:{
                        inset:0,
                        background: 'rgba(40, 44, 52, 0)'
                    }
                    } }
                    
                   
                > 
                {props.children}   
                   
                </Modal>
    )
}

export default Modal1
