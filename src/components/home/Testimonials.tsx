import { useRotatingItems } from "../../hooks/useRotatingItems";

interface TestimonialItem {
  id: number;
  content: string;
}

export const Testimonials = () => {
  let nMax: number = 3;
  const sampleData: TestimonialItem[] = [
    { id: 1, content: "Testimonial 1" },
    { id: 2, content: "Testimonial 2" },
    { id: 3, content: "Testimonial 3" },
    { id: 4, content: "Testimonial 4" },
    { id: 5, content: "Testimonial 5" },
    { id: 6, content: "Testimonial 6" },
  ];
  const itemsToDisplay: TestimonialItem[] = useRotatingItems(
    sampleData,
    nMax,
    20000
  );

  return (
    <>
      <div>
        <h1>Testimonials</h1>
      </div>
      <div className="d-flex flex-md-column flex-fill w-100 text-center">
        {itemsToDisplay &&
          itemsToDisplay.map((item, index) => (
            <div
              key={index}
              className="flex-fill bg-info my-md-2 w-100 d-flex flex-column h-100 justify-content-center align-items-center"
            >
              {item.content}
            </div>
          ))}
      </div>
    </>
  );
};
