import { NavLink } from 'react-router-dom';


const links = [
    {text: 'Home', to: '/'},
    {text: 'About Us', to: '/about'},
    { text: 'Services', to: '/services' },
    { text: 'Find a Doctor', to: '/alldoctors' }
]


function Navbar() { 


    return (
        <div className='navbar'>
            {links.map((link) => { 
                return <NavLink key={ link.text} to={link.to}>{ link.text}</NavLink>
            })}

        </div>

    )
}

export default Navbar;