import "./style.css";

import { library, icon } from "@fortawesome/fontawesome-svg-core";
import {
  faCamera,
  faKeyboard,
  faArrowDown,
  faPeopleGroup,
  faMessage,
  faMicrophoneSlash,
  faMicrophone,
  faPhone,
  faVideoSlash,
  faDisplay,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import { myApp } from "./app";

library.add(
  faCamera,
  faKeyboard,
  faPeopleGroup,
  faMessage,
  faArrowDown,
  faMicrophoneSlash,
  faPhone,
  faVideoSlash,
  faDisplay,
  faEllipsisV,
  faMicrophone
);

const video = icon({ prefix: "fas", iconName: "video-slash" }).html;
const message = icon({ prefix: "fas", iconName: "message" }).html;
const people = icon({ prefix: "fas", iconName: "people-group" }).html;
const arrowd = icon({ prefix: "fas", iconName: "arrow-down" }).html;
const micOff = icon({ prefix: "fas", iconName: "microphone-slash" }).html;
const call = icon({ prefix: "fas", iconName: "phone" }).html;
const present = icon({ prefix: "fas", iconName: "display" }).html;
const bar = icon({ prefix: "fas", iconName: "ellipsis-v" }).html;
export const micOn = icon({ prefix: "fas", iconName: "microphone" }).html;

document.querySelector<HTMLDivElement>("#chat-screen")!.innerHTML = /*html*/ `
<main class="content-center flex flex-col flex-wrap bg-gray-900">
<div class="g-top relative" style="height:90vh">

<div class="top-remote-vid flex flex-wrap">
  <div id="meeting-container" class="w-3/4 hidden >
<div class="call-wrap bg-black">
<div class="video-wrap flex flex-wrap border-solid 
 border-white border " style="height:600px" id="div-users">

<div id="me" class="flex-col content-center ">

<h2 class="content-center text-sm "></h2>
<div class="content-center">
  <video autoplay muted id="local-video-player"></video>
</div>
</div>
<div id="other-template" class="content-center flex-col hidden">

<h2 class="content-center text-sm "></h2>
<div class="content-center">
  <video autoplay muted id="local_video_player" ></video>
  <audio autoplay controls muted class="hidden" style='display:none' ></audio>
</div>
</div>

</div>
</div>
</div>

</div>
<div class="g-top-left bg-white w-1/4  right-0 absolute  items-center rounded-b-lg justify-items-center px-2 border-red-600 border-2 border-solid">
  <div class="top-left-participant relative cursor-pointer m-1 pt-2 justify-between align-middle content-center flex flex-row ">
    <div class="top-left-participant-icon hover:text-black text-yellow-400">
  <span>
  ${people} 
  </span> 
    <div class="top-left-participant-count absolute  " style="top:-2px; left:18px">
4
    </div>
  </div>
  <div class="top-left-chat pt-2 cursor-pointer  hover:text-black text-yellow-400">
  <span>
  ${message} 
  </span> 
  </div>
  <div class="top-left-time"></div>
</div>

</div>
<div class="g-bottom border-2 flex bg-white flex-column shadow-lg z-10 border-red-700 justify-between items-center content-between w-full">
<div class="bottom-left relative p-1" style="height:10vh">
 <div class="cursor-pointer content-center meeting-details ">
  meeting details <span class="animate-bounce">${arrowd}</span> 
 </div> 
</div>
<div class="bottom-middle flex justify-center align-middle">
  <div class="mic-toggle content-center mr-2 cursor-pointer" id="mic-mute">
    <span>${micOff}</span>
  </div>
  <div class="end-call mr-2 content-center text-rose-700">
    ${call}
  </div> 
  <div class="video-toggle cursor-pointer content-center">${video}</div>
</div>
<div class="bottom-right flex justify-center items-center mr-3 " style="height:10vh"> 
  
<div class="present-now px-3 mx-3 justify-center flex flex-col items-center mr-5 cursor-pointer">${present}</div>
<div>present now</div>
<div class="option-wrap cursor-pointer content-center relative  " style="height:10vh"></div>
<div class="option-icon px-3">
${bar}
</div>
</div>
</div>
</div>



</main>
`;

function getParam() {
  const urlp = new URLSearchParams(window.location.search);
  const userID = window.prompt("enter a username");
  const meetingID = urlp.get("meetingID");
  document.getElementById("meeting-container")!.style.display = "visible"!;

  if (!userID || !meetingID) {
    alert("user id or meeting id absent");
    window.location.href = "./../main.html";
  } else {
    myApp()._init(userID, meetingID);

    console.log("this na my heritage", getUser);
  }
}
export const divUser = document.getElementById("div-users")!;
export const getUser = document.getElementById("other-template")!;
export const video_player_id = document.getElementById("local-video-player");
export const mic_mute = document.getElementById("mic-mute");

getParam();
