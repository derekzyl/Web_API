import { io } from "socket.io-client";
import { meI } from "./me";
import {
  getUser,
  divUser,
  video_player_id,
  mic_mute,
  micOn,
} from "./call-screen";

// function eventConnect(userID: string, meetingID: string) {
//   const socket = io("ws://localhost:3000");

//   socket.on("connect", () => {
//     if (socket.connected) {
//       if (userID && meetingID) {
//         socket.emit("userConnect", {
//           displayName: userID,
//           meetingID,
//         });
//       }
//     }
//   });
//   socket.on("helloSide", function (data: meI) {});
// }

export let isAudioMuted = true;
const myyApp = function () {
  const peer_connection_id: any = {};
  const peer_connection: any = {};
  const remote_vid_stream: any = {};
  const remote_audio_stream: any = {};
  let vid_player_id;
  let audio: any;

  let serverProcess: any;
  let myConnectionId: any;
  const iceConfig = {
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
      {
        urls: "stun:stun.l.google.com:19302",
      },
    ],
  };
  async function processClientFunction(SDP_FUNCTION: any, myConId: any) {
    SDPProcess(SDP_FUNCTION, myConId);
  }

  async function SDPProcess(SDP_FUNCTION: any, myConId: any) {
    const message = JSON.parse(SDP_FUNCTION);
    if (message.answer) {
      await peer_connection[myConId].setRemoteDescription(
        new RTCSessionDescription(message.answer)
      );
    } else if (message.offer) {
      if (!peer_connection[myConId]) {
        await setNewCon(myConId);
      }
      const answer = await peer_connection[myConId].createAnswer();
      await peer_connection[myConId].setLocalDescription(answer);
      serverProcess(JSON.stringify({ answer: answer }), myConId);
    } else if (message.icecandidate) {
      if (!peer_connection[myConId]) {
        await setNewCon(myConId);
      }
      try {
        peer_connection[myConId].addIceCandidate(message.icecandidate);
      } catch (error) {
        console.log(error);
      }
    }
    await peer_connection[myConId].setRemoteDescription(
      new RTCSessionDescription(message.offer)
    );
  }

  async function init(SDP_FUNCTION: any, connid: any) {
    serverProcess = SDP_FUNCTION;
    myConnectionId = connid;
    // eventProcess()
    vid_player_id = video_player_id;
  }
  function eventProcess() {
    mic_mute?.addEventListener("click", async function () {
      if (!audio) {
        // await loadAudio()
      }
      if (!audio) {
        alert("enable audio");
      }
      if (isAudioMuted) {
        audio.enabled = true;
        mic_mute!.innerHTML = /*html*/ `
          <span>${micOn}</span>
        `;
      }
    });
  }

  async function setNewCon(connid: string) {
    const rtcCon = new RTCPeerConnection(iceConfig);
    rtcCon.onnegotiationneeded = async function (event) {
      // if(event.canditate)
      await setOffer(connid);
    };
    rtcCon.onicecandidate = async function (event) {
      if (event.candidate) {
        serverProcess(
          JSON.stringify({ icecandidate: event.candidate }),
          connid
        );
      }
    };

    rtcCon.ontrack = function (event) {
      if (!remote_vid_stream[connid]) {
        remote_vid_stream[connid] = new MediaStream();
      }
      if (!remote_audio_stream[connid]) {
        remote_audio_stream[connid] = new MediaStream();
      }
      if (event.track.kind === "video") {
        remote_vid_stream[connid]
          .getVideoTracks()
          .forEach((t: any) => remote_vid_stream[connid].removeTrack(t));
        remote_vid_stream[connid].addTrack(event.track);
        const remoteVideoPlayer: any = document.getElementById(
          "video" + connid
        );

        remoteVideoPlayer.srcObject = null;
        remoteVideoPlayer.srcObject = remote_vid_stream[connid];
        remoteVideoPlayer.load();
      }
      if (event.track.kind === "audio") {
        remote_audio_stream[connid]
          .getAudioTracks()
          .forEach((t: any) => remote_vid_stream[connid].removeTrack(t));
        remote_vid_stream[connid].addTrack(event.track);
        const remoteAudioPlayer: any = document.getElementById(
          "audio" + connid
        );

        remoteAudioPlayer.srcObject = null;
        remoteAudioPlayer.srcObject = remote_audio_stream[connid];
        remoteAudioPlayer.load();
      }
    };
    peer_connection_id[connid] = connid;
    peer_connection[connid] = rtcCon;
    return rtcCon;
  }

  async function setOffer(conn_id: any) {
    const connection = peer_connection[conn_id];
    const offer = await connection.createOffer();
    await connection.setLocalDescription(offer);
    serverProcess(
      JSON.stringify({ offer: connection.localDescription }),
      conn_id
    );
  }

  return { setNewCon, init, processClientFunction };
};
myyApp();

export function myApp() {
  function eventConnect(userID: string, meetingID: string) {
    const socket = io("ws://localhost:3000", {
      transports: ["websocket", "polling", "flashsocket"],
    });

    function SDP_function(data: any, to_connid: any) {
      socket.emit("sdpProcess", {
        message: data,
        to_connid: to_connid,
      });
    }
    socket.on("connect", () => {
      if (socket.connected) {
        myyApp().init(SDP_function, socket.id);
        if (userID && meetingID) {
          socket.emit("userConnect", {
            displayName: userID,
            meetingID,
          });
        }
      }
    });
    // addUser(a, b);

    socket.on("the", function (data: meI) {
      console.log("i de here");
      addUser(data.other_user_id, data.connectionID);
      myyApp().setNewCon(data.connectionID);
    });

    socket.on("inform_me_about_others", function (other_user) {
      if (other_user) {
        for (let i of other_user) {
          addUser(other_user[i].userID, other_user[i].connectionID);
          myyApp().setNewCon(other_user[i].connectionID);
        }
      }
      console.log("i de here");
    });

    socket.on("sdpProcess", async function (para: any) {
      await myyApp().processClientFunction(para.message, para.from_connid);
    });
  }
  function myInit(uid: string, mid: string) {
    alert("this is " + uid + " and " + mid);
    eventConnect(uid, mid);
  }
  function addUser(user?: string, con?: string) {
    console.log(con, "na here we do come last last", user);

    let elem = getUser;
    elem.setAttribute("id", "connection")!;
    elem.classList.add("other")!;
    elem.classList.remove("hidden");
    elem.querySelector("h2")!.textContent = user!;
    elem.querySelector("video")?.setAttribute("id", "video" + con);
    elem.querySelector("audio")?.setAttribute("id", "audio" + con);
    elem.style.display = "block";
    divUser.appendChild(elem);
    console.log("eleel", elem);

    // console.log("this is elem:", p);
    // for (var i = 0; i <= elem.children.length; i++) {
    //   const me = elem.setAttribute("id", con!);

    //   console.log("this is me", me);
    // }
  }
  return {
    _init: function (uid: string, mid: string) {
      myInit(uid, mid);
    },
  };
}
myApp();
