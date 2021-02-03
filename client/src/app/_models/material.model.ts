export class Material
{
	
	id : string;
	projectId: string;
	userId: string;
	disciplineName: string;
	disciplineCode: string;
	typeOrCategoryCode: string;
	itemPoNumber: string;
	description: string;
	make: string;
	model: string;
	receivedQuantity: string;
	spareQuantity: string;
	totalQuantity: string;
	uomCode: string;
	courierNumber: string;
	gatePassNumber: string;
	receiveDate: Date;
	remark: string;
	tagSerial: TagSerial[];

	checked: boolean;

	
}

export class TagSerial {
	id:string;
	tagNumber: string;
	serialNumber: string;
}
