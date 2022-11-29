import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";

export default function BreadcrumbNav({ pathArray, setPathArray }) {
  // set the current pathArray by slicing the array
  const onPathClick = (path) => {
    setPathArray((prev) => {
      const curIndex = prev.indexOf(path);
      return prev.slice(0, curIndex + 1);
    });
  };

  return (
    <Breadcrumb my={6} fontSize="1.3rem" color="blue.500">
      {pathArray.map((item, index) => (
        <BreadcrumbItem key={index}>
          <BreadcrumbLink onClick={() => onPathClick(item)}>
            {item}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
}
