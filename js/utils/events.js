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
export function onPagerRefreshed(event) {
    let footable = event.data.$table.data('footable');

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
 */
export function onFootableRowDetailUpdated(event) {
    let self = event.data,
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
