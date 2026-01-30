import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
       <footer className="d-flex flex-wrap justify-content-evenly align-items-center py-3 border-top position-fixed w-100 bottom-0" style={{background:"#7EB6E8"}}>
        <div className="col-md-4 d-flex align-items-center">
        
          <p className="text-dark p-0 m-0 fs-6">Made with ♥ by Manan | Powered by <span><strong><NavLink to={'https://techcanva.in'} target='_blank'>TechCanva</NavLink></strong></span> </p>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex text-dark">

          <li className="ms-3"><Link to='https://techcanva.in' target='_blank'><img src="/image/techcanva.png" alt="logotechcanva" className="icon-img" /></Link></li>
          <li className="ms-2"><Link to='https://wa.me/qr/CE2NQOCPJFHBM1' target='_blank'><i className="fa-brands fa-whatsapp fa-xl" style={{ color: "#000" }}></i></Link></li>
          <li className="ms-3"><Link to='https://www.instagram.com/manankumar_06/?r=nametag' target='_blank'><i className="fa-brands fa-instagram fa-xl" style={{ color: "#000" }}></i></Link></li>
          <li className="ms-3"><Link to='https://github.com/Manankumar6/' target='_blank'><i className="fa-brands fa-github fa-xl" style={{ color: "#000" }}></i></Link></li>
        </ul>
      </footer>
    </div>
  )
}

export default Footer
