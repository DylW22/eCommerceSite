import greenTickIcon from "../../assets/green-tick.svg";

const PaymentSuccess = () => {
  return (
    <div className="d-flex justify-content-center align-items-center text-center">
      <h1>PAYMENT SUCCESS!</h1>
      <img className="px-2" height={"30px"} src={greenTickIcon} />
    </div>
  );
};

export default PaymentSuccess;
