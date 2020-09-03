import React, { useState, useEffect, useRef, createRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Checkbox,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl
} from '@material-ui/core';
import $ from 'jquery-ajax';


const defaultValues = {
  Native: "",
  TextField: "",
  Select: "",
  ReactSelect: { value: "vanilla", label: "Vanilla" },
  Checkbox: false,
  switch: false,
  RadioGroup: "",
  numberFormat: 123456789,
  downShift: "apple"
};

function Table () {
  const { handleSubmit, register, reset, control } = useForm({ defaultValues });
  // const [data, setData] = useState([]);
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
    console.log(value);
  };

  useEffect(() => {
    fetch('http://localhost:3001')
    .then(response => response.json())
    .then(json => {
      setValue(json[json.length - 1].gender)
      console.log(json[json.length - 1].gender);
      
    })
  }, []);

  return (
    <div>

        <form onSubmit={(event => {
            event.preventDefault();

            console.log(value);

            $.ajax ({
              
              type:'POST',
              url:'http://localhost:3001',
              dataType:'json',
              data:'gender=' + value
            });
          })}

        className="form table tr">

          <div className = 'table__title'>Белорусская федерация гандбола</div>

          <div className = 'table__contact'>
            <div className = 'table__phone'>Факс: 017-2909654 / Моб. 029-1826983</div>
            <div className = 'table__email'><a href='mailto:handball_blr@mail.ru'>handball_blr@mail.ru</a></div>
          </div>

          <div className = 'table__row'>
            <div className = 'table__rang tr'>Ранг матча</div>
            <div className = 'table__protocol'>
                <div className = 'table__row'>

                

                  <section className = 'table__gender tr'>

                       <RadioGroup aria-label="gender" value={value} onChange={handleChange}>

                        <div className = 'gender__male'>
                         <FormControlLabel
                           value="male"
                           control={<Radio />}
                           label="Мужчины"
                         />
                        </div>

                        <div className = 'gender__female'>
                         <FormControlLabel
                           value="female"
                           control={<Radio />}
                           label="Женщины"
                         />
                        </div>

                       </RadioGroup>
                  </section>


                  <div className = 'table__prot tr'>Протокол матча</div>
                  
                </div>

                <div className = 'table__row'>
                    <div className = 'table__col'></div>
                    <div className = 'table__col'></div>
                    <div className = 'table__col'></div>
                    <div className = 'table__col'></div>
                    <div className = 'table__col'></div>
                    <div className = 'table__col'></div>
                    <div className = 'table__col'></div>
                    <div className = 'table__col'></div>
                    <div className = 'table__col'></div>
                    <div className = 'table__col'></div>
                    <div className = 'table__col'></div>
                    <div className = 'table__col'></div>
                </div>
            </div>
          </div>
      
      
          <button className="button">Сохранить</button>

    
    </form>
    </div> 
  );

  
}



export default Table;