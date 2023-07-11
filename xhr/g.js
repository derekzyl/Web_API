// let getJSON = (url, callback) => {

import { xhr } from "./index.js";

//     let xhr = new XMLHttpRequest();
//     xhr.open('GET', url, true);
//     xhr.responseType = 'json';

//     xhr.onload = () => {

//         let status = xhr.status;

//         if (status == 200) {
//             callback(null, xhr.response);
//         } else {
//             callback(status);
//         }
//     };

//     xhr.send();
// };

// getJSON('http://time.jsontest.com', (err, data) => {

//     if (err != null) {
//         console.error(err);
//     } else {

//         let text = `Date: ${data.date}
// Time: ${data.time}
// Unix time: ${data.milliseconds_since_epoch}`

//         console.log(text);
//     }
// });

const b = document.querySelector(".buttonss");

b.addEventListener("click", async function () {
  console.log("into the click");
  const s = xhr;

  const f = await s.Get({
    Url: "https://jsonplaceholder.typicode.com/posts",
    Header: {
      "content-type": "application/json",
    },
  });
  console.log(
    "<========--0000----------------",
    f,
    "<==================00000==================================="
  );
});
