var FxpTablePagerFootable = (function (exports, $$1, FxpTablePager) {
  'use strict';

  $$1 = $$1 && $$1.hasOwnProperty('default') ? $$1['default'] : $$1;
  FxpTablePager = FxpTablePager && FxpTablePager.hasOwnProperty('default') ? FxpTablePager['default'] : FxpTablePager;

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  /**
   * Define the class as Jquery plugin.
   *
   * @param {String}      pluginName  The name of jquery plugin defined in $.fn
   * @param {String}      dataName    The key name of jquery data
   * @param {function}    ClassName   The class name
   * @param {boolean}     [shorthand] Check if the shorthand of jquery plugin must be added
   * @param {String|null} dataApiAttr The DOM data attribute selector name to init the jquery plugin with Data API, NULL to disable
   * @param {String}      removeName  The method name to remove the plugin data
   */

  function pluginify (pluginName, dataName, ClassName) {
    var shorthand = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var dataApiAttr = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var removeName = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'destroy';
    var old = $$1.fn[pluginName];

    $$1.fn[pluginName] = function () {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var resFunc, resList;
      resList = this.each(function (i, element) {
        var $this = $$1(element),
            data = $this.data(dataName);

        if (!data) {
          data = new ClassName(element, _typeof(options) === 'object' ? options : {});
          $this.data(dataName, data);
        }

        if (typeof options === 'string' && data) {
          if (data[options]) {
            resFunc = data[options].apply(data, args);
            resFunc = resFunc !== data ? resFunc : undefined;
          } else if (data.constructor[options]) {
            resFunc = data.constructor[options].apply(data, args);
            resFunc = resFunc !== data ? resFunc : undefined;
          }

          if (options === removeName) {
            $this.removeData(dataName);
          }
        }
      });
      return 1 === resList.length && undefined !== resFunc ? resFunc : resList;
    };

    $$1.fn[pluginName].Constructor = ClassName; // Shorthand

    if (shorthand) {
      $$1[pluginName] = function (options) {
        return $$1({})[pluginName](options);
      };
    } // No conflict


    $$1.fn[pluginName].noConflict = function () {
      return $$1.fn[pluginName] = old;
    }; // Data API


    if (null !== dataApiAttr) {
      $$1(window).on('load', function () {
        $$1(dataApiAttr).each(function () {
          var $this = $$1(this);
          $$1.fn[pluginName].call($this, $this.data());
        });
      });
    }
  }

  var DEFAULT_OPTIONS = {};
  /**
   * Base class for plugin.
   */

  var BasePlugin =
  /*#__PURE__*/
  function () {
    /**
     * Constructor.
     *
     * @param {HTMLElement} element The DOM element
     * @param {object}      options The options
     */
    function BasePlugin(element) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, BasePlugin);

      this.guid = $$1.guid;
      this.options = $$1.extend(true, {}, this.constructor.defaultOptions, options);
      this.$element = $$1(element);
    }
    /**
     * Destroy the instance.
     */


    _createClass(BasePlugin, [{
      key: "destroy",
      value: function destroy() {
        var self = this;
        Object.keys(self).forEach(function (key) {
          delete self[key];
        });
      }
      /**
       * Set the default options.
       * The new values are merged with the existing values.
       *
       * @param {object} options
       */

    }], [{
      key: "defaultOptions",
      set: function set(options) {
        DEFAULT_OPTIONS[this.name] = $$1.extend(true, {}, DEFAULT_OPTIONS[this.name], options);
      }
      /**
       * Get the default options.
       *
       * @return {object}
       */
      ,
      get: function get() {
        if (undefined === DEFAULT_OPTIONS[this.name]) {
          DEFAULT_OPTIONS[this.name] = {};
        }

        return DEFAULT_OPTIONS[this.name];
      }
    }]);

    return BasePlugin;
  }();

  /*
   * This file is part of the Fxp package.
   *
   * (c) François Pluchino <francois.pluchino@gmail.com>
   *
   * For the full copyright and license information, please view the LICENSE
   * file that was distributed with this source code.
   */

  /**
   * Action on pager refreshed.
   *
   * @param {jQuery.Event|Event} event
   *
   * @typedef {TablePagerFootable} Event.data The table pager footable instance
   */
  function onPagerRefreshed(event) {
    var footable$$1 = event.data.$table.data('footable');

    if (undefined === footable$$1) {
      return;
    }

    footable$$1.resize();
    footable$$1.redraw();
  }
  /**
   * Action on footable row detail is updated.
   *
   * @param {jQuery.Event|Event} event
   *
   * @typedef {TablePagerFootable} Event.data   The table pager footable instance
   * @typedef {jQuery}             Event.detail The table pager detail
   */

  function onFootableRowDetailUpdated(event) {
    var self = event.data,
        footable$$1 = self.$table.data('footable'),
        $cols,
        $detailNames,
        $col,
        $detail,
        $icon,
        i;

    if (undefined === footable$$1) {
      return;
    }

    $cols = self.$table.find('> thead > tr:last > th:not(:visible)');
    $detailNames = $(event.detail).find('div.footable-row-detail-name');

    if ($cols.length !== $detailNames.length) {
      return;
    }

    for (i = 0; i < $detailNames.length; i += 1) {
      $col = $cols.eq(i);
      $detail = $detailNames.eq(i);
      $icon = $col.find('> i.table-sort-icon');

      if (undefined !== $col.attr('data-col-name')) {
        $detail.attr('data-col-name', $col.attr('data-col-name'));
      }

      if (undefined !== $col.attr('data-table-pager-sortable')) {
        $detail.attr('data-table-pager-sortable', $col.attr('data-table-pager-sortable'));
      }

      if (undefined !== $col.attr('data-table-sort')) {
        $detail.attr('data-table-sort', $col.attr('data-table-sort'));
      }

      if ($icon.length > 0) {
        $detail.append($icon.clone());
      }
    }
  }

  /**
   * Table Pager Footable class.
   */

  var TablePagerFootable =
  /*#__PURE__*/
  function (_BasePlugin) {
    _inherits(TablePagerFootable, _BasePlugin);

    /**
     * Constructor.
     *
     * @param {HTMLElement} element The DOM element
     * @param {object}      options The options
     */
    function TablePagerFootable(element) {
      var _this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, TablePagerFootable);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(TablePagerFootable).call(this, element, options));
      _this.$table = $$1('#' + _this.$element.attr('data-table-id'));

      _this.$table.on('table-pager-refreshed.fxp.tablepagerfootable', null, _assertThisInitialized(_this), onPagerRefreshed).on('footable_row_detail_updated.fxp.tablepagerfootable', null, _assertThisInitialized(_this), onFootableRowDetailUpdated);

      return _this;
    }
    /**
     * Destroy the instance.
     */


    _createClass(TablePagerFootable, [{
      key: "destroy",
      value: function destroy() {
        this.$table.off('table-pager-refreshed.fxp.tablepagerfootable', onPagerRefreshed).off('footable_row_detail_updated.fxp.tablepagerfootable', onFootableRowDetailUpdated);

        _get(_getPrototypeOf(TablePagerFootable.prototype), "destroy", this).call(this);
      }
    }]);

    return TablePagerFootable;
  }(BasePlugin);
  TablePagerFootable.defaultOptions = {};
  FxpTablePager.defaultOptions = {
    selectors: {
      sortable: FxpTablePager.defaultOptions.selectors.sortable + ', > tbody > tr.footable-row-detail div.footable-row-detail-name[data-table-pager-sortable=true]'
    }
  };
  pluginify('tablePagerFootable', 'fxp.tablepagerfootable', TablePagerFootable, true, '[data-table-pager="true"]');

  exports.default = TablePagerFootable;

  return exports;

}({}, jQuery, FxpTablePager));
