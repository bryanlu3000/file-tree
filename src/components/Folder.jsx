import { List, ListIcon, ListItem } from "@chakra-ui/react";
import { FcFolder, FcFile } from "react-icons/fc";

export default function Folder({ content, setPathArray }) {
  return (
    <List spacing={3} fontSize="1.1rem">
      {content.map((item) => (
        <ListItem
          key={item.name}
          cursor="pointer"
          onClick={() => setPathArray((prev) => prev.concat(item.name))}
        >
          <ListIcon as={item.type === "dir" ? FcFolder : FcFile} />
          {item.name}
        </ListItem>
      ))}
    </List>
  );
}
