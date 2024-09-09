import { useRotatingItems } from "../../hooks/useRotatingItems";
import { TestimonialItem } from "../../types";
import { Testimonial } from "./Testimonial";
import sampleData from "../../data/sampleTestimonials.json"; // assert { type: "json" };
export const Testimonials = () => {
  const nMax: number = 2;
  const itemsToDisplay: TestimonialItem[] = useRotatingItems(
    sampleData,
    nMax,
    20000
  );

  return (
    <div className=" rounded-4 text-white text-center">
      <div className="d-flex flex-md-column flex-fill text-center">
        {itemsToDisplay &&
          itemsToDisplay.map((item) => (
            <Testimonial key={item.id} item={item} />
          ))}
      </div>
    </div>
  );
};
