export const Testimonials = () => {
  let test = [0, 1, 2];

  return (
    <>
      <div>
        <h1>Testimonials</h1>
      </div>
      <div className="d-flex flex-md-column flex-fill w-100 text-center">
        {test &&
          test.map((item, index) => (
            <div key={index} className="flex-fill bg-info w-100">
              Row {item}
            </div>
          ))}
      </div>
    </>
  );
};
