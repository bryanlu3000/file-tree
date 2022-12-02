import axios from "axios";
import { useState, useEffect } from "react";
import { Container } from "@chakra-ui/react";
import BreadcrumbNav from "./components/BreadcrumbNav";
import Folder from "./components/Folder";
import File from "./components/File";
import { useSessionStorage } from "./hooks/useSessionStorage";

function App() {
  const SERVER_URL = "http://localhost:8000/path";

  const [loaded, setLoaded] = useState(false);

  // Use sessionStorage to save the state in case of refreshing page
  const [pathArray, setPathArray] = useSessionStorage("pathArray", ["root"]);
  const [dirContent, setDirContent] = useSessionStorage("dirContent", {});

  useEffect(() => {
    setLoaded(false);
    axios
      .get(`${SERVER_URL}/${JSON.stringify(pathArray)}`)
      .then((res) => {
        setDirContent(res.data);
        setLoaded(true);
      })
      .catch((err) => console.log(err));
  }, [pathArray]);

  return (
    <Container maxW="3xl" my={10}>
      <BreadcrumbNav pathArray={pathArray} setPathArray={setPathArray} />

      {!loaded ? (
        <h1>LOADING...</h1>
      ) : dirContent.type === "dir" ? (
        <Folder content={dirContent.children} setPathArray={setPathArray} />
      ) : (
        <File name={dirContent.name} />
      )}
    </Container>
  );
}

export default App;
