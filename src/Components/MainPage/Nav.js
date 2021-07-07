import React from 'react';
import {Link} from 'react-router-dom';

const Nav =()=>{
    
    return(
          
        <div>
            <Link to={`/`}><button data-cy='home'>Home</button></Link>
            <Link to={`/pizza`}><button data-cy='pizza'>Order Pizza</button></Link>
        </div>
    )
}
export default Nav