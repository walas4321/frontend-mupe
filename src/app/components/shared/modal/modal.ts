export interface Modal {
	id?: string;
	open?: boolean;
	title?: string;
	subtitle?: string;
	ok?: string;
	bad?: string;
	closeable?: boolean;
	titletemplate?: boolean;
	backdrop?: boolean;
	index?: number;
	type?: any;
	loading?: string;
}

export class Mensaje {
	title?: string;
	message?: string;
}
