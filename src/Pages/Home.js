import { useEffect, useState } from "react";
import "../styles/home.css";
import { useNavigate } from "react-router-dom";


export default  function Home(){
    async function fetchData () {
        try {
            const response = await fetch(process.env.REACT_APP_API+"getteams");
            const teams = await response.json();
            // console.log(teams)
            setList(teams)
        } catch (error) {
            window.alert(error+"/try later")
            console.error(error)
        }
    }

    const navigate = useNavigate()

    const [list,setList] = useState()
    
    useEffect(()=>{


        if(window.localStorage.getItem("person") == null){
            fetchData()
        }else{
            navigate("/ranking")

        }
    },[])


    
    return(
        <div className="Home">
            <p className="p"> აირჩიე შენი გუნდი </p>
            <div className="teams">

                {list ? list.map((team,index)=>{
                    return(
                            <div className="team" key={index} 
                            onClick={async()=>{
                                if (team.id == 548) {
                                    team.manager = "GOD"
                                }
                                
                                window.localStorage.setItem("person", JSON.stringify(team))
                                               navigate("/ranking")}}>
                                <img src={team.logo} title={`${team.name}/${team.manager}`} alt="logo"/>
                                <p   
                                style={{
                                    "color":
                                    "#138A36"
                                }}
                                >{team.name}</p>
                                <p   
                                style={{
                                    "color":
                                    "#04E824"
                                }}
                                >{team.manager}</p>
                            </div>
                    )
                })
                : <div className="loading">Loading...</div>}
            </div>
        </div>
    )
}
