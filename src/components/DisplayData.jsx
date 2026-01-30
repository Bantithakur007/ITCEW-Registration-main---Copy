import React, { useEffect, useRef } from 'react'

const DisplayData = (props) => {
   
    const { name, course, session, fname, image, city, card } = props.data.student
    const capitalize = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    let currentDate = new Date().toDateString()
    let currentTime = new Date().toLocaleTimeString()


    const audioRef = useRef(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    }, []);
   
    return (
        <div>
         
            <div className="container my-5 " style={{ minHeight: "100vh" }}>


                <div className="row my-2 ">
                    <hr />
                    <div className="row ">

                        <div className="row p-0">
                            <h5 className='text-primary'>{currentDate}</h5>
                            <h5 className='fs-1 fw-bold text-primary'>{currentTime}</h5>


                        </div>
                        <hr />
                        <div className="row p-0">
                            <div className="d-flex ">
                                <h5>ID : <span className='text-success'>{card}</span></h5>

                                <h5 className='ms-1'>Name : <span className='text-success'>{capitalize(name)}</span></h5>
                            </div>
                            <h5>Father Name : <span className='text-success'>{capitalize(fname)}</span></h5>
                            <h5>Course : <span className='text-success'>{course}</span></h5>
                            <h5>Session : <span className='text-success'>{capitalize(session)}</span></h5>
                            <h5>City : <span className='text-success'>{city}</span></h5>
                        </div>
                        <hr />
                        <div className="row my-2 ">
                            <img className=' border border-1 p-2 rounded-2' src={image} alt="studentimg" style={{ width: "10rem" }} />
                        </div>
                        <hr />
                        <hr />
                        <audio className='mb-3' style={{ width: "20rem" }} ref={audioRef} src="/image/thankyou.wav" controls preload="auto"></audio>
                        <hr />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DisplayData
