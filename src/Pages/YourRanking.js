import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export default function YourRanking() {

    const navigate = useNavigate()

    const [list,setList] = useState()

    const userTeam = JSON.parse(window.localStorage.getItem("person"))

async function fetchRanking() {

    try {
        const response = await fetch(process.env.REACT_APP_API+"getranking", {
          headers: {
              'Content-Type': 'application/json',
              "person": window.localStorage.getItem("person")

            },
          },
          )
          const data = await response.json() 
          setList(data)
        
      } catch (error) {
        window.alert(error+"/try later")
        console.error(error);
      }
}

useEffect(()=>{
    if (!window.localStorage.getItem("person")) {
        navigate("/")
        return
    }
    try {
        JSON.parse(window.localStorage.getItem("person"))
        console.log(true)
    } catch (error) {
        console.log(false)
        window.localStorage.removeItem("person")
        navigate("/")
        return
    }
    fetchRanking()
},[])

    return(

    <>


<div className="box" style={{"paddingBottom":"25px"}}>
    {userTeam && 
    <div className="userTeam">
    <img src={userTeam.logo} title={userTeam.name} alt="logo"/>
    <div>
        <p>{userTeam.name}</p> <br />
        <p>{userTeam.manager}</p>
    </div>

    <button className="logout-btn"
    onClick={()=>{
        window.localStorage.removeItem("person")
        window.location.href = "/";

    }}>logout</button>
</div>}
    
    
    
                <div >
                        <p className="p-text">
                            შენი არჩეული ცხრილი :
                        </p>

         {list ?
                    <div className="container">
                        <div className="ranking">
                                          {list.map((element) => {
                                            return (
                                                <ChosenGroup
                                                key={element.rank}
                                                team={element}
                                                />
                                            );
                                        })}
                                        </div>
    
    </div>
                                        :<div className="loading">Loading...</div> }
                        
    
    
    
                </div>
</div> 
    </>
    )

}


export function ChosenGroup({team}) {
    return (
        <div className="ranking-team">
            <span >{team.rank}.</span>
            
            <img
                style={
                    !team.logo ? { "filter":"invert(100%" } : {}
                    
                }
                src={
                    team.logo || "https://cdn-icons-png.flaticon.com/512/5042/5042057.png"
                }
                height="50px"
                alt="club logo"
            />
            <span
                
            >
                {team.name ? `${team.name}/${team.manager}` : "აირჩიე კლუბი"}
            </span>
            
            
        </div>
    );
}