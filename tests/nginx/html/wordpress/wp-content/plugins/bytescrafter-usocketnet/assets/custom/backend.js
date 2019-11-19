
// Copy value to clipboard by class of btn.
// btn should have data-clipboard-text="valuehere"
function copyFromId( elemId ) 
{
    var clipboard = new ClipboardJS('.'+elemId);
    console.log("Copied: " + elemId);
}

jQuery(document).ready( function ( $ ) 
{
    //THIS ARE ALL THE PUBLIC VARIABLES.
    var activeTimeout = undefined;
    
    // First, compile all users from different games and server instance.
    var usnusers = $('#usn-online-users').DataTable({
        responsive: true,
        "columnDefs": [
            {"className": "dt-center", "targets": "_all"}
          ],
    });

    usnusers.on( 'responsive-resize', function ( e, datatable, columns ) {
        var count = columns.reduce( function (a,b) {
            return b === false ? a+1 : a;
        }, 0 );
     
        console.log( count +' column(s) are hidden' );
    } );

    //#region Page = APPLICATION LIST 
        //GET THE REFERENCE OF THE CURRENT PAGE DATTABLES.
        var appDatatables = $('#apps-datatables');

        //SHOW NOTIFICATION THAT WE ARE CURRENTLY LOADING APPS.

        //SET INTERVAL DRAW UPDATE.
        loadingAppList( appDatatables );
        setInterval( function()
        { 
            loadingAppList( appDatatables );
        }, 10000);
    
        //LOAD APPLIST WITH AJAX.
        var usnapps = undefined;
        function loadingAppList( appDatatables )
        {
            if( appDatatables.length != 0 )
            {
                if( $('#apps-notification').hasClass('usn-display-hide') )
                {
                    $('#apps-notification').removeClass('usn-display-hide');
                }
                
                var appListAction = { action: 'ReloadApps' };
                $.ajax({
                    dataType: 'json',
                    type: 'POST', 
                    data: appListAction,
                    url: 'admin-ajax.php',
                    success : function( data )
                    {
                        var appList = [];
                        for(var i = 0; i < data.message.length; i++) {
                            data.message[i].appid = 'ID#' + data.message[i].aid;
                            data.message[i].uname = data.message[i].user_login;
                            delete data.message[i].user_login;
                            appList.push( data.message[i] );
                        }

                        displayingLoadedApps( appList );
                        if( !$('#apps-notification').hasClass('usn-display-hide') )
                        {
                            $('#apps-notification').addClass('usn-display-hide');
                        }
                    },
                    error : function(jqXHR, textStatus, errorThrown) 
                    {
                        //$('#apps-notification').text = "";
                        console.log("" + jqXHR + " :: " + textStatus + " :: " + errorThrown);
                    }
                });
            }
        }

        //DISPLAY DATA INTO THE TARGET DATATABLES.
        function displayingLoadedApps( data )
        {
            //Set table column header.
            var columns = [
                { "sTitle": "IDENTITY",   "mData": "appid" },
                { "sTitle": "OWNER",   "mData": "uname" },
                { "sTitle": "NAME",   "mData": "aname" },
                { "sTitle": "DESCRIPTION",   "mData": "ainfo" },
                { "sTitle": "CAPACITY",   "mData": "acap" },
                { "sTitle": "STATUS",   "mData": "asta" },
                {"sTitle": "Action", "mRender": function(data, type, full)
                    {
                        return '' + 

                            '<div class="btn-group" role="group" aria-label="Basic example">' +

                                '<button type="button" class="btn btn-primary btn-sm"' +
                                    ' data-toggle="modal" data-target="#EditAppOption"' +
                                    ' title="Clicking this will show options for the game that can be modified."' +
                                    ' data-aid="' + full.aid + '"' +  
                                    ' data-aname="' + full.aname + '"' +  
                                    ' data-ainfo="' + full.ainfo + '"' +  
                                    ' data-aurl="' + full.aurl + '"' +  
                                    ' data-asta="' + full.asta + '"' +  
                                    ' data-acap="' + full.acap + '"' +
                                    ' >Options</button>' +

                                '<button type="button" class="btn btn-info btn-sm"' +
                                    ' title="Clicking this will show realtime statistics and current state of the game."' + 
                                    ' disabled>View Stats</button>' +

                                '<button type="button" class="btn btn-dark btn-sm appkey-' + full.aid + '"' +
                                    ' data-clipboard-text="' + full.api + '"' +
                                    ' onclick="copyFromId(\'appkey-' + full.aid + '\')" ' +
                                    ' title="Click this button to copy the game apikey to your clipboard."' +
                                    '>Copy Key</button>' +            
                                    
                            '</div>'; 
                    }
                }
            ];

            //Displaying data on datatables.
            var usnapps = $('#apps-datatables').DataTable({
                destroy: true,
                searching: true,
                buttons: ['copy', 'excel', 'print'],
                responsive: true,
                "aaData": data,
                "aoColumns": columns,
                "columnDefs": [
                    {"className": "dt-center", "targets": "_all"}
                ],
            });
        }

        //IMPLEMENT DATATABLES RESPONSIVENESS.
        if( usnapps != undefined)
        {
            usnapps.on( 'responsive-resize', function ( e, datatable, columns ) {
                var count = columns.reduce( function (a,b) {
                    return b === false ? a+1 : a;
                }, 0 );
            
                console.log( count +' column(s) are hidden' );
            } );
        }

        //CREATE NEW APP ENTRY ON MODAL.
        $('#create-app-form').submit( function(event) {
            event.preventDefault();

            $( "#dialog-confirm-create" ).dialog({
                title: 'Confirmation',
                resizable: false,
                height: "auto",
                width: 320,
                modal: false,
                open: function() {
                    $('#jquery-overlay').removeClass('usn-display-hide');
                    $('#confirm-content-create').html(
                        '<span class="ui-icon ui-icon-alert" style="float:left; margin:12px 12px 20px 0;"></span>' +
                        'Please confirm to complete the process, else just press cancel.'
                    );
                },
                buttons: {
                    "Confirm": function() 
                    {
                        confirmCreateProcess();
                        $('#jquery-overlay').addClass('usn-display-hide');
                        $( this ).dialog( "close" );
                    },
                    Cancel: function() 
                    {
                        $('#jquery-overlay').addClass('usn-display-hide');
                        $( this ).dialog( "close" );
                    }
                }
            });
        });

        function confirmCreateProcess()
        {
            $('#create-app-btn').addClass('disabled');

            //From native form object to json object.
            var unindexed_array = $('#create-app-form').serializeArray();
            var indexed_array = {};

            $.map(unindexed_array, function(n, i){
                indexed_array[n['name']] = n['value'];
            });
            indexed_array.action = 'CreateNewApp';

            // This will be handled by create-app.php.
            $.ajax({
                dataType: 'json',
                type: 'POST', 
                data: indexed_array,
                url: 'admin-ajax.php',
                success : function( data )
                {
                    if( data.status == 'success' ) {
                        $('#appname_create').val('');
                        $('#appdesc_create').val('');
                        $('#appurl_create').val('');
                    }
                    $('#CNAMessage').addClass('alert-'+data.status);
                    $('#CNAMessage').removeClass('usn-display-hide');
                    $('#CNAMcontent').text( data.message );

                    loadingAppList( appDatatables );
                    $('#create-app-btn').removeClass('disabled');
                    activeTimeout = setTimeout( function() {
                        $('#CNAMessage').removeClass('alert-'+data.status);
                        $('#CNAMessage').addClass('usn-display-hide');
                        activeTimeout = undefined;
                    }, 4000);
                },
                error : function(jqXHR, textStatus, errorThrown) {
                    $('#CNAMessage').addClass('alert-danger');
                    $('#CNAMessage').removeClass('usn-display-hide');
                    $('#CNAMcontent').text( textStatus + ': Kindly consult to your administrator for this issue.' );

                    $('#create-app-btn').removeClass('disabled');
                    activeTimeout = setTimeout( function() {
                        $('#CNAMessage').removeClass('alert-danger');
                        $('#CNAMessage').addClass('usn-display-hide');
                        activeTimeout = undefined;
                    }, 7000);
                    console.log("" + jqXHR + " :: " + textStatus + " :: " + errorThrown);
                }
            });
        }

        // LISTEN FOR MODAL SHOW AND ATTACHED ID.
        $('#CreateNewApp').on('show.bs.modal', function(e) {
            var data = e.relatedTarget.dataset;
            $('#create-app-btn').removeClass('disabled');
            $('#appsta_create').val( 'Active' );
            $('#appcap_create').val( 1000 );
        });

        // MAKE SURE THAT TIMEOUT IS CANCELLED.
        $('#CreateNewApp').on('hide.bs.modal', function(e) {
            if( activeTimeout != undefined )
            {
                clearTimeout( activeTimeout );
            }

            if( !$('#CNAMessage').hasClass('usn-display-hide') )
            {
                $('#CNAMessage').addClass('usn-display-hide');
            }
        });

        //DELETE OR UPDATE FOCUSED APP ON MODAL.
        $('#edit-app-form').submit( function(event) {
            event.preventDefault();
            var clickedBtnId = $(this).find("button[type=submit]:focus").attr('id');
            $( "#dialog-confirm-edit" ).dialog({
                title: 'Confirmation',
                resizable: false,
                height: "auto",
                width: 320,
                modal: false,
                open: function() {
                    $('#jquery-overlay').removeClass('usn-display-hide');
                    $('#confirm-content-edit').html(
                        '<span class="ui-icon ui-icon-alert" style="float:left; margin:12px 12px 20px 0;"></span>' +
                        'Please confirm to complete the process, else just press cancel.'
                    );
                },
                buttons: {
                  "Confirm": function() 
                  {
                    confirmEditProcess( clickedBtnId );
                    $('#jquery-overlay').addClass('usn-display-hide');
                    $( this ).dialog( "close" );
                  },
                  Cancel: function() 
                  {
                    $('#jquery-overlay').addClass('usn-display-hide');
                      $( this ).dialog( "close" );
                  }
                }
            });
            
        });

        function confirmEditProcess( clickedBtnId )
        {
            $('#delete-app-btn').addClass('disabled');
            $('#update-app-btn').addClass('disabled');

            //From native form object to json object.
            var postParam = {};

            if( clickedBtnId == 'delete-app-btn' )
            {
                postParam.action = 'DeleteThisApp';
                postParam.appid_edit = $('#appid_edit').val();
            }

            else
            {
                postParam.action = 'UpdateThisApp';
                postParam.appid_edit = $('#appid_edit').val();
                postParam.appsta_edit = $('#appsta_edit').val();
                postParam.appname_edit = $('#appname_edit').val();
                postParam.appdesc_edit = $('#appdesc_edit').val();
                postParam.appurl_edit = $('#appurl_edit').val();
                postParam.appcap_edit = $('#appcap_edit').val();
            }

            // This will be handled by create-app.php.
            $.ajax({
                dataType: 'json',
                type: 'POST', 
                data: postParam,
                url: 'admin-ajax.php',
                success : function( data )
                {
                    if( clickedBtnId == 'delete-app-btn' ) {
                        $('#appname_edit').val('');
                        $('#appdesc_edit').val('');
                        $('#appurl_edit').val('');
                    } else {
                        $('#delete-app-btn').removeClass('disabled');
                        $('#update-app-btn').removeClass('disabled');
                    }
                    
                    $('#DFAMessage').addClass('alert-success');
                    $('#DFAMessage').removeClass('usn-display-hide');
                    $('#DFAMcontent').text( data.message );

                    loadingAppList( appDatatables );
                    activeTimeout = setTimeout( function() {
                        $('#DFAMessage').removeClass('alert-success');
                        $('#DFAMessage').addClass('usn-display-hide');
                        if( clickedBtnId == 'delete-app-btn' ) {
                            $('#EditAppOption').modal('hide');
                        }
                        activeTimeout = undefined;
                    }, 4000);
                },
                error : function(jqXHR, textStatus, errorThrown) {
                    $('#DFAMessage').addClass('alert-danger');
                    $('#DFAMessage').removeClass('usn-display-hide');
                    $('#DFAMcontent').text( textStatus + ': Kindly consult to your administrator for this issue.' );

                    $('#delete-app-btn').removeClass('disabled');
                    $('#update-app-btn').removeClass('disabled');
                    activeTimeout = setTimeout( function() {
                        $('#DFAMessage').removeClass('alert-danger');
                        $('#DFAMessage').addClass('usn-display-hide');
                        activeTimeout = undefined;
                    }, 7000);
                    console.log("" + jqXHR + " :: " + textStatus + " :: " + errorThrown);
                }
            });
        }

        // LISTEN FOR MODAL SHOW AND ATTACHED ID.
        $('#EditAppOption').on('show.bs.modal', function(e) {
            var data = e.relatedTarget.dataset;
            $('#appid_edit').val( data.aid );
            $('#appname_edit').val( data.aname );
            $('#appdesc_edit').val( data.ainfo );
            $('#appurl_edit').val( data.aurl );
            $('#appsta_edit').val( data.asta );
            $('#appcap_edit').val( data.acap );

            $('#delete-app-btn').removeClass('disabled');
            $('#update-app-btn').removeClass('disabled');
        });

        // MAKE SURE THAT TIMEOUT IS CANCELLED.
        $('#EditAppOption').on('hide.bs.modal', function(e) {
            if( activeTimeout != undefined )
            {
                clearTimeout( activeTimeout );
            }

            if( !$('#DFAMessage').hasClass('usn-display-hide') )
            {
                $('#DFAMessage').addClass('usn-display-hide');
            }
        });

    //#endregion

});