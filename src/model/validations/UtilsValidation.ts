// import Joi from 'joi';
import { isValid as isValidDate } from 'date-fns';

class UtilsValidation {
  public validDateFormat(date: string) {
    const newDate =
      date.length === 10 &&
      date.slice(-4).indexOf('/') == -1 &&
      date.slice(-4).indexOf('-') == -1
        ? date.slice(3, 5) + '-' + date.slice(0, 2) + '-' + date.slice(-4)
        : date;

    if (!isValidDate(new Date(newDate))) {
      throw new Error('Invalid date format!');
    }

    return newDate;
  }

  public prepareDate(dateString: string) {
    dateString = dateString.replace(/[/]/g, '-');
    dateString = this.validDateFormat(dateString);
    return new Date(dateString).toISOString().slice(0, 10);
  }
}

export default UtilsValidation;
