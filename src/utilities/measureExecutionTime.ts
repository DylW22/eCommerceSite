type ExecutionResult<T> = [T | null, Error | null];

//export const measureExecutionTime = async (fn: Function) => {
export const measureExecutionTime = async <T>(
  fn: () => Promise<T>
): Promise<ExecutionResult<T>> => {
  const startTime = performance.now();
  try {
    //await new Promise((success) => setTimeout(success, 1000));
    const result = await fn();
    if (result instanceof Promise) {
      console.log("instanceOf PROMISE");
      const data = await result;
      const endTime = performance.now();
      const executionTime = endTime - startTime;
      console.log(`Execution time: ${executionTime}ms`);
      return [data, null];
    } else {
      console.log("instanceOf not a promise");
      const endTime = performance.now();
      const executionTime = endTime - startTime;
      console.log(`Execution time: ${executionTime}ms`);
      return [result, null];
    }
  } catch (error) {
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    console.log(`Execution time: ${executionTime}ms`);
    return [null, error as Error];
  }
};

/*
   if (error instanceof Error) {
        dispatch({ type: "SET_ERROR", error: error.message });
      } else {
        dispatch({
          type: "SET_ERROR",
          error: "An unknown error occurred when creating your account.",
        });
      }
*/

//Basic
/*export const measureExecutionTime = async (fn: Function) => {
  const startTime = performance.now();
  const result = await fn();
  const endTime = performance.now();
  console.log(`Execution time: `, endTime - startTime);
  return result; //Promise.resolve(result);
};
*/
