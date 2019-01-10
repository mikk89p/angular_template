import { TranslatePipe } from '../translations/translate.pipe';
import { Inject } from '@angular/core';


export class FormHelper {

  translatePipe;
  serverSideErrors = {};

  constructor(@Inject(TranslatePipe) translatePipe
  ) {
    this.translatePipe = translatePipe;
  }

  public getErrorMessage(formControls, field: string) {
    let response = '';
    Object.entries(formControls[field]['errors']).forEach(
      ([key, value]) => {
        if (key === 'server-side-error') {
          response = this.serverSideErrors[field];
        } else {
          response = 'form.error.' + key;
        }
      }
    );
    return this.translatePipe.transform(response);
  }

  public handleSubmitError(formControls, error: any) {

    console.log(error.message);
    const message = JSON.parse(error.message);

    Object.entries(message).forEach(
      ([key, value]) => {
        // Set a server-side error to a specific field (e.g., username)
        formControls[key].setErrors({ 'server-side-error': true });
        // Save also the error text to a object
        this.serverSideErrors[key] = value;
      }
    );
  }

}
