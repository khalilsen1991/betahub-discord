export const GetRank= (date?: Date)  => {
	const currenTime = date ? date.getTime() : new Date().getTime()
	const dateInitRankOne = new Date('08/04/2024').getTime()
	const dateInitRankTwo = new Date('08/13/2024').getTime()
	const dateInitRankThree = new Date('08/20/2024').getTime()
	if(currenTime > dateInitRankThree) return 3
	if(currenTime > dateInitRankTwo && currenTime < dateInitRankThree) return 2
	if(currenTime >= dateInitRankOne && currenTime < dateInitRankTwo) return 1
	return 0
}