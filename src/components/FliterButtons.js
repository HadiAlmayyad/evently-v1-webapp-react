import React from "react";
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

function FilterButtons({handleChange}) { 
    return (
        <ToggleButtonGroup type="radio" name="options" defaultValue={1} onChange={handleChange} >
            <ToggleButton id="tbg-radio-1" value={1} className='custom-toggle'>
            All
            </ToggleButton>
            <ToggleButton id="tbg-radio-2" value={2}  className='custom-toggle'>
            Upcoming
            </ToggleButton>
            <ToggleButton id="tbg-radio-3" value={3}  className='custom-toggle'>
            Past
            </ToggleButton>
        </ToggleButtonGroup>
    )
}

export default FilterButtons;