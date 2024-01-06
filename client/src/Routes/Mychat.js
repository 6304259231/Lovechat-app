
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './Mychat.css';
import Moment from 'react-moment'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function Mychat() {
    let [input, setInput] = useState(null)
    let [chats, setChats] = useState([])
    let [id, setId] = useState('')
    let [loading, setLoading] = useState(false);

    let submitHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5600/sendchat', { "message": input },
            {
                headers: {
                    'Authorization': localStorage.getItem('jwt')
                }
            }
        )
            .then((res) => {
                console.log('posted message!!!')
                console.log(res.data)
                setChats(res.data)
                setInput('')
            })
            .catch((error) => {
                console.log(error)
            })
    }
    let getMessage = () => {
        setLoading(true)
        axios.get('http://localhost:5600/getchat', {
            headers: {
                'Authorization': localStorage.getItem('jwt')
            }
        })

            .then((res) => {
                setChats(res.data)
                setLoading(false)
                console.log(res, 'messages getted')
            }).catch((error) => {
                setLoading(false)
                console.log(error, "axiosss errorr")
            })
    }
    useEffect(() => {
        getMessage();
    }, [])

    let deleteHandler = (id) => {
        axios.delete(`http://localhost:5600/delete/${id}`, {
            headers: {
                'Authorization': localStorage.getItem('jwt')
            }
        })
            .then((res) => {
                console.log('deleted ddaaaaaaa')
                console.log(res.data)
                setChats(res.data)
                toast.success('deleted successfully')
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <>
            {/* Modal */}
            <div
                className="modal fade"
                id="exampleModal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel" style={{ fontFamily: 'monospace' }}>
                                Delete
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body" style={{ color: 'red' }}> Are you sure want to delete this message !</div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => deleteHandler(id)}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='main-chat-section'>
                <div className="card" style={{ width: "100%", margin: '20px 10px', position: 'sticky', top: '0px', zIndex: '10' ,}}>
                    <h5 className="card-header" style={{ fontFamily: 'monospace' }}>Public</h5>
                    <div className="card-body">
                        <h5 className="card-title">Chat Room 1</h5>
                        <div className='icon-section mb-2' style={{ textAlign: 'left', color: 'green', }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="30" fill="currentColor" className="bi bi-people" viewBox="0 0 16 16">
                                <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
                            </svg>
                        </div>
                        <span>created on </span>
                        <i> <i className='text-muted' style={{ marginLeft: '4px' }}>28 December 2023</i></i>
                    </div>
                </div>
                <div className='chat-section' style={{ margin: '0px' }}>
                    <div className='message-section' style={{ margin: '0px' }}>
                        {
                            loading && (
                                <center style={{display : 'flex' , margin : '20px auto' , 'justifyContent' : 'space-around'}} >
                                <div className="spinner-border text-primary m-2" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <div className="spinner-border text-success m-2" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <div className="spinner-border text-warning m-2" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </center>
                            )
                        }
                        { 
                           !loading && chats && chats.map((eachMessage) => {
                                let { message, time, username, _id, avatar } = eachMessage;
                                let currentUser = localStorage.getItem('payload');
                                let isCurrentUser = currentUser === username;
                                return (
                                    <div className="card current-user" style={{ width: "50%", margin: '10px', boxShadow: '4px 4px 5px black', cursor: 'pointer' }} key={_id}>
                                        <div className='card text-center'>
                                            <h6 className="card-subtitle mb-2 pt-2" style={{ fontFamily: 'monoscope', marginLeft: '3px' }}> <Moment format='DD MMMM YYYY'>{time}</Moment> </h6>
                                        </div>
                                        <div className="card-body">
                                            <div className='user-avatar-section mt-0'>
                                                <img src={avatar} alt="avatar" />
                                            </div>
                                            <h5 className="card-title" style={{ display: 'inline-block', marginTop: '15px', fontFamily: 'monospace', fontSize: '18px', marginLeft: '11px' }}>{username}</h5>
                                            <p className="card mt-3" style={{ fontSize: '16px', fontWeight: '500', fontFamily: 'Dosis', textAlign: 'justify', padding: '10px' }}>{message}</p>
                                            <p style={{ margin: '0px 3px', textAlign: 'right' }}><Moment format='hh:mm a'>{time}</Moment></p>
                                            {isCurrentUser && (
                                                <button onClick={() => setId(_id)} style={{ border: 'none', color: 'red', position: 'absolute', right: '5px', borderRadius: '14px' }} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" fill="currentColor"
                                                        className="bi bi-trash-fill" viewBox="0 0 16 16">
                                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                                                    </svg>
                                                </button>
                                            )
                                            }
                                        </div>
                                    </div>
                                )
                            }
                            )
                        }
                        <div className='post-message-section' style={{ width: '60%', margin: '40px auto' }}>
                            <form onSubmit={submitHandler}>
                                <div className="input-group mb-3">
                                    <textarea className="form-control" placeholder="Write message here...." aria-label="Example text with button addon" style={{ borderRadius: '10px', cols: '10', rows: '20', fontFamily: 'monospace', fontSize: '18px', padding: '9px' }} aria-describedby="button-addon1" value={input} onChange={(e) => {
                                        setInput(e.target.value)
                                    }} />
                                    <input className="btn btn-outline-success ml-2 send-btn" type="submit" id="button-addon1" value="Send" style={{ marginLeft: '10px', borderRadius: '12px', border: 'none', width: '20%' }}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div >
        </>
    )
}

export default Mychat 