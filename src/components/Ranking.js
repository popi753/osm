import { useEffect, useState, useRef} from "react";
import "../styles/ranking.css";
import { useNavigate } from "react-router-dom";



export default function Ranking() {

  

    const navigate = useNavigate();

    

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
        
        if (!group.length) {
            fetchData()
        }
        
    },[])




    
    
    


    const [userTeam,setUserTeam] = useState(JSON.parse(window.localStorage.getItem("person"))
)
    const [ranking, setRanking] = useState([
        { rank: 1, id: null, name: null, logo: null },
        { rank: 2, id: null, name: null, logo: null },
        { rank: 3, id: null, name: null, logo: null },
        { rank: 4, id: null, name: null, logo: null },
        { rank: 5, id: null, name: null, logo: null },
        { rank: 6, id: null, name: null, logo: null },
        { rank: 7, id: null, name: null, logo: null },
        { rank: 8, id: null, name: null, logo: null },
        { rank: 9, id: null, name: null, logo: null },
        { rank: 10, id: null, name: null, logo: null },
        { rank: 11, id: null, name: null, logo: null },
        { rank: 12, id: null, name: null, logo: null },
        { rank: 13, id: null, name: null, logo: null },
        { rank: 14, id: null, name: null, logo: null },
        { rank: 15, id: null, name: null, logo: null },
        { rank: 16, id: null, name: null, logo: null },
        { rank: 17, id: null, name: null, logo: null },
        { rank: 18, id: null, name: null, logo: null },
        { rank: 19, id: null, name: null, logo: null },
        { rank: 20, id: null, name: null, logo: null },
      ]);

    
    const [group, setGroup] = useState({})

    const [selectedRank, setSelectedRank] = useState(null);


    async function fetchData () {
        try {
            const response = await fetch(process.env.REACT_APP_API+"check", {
              headers: {
                  'Content-Type': 'application/json',
                  "person": window.localStorage.getItem("person")
                },
              },
              )
              const result = await response.json();
              if (result) {
                navigate("/yourRanking")
                return 
            }

          } catch (error) {
            window.alert(error+"/try later")
            console.error(error);
          }

        try {
            const response = await fetch(process.env.REACT_APP_API+"getteams");
            const teams = await response.json();
            // console.log(teams)
            setGroup(teams)
        } catch (error) {
            window.alert(error+"/try later")
            console.error(error)
        }
    }


    



    

    const chooseteam = useRef(null);





   function handleClick(team) {
        setSelectedRank(team);
        group.length && (chooseteam.current.classList.add("hover"));
   }


   function handleChoose(team) {
    if (!selectedRank) {
        return null;
    }
    selectedRank.id
            ? setRanking(
                ranking.map((e, index) =>
                    index === ranking.findIndex((e) => !e.id)
                        ? { rank: e.rank, ...team }
                        : e
                )
            )
            : setRanking(
                ranking.map((e) =>
                    e.rank === selectedRank.rank ? { rank: e.rank, ...team } : e
                )
            );

            setSelectedRank({ rank: selectedRank.rank, ...team });

        setGroup(group.filter((e) => !(e.id === team.id)));
   }

   async function handleDelete(team) {
    await setRanking(
        ranking.map((e) =>
            e.rank === team.rank
                ? {
                    rank: team.rank,
                    id: null,
                    name: null,
                    logo: null,
                }
                : e
        )
    );

    delete team.rank
        setGroup([...group, {...team,}]);
   }

   async function handleSave() {
    try {
      const response = await fetch(process.env.REACT_APP_API+"saveteams", {
          method: "POST",
        headers: {
            'Content-Type': 'application/json'
          },
        
        body: JSON.stringify({manager:userTeam,
               ranking:ranking}),
        },
        )
      
      navigate("/yourRanking")
    } catch (error) {
      console.error(error);
    }
   }





    return(
        <div className="box">
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
    </div>
            
            }
            
            <p
                        style={{
                            "fontSize": "25px",
    "fontWeight": "500",
    "margin": "50px 0 25px 25px"
                        }}
                        >დააფიქსირე შენი აზრი</p>


            <div style={{
                "display": "flex",
                "flexDirection": "column",
            }}>

                <div className="container"
                onMouseLeave={() => {
                    group.length && 
                    (chooseteam.current.classList.remove("hover"));
                }}> 
                    <div className="ranking">
                                    {ranking.map((element) => {
                                        return (
                                            <ChosenGroup
                                            handleClick={handleClick}
                                            handleDelete={handleDelete}
                                            key={element.rank}
                                            team={element}
                                            />
                                        );
                                    })}
                    </div>
                    {group.length ? (
                        <div className="chooseTeam" ref={chooseteam}>
                            {group.map((element) => {
                                return (
                                    <ChooseTeam
                                        key={element.id}
                                        handleChoose={handleChoose}
                                        team={element}
                                    />
                                );
                            })}
                        </div>
                    ) : null}
                </div>
                        <button className="save-btn"
                        onClick={()=>{
                            (ranking.some((e) => !e.id)? alert("შეავსე ბოლომდე"):
                            handleSave())
                        }
                        }>
                            save
                        </button>


            </div>

            

        </div>
    )

   


}



export function ChosenGroup({ handleClick, handleDelete, team, deleteable }) {
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
                onClick={() => {
                    handleClick(team);
                }}
            >
                { team.name ? `${team.name}/${team.manager}` : "აირჩიე კლუბი"}
            </span>
            
            {team.id && <button className="delete-btn" onClick={() => handleDelete(team)}>
            <svg style={{"width":"15px"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
            </svg>
                </button>}
        </div>
    );
}



export function ChooseTeam({ handleChoose, team}) {
    return (
        <div
            className="img-container"
            id={team.id}
            title={`${team.name}/${team.manager}`}
            onClick={() => handleChoose(team)}
        >
            <img src={team.logo} height="50px" alt="club logo" />
        </div>
    );
}