"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _dechart = _interopRequireWildcard(require("dechart"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var DechartComponent =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(DechartComponent, _React$PureComponent);

  function DechartComponent(props) {
    var _this;

    _classCallCheck(this, DechartComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DechartComponent).call(this, props));
    _this.dechartInstance = undefined;
    return _this;
  }

  _createClass(DechartComponent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var data = this.props.data;

      if (data && data.values) {
        this.drawNewChart();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var data = this.props.data;

      if (prevProps.data !== data && data) {
        this.drawNewChart();
      }
    }
  }, {
    key: "drawNewChart",
    value: function drawNewChart() {
      var _this$props = this.props,
          chartType = _this$props.chartType,
          componentId = _this$props.componentId,
          data = _this$props.data,
          handleMouseMove = _this$props.handleMouseMove,
          handleMouseOut = _this$props.handleMouseOut,
          chartOptions = _this$props.chartOptions;
      this.dechartInstance = new _dechart.default({
        chartType: chartType,
        componentId: componentId,
        data: data.cloneData ? data.cloneData() : _objectSpread({}, data),
        options: chartOptions
      }).on('mousemove', function (syntheticData) {
        handleMouseMove && handleMouseMove(syntheticData);
      }).on('mouseout', function () {
        handleMouseOut && handleMouseOut();
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          chartOptions = _this$props2.chartOptions,
          children = _this$props2.children,
          className = _this$props2.className,
          componentId = _this$props2.componentId;
      return _react.default.createElement("div", {
        id: componentId,
        className: className,
        style: _objectSpread({
          borderRadius: '2px',
          position: 'relative'
        }, chartOptions.width && {
          width: chartOptions.width
        })
      }, _react.default.createElement("div", {
        className: _dechart.HTML_ROOT
      }, children));
    }
  }]);

  return DechartComponent;
}(_react.default.PureComponent);

DechartComponent.defaultProps = {
  chartOptions: {},
  children: undefined,
  handleMouseMove: function handleMouseMove() {},
  handleMouseOut: function handleMouseOut() {}
};
DechartComponent.propTypes = {
  chartOptions: _propTypes.default.shape({
    backgroundColor: _propTypes.default.string,
    height: _propTypes.default.number,
    marginBottom: _propTypes.default.number,
    marginLeft: _propTypes.default.number,
    marginRight: _propTypes.default.number,
    marginTop: _propTypes.default.number,
    minYScale: _propTypes.default.bool,
    selectedSeries: _propTypes.default.string,
    showBulb: _propTypes.default.bool,
    showGrid: _propTypes.default.bool,
    showLegend: _propTypes.default.bool,
    showXAxis: _propTypes.default.bool,
    showYAxis: _propTypes.default.bool,
    width: _propTypes.default.number,
    xAxisFontSize: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
    xAxisTicks: _propTypes.default.number,
    yAxisFontSize: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
    yAxisTicks: _propTypes.default.number
  }),
  chartType: _propTypes.default.string.isRequired,
  children: _propTypes.default.node,
  className: _propTypes.default.string,
  componentId: _propTypes.default.string.isRequired,
  data: _propTypes.default.object.isRequired,
  handleMouseMove: _propTypes.default.func,
  handleMouseOut: _propTypes.default.func
};
var _default = DechartComponent;
exports.default = _default;
//# sourceMappingURL=DechartComponent.js.map
