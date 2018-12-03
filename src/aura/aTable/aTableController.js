({ 
    init: function (cmp, event, helper) {
        cmp.set('v.columns', helper.getColumnDefinitions());

        var fetchData = {
            opportunityName: "company.companyName",
            accountName : "name.findName",
            closeDate : "date.future",
            amount : "finance.amount",
            contact: "internet.email",
            phone : "phone.phoneNumber",
            website : "internet.url",
            actionLabel : {type : "helpers.randomize", values : [ 'Approve', 'Complete', 'Close', 'Closed' ]},
            confidenceDeltaIcon : {type : "helpers.randomize", values : [ 'utility:up', 'utility:down' ]}
        },
        dataPromise;

        dataPromise = helper.fetchData(cmp, fetchData, cmp.get('v.initialRows'));

        cmp.set('v.dataTableSchema', fetchData);
        cmp.set('v.data', dataPromise);

    },
    updateSelectedText: function (cmp, event) {
        var selectedRows = event.getParam('selectedRows');
        cmp.set('v.selectedRowsCount', selectedRows.length);
    },
    storeColumnWidths: function (cmp, event, helper) {
        helper.storeColumnWidths(event.getParam('columnWidths'));
    },
    clearRows: function (cmp) {
        cmp.set('v.data', []);
    },
    resetColumns: function (cmp, event, helper) {
        helper.resetLocalStorage();
        cmp.set('v.columns', helper.getColumnDefinitions());
        var moreData = cmp.get('v.data');
        moreData.push({});
        cmp.set('v.data', moreData);
        $A.createComponents(
            ["ui:message",{
                "title" : "Sample Thrown Error",
                "severity" : "error",
            }], 
            function(component, status, errorMessage){
                var body = cmp.get("v.body");
                body.push(component);
                cmp.set("v.body", body);
            }
        );
    },
    updateColumnSorting: function (cmp, event, helper) {
        cmp.set('v.isLoading', true);
        // We use the setTimeout method here to simulate the async
        // process of the sorting data, so that user will see the
        // spinner loading when the data is being sorted.
        setTimeout(function() {
            var fieldName = event.getParam('fieldName');
            var sortDirection = event.getParam('sortDirection');
            cmp.set("v.sortedBy", fieldName);
            cmp.set("v.sortedDirection", sortDirection);
            helper.sortData(cmp, fieldName, sortDirection);
            cmp.set('v.isLoading', false);
        }, 0);
    },
    handleRowAction: function (cmp, event, helper) {
        var action = event.getParam('action');
        var row = event.getParam('row');
        switch (action.name) {
            case 'view_details':
                helper.showRowDetails(row);
                break;
            case 'edit_status':
                helper.editRowStatus(cmp, row, action);
                break;
            default:
                helper.showRowDetails(row);
                break;
        }
    }
})