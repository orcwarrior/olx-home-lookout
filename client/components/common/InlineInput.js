import React, { useState } from "react";
import "./InlineInput.scss"
import AutosizeInput from 'react-input-autosize';
import { useDoubleTap } from "use-double-tap";

const hiddenBtnStyle = {position: "absolute", left: "-1000px", opacity: 0};

const InlineInput = ({value, onSubmit, fontSize = "inherit", placeholder}) => {
  const [formEnabled, setFormEnabled] = useState(false);
  const [inputVal, setInputVal] = useState(value);
  React.useEffect(() => setInputVal(value), [value]);
  const enableEvts = {onDoubleClick: () => setFormEnabled(true), ...useDoubleTap(() => setFormEnabled(true))}

  return <form className={formEnabled ? "inline-form" : "inline-form disabled"} onSubmit={(e) => {
    e.preventDefault();
    e.stopPropagation();
    onSubmit(inputVal, e)
    setFormEnabled(false);
  }}
               {...enableEvts}
               onBlur={() => setFormEnabled(false)}>
    <AutosizeInput className="inline-edit" disabled={!formEnabled}
                   type="text" placeholder={placeholder} style={{fontSize}}
                   value={inputVal} onChange={e => setInputVal(e.target.value)}/>
    <input type={formEnabled ? "submit" : "button"} style={hiddenBtnStyle}/>
  </form>

}

export { InlineInput }
