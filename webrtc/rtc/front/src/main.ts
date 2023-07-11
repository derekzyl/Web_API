import "./style.css";
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import { faCamera, faKeyboard } from "@fortawesome/free-solid-svg-icons";

library.add(faCamera, faKeyboard);

const camera = icon({ prefix: "fas", iconName: "camera" }).html;
const keyboard = icon({ prefix: "fas", iconName: "keyboard" }).html;

import { joinAction, joinMeeeting, newMeeting } from "./join-meeting";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = /*html*/ `
 <div class="h-screen  w-auto align-middle justify-center ">
  <div class="w-auto h-20  left-0 top-0 shadow-sm  flex "> 
    <div class=" flex-wrap h-10  w-32  items-end justify-items-end ">
      <!-- this is the join a meeting -->
      <button class=" rounded-lg shadow-md bg-yellow-600 p-2 mx-4 my-1 w-60 join-a-meeting"> join a meeting</button> 


    </div>
  </div>
  <div>
  <div class=" top-60 flex justify-center m-6 p-3 flex-row">  
     <div class="mx-3">
       <button class=" uppercase bg-transparent w-48 h-15 text-green-900 rounded-md border-solid border-2  border-yellow-500 new-meeting"  >${camera} new meeting</button>
     </div>
     <div>
     <div class="border-2  border-yellow-700" class="mx-3">
${keyboard}
       <input type="text" class="border-none" name="code" id="getCode" placeholder="please input your code">
     </div>
     </div>

     <div class="mx-3">
     <button class="  bg-transparent text-black font-semibold join-meeting"  > join</button>

     </div>
   </div>
  </div>

 </div>

`;

const butt: HTMLButtonElement = document.querySelector(".join-a-meeting")!;
const formm: HTMLFormElement = document.querySelector("#getCode")!;
const joiner: HTMLButtonElement = document.querySelector(".join-meeting")!;
const newMeet: HTMLButtonElement = document.querySelector(".new-meeting")!;

joinMeeeting(butt, formm);
joinAction(joiner, formm);
newMeeting(newMeet, formm);
