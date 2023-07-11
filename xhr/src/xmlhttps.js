class goGo extends XMLHttpRequest {
  constructor() {
    super();
    this.message = {};
    this.error = {};
  }

  //   get message() {
  //     return this.message=[]
  //   }

  _HeaderValue(Header, xh) {
    if (Header) {
      for (const [k, v] of Object.entries(Header)) {
        console.log(k, v);
        const key = k.toString();
        const value = v.toString();
        xh.setRequestHeader(k, v);
      }
    }
  }

  _Status(xh) {
    // console.log("inside status");
    // console.log(xh.status);
    console.log(xh.getResponseHeader("content-type"), "na me be response type");
    let cc;
    if (xh.getResponseHeader) {
      cc =
        xh.getResponseHeader("content-type") &&
        xh.getResponseHeader("content-type").split("/")[1].split(";")[0];
    }

    return new Promise((resolve, reject) => {
      if (xh.status >= 200 && xh.status < 400) {
        const message = {
          status: xh.status,
          response: xh.response,
          type: xh.getResponseHeader("content-type"),
          // all: xh.getResponseHeader("*"),
        };
        // resolve(message);
        // console.log(message.response);
        switch (cc) {
          case "arraybuffer":
            resolve(message);
          case "json":
            // console.log(message, "xh response");
            // message.response = JSON.parse(xh.response);
            resolve({
              status: xh.status,
              response: JSON.parse(xh.response),
              type: xh.getResponseHeader("content-type"),
              // all: xh.getResponseHeader("*"),
            });
          case "text":
            resolve(message);
          case "document":
            resolve(message);
          case "blob":
            resolve(message);

          default:
            resolve(message);
            break;
        }
      }

      if (xh.status >= 400) {
        const errors = {
          status: xh.status,
          message: xh.statusText,
        };
        reject(new Error(xh.statusText));
      }
    });
  }

  FileUpload() {
    this.upload.onprogress = function (event) {
      this.message.progress = `uploaded ${event.loaded} of ${event.total}`;
    };

    this.onloadend = function () {
      if (this.status >= 200 && this.status < 400) {
        this.message.onloadend = "file upload is in progress";
      } else if (this.status >= 400) {
        this.message = "error encountered during upload";
      }
    };
  }

  async Get(data /*Url, Header*/) {
    let b = {};
    const { Url, Header, Body, Cors } = data;
    console.log(Url, "url");

    let body;
    if (Body) {
      body = JSON.stringify(JSON.parse(Body));
    }
    this.open(
      "GET",
      Url,
      true
      // (username = username || null),
      // (password = password || null)
    );
    this.withCredentials = false;
    if (Header) {
      this._HeaderValue(Header, this);
    }

    // this.onload = await this._Status();

    if (body !== null || body !== undefined) {
      this.send(body);
    } else {
      this.send();
    }
    this.onload = async () => {
      // console.log(this.statusText);
      // console.log(this.response);
      const a = await this._Status(this);

      Object.assign(b, a);
    };

    return b;
    // return new Promise(function (resolve, reject) {

    // });
  }

  async get(data) {
    let b = {};
    const xh = new XMLHttpRequest();
    const { Url, Header, Body, Cors } = data;
    console.log(Url, "url");

    let body;
    if (Body) {
      body = JSON.stringify(JSON.parse(Body));
    }
    xh.withCredentials = Cors ?? false;
    xh.open(
      "GET",
      Url,
      true
      // (username = username || null),
      // (password = password || null)
    );

    if (Header) {
      this._HeaderValue(Header, xh);
    }

    if (body !== null || body !== undefined) {
      xh.send(body);
    } else {
      xh.send();
    }
    xh.onload = () => {
      const a = this._Status(this);
      Object.assign(b, a);
    };
    return b;
  }

  Post(data) {
    let b = {};
    const xh = new XMLHttpRequest();
    const { Url, Header, Body, username, password } = data;
    let body;
    if (Body) {
      console.log(JSON.stringify(Body));
      body = JSON.stringify(Body);
    }
    xh.open("Post", Url, true, username ?? username, password ?? password);
    if (Header) {
      this._HeaderValue(Header, xh);
    }
    xh.onload = async () => {
      // console.log(this.statusText);
      // console.log(this.response);
      const a = await this._Status(xh);
      Object.assign(b, a);
    };

    // return new Promise(function (resolve, reject) {

    // });

    if (body !== null || body !== undefined) {
      console.log(xh.getAllResponseHeaders());

      xh.send(body);
    } else {
      xh.send();
    }
    xh.timeout = 2000;
    console.log(b, "this is b");
    return b;
  }
}

export const go = new goGo();
