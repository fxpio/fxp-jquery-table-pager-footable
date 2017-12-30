/*
 * This file is part of the Fxp package.
 *
 * (c) François Pluchino <francois.pluchino@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/*global define*/
/*global jQuery*/
/*global window*/
/*global TablePagerFootable*/

/**
 * @param {jQuery} $
 *
 * @typedef {object}             define.amd
 * @typedef {TablePagerFootable} TablePagerFootable
 */
(function (factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery', 'footable/js/footable', 'fxp-jquery-table-pager'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    'use strict';

    /**
     * Action on pager refreshed.
     *
     * @param {jQuery.Event|Event} event
     *
     * @typedef {TablePagerFootable} Event.data The table pager footable instance
     *
     * @private
     */
    function onPagerRefreshed(event) {
        var footable = event.data.$table.data('footable');

        if (undefined === footable) {
            return;
        }

        footable.resize();
        footable.redraw();
    }

    /**
     * Action on footable row detail is updated.
     *
     * @param {jQuery.Event|Event} event
     *
     * @typedef {TablePagerFootable} Event.data   The table pager footable instance
     * @typedef {jQuery}             Event.detail The table pager detail
     *
     * @private
     */
    function onFootableRowDetailUpdated(event) {
        var self = event.data,
            footable = self.$table.data('footable'),
            $cols,
            $detailNames,
            $col,
            $detail,
            $icon,
            i;

        if (undefined === footable) {
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

    // TABLE PAGER FOOTABLE CLASS DEFINITION
    // =====================================

    /**
     * @constructor
     *
     * @param {string|elements|object|jQuery} element
     *
     * @this TablePagerFootable
     */
    var TablePagerFootable = function (element) {
        this.$element = $(element);
        this.$table   = $('#' + this.$element.attr('data-table-id'));

        this.$table
            .on('table-pager-refreshed.fxp.tablepagerfootable', null, this, onPagerRefreshed)
            .on('footable_row_detail_updated.fxp.tablepagerfootable', null, this, onFootableRowDetailUpdated);
    },
        old;

    /**
     * Destroy instance.
     *
     * @this TablePagerFootable
     */
    TablePagerFootable.prototype.destroy = function () {
        this.$table
            .off('table-pager-refreshed.fxp.tablepagerfootable', onPagerRefreshed)
            .off('footable_row_detail_updated.fxp.tablepagerfootable', onFootableRowDetailUpdated);

        this.$element.removeData('st.tablepagerfootable');
    };


    // TABLE PAGER FOOTABLE OVERRIDE TABLE PAGER DEFAULT OPTIONS DEFINITION
    // ====================================================================

    if (undefined !== $.fn.tablePager) {
        $.fn.tablePager.Constructor.DEFAULTS = $.extend(true, $.fn.tablePager.Constructor.DEFAULTS, {
            selectors: {
                sortable: $.fn.tablePager.Constructor.DEFAULTS.selectors.sortable + ', > tbody > tr.footable-row-detail div.footable-row-detail-name[data-table-pager-sortable=true]'
            }
        });
    }


    // TABLE PAGER FOOTABLE PLUGIN DEFINITION
    // ======================================

    function Plugin(option) {
        var args = Array.prototype.slice.call(arguments, 1);

        return this.each(function () {
            var $this = $(this),
                data  = $this.data('st.tablepagerfootable');

            if (!data && option === 'destroy') {
                return;
            }

            if (!data) {
                data = new TablePagerFootable(this);
                $this.data('st.tablepagerfootable', data);
            }

            if (typeof option === 'string') {
                data[option].apply(data, args);
            }
        });
    }

    old = $.fn.tablePagerFootable;

    $.fn.tablePagerFootable             = Plugin;
    $.fn.tablePagerFootable.Constructor = TablePagerFootable;


    // TABLE PAGER FOOTABLE NO CONFLICT
    // ================================

    $.fn.tablePagerFootable.noConflict = function () {
        $.fn.tablePagerFootable = old;

        return this;
    };


    // TABLE PAGER FOOTABLE DATA-API
    // =============================

    $(window).on('load', function () {
        $('[data-table-pager="true"]').each(function () {
            var $this = $(this);
            Plugin.call($this, $this.data());
        });
    });

}));
