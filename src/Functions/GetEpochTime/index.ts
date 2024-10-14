export const GetEpochTime = (time: number) => {
  var d = new Date()
  return (d.getTime()+time-d.getMilliseconds())/1000;
}