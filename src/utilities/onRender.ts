export const onRender = (
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime
) => {
  console.groupCollapsed(`onRender: id: ${id}`);
  console.log(`phase: `, phase);
  console.log(`baseDuration: `, baseDuration);
  console.log(`actualDuration: `, actualDuration);
  console.log(`startTime: `, startTime);
  console.log(`commitTime: `, commitTime);
  console.groupEnd();
};
