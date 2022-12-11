import React, { useState} from 'react';

const ToggleBtn = ({label, toggled, onClick}) => {
  const [isToggled, toggle] = useState(toggled);

  const callback = () => {
    toggle(!isToggled)
    onClick(!isToggled)
  }

   return( 
       <label>
       <input type="checkbox" defaultChecked={isToggled} onClick={callback} />
        <span/>
        <strong>{label}</strong>
       </label>
   )
}

export default ToggleBtn; 

