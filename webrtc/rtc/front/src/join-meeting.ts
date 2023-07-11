export function joinMeeeting(
  buttonClass: HTMLButtonElement,
  focusForm: HTMLFormElement
) {
  buttonClass.addEventListener("click", function () {
    focusForm.focus();
  });
}

export function joinAction(
  buttonClass: HTMLButtonElement,
  focusForm: HTMLFormElement
) {
  buttonClass.addEventListener("click", function () {
    const formr: string = focusForm.value.toUpperCase();
    const meetUrl: string = `${window.location.origin}?meetingID=${formr}`;

    if (formr) {
      window.location.replace(meetUrl);
      console.log(meetUrl);
    }
  });
}

export function newMeeting(
  newMeeting: HTMLButtonElement,
  focusForm: HTMLFormElement
) {
  newMeeting.addEventListener("click", function () {
    const v: string[] = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
    ];
    let ab = [];
    for (let b in v) {
      const rVal = Math.round(Math.random() * 25);
      ab.push(v[rVal]);
      //   console.log(v[rVal]);
    }
    const ba = ab.slice(0, 8);
    const [a, b, c, d, e, f, g, h] = ba;
    const vg = a + b + c + "-" + d + e + f + "-" + f + g + h;
    const nn = vg.toUpperCase();

    const meetUrl: string = `${window.location.origin}?meetingID=${nn}`;

    window.location.replace(meetUrl);
    console.log(meetUrl);
  });
}
