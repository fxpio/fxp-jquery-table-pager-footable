/*
 * This file is part of the Fxp package.
 *
 * (c) François Pluchino <francois.pluchino@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import pluginify from '@fxp/jquery-pluginify';
import BasePlugin from '@fxp/jquery-pluginify/js/plugin';
import $ from "jquery";
import TablePager from "@fxp/jquery-table-pager/js/table-pager";
import {onFootableRowDetailUpdated, onPagerRefreshed} from "./utils/events";
import 'footable/js/footable';

/**
 * Table Pager Footable class.
 */
export default class TablePagerFootable extends BasePlugin
{
    /**
     * Constructor.
     *
     * @param {HTMLElement} element The DOM element
     * @param {object}      options The options
     */
    constructor(element, options = {}) {
        super(element, options);

        this.$table = $('#' + this.$element.attr('data-table-id'));

        this.$table
            .on('table-pager-refreshed.fxp.tablepagerfootable', null, this, onPagerRefreshed)
            .on('footable_row_detail_updated.fxp.tablepagerfootable', null, this, onFootableRowDetailUpdated);
    }

    /**
     * Destroy the instance.
     */
    destroy() {
        this.$table
            .off('table-pager-refreshed.fxp.tablepagerfootable', onPagerRefreshed)
            .off('footable_row_detail_updated.fxp.tablepagerfootable', onFootableRowDetailUpdated);

        super.destroy();
    }
}

/**
 * Defaults options.
 */
TablePagerFootable.defaultOptions = {
};

TablePager.defaultOptions = {
    selectors: {
        sortable: TablePager.defaultOptions.selectors.sortable + ', > tbody > tr.footable-row-detail div.footable-row-detail-name[data-table-pager-sortable=true]'
    }
};

pluginify('tablePagerFootable', 'fxp.tablepagerfootable', TablePagerFootable, true, '[data-table-pager="true"]');
