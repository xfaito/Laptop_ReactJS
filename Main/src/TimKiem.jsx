import { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
function TimKiem(){  //{setResults}
    const[input,setInput]=useState("");
    const [results,setResults]=useState([]);
        const fecthData= (value) =>{
        fetch(`http://localhost:3000/timkiem?ten_sp=${value}`)
        .then((res) => res.json())
        .then((json) =>{
            const result = json.filter((sanpham) =>{
                return( 
                value &&
                sanpham &&
                sanpham.ten_sp &&
                sanpham.ten_sp.toLowerCase().includes(value))
            });
            setResults(result);
            console.log("result",results);
        });
    }
    
    const handleChange = (value) => {
        setInput(value);
        fecthData(value);
    };
    
    return(
        <>
        <input type="text" placeholder="Search" 
        value={input} 
        onChange={(i)=>handleChange(i.target.value)} />
        <FontAwesomeIcon className="timkiem" icon={faMagnifyingGlass} />
        <div className="kq-list">
            {results.map((result, id) => {
                <div key={id} className="kq-timkiem">
                {results.ten_sp}
            </div>
            })}
        </div>
        </>
    )
}
TimKiem.propTypes = {
    setResults: PropTypes.any 
};

export default TimKiem