"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MapViewComponent = void 0;
var core_1 = require("@angular/core");
var mapbox_gl_1 = require("mapbox-gl");
var MapViewComponent = /** @class */ (function () {
    function MapViewComponent(placesService, mapService, activatedRoute) {
        this.placesService = placesService;
        this.mapService = mapService;
        this.activatedRoute = activatedRoute;
    }
    MapViewComponent.prototype.ngOnInit = function () {
        this.activatedRoute.params.subscribe(function (params) {
            console.log(params);
        });
    };
    MapViewComponent.prototype.ngAfterViewInit = function () {
        var _a;
        var map = new mapbox_gl_1.Map({
            container: (_a = this.mapDivElement) === null || _a === void 0 ? void 0 : _a.nativeElement,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-74.5, 40],
            zoom: 9
        });
        var popup = new mapbox_gl_1.Popup()
            .setHTML("\n        <h6>Aqui estoy</h6>\n        <span>Estoy en este lugar del mundo</span>\n      ");
        new mapbox_gl_1.Marker({ color: "red" })
            .setLngLat([-74.5, 40])
            .setPopup(popup)
            .addTo(map);
        this.mapService.setMap(map);
    };
    __decorate([
        core_1.ViewChild("mapDiv")
    ], MapViewComponent.prototype, "mapDivElement");
    MapViewComponent = __decorate([
        core_1.Component({
            selector: 'app-map-view',
            templateUrl: './map-view.component.html',
            styleUrls: ['./map-view.component.css']
        })
    ], MapViewComponent);
    return MapViewComponent;
}());
exports.MapViewComponent = MapViewComponent;
