import React, { useState } from "react";
import "./InlineInput.scss"


const hiddenBtnStyle = {position: "absolute", left: "-1000px", opacity: 0};

const InlineInput = ({value, onSubmit}) => {
  const [formEnabled, setFormEnabled] = useState(false);
  const [inputVal, setInputVal] = useState(value);
  React.useEffect(() => setInputVal(value), [value]);

  return <form className={formEnabled ? "inline-form" : "inline-form disabled"} onSubmit={(e) => {
    e.preventDefault();
    e.stopPropagation();
    onSubmit(inputVal, e)
    setFormEnabled(false);
  }}
               onDoubleClick={() => setFormEnabled(true)}
    onBlur={() => setFormEnabled(false)}>
    <input className="inline-edit" disabled={!formEnabled} type="text" placeholder="(ulica)"
           value={inputVal} onChange={e => setInputVal(e.target.value)}/>
    <input type={formEnabled ? "submit" : "button"} style={hiddenBtnStyle}/>
  </form>

}

export { InlineInput }
