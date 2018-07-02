var now_date = Date.now()  
var data_list_len='';

$(document).ready(function() {
   /* $('#example').DataTable( {
        dom: 'Bfrtip',
        buttons: [
            {
                extend:    'copyHtml5',
                text:      '<i class="fa fa-files-o"></i>',
                titleAttr: 'Copy'
            },
            {
                extend:    'excelHtml5',
                text:      '<i class="fa fa-file-excel-o"></i>',
                titleAttr: 'Excel'
            },
            {
                extend:    'csvHtml5',
                text:      '<i class="fa fa-file-text-o"></i>',
                titleAttr: 'CSV'
            },
            {
                extend:    'pdfHtml5',
                text:      '<i class="fa fa-file-pdf-o"></i>',
                titleAttr: 'PDF'
            }
        ]
    } );*/
} );
function drawDataTable(tbl_name, data_list, tbl_columns, hidden_col) {
       console.log(tbl_name, data_list, tbl_columns, hidden_col)
        data_list_len=data_list.length
    
        if ($.fn.DataTable.isDataTable('#'+tbl_name)) {
            $('#'+tbl_name).DataTable().destroy();
        }
        if (hidden_col.length != undefined) {
            hidden_col_colvis = hidden_col.length -1;
        } else {
            hidden_col_colvis = hidden_col
        }
        var table = $("#"+tbl_name);
        table.dataTable({
            autoWidth: false,
            columns: tbl_columns,
            data: data_list,
            "bDestroy": true,
            language: {
                aria: {
                    sortAscending: ": activate to sort column ascending",
                    sortDescending: ": activate to sort column descending"
                },
                emptyTable: "No data available",
                info: "Showing _START_ to _END_ of _TOTAL_ entries",
                infoEmpty: "No entries found",
                infoFiltered: "(filtered1 from _MAX_ total entries)",
                lengthMenu: "_MENU_ entries",
                search: "",
                zeroRecords: "No matching records found"
            },
            buttons: [{
                extend: 'collection',
                className: "exporticon",
                filename:  'NTE_'+now_date+'_TalentDefinition',
                text: 'Export',
                exportOptions: {
                    columns: ':visible'
                },
                buttons: [{
                    extend: "pdf",
                    className: "pdficon",
                    filename:  'NTE_'+now_date+'_TalentDefinition',
                    messageTop: '<p><b>Talent Definition</b></p>',
                    messageBottom: 'Copyrights NEXT',
                    customize: function(doc) {
                        doc.styles.tableHeader.color = 'black';
                        doc.styles.tableHeader.fillColor = '#ffffff';
                        doc.content.splice( 1, 0, {
                            margin: [ 0, 0, 0, 30 ],
                            alignment: 'center',
                            text: '',
                        } );
                        pageNumberPDF(doc)
                    },
                    exportOptions: {
                        columns: ':visible'
                    }
                },
                {
                    extend: "excel",
                    className: "excelicon",
                    messageTop: '<p><b>NTE_'+now_date+'_TalentDefinition</b></p>',
                    filename:  'NTE_'+now_date+'_TalentDefinition',
                    customize: function(xlsx) {  pageHeaderExcelRole(xlsx);},
                    exportOptions: {
                        columns: ':visible'
                    }
                }, {
                    extend: "csv",
                    className: "csvicon",
                    filename:  'NTE_'+now_date+'_TalentDefinition',
                    exportOptions: {
                        columns: ':visible'
                    }
                }]
            }, {
                extend: "print",
                className: "printicon",
                filename:  'NTE_'+now_date+'_TalentDefinition',
                title: '',
                messageTop: '<p><b>NTE_'+now_date+'_TalentDefinition</b></p>',
                exportOptions: {
                    columns: ':visible'
                }
            }, {
                extend: "copy",
                className: "copyicon",
                filename:  'NTE_'+now_date+'_TalentDefinition',
                title: '',
                messageTop: '<p><b>NTE_'+now_date+'_TalentDefinition</b></p>',
                exportOptions: {
                    columns: ':visible'
                }
            }, {
                extend: "colvis",
                className: "colvisicon",
                text: "Columns",
                columns: ':lt('+hidden_col_colvis+')'
            }],
            columnDefs: [{ "visible": false, "targets": hidden_col }],
            responsive: !0,
            order: [[0, "asc"]],
            lengthMenu: [[5, 10, 15, 20, -1], [5, 10, 15, 20, "All"]],
            pageLength: 5,
            dom: "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-6 col-sm-12'i><'col-md-6 col-sm-12'lp>>",
        });
    }
    //Alert message show function
function notify(alert_class, alert_content){
	Lobibox.notify(alert_class, {
		position: 'top right',
		msg: alert_content
	});
}