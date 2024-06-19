export const ChildPage = () => {
  return <div>ChildPage</div>;
};
/*export const ChildPage = ({ items, childRefs }) => {
  return (
    <>
      {items &&
        items.map((item, index) => (
          <div
            className="bg-danger my-5"
            style={{ height: "600px" }}
            ref={(el) => (childRefs.current[index] = el)}
            key={index}
          >
            Child {`${index}`}
          </div>
        ))}
    </>
  );
};
*/
