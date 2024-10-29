interface GetColorGradientProps {
  scrollY: number;
  theme: string;
  type?: string;
}

export const getColorGradientUtil = ({
  scrollY,
  theme,
  type = "linear",
}: GetColorGradientProps): string => {
  //Premium colours:
  /*   let Lmin = [250, 111, 5]; //orange
  let Lmax = [186, 2, 199]; //purple
  let Rmin = [186, 2, 199]; //purple
  let Rmax = [250, 111, 5]; //orange
  if (theme === "dark") {
    Lmin = [171, 157, 155]; //light gray
    Lmax = [31, 28, 28]; //dark gray [71, 63, 62]
    Rmin = [31, 28, 28]; //dark gray
    //Rmax = [171, 157, 155]; //light gray
    Rmax = [190, 190, 190];
  } */
  let Lmin = [240, 240, 240];
  let Lmax = [190, 190, 190];
  let Rmin = [190, 190, 190];
  let Rmax = [240, 240, 240];
  if (theme === "dark") {
    Lmin = [120, 120, 120];
    Lmax = [28, 28, 28];
    Rmin = [28, 28, 28];
    Rmax = [120, 120, 120];
  }
  const Lred =
    Lmin[0] +
    Math.floor(
      (Lmax[0] - Lmin[0]) *
        (scrollY / (document.body.scrollHeight || 255 - window.innerHeight))
    );
  const Lgreen =
    Lmin[1] +
    Math.floor(
      (Lmax[1] - Lmin[1]) *
        (scrollY / (document.body.scrollHeight || 255 - window.innerHeight))
    );
  const Lblue =
    Lmin[2] +
    Math.floor(
      (Lmax[2] - Lmin[2]) *
        (scrollY / (document.body.scrollHeight || 255 - window.innerHeight))
    );

  const Rred =
    Rmin[0] +
    Math.floor(
      (Rmax[0] - Rmin[0]) *
        (scrollY / (document.body.scrollHeight || 255 - window.innerHeight))
    );

  const Rgreen =
    Rmin[1] +
    Math.floor(
      (Rmax[1] - Rmin[1]) *
        (scrollY / (document.body.scrollHeight || 255 - window.innerHeight))
    );
  const Rblue =
    Rmin[2] +
    Math.floor(
      (Rmax[2] - Rmin[2]) *
        (scrollY / (document.body.scrollHeight || 255 - window.innerHeight))
    );
  return `${
    type === "linear" ? "linear-gradient(to right, " : "radial-gradient( "
  }${
    theme === "light"
      ? `rgb(${Lred},${Lgreen},${Lblue}), rgb(${Rred},${Rgreen},${Rblue})`
      : `rgb(${Lred},${Lgreen},${Lblue}),  rgb(${Rred},${Rgreen},${Rblue})`
  })`;
};

/*      ? `rgb(${Lred},${Lgreen},${Lblue}), #6446fc, #fada07,  #6446fc, rgb(${Rred},${Rgreen},${Rblue})`
      : `rgb(${Lred},${Lgreen},${Lblue}), rgb(0,0,0), rgb(${Rred},${Rgreen},${Rblue})` */

//good dark theme colour
//`rgb(${Lred},${Lgreen},${Lblue}), rgb(255,255,255), rgb(0,0,0) ,rgb(255,255,255) , rgb(${Rred},${Rgreen},${Rblue})`
