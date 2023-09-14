import { io } from "socket.io-client";
const socket = io("http://localhost:8000");
import { crashLoad,handleHasbet,active_playerEl, Load_animation,game_id,
     loadingCrash,handleHasbet_amount, crashIsAlive,crashCurve,
      hasCrashed, crashPoint, crashRunning, crash_historyEl,
      crash_all_users_red_trendballEl ,handleRedtrendballPlayers, mybetEl, trendball_has_winEl} from "./store"
      import {default_Wallet} from "../store/coins"



export const handleCountdown = (()=>{

    socket.on("countdown", data=>{
        crashLoad.set(data.toFixed(2))
    })
    socket.on("load-animation", data=>{
        Load_animation.set(data)
    })
    socket.on("crash-point", data=>{
        crashPoint.set(data)
    })
 
   socket.on("running-crash", data=>{
        crashRunning.set(data)
    })

    socket.on("crash-all-redball-users", data =>{
        if(data === "is-crash"){
            crash_all_users_red_trendballEl.set(true)
        }else if(data = "has_win"){
            trendball_has_winEl.set(true)
        }
    })

    socket.on("crash-game-history", data=>{
        crash_historyEl.set(data)
    })

    socket.on("redball_update_wallet", data=>{
        let dataEl = {
            coin_name: data.token,
            coin_image: data.token_img,
            balance:  data.update_bal,
            suffix: "0000",
        }
        default_Wallet.set(dataEl)
    })

    socket.on("crash-game-redtrend", data=>{
        handleRedtrendballPlayers.set(data)
    })

    // ============= Manage the state of the game =======================
    socket.on("crash-state", data =>{
        if(data === "load-crash"){
            loadingCrash.set(true)
            crashIsAlive.set(false)
            hasCrashed.set(false)
            trendball_has_winEl.set(false)
            crash_all_users_red_trendballEl.set(false)
        }
         if(data === "crash-isRunning"){
            loadingCrash.set(false)
            crashIsAlive.set(true)
            hasCrashed.set(false)
        }  
        if(data === "hasCrashed"){
            loadingCrash.set(false)
            crashIsAlive.set(false)
            hasCrashed.set(true)
            handleHasbet.set(false)
            handleHasbet_amount.set(null)
        }  
    })

    // ============ current game id ===========
    socket.on("game_id", data =>{
        game_id.set(data)
    })

    //  ==================== active players ==============
    socket.on("active_players", data =>{
        active_playerEl.set(data)
    })

       //  ==================== crash animation ==============
       socket.on("crash_curve", data =>{
        crashCurve.set(data)
    })

         //  ==================== crash animation ==============
           socket.on("my-bet", data =>{
            mybetEl.set(data)
        })
})
