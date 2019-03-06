import React, {useState, useEffect} from "react";
import fetchJsonp from "fetch-jsonp";

async function fetchTinyUrl() {
  const xorigin = url => `http://www.whateverorigin.org/get?url=${encodeURIComponent("http://tinyurl.com/api-create.php?url=" + url)}`;
  const resp = await fetchJsonp(xorigin(window.location.href))
  const json = await resp.json();
  console.log(json);
  return json.contents;
}

function Share(props) {
  const [linkVisible, setLinkVisible] = useState(false);
  const [linkValue, setLinkValue] = useState(false);
  const textareaRef = React.useRef(null);

  useEffect(() => {
    if(linkVisible) {
      fetchTinyUrl().then(tinyUrl => {
        setLinkValue(tinyUrl);
        textareaRef.current.select();
      });
    } else {
      setLinkValue(false);
    }
  }, [window.location.href, linkVisible]);

  return (
    <div style={{display: "flex"}}>
      <div onClick={() => setLinkVisible(!linkVisible)}>Share</div>
      {linkVisible &&
      <textarea
        rows={1}
        ref={textareaRef}
        onClick={(event) => event.target.select()}
        onBlur={(event) => setLinkVisible(false)}
        value={linkValue ? linkValue : "shortening..."}
      ></textarea>
      }
    </div>
  );
};

export default Share;
