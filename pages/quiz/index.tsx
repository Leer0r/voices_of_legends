import { useRouter } from "next/router"
import { ChangeEventHandler, useState } from "react"
import dataPath from "../../interfaces/datapath.interface"

export default function quiz() {
    const router = useRouter()
    const {
        query: { difficulty },
    } = router

    let [inputValue,setInputValue] = useState("")
    let gameStarted = false
    let currentTime = ""
    let nbChamToGuess = 1
    let nbChamRemining = nbChamToGuess
    let champDivList = [];
    let championPannel = document.querySelector(".championPannel");
    let _currentChampSelected = 0;
    let userGuess = "";

    let dataPath:dataPath = {
        baseUrl: "https://raw.communitydragon.org",
        splashUrl: "plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes",
        voiceUrl:`plugins/rcp-be-lol-game-data/global/fr_fr/v1/easy`,
        patch: "latest",
        lang: "fr_FR"
    }

    const handleChange = (event:any) => {
    }

    return (
        <div className="quiz">
            <div className="background"></div>
            <div className="mainContainer">
                <div className="middle">
                    <div className="gameInfo">
                        <div className="champCounter">
                            <div className="text">ROUND</div>
                            <div className="value">1</div>
                        </div>
                        <div className="timer">
                            <div className="text">TIMER</div>
                            <div className="value">04:25</div>
                        </div>
                        <div className="difficulty">
                            <div className="text">GAME DIFFICULTY</div>
                            <div className="value">{difficulty}</div>
                        </div>
                    </div>
                    <div className="championSelect">
                        <div className="goBack hoverable"></div>
                        <div className="currentChampion">
                            <div className="circle"></div>
                        </div>
                        <div className="goNext hoverable"></div>
                    </div>
                    <div className="askChampion">
                        <div className="playSound button hoverable"></div>
                        <div className="relauch button hoverable"></div>
                        <input type="text" className="championInput" onChange={handleChange} value={inputValue} />
                        <div className="hint button hoverable">
                            <div className="text">Aide</div>
                            <div className="value">
                                +15s
                            </div>
                        </div>
                    </div>
                    <div className="champHint">
                    </div>
                </div>
                <div className="footer">
                    <div className="championPannel">

                    </div>
                </div>
            </div>
        </div>
    )
}