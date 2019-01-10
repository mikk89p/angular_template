import { Component, OnInit, OnDestroy } from '@angular/core';
import { of } from 'rxjs';
import { PayPalConfig, PayPalEnvironment, PayPalIntegrationType } from 'ngx-paypal';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslatePipe } from '../../../translations/translate.pipe';

// Services
import { AlertService } from '../../../services/alert.service';
import { UserService } from '../../../services/user.service';

// Models
import { User } from '../../../models/user';


@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})



export class PricingComponent implements OnInit, OnDestroy {


  public payPalConfig1?: PayPalConfig;
  public payPalConfig2?: PayPalConfig;
  public payPalConfig3?: PayPalConfig;

  returnUrl;
  currentUserSubscription;
  currentUser: User = null;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private translatePipe: TranslatePipe,
    private userService: UserService
  ) {





    this.currentUserSubscription = this.userService.getCurrentUser().subscribe(
      user => {
        let userId = 0;
        if (user) {
          userId = user.id;
          this.currentUser = user;
          // this.payPalConfig1 = this.initConfig(25, userId, 'Product 1', 'Product 1 description');
          this.payPalConfig2 = this.initConfig(49, userId, 'Product 2', 'Product 2 description');
          // this.payPalConfig3 = this.initConfig(99, userId, 'Product 3', 'Product 3 description');
        }

      });
  }

  ngOnInit(): void {

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    let userId = 0;
    if (!this.currentUser) {
      userId = this.currentUser.id;
    }
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

  private initConfig(price: number, userId, name: string, description: string): PayPalConfig {
    return new PayPalConfig(
      PayPalIntegrationType.ClientSideREST,
      PayPalEnvironment.Sandbox,
      {
        commit: true,
        client: {
          sandbox:
            'insert your token'
        },
        button: {
          label: 'pay',  // "checkout" | "pay" | "buynow" | "paypal"
          color: 'gold',   // 'gold, 'blue', 'silver', 'black'
          size: 'medium', // 'medium', 'small', 'large', 'responsive'
          shape: 'rect',    // 'rect', 'pill',
          fundingicons: true,
        },
        onAuthorize: (data, actions) => {
          console.log('Authorize');
          return of(undefined);
        },
        onPaymentComplete: (data, actions) => {
          this.alertService.success(this.translatePipe.transform('Thank you for the purchase'), 6000, true);
          this.router.navigate([this.returnUrl]);
        },
        onCancel: (data, actions) => {
          console.log('OnCancel');
        },
        onError: err => {
          console.log('OnError', err);
        },
        onClick: () => {
          console.log('onClick');
        },
        validate: (actions) => {
          console.log(actions);
        },
        experience: {
          noShipping: true,
          brandName: 'Angular',
        },
        transactions: [
          {
            amount: {
              total: price,
              currency: 'EUR',
            },
            custom: userId,
            // invoice_number: '12345', Insert a unique invoice number

            item_list: {
              items: [
                {
                  name: name,
                  description: description,
                  quantity: 1,
                  price: price,
                  currency: 'EUR'
                }]
            },
          }
        ],

        note_to_payer: 'Contact us if you have troubles processing payment'
      }
    );
  }
}











/*
export class PricingComponent implements OnInit, AfterViewChecked, OnDestroy {


  currentUser: User;
  currentUserSubscription: Subscription;

  finalAmount = 99;
  addScript = false;
  paypalLoad = true;
  scripttagElement;

  paypalConfig = {
    env: 'sandbox', // change to production when live
    client: {
      sandbox: 'AVq7CXgB2v1TZ49OMM1z1kihQgxrnrvpeu8iNLmDC9G4eMfjUKa_rOr7QYD9XE5sKpsZpZntS-5HVPTF',
      production: 'your production key',
    },
    style: {
      color: 'blue',   // 'gold, 'blue', 'silver', 'black'
      size: 'medium', // 'medium', 'small', 'large', 'responsive'
      shape: 'rect'    // 'rect', 'pill'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            {
              amount: { total: this.finalAmount, currency: 'EUR', custom: this.currentUser.id }
            }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {

      // Optional: display a confirmation page here


      // Call your server to execute the payment
      const EXECUTE_URL = 'paypal.com';
      return paypal.request.post(EXECUTE_URL, data)
        .then(function (res) {
          // check for ERROR CODE=INSTRUMENT_DECLINED and restart
          if (res.error === 'INSTRUMENT_DECLINED') {
            return actions.restart();
          }
        });
    },

    onCancel: (data, actions) => {
      console.log('OnCancel');
    },

    onError: function (err) {
      // Show an error page here, when an error occurs
    }
  };

  constructor(private userService: UserService) {

    this.currentUserSubscription = this.userService.getCurrentUser().subscribe(
      user => {
        this.currentUser = user;
      });

    if (!document.getElementById('checkout')) {
      this.addPaypalScript().then(() => {
        console.log('s');
        this.addPaypalButtons();
        this.paypalLoad = false;
      });
    }

  }
  ngOnInit() { }

  ngAfterViewChecked() { }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

  addPaypalButtons() {
    paypal.Button.render(this.paypalConfig, '#paypal-button-1');
    paypal.Button.render(this.paypalConfig, '#paypal-button-2');
    paypal.Button.render(this.paypalConfig, '#paypal-button-3');
  }

  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {

      if (!document.getElementById('checkout')) {
        this.scripttagElement = document.createElement('script');
        this.scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
        this.scripttagElement.id = 'checkout';
        document.body.appendChild(this.scripttagElement);
      } else {
        this.scripttagElement = document.getElementById('checkout');
      }
      this.scripttagElement.onload = resolve;
    });
  }
}*/

/*export class PricingComponent implements AfterViewChecked, OnInit, OnDestroy {


  currentUser: User;
  currentUserSubscription: Subscription;

  finalAmount = 99;
  addScript = false;
  paypalLoad = true;

  paypalConfig = {
    env: 'sandbox', // change to production when live
    client: {
      sandbox: 'AVq7CXgB2v1TZ49OMM1z1kihQgxrnrvpeu8iNLmDC9G4eMfjUKa_rOr7QYD9XE5sKpsZpZntS-5HVPTF',
      production: 'your production key',
    },
    style: {
      color: 'blue',   // 'gold, 'blue', 'silver', 'black'
      size: 'medium', // 'medium', 'small', 'large', 'responsive'
      shape: 'rect'    // 'rect', 'pill'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            {
              amount: { total: this.finalAmount, currency: 'EUR', custom: this.currentUser.id }
            }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {

      // Optional: display a confirmation page here


      // Call your server to execute the payment
      const EXECUTE_URL = 'paypal.com';
      return paypal.request.post(EXECUTE_URL, data)
        .then(function (res) {
          // check for ERROR CODE=INSTRUMENT_DECLINED and restart
          if (res.error === 'INSTRUMENT_DECLINED') {
            return actions.restart();
          }
        });
    },

    onCancel: (data, actions) => {
      console.log('OnCancel');
    },

    onError: function (err) {
      // Show an error page here, when an error occurs
    }
  };

  constructor( private userService: UserService) {

    this.currentUserSubscription = this.userService.getCurrentUser().subscribe(
      user => {
        this.currentUser = user;
      });
  }
  ngOnInit() {
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-button-1');
        paypal.Button.render(this.paypalConfig, '#paypal-button-2');
        paypal.Button.render(this.paypalConfig, '#paypal-button-3');
        this.paypalLoad = false;
      });
    }
  }

  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      const scripttagElement = document.createElement('script');
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.id = 'checkout';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);

    });
  }

}*/
/*
export class PricingComponent implements OnInit {

  public payPalConfig?: PayPalConfig;

  ngOnInit(): void {
    this.initConfig();
  }

  private initConfig(): void {
    this.payPalConfig = new PayPalConfig(
      PayPalIntegrationType.ClientSideREST,
      PayPalEnvironment.Sandbox,
      {
        commit: true,
        client: {
          sandbox:
            'AVq7CXgB2v1TZ49OMM1z1kihQgxrnrvpeu8iNLmDC9G4eMfjUKa_rOr7QYD9XE5sKpsZpZntS-5HVPTF'
        },
        button: {
          label: 'paypal',
          layout: 'vertical',
        },
        onAuthorize: (data, actions) => {
          console.log('Authorize');
          return of(undefined);
        },
        onPaymentComplete: (data, actions) => {
          console.log('OnPaymentComplete');
        },
        onCancel: (data, actions) => {
          console.log('OnCancel');
        },
        onError: err => {
          console.log('OnError');
        },
        onClick: () => {
          console.log('onClick');
        },
        validate: (actions) => {
          console.log(actions);
        },
        experience: {
          noShipping: true,
          brandName: 'Angular',
        },
        transactions: [
          {
            amount: {
              total: 99,
              currency: 'EUR',
            },
            custom: '2',
          }
        ],
        note_to_payer: 'Contact us if you have troubles processing payment'
      }
    );
  }
}*/

/*export class PricingComponent implements AfterViewChecked {

  finalAmount = 1;
  addScript = false;
  paypalLoad = true;

  paypalConfig = {
    env: 'sandbox', // change to production when live
    client: {
      sandbox: 'AVq7CXgB2v1TZ49OMM1z1kihQgxrnrvpeu8iNLmDC9G4eMfjUKa_rOr7QYD9XE5sKpsZpZntS-5HVPTF',
      // production: 'your production key',
    },
    style: {
      color: 'blue',   // 'gold, 'blue', 'silver', 'black'
      size: 'medium', // 'medium', 'small', 'large', 'responsive'
      shape: 'rect'    // 'rect', 'pill'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            {
              amount: { total: this.finalAmount, currency: 'EUR' }
            }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      console.log(data);
      return actions.payment.excecute().then((payment) => {
        // TODO if succesful
      });
    }
  };

  constructor() { }

  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-button-1');
        paypal.Button.render(this.paypalConfig, '#paypal-button-2');
        paypal.Button.render(this.paypalConfig, '#paypal-button-3');
        this.paypalLoad = false;
      });
    }
  }

  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      const scripttagElement = document.createElement('script');
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    });
  }

}*/





