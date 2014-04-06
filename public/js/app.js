var blockUI = function(){
    $.blockUI({message: '<h2>Please wait... <i class="fa fa-cog fa-spin"></i></h2>'});
};

var handleAjaxResponse = function(ajaxResponse){
    noty({text: ajaxResponse.message, type: ajaxResponse.success ? 'success' : 'error', timeout: 3500, layout: 'topRight'});
};

var notyConfirm = function(message, cb){
    var buttons = [
        {addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) { $noty.close(); cb(); } },
        {addClass: 'btn btn-danger', text: 'Cancel', onClick: function ($noty) { $noty.close(); } }
    ];
    noty({text: message, type: 'alert', layout: 'center', buttons: buttons, modal: true});
};

var deleteById = function(type, id){
    notyConfirm("Are you sure you want to delete the job of type "+ type + " with ID #"+id+"?", function(){
        blockUI();
        $.getJSON("/jobs/delete/id/"+type+"/"+id).done(function(response){
            handleAjaxResponse(response);
        }).always(function(){
            $.unblockUI();
        });
    });
};

var deleteByStatus = function(status){
    status = status.toLowerCase();
    var statusDisplay = status;
    if(status === "pending"){
        status = "wait";
        statusDisplay = "pending";
    }
    notyConfirm("Are you sure you want to delete <strong>all</strong> jobs with the status "+statusDisplay+"?", function(){
        blockUI();
        $.getJSON("/jobs/delete/status/"+status).done(function(response){
            if(status !== statusDisplay && response.success){
                response.message = response.message.replace(status, statusDisplay);
            }
            handleAjaxResponse(response);
        }).always(function(){
            $.unblockUI();
        });
    });
};

var pendingById = function(type, id){
    notyConfirm("Are you sure you want make the job of type "+ type + " with ID #"+id+" pending? This put this job in the queue to be run again.", function(){
        blockUI();
        $.getJSON("/jobs/pending/id/"+type+"/"+id).done(function(response){
            handleAjaxResponse(response);
        }).always(function(){
            $.unblockUI();
        });
    });
};

var pendingByStatus = function(status){
    status = status.toLowerCase();
    var statusDisplay = status;
    if(status === "pending"){
        status = "wait";
        statusDisplay = "pending";
    }
    notyConfirm("Are you sure you want to make <strong>all</strong> jobs with the status "+status+" pending? This will put all jobs with this status in the queue to be run again.", function(){
        blockUI();
        $.getJSON("/jobs/pending/status/"+status).done(function(response){
            if(status !== statusDisplay && response.success){
                response.message = response.message.replace(status, statusDisplay);
            }
            handleAjaxResponse(response);
        }).always(function(){
            $.unblockUI();
        });
    });
};