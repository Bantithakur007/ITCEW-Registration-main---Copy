import React, { useState } from 'react'
import DisplayData from '../components/DisplayData'
import { toast } from 'react-toastify'
import Loading from '../components/Loading'

const StudentData = () => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
    const [card, setCard] = useState({
        cardId: ""
    })
    const handleInput = (e) => {
        const { name, value } = e.target
        setCard({
            ...card,
            [name]: value
        })
    }
    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        if (!card.cardId) {
            toast.error("Fill Input Field Properly")
            setLoading(false)
            setData('')
        } else {


            try {


                const URL = process.env.REACT_APP_API_URL;
                const fetchStudentData = await fetch(`${URL}/api/getstudent`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(card)
                })
                const response = await fetchStudentData.json()

                if (fetchStudentData.ok) {
                    setCard({
                        cardId: ""
                    })
                    setLoading(false)
                    setData(response)
                    // toast.success("Student Found " + response.student.name)


                } else {
                    setLoading(false)
                    setData("")
                    toast.error(response.message)
                }
            } catch (error) {
                console.log(error)
                toast.error("Internal Server Error")
            }
        }

    }


    return (
        <div>



            <div className="container my-2 " >
                <div className="d-flex justify-content-center  ">
                    <h1 className="text-center  text-light fw-bold rounded-2 py-3 px-2  w-100  fs-4 fs-md-5 fs-lg-3 bg-orange" >
                        Online Attendance Portal - ITCEW
                    </h1>
                </div>

                <form onSubmit={handleSubmit}>


                    <div className="row my-4 w-75 mx-auto">
                        <div className="col d-flex ">
                            <input className='form-control' type="text" placeholder='Scan your ID Card' name='cardId' onChange={handleInput} value={card.cardId} />


                            <button className='btn btn-primary bg-blue ms-1' type='submit'>Submit</button>

                        </div>
                    </div>

                </form>
                {loading ?
                    <Loading /> :
                    <>
                        {
                            data && <DisplayData data={data} />
                        }
                    </>

                }
            </div>
        </div>
    )
}

export default StudentData;
