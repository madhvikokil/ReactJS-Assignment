
// namemaipulation done by functional based component
import React,{ useState,useEffect } from 'react';

export default function NameManipulation2() {

    const name = useFormInput("madhvi");
    const surname = useFormInput("kokil");
    const width = useWindowWidth(); // created the method of it so that it can be reused
    useDocumentTitle(name.value +" "+ surname.value);
   
   
    function useFormInput(initialValue) {
        const [ value,setValue] = useState(initialValue);
        function handleChange(e) {
            setValue(e.target.value)
        }
        return{
            value,
            onChange:handleChange
        }
    }
  function useDocumentTitle(title) {
    useEffect(() => {
        document.title = title
    })
  }

    function useWindowWidth() {
        const [ width, setWidth ] = useState(window.innerWidth);

        useEffect(() => {
            const handleResize=() => {setWidth(window.innerWidth)};
            window.addEventListener("resize",handleResize);
            return () => {
                window.removeEventListener("resize",handleResize);
            }
        });
        return width;
    }


return(
    <div>
        <input {...name}/><br /><br />
        <input {...surname}/><br /><br />
        Full name : {name.value} {surname.value}<br/><br/>
        Width : {width}
    </div>
)
}