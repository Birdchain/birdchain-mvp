webpackJsonp([0],{

/***/ 131:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return USERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CURRENT_USER; });
var USERS = [
    {
        id: 1,
        nickName: "Ali",
        profilePhoto: "assets/images/1.jpg"
    },
    {
        id: 2,
        nickName: "Arminas",
        profilePhoto: "assets/images/2.jpg"
    },
    {
        id: 3,
        nickName: "Audrius",
        profilePhoto: "assets/images/3.jpg"
    },
    {
        id: 4,
        nickName: "Elena",
        profilePhoto: "assets/images/4.jpg"
    },
    {
        id: 5,
        nickName: "Ernestas",
        profilePhoto: "assets/images/5.jpg"
    },
    {
        id: 6,
        nickName: "Gabriele",
        profilePhoto: "assets/images/6.jpg"
    },
    {
        id: 7,
        nickName: "Jonas",
        profilePhoto: "assets/images/7.jpg"
    },
    {
        id: 8,
        nickName: "Marius",
        profilePhoto: "assets/images/8.jpg"
    },
    {
        id: 9,
        nickName: "Simas",
        profilePhoto: "assets/images/9.jpg"
    },
    {
        id: 10,
        nickName: "Zygimantas",
        profilePhoto: "assets/images/10.jpg"
    }
];
var CURRENT_USER = USERS[8];
//# sourceMappingURL=users.js.map

/***/ }),

/***/ 147:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 147;

/***/ }),

/***/ 190:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 190;

/***/ }),

/***/ 237:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LayoutComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_database_service__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LayoutComponent = (function () {
    function LayoutComponent(platform, toastCtrl, database) {
        this.platform = platform;
        this.toastCtrl = toastCtrl;
        this.database = database;
    }
    LayoutComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isMessagesOpened = false;
        this.slide = 0;
        this.balance = 0;
        this.isSending = this.database.getSettings().isSending;
        var interval;
        if (this.isSending) {
            interval = __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].interval(this.database.updateInterval).subscribe(function () { return _this.onSubscribe(); });
        }
        this.database.settingsUpdated.subscribe(function (res) {
            if (!res.isSending && interval) {
                interval.unsubscribe();
            }
            else if (res.isSending) {
                interval = __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].interval(_this.database.updateInterval).subscribe(function () { return _this.onSubscribe(); });
            }
            _this.isSending = res.isSending;
        });
        this.handleBackButton();
    };
    LayoutComponent.prototype.switchSlide = function (index) {
        this.slide = index;
        this.slides.slideTo(index);
        if (this.isMessagesOpened) {
            this.isMessagesOpened = false;
        }
    };
    LayoutComponent.prototype.onSlideChanged = function () {
        this.slide = this.slides.getActiveIndex();
        if (this.isMessagesOpened) {
            this.isMessagesOpened = false;
        }
        if (this.isGoingBack) {
            this.isGoingBack = false;
            return;
        }
        this.navPath.push(this.slide);
    };
    LayoutComponent.prototype.onWindowChanged = function (value) {
        this.isMessagesOpened = value;
    };
    LayoutComponent.prototype.handleBackButton = function () {
        var _this = this;
        var lastTimeBackPress = 0;
        var timePeriodToExit = 2000;
        this.navPath = [];
        this.platform.registerBackButtonAction(function () {
            if (_this.isMessagesOpened) {
                _this.isMessagesOpened = false;
                return;
            }
            if (_this.navPath.length < 1) {
                if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
                    _this.platform.exitApp();
                }
                else {
                    var toast = _this.toastCtrl.create({
                        message: 'Press back again to exit',
                        duration: 3000,
                        position: 'bottom'
                    });
                    toast.present();
                    lastTimeBackPress = new Date().getTime();
                }
                return;
            }
            _this.navPath.pop();
            _this.slide = _this.navPath[_this.navPath.length - 1];
            _this.slides.slideTo(_this.slide);
            _this.isGoingBack = true;
        });
    };
    LayoutComponent.prototype.onSubscribe = function () {
        this.balance += 1;
    };
    return LayoutComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Slides */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Slides */])
], LayoutComponent.prototype, "slides", void 0);
LayoutComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: "app-layout",template:/*ion-inline-start:"/Users/zygimantas/projects/sms-coin-mob-app/src/pages/layout/layout.component.html"*/'<ion-header [ngClass]="{\'wallet\': slide === 1}">\n    <ion-toolbar>\n        <div class="segment-md">\n            <button (click)="switchSlide(0)" class="segment-button" [ngClass]="{\'segment-activated\': slide === 0}">\n                <ion-icon name="chatboxes"></ion-icon>\n            </button>\n            <button (click)="switchSlide(1)" class="segment-button" [ngClass]="{\'segment-activated\': slide === 1}">\n                <ion-icon name="card"></ion-icon>\n            </button>\n            <button (click)="switchSlide(2)" class="segment-button" [ngClass]="{\'segment-activated\': slide === 2}">\n                <ion-icon name="options"></ion-icon>\n            </button>\n        </div>\n    </ion-toolbar>\n    <div class="coin-divider">\n        <div class="horizontal-line"></div>\n        <span>{{balance}} BIRDs</span>\n        <div class="horizontal-line"></div>\n    </div>\n</ion-header>\n\n<ion-content>\n    <ion-slides class="content-wrapper" (ionSlideDidChange)="onSlideChanged()">\n        <ion-slide>\n            <app-conversations [isMessagesOpened]="isMessagesOpened"\n                               (onWindowChange)="onWindowChanged($event)"></app-conversations>\n        </ion-slide>\n        <ion-slide>\n            <app-wallet [balance]="balance"></app-wallet>\n        </ion-slide>\n        <ion-slide>\n            <app-settings></app-settings>\n        </ion-slide>\n    </ion-slides>\n</ion-content>\n'/*ion-inline-end:"/Users/zygimantas/projects/sms-coin-mob-app/src/pages/layout/layout.component.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_2__app_database_service__["a" /* DatabaseService */]])
], LayoutComponent);

//# sourceMappingURL=layout.component.js.map

/***/ }),

/***/ 238:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CONVERSATIONS; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__users__ = __webpack_require__(131);

var CONVERSATIONS = [
    {
        id: 1,
        user: __WEBPACK_IMPORTED_MODULE_0__users__["b" /* USERS */][0],
        lastMessage: "This is...",
        unreadCount: 24,
        dateSent: "11/10"
    },
    {
        id: 2,
        user: __WEBPACK_IMPORTED_MODULE_0__users__["b" /* USERS */][1],
        lastMessage: "This is...",
        unreadCount: 5,
        dateSent: "10/10"
    },
    {
        id: 3,
        user: __WEBPACK_IMPORTED_MODULE_0__users__["b" /* USERS */][2],
        lastMessage: "This is...",
        unreadCount: 0,
        dateSent: "Wednesday"
    },
    {
        id: 4,
        user: __WEBPACK_IMPORTED_MODULE_0__users__["b" /* USERS */][3],
        lastMessage: "This is...",
        unreadCount: 0,
        dateSent: "Thursday"
    },
    {
        id: 5,
        user: __WEBPACK_IMPORTED_MODULE_0__users__["b" /* USERS */][4],
        lastMessage: "This is...",
        unreadCount: 0,
        dateSent: "12/15"
    },
    {
        id: 6,
        user: __WEBPACK_IMPORTED_MODULE_0__users__["b" /* USERS */][5],
        lastMessage: "This is...",
        unreadCount: 0,
        dateSent: "02/05"
    },
    {
        id: 7,
        user: __WEBPACK_IMPORTED_MODULE_0__users__["b" /* USERS */][6],
        lastMessage: "This is...",
        unreadCount: 0,
        dateSent: "Monday"
    },
    {
        id: 8,
        user: __WEBPACK_IMPORTED_MODULE_0__users__["b" /* USERS */][7],
        lastMessage: "This is...",
        unreadCount: 0,
        dateSent: "12/24"
    },
    {
        id: 9,
        user: __WEBPACK_IMPORTED_MODULE_0__users__["b" /* USERS */][9],
        lastMessage: "This is...",
        unreadCount: 0,
        dateSent: "Friday"
    }
];
//# sourceMappingURL=conversations.js.map

/***/ }),

/***/ 262:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__start_component__ = __webpack_require__(704);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__start_component__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 263:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__intro_component__ = __webpack_require__(706);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__intro_component__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 264:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__layout_component__ = __webpack_require__(237);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__layout_component__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 385:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(386);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(390);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 390:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(427);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_screen_orientation__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_layout__ = __webpack_require__(264);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_conversations__ = __webpack_require__(707);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_messages__ = __webpack_require__(709);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_wallet__ = __webpack_require__(711);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_settings__ = __webpack_require__(761);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_start__ = __webpack_require__(262);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__database_service__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_intro__ = __webpack_require__(263);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_13__pages_start__["a" /* StartComponent */],
            __WEBPACK_IMPORTED_MODULE_8__pages_layout__["a" /* LayoutComponent */],
            __WEBPACK_IMPORTED_MODULE_9__pages_conversations__["a" /* ConversationsComponent */],
            __WEBPACK_IMPORTED_MODULE_10__pages_messages__["a" /* MessagesComponent */],
            __WEBPACK_IMPORTED_MODULE_11__pages_wallet__["a" /* WalletComponent */],
            __WEBPACK_IMPORTED_MODULE_12__pages_settings__["a" /* SettingsComponent */],
            __WEBPACK_IMPORTED_MODULE_15__pages_intro__["a" /* IntroComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */]),
            __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["a" /* IonicStorageModule */].forRoot()
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_13__pages_start__["a" /* StartComponent */],
            __WEBPACK_IMPORTED_MODULE_8__pages_layout__["a" /* LayoutComponent */],
            __WEBPACK_IMPORTED_MODULE_15__pages_intro__["a" /* IntroComponent */],
            __WEBPACK_IMPORTED_MODULE_10__pages_messages__["a" /* MessagesComponent */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_14__database_service__["a" /* DatabaseService */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_screen_orientation__["a" /* ScreenOrientation */],
            { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 427:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_screen_orientation__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_layout_layout_component__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_start__ = __webpack_require__(262);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, screenOrientation, storage) {
        this.storage = storage;
        platform.ready().then(function () {
            if (platform.is('android')) {
                screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT);
            }
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp.prototype.ngOnInit = function () {
        var _this = this;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_7__pages_start__["a" /* StartComponent */];
        this.storage.get("authToken").then(function (res) {
            if (res) {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__pages_layout_layout_component__["a" /* LayoutComponent */]);
            }
        });
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])("nav"),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* NavController */])
], MyApp.prototype, "navCtrl", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/zygimantas/projects/sms-coin-mob-app/src/app/app.html"*/'<ion-nav #nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/zygimantas/projects/sms-coin-mob-app/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_native_screen_orientation__["a" /* ScreenOrientation */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 437:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MESSAGES; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__users__ = __webpack_require__(131);

var MESSAGES = {
    1: [
        { id: 1, sender: __WEBPACK_IMPORTED_MODULE_0__users__["a" /* CURRENT_USER */], text: "This is a general conversation text.", dateSent: "10:24" },
        { id: 2, sender: __WEBPACK_IMPORTED_MODULE_0__users__["b" /* USERS */][0], text: "This is a general conversation text.", dateSent: "10:30" },
        { id: 3, sender: __WEBPACK_IMPORTED_MODULE_0__users__["b" /* USERS */][0], text: "This is a general conversation text.", dateSent: "10:40" },
        { id: 4, sender: __WEBPACK_IMPORTED_MODULE_0__users__["b" /* USERS */][0], text: "This is a general conversation text.", dateSent: "10:50" },
        { id: 5, sender: __WEBPACK_IMPORTED_MODULE_0__users__["b" /* USERS */][0], text: "This is a general conversation text.", dateSent: "11:00" },
        { id: 6, sender: __WEBPACK_IMPORTED_MODULE_0__users__["a" /* CURRENT_USER */], text: "This is a general conversation text.", dateSent: "11:11" },
        { id: 7, sender: __WEBPACK_IMPORTED_MODULE_0__users__["b" /* USERS */][0], text: "This is a general conversation text.", dateSent: "11:30" },
        { id: 8, sender: __WEBPACK_IMPORTED_MODULE_0__users__["b" /* USERS */][0], text: "This is a general conversation text.", dateSent: "12:00" },
        { id: 9, sender: __WEBPACK_IMPORTED_MODULE_0__users__["b" /* USERS */][0], text: "This is a general conversation text.", dateSent: "12:14" },
        { id: 10, sender: __WEBPACK_IMPORTED_MODULE_0__users__["b" /* USERS */][0], text: "This is a general conversation text.", dateSent: "12:24" },
        { id: 11, sender: __WEBPACK_IMPORTED_MODULE_0__users__["b" /* USERS */][0], text: "This is a general conversation text.", dateSent: "12:25" },
        { id: 12, sender: __WEBPACK_IMPORTED_MODULE_0__users__["b" /* USERS */][0], text: "This is a general conversation text.", dateSent: "12:26" },
        { id: 13, sender: __WEBPACK_IMPORTED_MODULE_0__users__["b" /* USERS */][0], text: "This is a general conversation text.", dateSent: "12:27" },
        { id: 14, sender: __WEBPACK_IMPORTED_MODULE_0__users__["b" /* USERS */][0], text: "This is a general conversation text.", dateSent: "12:28" },
        { id: 15, sender: __WEBPACK_IMPORTED_MODULE_0__users__["b" /* USERS */][0], text: "This is a general conversation text.", dateSent: "12:29" },
        { id: 16, sender: __WEBPACK_IMPORTED_MODULE_0__users__["b" /* USERS */][0], text: "This is a general conversation text.", dateSent: "12:30" },
        { id: 17, sender: __WEBPACK_IMPORTED_MODULE_0__users__["b" /* USERS */][0], text: "This is a general conversation text.", dateSent: "12:31" },
        { id: 18, sender: __WEBPACK_IMPORTED_MODULE_0__users__["b" /* USERS */][0], text: "This is a general conversation text.", dateSent: "12:32" },
        { id: 19, sender: __WEBPACK_IMPORTED_MODULE_0__users__["b" /* USERS */][0], text: "This is a general conversation text.", dateSent: "12:33" },
        { id: 20, sender: __WEBPACK_IMPORTED_MODULE_0__users__["b" /* USERS */][0], text: "This is a general conversation text.", dateSent: "12:34" },
    ],
    2: [
        { id: 1, sender: __WEBPACK_IMPORTED_MODULE_0__users__["a" /* CURRENT_USER */], text: "This is a general conversation text.", dateSent: "15:24" },
        { id: 3, sender: __WEBPACK_IMPORTED_MODULE_0__users__["b" /* USERS */][1], text: "This is a general conversation text.", dateSent: "16:24" },
        { id: 4, sender: __WEBPACK_IMPORTED_MODULE_0__users__["b" /* USERS */][1], text: "This is a general conversation text.", dateSent: "17:24" },
        { id: 5, sender: __WEBPACK_IMPORTED_MODULE_0__users__["a" /* CURRENT_USER */], text: "This is a general conversation text.", dateSent: "18:24" },
        { id: 6, sender: __WEBPACK_IMPORTED_MODULE_0__users__["b" /* USERS */][1], text: "This is a general conversation text.", dateSent: "19:24" },
        { id: 7, sender: __WEBPACK_IMPORTED_MODULE_0__users__["b" /* USERS */][1], text: "This is a general conversation text.", dateSent: "20:24" },
        { id: 8, sender: __WEBPACK_IMPORTED_MODULE_0__users__["b" /* USERS */][1], text: "This is a general conversation text.", dateSent: "20:34" },
        { id: 9, sender: __WEBPACK_IMPORTED_MODULE_0__users__["b" /* USERS */][1], text: "This is a general conversation text.", dateSent: "20:44" }
    ],
    3: [
        { id: 1, sender: __WEBPACK_IMPORTED_MODULE_0__users__["a" /* CURRENT_USER */], text: "This is a general conversation text.", dateSent: "09:24" },
        { id: 3, sender: __WEBPACK_IMPORTED_MODULE_0__users__["a" /* CURRENT_USER */], text: "This is a general conversation text.", dateSent: "09:29" },
        { id: 4, sender: __WEBPACK_IMPORTED_MODULE_0__users__["a" /* CURRENT_USER */], text: "This is a general conversation text.", dateSent: "10:24" },
        { id: 5, sender: __WEBPACK_IMPORTED_MODULE_0__users__["b" /* USERS */][2], text: "This is a general conversation text.", dateSent: "12:24" }
    ],
    4: [
        { id: 1, sender: __WEBPACK_IMPORTED_MODULE_0__users__["b" /* USERS */][3], text: "This is a general conversation text.", dateSent: "09:24" },
        { id: 3, sender: __WEBPACK_IMPORTED_MODULE_0__users__["a" /* CURRENT_USER */], text: "This is a general conversation text.", dateSent: "10:24" },
        { id: 4, sender: __WEBPACK_IMPORTED_MODULE_0__users__["b" /* USERS */][3], text: "This is a general conversation text.", dateSent: "11:24" }
    ],
    5: [
        { id: 1, sender: __WEBPACK_IMPORTED_MODULE_0__users__["b" /* USERS */][4], text: "This is a general conversation text.", dateSent: "10:24" },
        { id: 3, sender: __WEBPACK_IMPORTED_MODULE_0__users__["a" /* CURRENT_USER */], text: "This is a general conversation text.", dateSent: "11:24" },
        { id: 4, sender: __WEBPACK_IMPORTED_MODULE_0__users__["b" /* USERS */][4], text: "This is a general conversation text.", dateSent: "15:24" },
        { id: 5, sender: __WEBPACK_IMPORTED_MODULE_0__users__["a" /* CURRENT_USER */], text: "This is a general conversation text.", dateSent: "16:24" }
    ],
    6: [
        { id: 1, sender: __WEBPACK_IMPORTED_MODULE_0__users__["b" /* USERS */][5], text: "This is a general conversation text.", dateSent: "11:24" },
        { id: 3, sender: __WEBPACK_IMPORTED_MODULE_0__users__["a" /* CURRENT_USER */], text: "This is a general conversation text.", dateSent: "12:24" }
    ],
    7: [
        { id: 1, sender: __WEBPACK_IMPORTED_MODULE_0__users__["a" /* CURRENT_USER */], text: "This is a general conversation text.", dateSent: "15:24" },
        { id: 3, sender: __WEBPACK_IMPORTED_MODULE_0__users__["a" /* CURRENT_USER */], text: "This is a general conversation text.", dateSent: "16:24" },
        { id: 4, sender: __WEBPACK_IMPORTED_MODULE_0__users__["b" /* USERS */][6], text: "This is a general conversation text.", dateSent: "17:24" },
        { id: 5, sender: __WEBPACK_IMPORTED_MODULE_0__users__["b" /* USERS */][6], text: "This is a general conversation text.", dateSent: "18:24" },
        { id: 6, sender: __WEBPACK_IMPORTED_MODULE_0__users__["b" /* USERS */][6], text: "This is a general conversation text.", dateSent: "19:24" },
        { id: 7, sender: __WEBPACK_IMPORTED_MODULE_0__users__["a" /* CURRENT_USER */], text: "This is a general conversation text.", dateSent: "20:24" }
    ],
    8: [
        { id: 1, sender: __WEBPACK_IMPORTED_MODULE_0__users__["a" /* CURRENT_USER */], text: "Hi, are you coming?", dateSent: "21:04" }
    ],
    9: [
        { id: 1, sender: __WEBPACK_IMPORTED_MODULE_0__users__["a" /* CURRENT_USER */], text: "Hi!", dateSent: "08:11" },
        { id: 2, sender: __WEBPACK_IMPORTED_MODULE_0__users__["b" /* USERS */][9], text: "Hello!", dateSent: "08:30" },
        { id: 3, sender: __WEBPACK_IMPORTED_MODULE_0__users__["a" /* CURRENT_USER */], text: "Can you send me report that I have asked?", dateSent: "08:40" },
        { id: 4, sender: __WEBPACK_IMPORTED_MODULE_0__users__["b" /* USERS */][9], text: "Yes, I am almost done", dateSent: "08:50" },
        { id: 5, sender: __WEBPACK_IMPORTED_MODULE_0__users__["a" /* CURRENT_USER */], text: "Don't worry. We still have plent of time", dateSent: "09:23" },
        { id: 6, sender: __WEBPACK_IMPORTED_MODULE_0__users__["b" /* USERS */][9], text: "Where should I send it?", dateSent: "09:26" },
        { id: 7, sender: __WEBPACK_IMPORTED_MODULE_0__users__["a" /* CURRENT_USER */], text: "To my work email", dateSent: "09:38" },
        { id: 8, sender: __WEBPACK_IMPORTED_MODULE_0__users__["b" /* USERS */][9], text: "Okay, it's done", dateSent: "10:00" }
    ]
};
//# sourceMappingURL=messages.js.map

/***/ }),

/***/ 438:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SETTINGS; });
var SETTINGS = {
    isLimited: true,
    isUnlimited: false,
    isHidden: true,
    isSending: false,
    limitPerMonth: 1000
};
//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 47:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DatabaseService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_conversations__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_messages__ = __webpack_require__(437);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data_settings__ = __webpack_require__(438);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DatabaseService = (function () {
    function DatabaseService() {
        this.conversations = __WEBPACK_IMPORTED_MODULE_1__data_conversations__["a" /* CONVERSATIONS */];
        this.messages = __WEBPACK_IMPORTED_MODULE_2__data_messages__["a" /* MESSAGES */];
        this.settings = __WEBPACK_IMPORTED_MODULE_3__data_settings__["a" /* SETTINGS */];
        this.settingsUpdated = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
        this.updateInterval = 4000;
    }
    DatabaseService.prototype.getConversations = function () {
        return this.conversations;
    };
    DatabaseService.prototype.getMessages = function (conversationId) {
        return this.messages[conversationId];
    };
    DatabaseService.prototype.getSettings = function () {
        return this.settings;
    };
    DatabaseService.prototype.addMessage = function (conversationId, sender, text) {
        if (text.length < 1) {
            return;
        }
        var date = new Date();
        var newMessage = { sender: sender, text: text, dateSent: date.getHours() + ":" + date.getMinutes() };
        this.messages[conversationId].push(newMessage);
    };
    DatabaseService.prototype.updateSettings = function (setting, value) {
        this.settings[setting] = value;
        this.settingsUpdated.emit(this.settings);
    };
    return DatabaseService;
}());
DatabaseService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], DatabaseService);

//# sourceMappingURL=database.service.js.map

/***/ }),

/***/ 704:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StartComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_data__ = __webpack_require__(705);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__intro__ = __webpack_require__(263);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var StartComponent = (function () {
    function StartComponent(navCtrl, fb) {
        this.navCtrl = navCtrl;
        this.fb = fb;
        this.isLoaded = false;
    }
    StartComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.countries = __WEBPACK_IMPORTED_MODULE_3__app_data__["a" /* Data */].countries;
        this.countriesKeys = Object.keys(this.countries);
        this.phoneNumberForm = this.fb.group({
            country: ["lt"],
            phoneNumber: [""]
        });
        setTimeout(function () { return _this.isLoaded = true; }, 1);
    };
    StartComponent.prototype.submitPhoneNumber = function () {
        // Perform phone number submit request
        this.codeForm = this.fb.group({
            code: [""]
        });
        // this.isPhoneNumberSubmitted = true;
        this.submitCode();
    };
    StartComponent.prototype.submitCode = function () {
        // Perform code submit request
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__intro__["a" /* IntroComponent */]);
    };
    return StartComponent;
}());
StartComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: "app-start",template:/*ion-inline-start:"/Users/zygimantas/projects/sms-coin-mob-app/src/pages/start/start.component.html"*/'<img [ngClass]="{\'loaded\': isLoaded}" src="assets/images/birdchain.png" alt="Senato" />\n<form *ngIf="!isPhoneNumberSubmitted" [ngClass]="{\'loaded\': isLoaded}" [formGroup]="phoneNumberForm" (ngSubmit)="submitPhoneNumber()">\n    <!--<span class="label">Phone number</span>\n    <ion-select formControlName="country">\n        <ion-option *ngFor="let countryCode of countriesKeys" value="{{countryCode}}">{{countries[countryCode]}}</ion-option>\n    </ion-select>\n    <ion-input type="tel" formControlName="phoneNumber"></ion-input>-->\n    <button class="confirm" [ngClass]="{\'is-active\': phoneNumberForm.get(\'phoneNumber\').value.length > 3}">Continue</button>\n</form>\n<form *ngIf="isPhoneNumberSubmitted" [ngClass]="{\'loaded\': isLoaded}" [formGroup]="codeForm">\n    <span class="label">Verification code</span>\n    <span class="caption">Type verification code we sent you</span>\n    <ion-input formControlName="code"></ion-input>\n    <button class="confirm" [ngClass]="{\'is-active\': codeForm.get(\'code\').value.length > 3}" (click)="submitCode()">Confirm</button>\n</form>\n'/*ion-inline-end:"/Users/zygimantas/projects/sms-coin-mob-app/src/pages/start/start.component.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* NavController */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */]])
], StartComponent);

//# sourceMappingURL=start.component.js.map

/***/ }),

/***/ 705:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Data; });
var Data = {
    countries: {
        lt: "Lithuania",
        en: "United States"
    }
};
//# sourceMappingURL=data.js.map

/***/ }),

/***/ 706:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IntroComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__layout__ = __webpack_require__(264);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var IntroComponent = (function () {
    function IntroComponent(navCtrl) {
        this.navCtrl = navCtrl;
    }
    IntroComponent.prototype.ngOnInit = function () {
        this.slides.lockSwipes(true);
    };
    IntroComponent.prototype.switchSlide = function (index) {
        this.slides.lockSwipes(false);
        this.slides.slideTo(index);
    };
    IntroComponent.prototype.openApp = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__layout__["a" /* LayoutComponent */]);
    };
    return IntroComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Slides */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Slides */])
], IntroComponent.prototype, "slides", void 0);
IntroComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: "app-intro",template:/*ion-inline-start:"/Users/zygimantas/projects/sms-coin-mob-app/src/pages/intro/intro.component.html"*/'<ion-slides pager="true">\n    <ion-slide class="padding">\n        <div class="content border spaced">\n            <div class="text-block">\n                <span class="title">Welcome!</span>\n                <span class="text">This is a <span class="highlight">simulation app</span>.</span>\n                <span class="text">This app is for demonstration purposes only. <span class="highlight">It will not send or receive</span> any messages, neither instant, nor SMS.</span>\n                <span class="text">Working Birdchain app is expected to be launched on <span class="highlight">July 2018</span>.</span>\n                <span class="text">Design and portrayed features of Birdchain app are <span class="highlight">not final</span> and will change.</span>\n            </div>\n            <button (click)="switchSlide(1)">Continue</button>\n        </div>\n    </ion-slide>\n    <ion-slide class="padding">\n        <div class="content border spaced">\n            <div class="text-block">\n                <span class="title">Intro</span>\n                <span class="text"><span class="highlight">Birdchain</span> is an instant messaging app that will allow it\'s users to sell their <span class="highlight">unused SMS</span> messages.</span>\n                <span class="text">For every sold SMS app user will be rewarded with cryptocurrency which can be sold in cryptocurrency exchange.</span>\n                <svg id="icon-phone" class="svg-vertical" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110.35 151.5"><title>icon-phone</title><line id="phone-screen" class="cls-2" x1="33.32" y1="16.5" x2="103.25" y2="16.5"></line><ellipse id="phone-camera" class="cls-2" cx="53.36" cy="9.01" rx="2.27" ry="2.28"></ellipse><ellipse id="phone-button" class="cls-2" cx="68.28" cy="143.03" rx="3.46" ry="3.48"></ellipse><rect id="phone-speaker" class="cls-2" x="63.64" y="6.73" width="25.7" height="4.56" rx="2.27" ry="2.27"></rect><path id="phone-line2" class="cls-1" d="M130.75,94a9,9,0,0,0-9,9V205.7H105.08a9.53,9.53,0,0,1-9.51-9.54V160a9.53,9.53,0,0,1,9.51-9.54h80a9.53,9.53,0,0,1,9.51,9.54V205.7h-6.81l4.95,10.16a1.43,1.43,0,0,1-1.93,1.89L167.17,205.7H141" transform="translate(-94.83 -93.25)"></path><path id="phone-line1" class="cls-1" d="M187.74,228H121.79v7a9,9,0,0,0,9,9h64.73a9,9,0,0,0,9-9V103a9,9,0,0,0-9-9H130.75" transform="translate(-94.83 -93.25)"></path></svg>\n            </div>\n            <button (click)="switchSlide(2)">Continue</button>\n        </div>\n    </ion-slide>\n    <ion-slide>\n        <div class="content">\n            <div class="gradient-block">\n                <img src="assets/images/birdchain-white.png" class="logo" alt="Logo"/>\n                <img src="assets/images/promo-text.png" class="promo" alt="Promo"/>\n            </div>\n            <div class="text-block spaced">\n                <div class="text-content">\n                    <span class="text">Funds raised during ICO will be used for Birdchain app development.</span>\n                    <div class="separator">\n                        <span class="highlight spaced">ICO STARTS</span>\n                        <span class="highlight spaced">NOVEMBER 18, 2017 15:00:00 GMT</span>\n                    </div>\n                    <span class="text">Visit <a class="highlight" onclick="window.open(\'https://www.birdchain.io\', \'_system\', \'location=yes\'); return false;">www.birdchain.io</a></span>\n                </div>\n                <button (click)="openApp()">Open simulation</button>\n            </div>\n        </div>\n    </ion-slide>\n</ion-slides>\n'/*ion-inline-end:"/Users/zygimantas/projects/sms-coin-mob-app/src/pages/intro/intro.component.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* NavController */]])
], IntroComponent);

//# sourceMappingURL=intro.component.js.map

/***/ }),

/***/ 707:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__conversations_component__ = __webpack_require__(708);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__conversations_component__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 708:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConversationsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_database_service__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ConversationsComponent = (function () {
    function ConversationsComponent(fb, database) {
        this.fb = fb;
        this.database = database;
        this.isMessagesOpened = false;
        this.onWindowChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
        this.messageId = 1;
    }
    ConversationsComponent.prototype.ngOnInit = function () {
        this.form = this.fb.group({
            search: [""]
        });
        this.conversations = this.database.getConversations();
    };
    ConversationsComponent.prototype.findConversation = function (conversation) {
        return this.conversations.findIndex(function (currConversation) { return currConversation.id === conversation.id; });
    };
    ConversationsComponent.prototype.onTap = function (conversation) {
        if (this.isSelectionModeActivated) {
            this.onPress(conversation);
            var selectedConversationIndex = this.conversations.findIndex(function (currConversation) { return currConversation.selected; });
            if (selectedConversationIndex < 0) {
                this.isSelectionModeActivated = false;
            }
            return;
        }
        this.isMessagesOpened = true;
        this.messageId = conversation.id;
        conversation.unreadCount = 0;
        this.onWindowChange.emit(this.isMessagesOpened);
    };
    ConversationsComponent.prototype.newConversation = function () {
        console.log("New message initiated");
    };
    ConversationsComponent.prototype.onPress = function (conversation) {
        if (!this.isSelectionModeActivated) {
            this.isSelectionModeActivated = true;
        }
        var conversationIndex = this.findConversation(conversation);
        this.conversations[conversationIndex].selected = !this.conversations[conversationIndex].selected;
    };
    ConversationsComponent.prototype.removeConversations = function () {
        this.conversations = this.conversations.filter(function (conversation) { return !conversation.selected; });
        this.isSelectionModeActivated = false;
    };
    ConversationsComponent.prototype.search = function () {
        console.log("Search initiated");
    };
    return ConversationsComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", Boolean)
], ConversationsComponent.prototype, "isMessagesOpened", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Output */])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */])
], ConversationsComponent.prototype, "onWindowChange", void 0);
ConversationsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: "app-conversations",template:/*ion-inline-start:"/Users/zygimantas/projects/sms-coin-mob-app/src/pages/conversations/conversations.component.html"*/'<div *ngIf="!isMessagesOpened" class="conversations-wrapper">\n    <!--<div class="search-wrapper" ion-fixed>\n        <form [formGroup]="form" (ngSubmit)="search()">\n            <input formControlName="search"/>\n            <button><ion-icon name="search"></ion-icon></button>\n        </form>\n    </div>-->\n    <div *ngFor="let conversation of conversations">\n        <div class="conversation-wrapper"\n             [ngClass]="{\'has-unread\': conversation.unreadCount > 0, \'selected\': conversation.selected}"\n             (tap)="onTap(conversation)"\n             (press)="onPress(conversation)"\n        >\n            <div class="img-wrapper">\n                <img src="{{conversation.user.profilePhoto}}" alt="Photo"/>\n            </div>\n            <div class="content-wrapper">\n                <span class="name">{{conversation.user.nickName}}</span>\n                <span class="conversation-text">{{conversation.lastMessage}}</span>\n                <div *ngIf="conversation.unreadCount > 0 && conversation.unreadCount <= 9" class="unread-count">{{conversation.unreadCount}}</div>\n                <div *ngIf="conversation.unreadCount > 9" class="unread-count">9+</div>\n                <span class="date">{{conversation.dateSent}}</span>\n            </div>\n        </div>\n        <div class="separator"></div>\n    </div>\n</div>\n<div *ngIf="!isMessagesOpened" class="buttons-fixed">\n    <div class="buttons-wrapper">\n        <div *ngIf="isSelectionModeActivated" class="remove-conversations" (click)="removeConversations()"><ion-icon name="trash"></ion-icon></div>\n        <div class="new-conversation" (click)="newConversation()"><ion-icon name="add"></ion-icon></div>\n    </div>\n</div>\n<app-messages *ngIf="isMessagesOpened" [messageId]="messageId"></app-messages>\n'/*ion-inline-end:"/Users/zygimantas/projects/sms-coin-mob-app/src/pages/conversations/conversations.component.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_2__app_database_service__["a" /* DatabaseService */]])
], ConversationsComponent);

//# sourceMappingURL=conversations.component.js.map

/***/ }),

/***/ 709:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__messages_component__ = __webpack_require__(710);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__messages_component__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 710:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessagesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_database_service__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_data_conversations__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_data_users__ = __webpack_require__(131);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MessagesComponent = (function () {
    function MessagesComponent(fb, database) {
        this.fb = fb;
        this.database = database;
    }
    MessagesComponent.prototype.ngOnInit = function () {
        this.id = this.messageId;
        this.conversation = __WEBPACK_IMPORTED_MODULE_3__app_data_conversations__["a" /* CONVERSATIONS */][this.id - 1];
        this.currUser = __WEBPACK_IMPORTED_MODULE_4__app_data_users__["a" /* CURRENT_USER */];
        this.form = this.fb.group({
            text: [""]
        });
        this.messages = this.database.getMessages(this.id);
    };
    MessagesComponent.prototype.sendMessage = function () {
        this.database.addMessage(this.id, this.currUser, this.form.get("text").value);
        this.form.patchValue({
            text: ""
        });
    };
    return MessagesComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", Number)
], MessagesComponent.prototype, "messageId", void 0);
MessagesComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: "app-messages",template:/*ion-inline-start:"/Users/zygimantas/projects/sms-coin-mob-app/src/pages/messages/messages.component.html"*/'<span class="primary-text">{{conversation.user.nickName}}</span>\n<div class="messages-absolute">\n    <div class="messages-wrapper">\n        <div *ngFor="let message of messages" class="message-wrapper" [ngClass]="{\'mine\': message.sender.id === currUser.id}">\n            <div *ngIf="message.sender.id !== currUser.id" class="user-circle">\n                <img src="assets/images/{{message.sender.id}}.jpg" alt="Photo"/>\n            </div>\n            <div class="message">\n                <span class="date">{{message.dateSent}}</span>\n                <span class="text">{{message.text}}</span>\n            </div>\n            <div *ngIf="message.sender.id === currUser.id" class="user-circle">\n                <img src="assets/images/{{currUser.id}}.jpg" alt="Photo"/>\n            </div>\n        </div>\n        <div class="empty-block"></div>\n    </div>\n</div>\n<form [formGroup]="form" (ngSubmit)="sendMessage()" ion-fixed>\n    <input formControlName="text"/>\n    <button class="send">\n        <ion-icon name="send"></ion-icon>\n    </button>\n</form>\n'/*ion-inline-end:"/Users/zygimantas/projects/sms-coin-mob-app/src/pages/messages/messages.component.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_2__app_database_service__["a" /* DatabaseService */]])
], MessagesComponent);

//# sourceMappingURL=messages.component.js.map

/***/ }),

/***/ 711:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__wallet_component__ = __webpack_require__(712);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__wallet_component__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 712:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WalletComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_chart_js__ = __webpack_require__(713);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_chart_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_chart_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_database_service__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var WalletComponent = (function () {
    function WalletComponent(database) {
        this.database = database;
    }
    WalletComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.amountOfSms = 0;
        var ctx = this.barCanvas.nativeElement.getContext('2d');
        var gradient = ctx.createLinearGradient(0, 0, 0, 600);
        gradient.addColorStop(0, '#822a6c');
        gradient.addColorStop(0.21, '#a0687c');
        this.barChart = new __WEBPACK_IMPORTED_MODULE_1_chart_js__["Chart"](this.barCanvas.nativeElement, {
            type: "line",
            data: {
                labels: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
                datasets: [{
                        label: "Line 1",
                        data: [9, 10, 9, 13, 15, 17, 19],
                        borderColor: "rgba(255, 255, 255, 0.8)",
                        pointBackgroundColor: "rgba(255, 255, 255, 1)",
                        fill: false
                    }, {
                        label: "Line 2",
                        data: [10, 11, 10, 14, 16, 18, 20],
                        backgroundColor: gradient,
                        borderColor: "rgba(135, 31, 130, 1)",
                        pointBackgroundColor: "rgba(135, 31, 130, 1)",
                        fill: true
                    }]
            },
            options: {
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                            ticks: {
                                stepSize: 1,
                                beginAtZero: true,
                                max: 40
                            },
                            display: false
                        }],
                    xAxes: [{
                            ticks: {
                                fontColor: "rgba(255, 255, 255, 1)",
                                fontSize: 12,
                                stepSize: 1,
                                beginAtZero: true
                            },
                            gridLines: {
                                color: "rgba(255, 255, 255, 1)",
                                lineWidth: 0.5,
                                display: false
                            }
                        }]
                }
            }
        });
        this.isSending = this.database.getSettings().isSending;
        var interval;
        if (this.isSending) {
            interval = __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].interval(this.database.updateInterval).subscribe(function () { return _this.updateChart(); });
        }
        this.database.settingsUpdated.subscribe(function (res) {
            if (!res.isSending && interval) {
                interval.unsubscribe();
            }
            else if (res.isSending) {
                interval = __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].interval(_this.database.updateInterval).subscribe(function () { return _this.updateChart(); });
            }
            _this.isSending = res.isSending;
        });
    };
    WalletComponent.prototype.updateChart = function () {
        this.amountOfSms += 1;
        var rand1 = Math.round(Math.random() * 10) + 10;
        var rand2 = Math.round(Math.random() * 20) + 10;
        this.barChart.data.datasets[0].data.shift();
        this.barChart.data.datasets[1].data.shift();
        this.barChart.data.datasets[0].data.push(rand1);
        this.barChart.data.datasets[1].data.push(rand2);
        this.barChart.update();
    };
    return WalletComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])("barCanvas"),
    __metadata("design:type", Object)
], WalletComponent.prototype, "barCanvas", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", Object)
], WalletComponent.prototype, "balance", void 0);
WalletComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: "app-wallet",template:/*ion-inline-start:"/Users/zygimantas/projects/sms-coin-mob-app/src/pages/wallet/wallet.component.html"*/'<canvas #barCanvas></canvas>\n<div class="info-block">\n    <span class="title">today</span>\n    <div class="info-wrapper">\n        <span class="coins-amount">{{balance}} <span class="coins-text">BIRDs</span></span>\n        <span class="sms-amount">{{amountOfSms}} <span class="sms-text">SMS</span></span>\n    </div>\n</div>\n<div class="app-block">\n    <span class="title">Birdchain</span>\n    <span class="subtitle">Your ID</span>\n    <span class="app-id">0x12d3074893377e478F010A02dB438481b22566c0</span>\n</div>\n<!--<button class="statistics" (click)="updateChart()">More statistics</button>-->\n'/*ion-inline-end:"/Users/zygimantas/projects/sms-coin-mob-app/src/pages/wallet/wallet.component.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__app_database_service__["a" /* DatabaseService */]])
], WalletComponent);

//# sourceMappingURL=wallet.component.js.map

/***/ }),

/***/ 743:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 270,
	"./af.js": 270,
	"./ar": 271,
	"./ar-dz": 272,
	"./ar-dz.js": 272,
	"./ar-kw": 273,
	"./ar-kw.js": 273,
	"./ar-ly": 274,
	"./ar-ly.js": 274,
	"./ar-ma": 275,
	"./ar-ma.js": 275,
	"./ar-sa": 276,
	"./ar-sa.js": 276,
	"./ar-tn": 277,
	"./ar-tn.js": 277,
	"./ar.js": 271,
	"./az": 278,
	"./az.js": 278,
	"./be": 279,
	"./be.js": 279,
	"./bg": 280,
	"./bg.js": 280,
	"./bn": 281,
	"./bn.js": 281,
	"./bo": 282,
	"./bo.js": 282,
	"./br": 283,
	"./br.js": 283,
	"./bs": 284,
	"./bs.js": 284,
	"./ca": 285,
	"./ca.js": 285,
	"./cs": 286,
	"./cs.js": 286,
	"./cv": 287,
	"./cv.js": 287,
	"./cy": 288,
	"./cy.js": 288,
	"./da": 289,
	"./da.js": 289,
	"./de": 290,
	"./de-at": 291,
	"./de-at.js": 291,
	"./de-ch": 292,
	"./de-ch.js": 292,
	"./de.js": 290,
	"./dv": 293,
	"./dv.js": 293,
	"./el": 294,
	"./el.js": 294,
	"./en-au": 295,
	"./en-au.js": 295,
	"./en-ca": 296,
	"./en-ca.js": 296,
	"./en-gb": 297,
	"./en-gb.js": 297,
	"./en-ie": 298,
	"./en-ie.js": 298,
	"./en-nz": 299,
	"./en-nz.js": 299,
	"./eo": 300,
	"./eo.js": 300,
	"./es": 301,
	"./es-do": 302,
	"./es-do.js": 302,
	"./es.js": 301,
	"./et": 303,
	"./et.js": 303,
	"./eu": 304,
	"./eu.js": 304,
	"./fa": 305,
	"./fa.js": 305,
	"./fi": 306,
	"./fi.js": 306,
	"./fo": 307,
	"./fo.js": 307,
	"./fr": 308,
	"./fr-ca": 309,
	"./fr-ca.js": 309,
	"./fr-ch": 310,
	"./fr-ch.js": 310,
	"./fr.js": 308,
	"./fy": 311,
	"./fy.js": 311,
	"./gd": 312,
	"./gd.js": 312,
	"./gl": 313,
	"./gl.js": 313,
	"./gom-latn": 314,
	"./gom-latn.js": 314,
	"./he": 315,
	"./he.js": 315,
	"./hi": 316,
	"./hi.js": 316,
	"./hr": 317,
	"./hr.js": 317,
	"./hu": 318,
	"./hu.js": 318,
	"./hy-am": 319,
	"./hy-am.js": 319,
	"./id": 320,
	"./id.js": 320,
	"./is": 321,
	"./is.js": 321,
	"./it": 322,
	"./it.js": 322,
	"./ja": 323,
	"./ja.js": 323,
	"./jv": 324,
	"./jv.js": 324,
	"./ka": 325,
	"./ka.js": 325,
	"./kk": 326,
	"./kk.js": 326,
	"./km": 327,
	"./km.js": 327,
	"./kn": 328,
	"./kn.js": 328,
	"./ko": 329,
	"./ko.js": 329,
	"./ky": 330,
	"./ky.js": 330,
	"./lb": 331,
	"./lb.js": 331,
	"./lo": 332,
	"./lo.js": 332,
	"./lt": 333,
	"./lt.js": 333,
	"./lv": 334,
	"./lv.js": 334,
	"./me": 335,
	"./me.js": 335,
	"./mi": 336,
	"./mi.js": 336,
	"./mk": 337,
	"./mk.js": 337,
	"./ml": 338,
	"./ml.js": 338,
	"./mr": 339,
	"./mr.js": 339,
	"./ms": 340,
	"./ms-my": 341,
	"./ms-my.js": 341,
	"./ms.js": 340,
	"./my": 342,
	"./my.js": 342,
	"./nb": 343,
	"./nb.js": 343,
	"./ne": 344,
	"./ne.js": 344,
	"./nl": 345,
	"./nl-be": 346,
	"./nl-be.js": 346,
	"./nl.js": 345,
	"./nn": 347,
	"./nn.js": 347,
	"./pa-in": 348,
	"./pa-in.js": 348,
	"./pl": 349,
	"./pl.js": 349,
	"./pt": 350,
	"./pt-br": 351,
	"./pt-br.js": 351,
	"./pt.js": 350,
	"./ro": 352,
	"./ro.js": 352,
	"./ru": 353,
	"./ru.js": 353,
	"./sd": 354,
	"./sd.js": 354,
	"./se": 355,
	"./se.js": 355,
	"./si": 356,
	"./si.js": 356,
	"./sk": 357,
	"./sk.js": 357,
	"./sl": 358,
	"./sl.js": 358,
	"./sq": 359,
	"./sq.js": 359,
	"./sr": 360,
	"./sr-cyrl": 361,
	"./sr-cyrl.js": 361,
	"./sr.js": 360,
	"./ss": 362,
	"./ss.js": 362,
	"./sv": 363,
	"./sv.js": 363,
	"./sw": 364,
	"./sw.js": 364,
	"./ta": 365,
	"./ta.js": 365,
	"./te": 366,
	"./te.js": 366,
	"./tet": 367,
	"./tet.js": 367,
	"./th": 368,
	"./th.js": 368,
	"./tl-ph": 369,
	"./tl-ph.js": 369,
	"./tlh": 370,
	"./tlh.js": 370,
	"./tr": 371,
	"./tr.js": 371,
	"./tzl": 372,
	"./tzl.js": 372,
	"./tzm": 373,
	"./tzm-latn": 374,
	"./tzm-latn.js": 374,
	"./tzm.js": 373,
	"./uk": 375,
	"./uk.js": 375,
	"./ur": 376,
	"./ur.js": 376,
	"./uz": 377,
	"./uz-latn": 378,
	"./uz-latn.js": 378,
	"./uz.js": 377,
	"./vi": 379,
	"./vi.js": 379,
	"./x-pseudo": 380,
	"./x-pseudo.js": 380,
	"./yo": 381,
	"./yo.js": 381,
	"./zh-cn": 382,
	"./zh-cn.js": 382,
	"./zh-hk": 383,
	"./zh-hk.js": 383,
	"./zh-tw": 384,
	"./zh-tw.js": 384
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 743;

/***/ }),

/***/ 761:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__settings_component__ = __webpack_require__(762);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__settings_component__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 762:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_database_service__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SettingsComponent = (function () {
    function SettingsComponent(database) {
        this.database = database;
    }
    SettingsComponent.prototype.ngOnInit = function () {
        var settings = this.database.getSettings();
        this.isLimited = settings.isLimited;
        this.isUnlimited = settings.isUnlimited;
        this.isHidden = settings.isHidden;
        this.isSending = settings.isSending;
        this.limitPerMonth = settings.limitPerMonth;
    };
    SettingsComponent.prototype.updateSettings = function (field) {
        if (field === "isLimited" && this.isLimited) {
            this.isUnlimited = false;
        }
        else if (field === "isUnlimited" && this.isUnlimited) {
            this.isLimited = false;
        }
        this.database.updateSettings(field, this[field]);
    };
    return SettingsComponent;
}());
SettingsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: "app-settings",template:/*ion-inline-start:"/Users/zygimantas/projects/sms-coin-mob-app/src/pages/settings/settings.component.html"*/'<div class="main-settings">\n    <span class="primary-text">SMS Limit</span>\n    <div class="checkbox limited">\n        <div class="checkbox-wrapper">\n            <ion-checkbox [(ngModel)]="isLimited" (ionChange)="updateSettings(\'isLimited\')"></ion-checkbox>\n            <ion-label>Limited</ion-label>\n        </div>\n        <div class="limit-input"><ion-input type="number" [(ngModel)]="limitPerMonth" [disabled]="true"></ion-input> per month</div>\n    </div>\n    <div class="checkbox">\n        <ion-checkbox [(ngModel)]="isUnlimited" (ionChange)="updateSettings(\'isUnlimited\')"></ion-checkbox>\n        <ion-label>Unlimited</ion-label>\n    </div>\n    <span class="primary-text spaced">Est. earnings this week</span>\n    <span class="hint-text bold">0.006 BIRDs</span>\n    <span class="primary-text spaced">Est. premium earnings this week</span>\n    <span class="hint-text bold">0.006 BIRDs</span>\n    <div class="separator spaced"></div>\n    <span class="primary-text">Premium</span>\n    <div class="checkbox">\n        <ion-checkbox [(ngModel)]="isHidden" (ionChange)="updateSettings(\'isHidden\')"></ion-checkbox>\n        <ion-label>Allow hidden messages</ion-label>\n    </div>\n</div>\n<div class="sending-status">\n    <span class="primary-text">Messaging data status:</span>\n    <div class="toggle">\n        <ion-label *ngIf="isSending" class="positive">Sending</ion-label>\n        <ion-label *ngIf="!isSending" class="negative">Not sending</ion-label>\n        <ion-toggle [(ngModel)]="isSending" (ionChange)="updateSettings(\'isSending\')"></ion-toggle>\n    </div>\n</div>\n'/*ion-inline-end:"/Users/zygimantas/projects/sms-coin-mob-app/src/pages/settings/settings.component.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__app_database_service__["a" /* DatabaseService */]])
], SettingsComponent);

//# sourceMappingURL=settings.component.js.map

/***/ })

},[385]);
//# sourceMappingURL=main.js.map