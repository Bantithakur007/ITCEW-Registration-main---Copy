import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const Home = () => {
    const [image, setImage] = useState('image/profile.webp')
    const [allowimg, setAllowimg] = useState(false)
    const [data, setData] = useState({
        card: "",
        name: "",
        session: "",
        fname: "",
        address: "",
        city: "",
        state: "",
        course: '',
        image: ""
    })

    const fileInputRef = useRef(null);

    useEffect(() => {

        const isFormVaild = Object.values(data).every(value => value.trim() !== "")

        setAllowimg(isFormVaild)

    }, [data])


    const uploadImgae = (e) => {
        const file = e.target.files[0]

        if (file) {
            const fileSizeKB = file.size / 1024
            if (fileSizeKB <= 40) {
                let render = new FileReader();
                render.readAsDataURL(file);
                render.onload = () => {
                    setImage(render.result)
                    setData({
                        ...data,
                        image: render.result
                    })

                }
            } else {
                setAllowimg(false)
                toast.error("File size Should be less than 40kb", { autoClose: 4000 })

            }
        }
    }
    const handleInput = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!allowimg) {
                // Display an error message or take appropriate action
                toast.error('Please fill in all fields.');
                return;
            }

            const URL = process.env.REACT_APP_API_URL
            // const URL = 'http://localhost:8080'
            const fetchdata = await fetch(`${URL}/api/createstudent`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
                credentials: 'include',
            })

            const response = await fetchdata.json();

            if (fetchdata.ok) {
                setData({
                    card: '',
                    name: "",
                    session: "",
                    fname: "",
                    address: "",
                    city: "",
                    state: "",
                    course: '',
                    image: ""
                });
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
                setImage('image/profile.webp');
                toast.success(response.message)
            } else {
                toast.error(response.message)
            }
        } catch (error) {


            // Check if the error has a response from the backend
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Request Not Sent. Something went wrong!");
            }
        }

    }
    return (
        <div className="container-fluid py-5" style={{ background: "#f1fff2" }}>
            <div className="d-flex justify-content-center">
                <h1 className="text-center bg-orange w-75 text-light rounded-2 p-2 shadow">
                    Online Attendance Registration Portal - ITCEW
                </h1>
            </div>

            <form className="my-5 container border rounded-3 shadow-lg p-4 bg-white" onSubmit={handleSubmit}>
                <div className="mb-3">
                    {/* First Row */}
                    <div className="row">
                        <div className="col-md-6">
                            <label htmlFor="cardnumber" className="form-label fw-bold">I-card Number</label>
                            <input onChange={handleInput} name="card" value={data.card} type="number" className="form-control form-control-lg" id="cardnumber" required />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="name" className="form-label fw-bold">Student Name</label>
                            <input onChange={handleInput} name="name" value={data.name} type="text" className="form-control form-control-lg" id="name" required />
                        </div>
                    </div>

                    {/* Second Row */}
                    <div className="row">
                        <div className="col-md-4">
                            <label htmlFor="session" className="form-label fw-bold">Session</label>
                            <input onChange={handleInput} name="session" value={data.session} type="text" className="form-control form-control-lg" id="session" required />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="fname" className="form-label fw-bold">Father Name</label>
                            <input onChange={handleInput} name="fname" value={data.fname} type="text" className="form-control form-control-lg" id="fname" required />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="course" className="form-label fw-bold">Course</label>
                            <select className="form-select form-control-lg" id="course" onChange={handleInput} name="course" value={data.course} required>
                                <option value="" disabled>Select Course</option>
                                <option value="ADIT">ADIT</option>
                                <option value="ADHN">ADHN</option>
                                <option value="HACKING">HACKING</option>
                            </select>
                        </div>
                    </div>

                    {/* Third Row */}
                    <div className="row">
                        <div className="col">
                            <label htmlFor="address" className="form-label fw-bold">Address</label>
                            <input onChange={handleInput} name="address" value={data.address} type="text" className="form-control form-control-lg" id="address" required />
                        </div>
                    </div>

                    {/* Fourth Row */}
                    <div className="row">
                        <div className="col-md-6">
                            <label htmlFor="city" className="form-label fw-bold">City</label>
                            <input onChange={handleInput} name="city" value={data.city} type="text" className="form-control form-control-lg" id="city" required />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="state" className="form-label fw-bold">State</label>
                            <select className="form-select form-control-lg" id="state" onChange={handleInput} name="state" value={data.state} required>
                                <option value="" disabled>Select State</option>
                                <option value="U.P.">U.P.</option>
                                <option value="M.P.">M.P.</option>
                                <option value="JHARKHAND">JHARKHAND</option>
                                <option value="DELHI">DELHI</option>
                            </select>
                        </div>
                    </div>

                    {/* Image Upload Row */}
                    <div className="row align-items-center">
                        <div className="col-md-8">
                            <label htmlFor="inputGroupFile02" className="form-label fw-bold">Upload Image</label>
                            <div className="input-group mb-3">
                                <input type="file" className="form-control fw-bold" id="inputGroupFile02" name="image" onChange={uploadImgae} ref={fileInputRef} />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card mx-auto border-0 shadow-sm" style={{ width: "10rem" }}>
                                <img src={image} className="card-img-top rounded" alt="Uploaded Preview" />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="text-center mt-4">
                        <button disabled={!allowimg} type="submit" className="btn btn-lg btn-warning fw-bold px-5">Submit</button>
                    </div>
                </div>
            </form>
        </div>

    )
}

export default Home
