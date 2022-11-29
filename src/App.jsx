import axios from "axios";
import { useEffect } from "react";
import { Container } from "@chakra-ui/react";
import BreadcrumbNav from "./components/BreadcrumbNav";
import Folder from "./components/Folder";
import File from "./components/File";
import { useSessionStorage } from "./hooks/useSessionStorage";

function App() {
  const SERVER_URL = "http://localhost:8000/path";

  // Use sessionStorage to save the state in case of refreshing page
  const [pathArray, setPathArray] = useSessionStorage("pathArray", ["root"]);
  const [dirContent, setDirContent] = useSessionStorage("dirContent", {});

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/${JSON.stringify(pathArray)}`)
      .then((res) => setDirContent(res.data))
      .catch((err) => console.log(err));
  }, [pathArray]);

  return (
    <Container maxW="3xl" my={10}>
      <BreadcrumbNav pathArray={pathArray} setPathArray={setPathArray} />

      {dirContent.type === "dir" ? (
        <Folder content={dirContent.children} setPathArray={setPathArray} />
      ) : (
        <File name={dirContent.name} />
      )}
    </Container>
  );
}

export default App;
