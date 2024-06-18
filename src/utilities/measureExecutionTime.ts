export const measureExecutionTime = async (fn: Function) => {
  const startTime = performance.now();
  const result = await fn();
  const endTime = performance.now();
  console.log(`Execution time: `, endTime - startTime);
  return result; //Promise.resolve(result);
};
