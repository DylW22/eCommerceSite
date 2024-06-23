import { useRotatingItems } from "../../hooks/useRotatingItems";
import { TestimonialItem } from "../../types";
import { Testimonial } from "./Testimonial";
import sampleData from "../../data/sampleTestimonials.json"; // assert { type: "json" };
export const Testimonials = () => {
  let nMax: number = 2;
  const itemsToDisplay: TestimonialItem[] = useRotatingItems(
    sampleData,
    nMax,
    20000
  );

  return (
    <div className="p-2 rounded-4">
      <div className="text-center">
        <h1 className="text-white">Testimonials</h1>
      </div>
      <div className="d-flex flex-md-column flex-fill w-100 text-center px-0 mx-0">
        {itemsToDisplay &&
          itemsToDisplay.map((item) => (
            <Testimonial key={item.id} item={item} />
          ))}
      </div>
    </div>
  );
};
