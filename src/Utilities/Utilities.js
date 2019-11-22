import moment from 'moment';
import { Styles } from './Styles';

export default class Utilities {
	constructor() {}

	static instance() {
		return new Utilities();
	}
	dateDDMMYYYY(date) {
		if (date) {
			return moment(date).format('DD/MM/YYYY');
		} else {
			return '';
		}
	}
	dateDDMMYYYY2(date) {
		if (date) {
			return moment(date).format('DD-MM-YYYY');
		} else {
			return '';
		}
	}
	dateHHmm(date) {
		if (date) {
			return moment(date).format('HH:mm');
		} else {
			return '';
		}
	}
	convertToSimpleTime(date) {
		if (date) {
			return moment(date).format('DD/MM/YYYY');
		} else {
			return '';
		}
	}

	formatMoney(x) {
		try {
			if (x) {
				x = x.toString().replace(/^0+|,||\.| /g, '');
				return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
			} else {
				return '0';
			}
		} catch (e) {
			return '0';
		}
	}

	getPawnStatusName(number) {
		switch (number) {
			case 11:
				return 'Đang cầm';
			case 12:
				return 'Đến ngày đóng lãi';
			case 13:
				return 'Chậm Lãi';
			case 14:
				return 'Ngày trả gốc';
			case 15:
				return 'Quá hạn';
			case 100:
				return 'Chờ Thanh Lý';
			case -1:
				return 'Đã Thanh Lý';
			case 1:
				return 'Đã chuộc';
			case 0:
				return 'Đã Xóa';
			default:
				return '';
		}
	}

	getBorrowStatusName(number) {
		switch (number) {
			case 11:
				return 'Đang vay';
			case 12:
				return 'Đến ngày đóng lãi';
			case 13:
				return 'Chậm Lãi';
			case 14:
				return 'Ngày trả gốc';
			case 15:
				return 'Quá hạn';
			case 100:
				return 'Nợ xấu';
			case -1:
				return 'Đã Thanh Lý';
			case 1:
				return 'Đóng hợp đồng';
			case 0:
				return 'Đã Xóa';
			default:
				return '';
		}
	}

	getStatusColor(number) {
		switch (number) {
			case 12:
				return '#f1d52b';
			case 13:
				return '#f1d52b';
			case 14:
				return '#F4516C';
			case 15:
				return '#F4516C';
			default:
				return Styles.secondaryColor;
		}
	}

	removeVietNamese(str) {
		str = str.toLowerCase();
		str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
		str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
		str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
		str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
		str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
		str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
		str = str.replace(/đ/g, 'd');
		str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g, '-');

		str = str.replace(/-+-/g, '-'); //thay thế 2- thành 1-
		str = str.replace(/^\-+|\-+$/g, '');

		return str;
	}

	getStringFromType(type) {
		switch (type) {
			case 4:
				return 'Cầm Đồ';
			case 1:
				return 'Vay Lãi';
			case 2:
				return 'Bát Họ';
			default:
				return '';
		}
	}
	getStringTotalMoneyFromType(type) {
		switch (type) {
			case 4:
				return 'Tiền cầm';
			case 1:
				return 'Tiền vay';
			case 2:
				return 'Bát Họ';
			default:
				return '';
		}
	}
	getStringFromType(type) {
		switch (type) {
			case 4:
				return 'Cầm Đồ';
			case 1:
				return 'Vay Lãi';
			case 2:
				return 'Bát Họ';
			default:
				return '';
		}
	}
	add_dot_number = (number) => {
		var string = number.toString();
		var length = string.length;
		var count = 0;
		var new_string = '';
		for (let i = length - 1; i >= 0; i--) {
			if (count < 3) {
				new_string = string[i] + new_string;
				count = count + 1;
			} else {
				new_string = string[i] + '.' + new_string;
				count = 1;
			}
		}
		return new_string;
	};
	spend_dot_number = (string) => {
		// var string = number.toString()
		var length = string.length;
		var count = 0;
		var new_string = '';
		for (let i = length - 1; i >= 0; i--) {
			if (string[i] != '.') {
				new_string = string[i] + new_string;
			}
		}
		return new_string;
	};
}
