export class PaginationBuilder {
	objects: any[]
	objectsForPage: number
	currentPage: number
	name: string

	constructor(objects: any[], objectsForPage: number, name: string) {
		this.objects = objects
		this.objectsForPage = objectsForPage
		this.currentPage = 0
		this.name = name
	}

	getObjectsCurrentPage(): any[] {
		const init = this.currentPage * this.objectsForPage
		const end = init + this.objectsForPage
		return this.objects.slice(init, end)
	}

	getCurrentPage(): number {
		return this.currentPage
	}

	pagesManager(customId: string): void {
		if(customId == `${this.name}-first`) return this.firstPage()
		if(customId == `${this.name}-next`) return this.nextPage()
		if(customId == `${this.name}-last`) return this.lastPage()
		if(customId == `${this.name}-previous`) return this.backPage()
	}

	firstPage(): void {
		if (this.currentPage <= this.getPagesNumber() - 1) {
			this.currentPage = 0
		}
	}

	nextPage(): void {
		if (this.currentPage < this.getPagesNumber() - 1) {
			this.currentPage++
		}
	}

  
	backPage(): void {
		if (this.currentPage > 0) {
			this.currentPage--
		}
	}

	lastPage(): void {
		if (this.currentPage < this.getPagesNumber() - 1) {
			this.currentPage = this.getPagesNumber() -1
		}
	}
  
	getPagesNumber(): number {
		return Math.ceil(this.objects.length / this.objectsForPage)
	}
}
