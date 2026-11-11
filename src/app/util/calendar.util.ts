import { Injectable } from '@angular/core';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CommonConstants } from '../constant';
import moment from 'moment';

export const formatDateCustom = (date: Date): string => {
	return moment(date).format(CommonConstants.FORMATO_FECHA_SLASH_DD_MM_YYYY);
}

export const parseDate = (date: string): Date => {
	return moment(date, CommonConstants.FORMATO_FECHA_SLASH_DD_MM_YYYY).toDate();
}

@Injectable()
export class CustomDateAdapter extends NgbDateAdapter<string> {

	fromModel(value: string | null): NgbDateStruct | null {
		if (value) {
			let date = value.split(CommonConstants.SLASH);
			return {
				year: parseInt(date[2], 10),
				month: parseInt(date[1], 10),
				day: parseInt(date[0], 10)
			};
		}
		return null;
	}

	toModel(date: NgbDateStruct | null): string | null {
		return date ? [("0" + date.day).slice(-2), ("0" + date.month).slice(-2), date.year].join(CommonConstants.SLASH) : null;
	}
}

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

	parse(value: string): NgbDateStruct | null {
		if (value) {
			let date = value.split(CommonConstants.SLASH);
			return {
				day: parseInt(date[0], 10),
				month: parseInt(date[1], 10),
				year: parseInt(date[2], 10)
			};
		}
		return null;
	}

	format(date: NgbDateStruct | null): string {
		return date ? [("0" + date.day).slice(-2), ("0" + date.month).slice(-2), date.year].join(CommonConstants.SLASH) : '';
	}
}

