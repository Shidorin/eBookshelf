import React from 'react'
import './Modal.css'


export const Modal = ({ showModal }) => {
    console.log(showModal)
    return <> {
        showModal ? (
            <div class="modal-content">
                <div class="modal-header">
                    <h2>BOOK NAME same line buttonSAVEadd</h2>
                </div>
                <div class="modal-body">
                    <p>status score dates</p>
                    <p>containers</p>
                </div>
            </div>
        )
            : null}</>
}