import React, { useEffect, useState } from 'react'
import { useAuth } from '../Context/Auth'

const PromoteAdmin = () => {
    const { user } = useAuth();
    const [message, setMessage] = useState(false);
    let URL = process.env.REACT_APP_API_URL
    const promoteToAdmin = async () => {
        try {
            const response = await fetch(`${URL}/api/initial-admin`, {
                method: 'POST',

                credentials: 'include',

            });

            if (!response.ok) {
                throw new Error('Failed to promote user to admin');
            }

            const data = await response.json();
            console.log(data)
            setMessage(true);
        } catch (error) {
            console.error('Error promoting user to admin:', error);
            setMessage(false);
        }
    };


    useEffect(() => {
        if (user && user.role !== 'admin') {
            promoteToAdmin();
        }
        // eslint-disable-next-line
    }, []);
    return (
        <div className='container' >
            <div className="d-flex justify-content-center text-center my-2">

               {message? <div className="card p-5 bg-success rounded-4 text-light w-50">
                    <h1 >
                        Congratulations!
                    </h1>
                    <h4>You have successfully promoted the user to admin.</h4>
                </div>
                :
                <div className="card p-5 text-danger rounded-4 text-light w-50" style={{background:"#ffc2d1"}}>
                    <h1 >
                        Oops!
                    </h1>
                    <h4>Admin already exists.</h4>
                </div>
                }
            </div>
         
        </div>
    )
}

export default PromoteAdmin
