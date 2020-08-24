import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Checkbox,
  RadioGroup,
  FormControlLabel,
  Radio,
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

// const isGithubUserExist = async () => {
//   const res = await fetch(`https://api.github.com/users/Zhenikusss`);
//   if (res.status === 200) {
//     const data = await res.json();
//     console.log(data);
//     // setUserPhoto(data.avatar_url);
//     return true;
//   }
//   return false;
// }

// isGithubUserExist();

function Table () {
  const { handleSubmit, register, reset, control } = useForm({ defaultValues });
  const [data, setData] = useState(null);

  return (
    <div>
    
        <form onSubmit={handleSubmit(data => {
            setData(data);
            console.log(data);

            let jsonData = JSON.stringify(data);

            console.log(jsonData);

            $.ajax ({
              
              type:'POST',
              url:'index.php',
              dataType:'json',
              data:'param=' + jsonData,
              success:function(html) {
                console.log('Переданное значение ' + html)
              }

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
                   <Controller
                     as={
                       <RadioGroup aria-label="gender">
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
                     }
                     name="RadioGroup"
                     control={control}
                    />
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