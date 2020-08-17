import React from 'react';
import {Link} from 'react-router-dom';

const Nav =()=>{
    
    return(
          
        <div>
            <Link to={`/`}><button>Home</button></Link>
            <Link to={`/pizza`}><button>Order Pizza</button></Link>
        </div>
    )
}
export default Nav