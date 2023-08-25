import React from 'react'
import "./Colors.css"

const Colors = () => {
  return (
    <div className='colorBox'>
      <p>меньше</p>
      <div className='innerBox'>
        <div style={{backgroundColor: "#EDEDED", height:"15px", width:"15px"}}></div>
        <div style={{backgroundColor: "#ACD5F2", height:"15px", width:"15px"}}></div>
        <div style={{backgroundColor: "#7FA8C9", height:"15px", width:"15px"}}></div>
        <div style={{backgroundColor: "#527BA0", height:"15px", width:"15px"}}></div>
        <div style={{backgroundColor: "#254E77", height:"15px", width:"15px"}}></div>
      </div>
      <p>больше</p>
    </div>
  )
}
export default Colors;
