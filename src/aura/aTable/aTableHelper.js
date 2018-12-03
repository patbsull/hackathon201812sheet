({
    getColumnDefinitions: function () {
        var columnsWidths = this.getColumnWidths();
        var columns = [
            {label: 'Opportunity name', fieldName: 'opportunityName', type: 'text', sortable: true, iconName: 'standard:opportunity', editable:true},
            {label: 'Account name', fieldName: 'accountName', type: 'text', sortable: true, iconName: 'standard:account'},
            {label: 'Close date', fieldName: 'closeDate', type: 'date', sortable: true, cellAttributes: { iconName: 'utility:event', iconAlternativeText: 'Close Date'  }},
            {label: 'Confidence', fieldName: 'confidence', type: 'percent', sortable: true, cellAttributes:
                { iconName: { fieldName: 'confidenceDeltaIcon' }, iconLabel: { fieldName: 'confidenceDelta' }, iconPosition: 'right', iconAlternativeText: 'Percentage Confidence' }},
            {label: 'View', type: 'button', initialWidth: 135, typeAttributes: { label: 'View Details', name: 'view_details', title: 'Click to View Details'}},
            {label: 'Amount', fieldName: 'amount', type: 'currency', typeAttributes: { currencyCode: 'EUR'}, sortable: true},
            {label: 'Action', type: 'button', initialWidth: 150, typeAttributes:
                { label: { fieldName: 'actionLabel'}, title: 'Click to Edit', name: 'edit_status', iconName: 'utility:edit', disabled: {fieldName: 'actionDisabled'}, class: 'btn_next'}},
            {label: 'Contact Email', fieldName: 'contact', type: 'email'},
            {label: 'Contact Phone', fieldName: 'phone', type: 'phone'},
            {label: 'Website', fieldName: 'website', type: 'url', typeAttributes: { label: { fieldName: 'opportunityName' }, target: '_blank', tooltip: 'Click to visit website' }}
        ];

        if (columnsWidths.length === columns.length) {
            return columns.map(function (col, index) {
                return Object.assign(col, { initialWidth: columnsWidths[index] });
            });
        }
        return columns;
    },

    fetchData: function (cmp, fetchData, numberOfRecords) {
        var dataPromise = [
            {opportunityName:'test1', accountName:'testAccount',website:'www.dump.com'}
        ]

        return dataPromise;

    },
    sortData: function (cmp, fieldName, sortDirection) {
        var data = cmp.get("v.data");
        var reverse = sortDirection !== 'asc';

        data = Object.assign([],
            data.sort(this.sortBy(fieldName, reverse ? -1 : 1))
        );
        cmp.set("v.data", data);
    },
    sortBy: function (field, reverse, primer) {
        var key = primer
            ? function(x) { return primer(x[field]) }
            : function(x) { return x[field] };

        return function (a, b) {
            var A = key(a);
            var B = key(b);
            return reverse * ((A > B) - (B > A));
        };
    },
    storeColumnWidths: function (widths) {
        localStorage.setItem('datatable-in-action', JSON.stringify(widths));
    },
    resetLocalStorage: function () {
        localStorage.setItem('datatable-in-action', null);
    },
    getColumnWidths: function () {
        var widths = localStorage.getItem('datatable-in-action');

        try {
            widths = JSON.parse(widths);
        } catch(e) {
            return [];
        }
        return Array.isArray(widths) ? widths : [];
    },
    editRowStatus: function (cmp, row) {
        var data = cmp.get('v.data');
        data = data.map(function(rowData) {
            if (rowData.id === row.id) {
                switch(row.actionLabel) {
                    case 'Approve':
                        rowData.actionLabel = 'Complete';
                        break;
                    case 'Complete':
                        rowData.actionLabel = 'Close';
                        break;
                    case 'Close':
                        rowData.actionLabel = 'Closed';
                        rowData.actionDisabled = true;
                        break;
                    default:
                        break;
                }
            }
            return rowData;
        });
        cmp.set("v.data", data);
    },
    showRowDetails : function(row) {
        // eslint-disable-next-line no-alert
        alert("Showing opportunity " + row.opportunityName + " closing on " + row.closeDate);
    }
});